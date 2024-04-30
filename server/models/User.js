const {Schema, model } = require('mongoose');
const Expense = require('./Expense');

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    initials: {
        type: String,
        get: function(){
            return this.firstName[0].toUpperCase()+this.lastName[0].toUpperCase();
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    expense: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense',
    }],
})

const User = model('User', userSchema);

module.exports = User;