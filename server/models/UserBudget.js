const { Schema, model } = require("mongoose");

const budgetSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  remainingAmount: {
    type: Number,
  },
  budgetAmount: {
    type: Number,
    required: true,
  },
});

module.exports = budgetSchema;
