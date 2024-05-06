const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  budgetName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
