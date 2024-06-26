const { Schema, model } = require("mongoose");
const UserBudgetCategories = require("./UserBudget");

const financeSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  savingsTotal: {
    type: Number,
    default: 0,
  },
  income: [
    {
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        // required: true,
      },
    },
  ],
  savings: [
    {
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        // required: true,
      },
    },
  ],

  moneyOut: [
    {
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        // required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
  ],
  budgetCategories: [UserBudgetCategories],
});

const Finance = model("Finance", financeSchema);

module.exports = Finance;
