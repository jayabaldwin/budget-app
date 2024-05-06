const db = require("./connection");
const { User, Category, Finance } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  //   await cleanDB('User', 'users');
  //   await cleanDB('Finance', 'finances');

  const categories = await Category.insertMany([
    { budgetName: "Home" },
    { budgetName: "Utilities" },
    { budgetName: "Transport" },
    { budgetName: "Groceries" },
    { budgetName: "Eating Out" },
    { budgetName: "Shopping" },
    { budgetName: "Entertainment" },
    { budgetName: "Health" },
    { budgetName: "Education" },
    { budgetName: "Travel" },
    { budgetName: "Business" },
    { budgetName: "Miscellaneous" },
  ]);

  console.log("categories seeded");

  process.exit();
});
