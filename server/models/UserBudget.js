const { Schema } = require("mongoose");

const budgetSchema = new Schema({
  categoryName: {
    type: String,
    // required: true,
    trim: true,
  },
  remainingAmount: {
    type: Number,
    // default: 0,
  },
  budgetAmount: {
    type: Number,
    // required: true,
  },
});

module.exports = budgetSchema;
