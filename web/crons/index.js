const schedule = require("node-schedule");

const { getAllData } = require("./jobs/scrapVowels");
schedule.scheduleJob("* * * * *", () => {
  console.log("I ran ...");
  getAllData();
});
