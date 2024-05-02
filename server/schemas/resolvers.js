const {User, Finance, MoneyOut } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-errors');

const resolvers ={
    Query: {
        users: async () => {
            return User.find().populate('finances');
        },
        user: async (parent, {email}) =>{
            return User.findOne({ email });
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
            return {token, user};
        },

        addBalance: async (parent, {email, balance}) =>{
            // gets the user by their email, and populates that model with finances
            const existingUser = await User.findOne({ email }).populate('finances');
            // throws an error if the user does not exist
            if(!existingUser){
                throw new Error("User doesn't exist");
            }
            // gets the finances sub-doc from the User
            const financeId = existingUser.finances; 
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

            if(!existingUser){
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
                            date: date
                        }
                    },
                $inc: {balance: amount}
                },
                {new: true},
            );
            return updateFinance;
        },
        
        // this is the same code but you're now pushing to savings instead of income
        addSavings: async (parent, {email, amount, description, date}) => {
            const existingUser = await User.findOne({ email }).populate('finances');

            if(!existingUser){
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
                        date: date ? date: null,
                    }
                }
                },
            );

            return updateFinance;
        },
        

        addMoneyOut: async (parent, {email, amount, description, date, category}) => {
            const existingUser = await User.findOne({email}).populate('finances')

            if(!existingUser){
                throw new Error("User doesn't exist");
            }
            const financeId = existingUser.finances;
            console.log('financeId ', financeId);
            const updateFinance = await Finance.findByIdAndUpdate(
                financeId,
                {
                    $push: {
                        moneyOut: {
                            amount: amount,
                            description: description,
                            date: date ? date: null,
                            category: category,
                        },
                    },
                    $inc: {balance: -amount}
                },
                {new: true},
            );
            console.log('updateFinance ', updateFinance);
            return updateFinance;
        },


    },
}

module.exports = resolvers;