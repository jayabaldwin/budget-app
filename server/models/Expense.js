const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
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
            category: {
                type: String,
                required: true,
                enum: ['Transport', 'Utilities', 'Education', 'Travel', 'Health', 'Business'],
            },
        },
    ]
})

const Expense = model('Expense', expenseSchema);

module.exports = Expense;