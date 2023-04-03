const schedule = require("node-schedule");

const { getAllData } = require("./jobs/scrapVowels");
schedule.scheduleJob("* * * * *", () => {
  getAllData();
});

// 0 5 * * *
