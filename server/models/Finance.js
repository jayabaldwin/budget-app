const { Schema, model } = require("mongoose");


const financeSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  income: [{
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
      }
    },
  ],
  savings: [{
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

  moneyOut: [{
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
    }],
});



const Finance = model("Finance", financeSchema);

module.exports = Finance;
