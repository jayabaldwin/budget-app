const { Schema, model } = require("mongoose");

// Category specifically as a resource for your frontend
// User will not directly interact with at this point
// But will need to give them that whole list of the app's available categories
// Seed this model. Works like an admin only model

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
