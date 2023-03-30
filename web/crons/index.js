const schedule = require("node-schedule");

const { getAllData } = require("./jobs/scrapVowels");
schedule.scheduleJob("0 5 * * *", () => {
  getAllData();
});
