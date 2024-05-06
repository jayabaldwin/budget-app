const { User, Finance, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Users querys wont be necessary as "me" is the only data necessary
    // But good for testing
    users: async () => {
      return User.find().populate("finances");
    },

    user: async (parent, { email }) => {
      return User.findOne({ email }).populate("finances");
    },

    // Info of logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const foundUser = await User.findById({
          _id: context.user.data._id,
        }).populate({
          path: "finances",
          // Populate chain of paths
          populate: { path: "moneyOut", populate: { path: "category" } },
        });
        return foundUser;
      }
      throw AuthenticationError;
    },

    // Data to be seeded first and then use the values in frontend
    // categories: async () => Category.find(),

    // Users budget categories and weekly amounts to display in graph
    // userBudget: async (parent, args, context) => {
    //   if (context.user) {
    //     const currentUserBudget = await User.findById(
    //       context.user._id
    //     ).populate({
    //       path: "finances.budgetCategory",
    //       populate: { path: "UserBudget" },
    //     });
    //     return currentUserBudget;
    //   }
    //   throw AuthenticationError;
    //   // Apply an order to it: Bootcamp example: user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
    // },

    Mutation: {
      addUser: async (parent, { firstname, lastname, email, password }) => {
        // Dont need to make sure someone isn't already using the email because of unique validators
        const finance = await Finance.create({
          balance: 0,
          savingsTotal: 0,
          income: [],
          savings: [],
          moneyOut: [],
          budget: [],
        });

        const user = await User.create({
          firstname,
          lastname,
          email,
          password,
          finances: finance._id,
        });
        // Creates the token
        const token = signToken(user);
        // Returns the new User document and the token
        return { token, user };
      },
      // addUser: async (parent, { firstname, lastname, email, password }) => {
      //   // this is just here to make sure someone isn't already using the email
      //   const existingUser = await User.findOne({ email });
      //   if (existingUser) {
      //     throw new AuthenticationError("Already a user with this email");
      //   }
      //   // creates the subdoc that's the finance. I'll probably need to be creating sub docs in income, savings, and moneyOut too
      //   const finance = await Finance.create({
      //     balance: 0,
      //     income: [],
      //     savings: [],
      //     moneyOut: [],
      //   });
      //   const user = await User.create({
      //     firstname,
      //     lastname,
      //     email,
      //     password,
      //     finances: [finance._id],
      //   });
      //   // creates the token
      //   const token = signToken(user);
      //   // returns the new User document and the token
      //   return { token, user };
      // },

      login: async (parent, { email, password }) => {
        // Finds the user via their email
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }
        // Confirms password is correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }
        // Password was correct? give 'em a token!
        const token = signToken(user);
        return { token, user };
      },

      addBalance: async (parent, { balance }, context) => {
        // If logged in
        if (context.user) {
          const existingUser = await User.findById(context.user._id);

          const finances = await Finance.findByIdAndUpdate(
            existingUser.finances[0]._id,
            { balance },
            { new: true }
          );

          return finances;
        }
        throw AuthenticationError;
      },
      // addBalance: async (parent, { email, balance }, context) => {
      //   // If logged in
      //   if (context.user) {
      //     const existingUser = await User.findById(context.user._id).populate(
      //       "finances"
      //     );
      //     // because in the db the only thing in the user model in regards to finance is the id
      //     const financeId = existingUser.finances;
      //     // now with that we have the finance id from user, we can update it
      //     const updateFinance = await Finance.findByIdAndUpdate(
      //       // filters by finance sub-doc from that user
      //       financeId,
      //       // increments up the balance by the balance sent to the mutation
      //       { $inc: { balance: balance } },
      //       { new: true }
      //     );
      //     // returns that new
      //     return updateFinance;
      //   }
      //   throw AuthenticationError;
      // },

      // this is basically the same as above but uses $push instead of $inc
      addIncome: async (parent, { amount, description, date }, context) => {
        if (context.user) {
          const existingUser = await User.findById(context.user._id).populate(
            "finances"
          );

          const financeId = existingUser.finances;
          const updateFinance = await Finance.findByIdAndUpdate(
            financeId,
            // Because income is an array, need to use $push
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
        }
        throw AuthenticationError;
      },

      // this is the same code but you're now pushing to savings instead of income
      addSavings: async (parent, { amount, description, date }, context) => {
        if (context.user) {
          const existingUser = await User.findById(context.user._id).populate(
            "finances"
          );
          const financeId = existingUser.finances;
          const updateFinance = await Finance.findByIdAndUpdate(
            // Make a running total, of savings. And the option to move money from savings?
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
            { new: true }
          );
          return updateFinance;
        }
        throw AuthenticationError;
      },

      addMoneyOut: async (
        parent,
        { email, amount, description, date, category },
        context
      ) => {
        if (context.user) {
          const existingUser = await User.findById(context.user._id).populate(
            "finances"
          );
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
        }
        throw AuthenticationError;
      },
    },
  },
};

// TO DO
// addUserCategory: async () => {};

// TO DO
// setWeeklyAmount: async () => {};

// TO DO
// updateWeeklyAmount: async () => {};

// TO DO
// removeUserCategory: async () => {};

module.exports = resolvers;
