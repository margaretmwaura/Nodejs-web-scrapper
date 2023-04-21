const schedule = require("node-schedule");

const { getAllData } = require("./jobs/scrapVowels");
schedule.scheduleJob("20 6 * * *", () => {
  getAllData();
});

// 0 5 * * *
