const { Schema, model } = require("mongoose");

const budgetSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  remainingAmount: {
    type: Number,
    required: true,
  },
  budgetAmount: {
    type: Number,
  },
});

module.exports = budgetSchema;
