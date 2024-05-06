const { Schema, model } = require("mongoose");
const UserBudget = require("./UserBudget");

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
        type: "String",
      },
    },
  ],

  budgetCategories: [UserBudget],
});

const Finance = model("Finance", financeSchema);

module.exports = Finance;
