const db = require("./connection");
const { User, Category, Finance } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");

  // Seed categories
  await Category.insertMany([
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

  console.log("Categories seeded");

  process.exit();
});
