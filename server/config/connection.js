const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://0.0.0.0/0/budget-app");
// Local connect
// process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/budget-app"

module.exports = mongoose.connection;
