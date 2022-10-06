const schedule = require("node-schedule");

const { extractData } = require("./jobs/scrapVowels");
schedule.scheduleJob("* * * * *", () => {
  console.log("I ran ...");
  extractData();
});
