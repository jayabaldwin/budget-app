const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://0.0.0.0/0/budget-app");

module.exports = mongoose.connection;
