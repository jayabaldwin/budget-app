const { User, Finance, UserBudget, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const dayjs = require("dayjs");

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
      if (context.user) {
        const foundUser = await User.findOne({
          _id: context.user._id,
        }).populate({
          path: "finances",
        });
        return foundUser;
      }
      throw AuthenticationError;
    },
    categories: async () => {
      return Category.find();
    },
    userBudgetCategories: async (parent, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const finance = await Finance.findById(user.finances[0]._id);

        const userBudgetCatArr = finance.budgetCategories;
        const moneyOutArr = finance.moneyOut;

        const startDate = dayjs().startOf("week").add(1, "day");
        const endDate = dayjs().endOf("week").add(1, "day");

        let filtered = [];
        for (let i = 0; i < userBudgetCatArr.length; i++) {
          for (let j = 0; j < moneyOutArr.length; j++) {
            if (
              moneyOutArr[j].category === userBudgetCatArr[i].categoryName &&
              moneyOutArr[j].date >= startDate &&
              moneyOutArr[j].date <= endDate
            ) {
              const expense = {
                ...moneyOutArr[j].toObject(),
                // amount: moneyOutArr[j].amount,
                // description: moneyOutArr[j].description,
                // date: moneyOutArr[j].date,
                // category: moneyOutArr[j].category,
                // _id: moneyOutArr[j]._id,
                totalBudget: userBudgetCatArr[i].budgetAmount,
                remainingAmount: userBudgetCatArr[i].remainingAmount,
              };
              filtered.push(expense);
            }
          }
        }
        console.log("filtered ", filtered);

        return filtered;
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { firstname, lastname, email, password }) => {
      const finance = await Finance.create({
        balance: 0,
        savingsTotal: 0,
        income: [],
        savings: [],
        moneyOut: [],
        budgetCategories: [],
      });
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        finances: finance._id,
      });

      // creates the token
      const token = signToken(user);
      // returns the new User document and the token
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      // finds the user via their email
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }
      // makes sure the password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      // password was correct? give 'em a token!
      const token = signToken(user);
      return { token, user };
    },

    addBalance: async (parent, { balance }, context) => {
      // If logged in
      if (context.user) {
        const user = await User.findById(context.user._id);

        const finance = await Finance.findByIdAndUpdate(
          user.finances[0]._id,
          { balance },
          { new: true }
        );
        return finance;
      }
      throw AuthenticationError;
    },
    // category names must come from a drop down, no user input!
    addCategory: async (_, args, context) => {
      if (context.user) {
        console.log(args);
        const user = await User.findById(context.user._id);
        const finance = await Finance.findByIdAndUpdate(
          user.finances[0]._id,
          {
            $push: {
              budgetCategories: { ...args, remainingAmount: args.budgetAmount },
            },
          },
          { new: true }
        );
        return finance;
      }
      throw AuthenticationError;
    },

    // Doesnt currently update the remaining balance
    updateCategoryBudget: async (_, { category, amount }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const updateFinance = await Finance.findById(user.finances[0]._id);
        const index = updateFinance.budgetCategories.findIndex(
          (cat) => cat.categoryName === category
        );
        if (index !== -1) {
          updateFinance.budgetCategories[index].budgetAmount = amount;
          await updateFinance.save();
        }

        return updateFinance;
      }
      throw AuthenticationError;
    },

    // Delete category

    addIncome: async (parent, { amount, description, date }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        const financeId = user.finances[0]._id;
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
      }
      throw AuthenticationError;
    },

    // this is the same code but you're now pushing to savings instead of income
    addSavings: async (parent, { amount, description, date }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        const financeId = user.finances[0]._id;
        const updateFinance = await Finance.findByIdAndUpdate(
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
          },
          { new: true }
        );

        return updateFinance;
      }
      throw AuthenticationError;
    },

    addMoneyOut: async (
      parent,
      { amount, description, date, category },
      context
    ) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        const financeId = user.finances[0]._id;
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
        const index = updateFinance.budgetCategories.findIndex(
          (cat) => cat.categoryName === category
        );
        updateFinance.budgetCategories[index].remainingAmount -= amount;
        await updateFinance.save();

        return updateFinance;
      }
      throw AuthenticationError;
    },

    deleteTransaction: async (_, { transaction_id, type }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const updateFinance = await Finance.findById(user.finances[0]._id);

        const arrayType = updateFinance[type];
        const item = arrayType.find((t) => t.id === transaction_id);

        if (type === "income") {
          updateFinance.balance -= item.amount;
        } else if (type === "moneyOut" || "savings") {
          updateFinance.balance += item.amount;
        }

        const filteredOut = updateFinance[type].filter(
          (t) => t.id !== transaction_id
        );

        updateFinance[type] = filteredOut;
        await updateFinance.save();
        return updateFinance;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
