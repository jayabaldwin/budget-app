const { Schema, model } = require("mongoose");

const moneyOutSchema = new Schema({
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
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Home",
      "Utilities",
      "Transport",
      "Groceries",
      "Eating Out",
      "Shopping",
      "Entertainment",
      "Health",
      "Education",
      "Travel",
      "Business",
      "Miscellaneous",
    ],
  },
});

const MoneyOut = model("MoneyOut", moneyOutSchema);

module.exports = MoneyOut;
