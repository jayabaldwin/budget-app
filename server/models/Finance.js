const { Schema, model } = require("mongoose");

const financeSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  income: {
    type: Number,
  },
  savings: {
    type: Number,
  },
  moneyOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "MoneyOut",
    },
  ],
});

const Finance = model("Finance", financeSchema);

module.exports = Finance;
