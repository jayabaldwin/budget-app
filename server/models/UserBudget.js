const { Schema, model } = require("mongoose");

const budgetSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  setWeeklyAmount: {
    type: Number,
    required: true,
  },
});

const UserBudget = model("UserBudget", budgetSchema);

module.exports = UserBudget;
