const { User, Finance } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// const { AuthenticationError } = require('apollo-server-errors');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("finances");
    },
    user: async (parent, { email }) => {
      // if this doesn't have .populate('finances') everything i try to get from finances will be null
      return User.findOne({ email }).populate("finances");
    },

    // this is to get the info from the user that's logged in
    me: async (parent, args, context) => {
      // i kinda forget where context is coming from/how it works
      if(context.user) {
        const foundUser = await User.findOne({_id: context.user.data._id}).populate('finances');
        return foundUser;
      }
      // throw new AuthenticationError('You need to be logged in!');
    }
  },

    Mutation: {  
      addUser: async (parent, {firstname, lastname, email, password}) => {
          // this is just here to make sure someone isn't already using the email
          const existingUser = await User.findOne({  email });
          if(existingUser){
              throw new AuthenticationError('Already a user with this email');
          }
          // creates the subdoc that's the finance. I'll probably need to be creating sub docs in income, savings, and moneyOut too
          const finance = await Finance.create({ balance: 0, income: [], savings: [], moneyOut: [] });
          const user = await User.create({ 
              firstname,
              lastname,
              email, 
              password,
              finances: [finance._id]
          });
          // creates the token
          const token = signToken(user);
    // returns the new User document and the token
    return { token, user };
     },

    login: async (parent, {email, password}) => {
      // finds the user via their email
        const user = await User.findOne({email});

        if(!user){
            throw AuthenticationError;
        }
        // makes sure the password is correct
        const correctPw = await user.isCorrectPassword(password)
        if(!correctPw){
            throw AuthenticationError;
        }
        // password was correct? give 'em a token!
        const token = signToken(user);
        return { token, user };
    },


    addBalance: async (parent, {email, balance}) =>{
        // gets the user by their email, and populates that model with finances
        const existingUser = await User.findOne({ email }).populate('finances');
        // throws an error if the user does not exist
        if(!existingUser){
            throw new Error("User doesn't exist");
        }
        // because in the db the only thing in the user model in regards to finance is the id
        const financeId = existingUser.finances;
        // now with that we have the finance id from user, we can update it
        const updateFinance = await Finance.findByIdAndUpdate(
            // filters by finance sub-doc from that user
            financeId,
            // increments up the balance by the balance sent to the mutation
            { $inc: { balance: balance } },
            { new: true },
        );
        // returns that new 
        return updateFinance;
    },
      
        // this is basically the same as above but uses $push instead of $inc
    addIncome: async (parent, { email, amount, description, date}) => {
      const existingUser = await User.findOne({ email }).populate('finances');

      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      const financeId = existingUser.finances;
      const updateFinance = await Finance.findByIdAndUpdate(
        financeId,
        // because income is an array, need to use $push
        {
          $push: {
            income: {
              amount: amount,
              description: description,
              date: date ? date : null,
            },
          },
          $inc: { balance: amount },
        },
        { new: true }
      );
      return updateFinance;
    },

    // this is the same code but you're now pushing to savings instead of income
    addSavings: async (parent, { email, amount, description, date }) => {
      const existingUser = await User.findOne({ email }).populate("finances");

      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      const financeId = existingUser.finances;
      const updateFinance = await Finance.findByIdAndUpdate(
        // make a running total, of savings. And the option to move money from savings?
        financeId,
        {
          $push: {
            savings: {
              amount: amount,
              description: description,
              date: date ? date : null,
            },
          },
          $inc: { 
            balance: -amount,
            savingsTotal: amount, 
          },
          // $inc: {savingsTotal: amount},
        },
        {new: true}
      );

      return updateFinance;
    },

    addMoneyOut: async (
      parent,
      { email, amount, description, date, category }
    ) => {
      const existingUser = await User.findOne({ email }).populate("finances");

      if (!existingUser) {
        throw new Error("User doesn't exist");
      }
      const financeId = existingUser.finances;
      const updateFinance = await Finance.findByIdAndUpdate(
        financeId,
        {
          $push: {
            moneyOut: {
              amount: amount,
              description: description,
              date: date ? date : null,
              category: category,
            },
          },
          $inc: { balance: -amount },
        },
        { new: true }
      );
      console.log("updateFinance ", updateFinance);
      return updateFinance;
    },
  },
};

module.exports = resolvers;
