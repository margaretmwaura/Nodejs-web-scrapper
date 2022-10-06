const schedule = require("node-schedule");

const { extractData } = require("./../command");
schedule.scheduleJob("m-job", "* * * * *", () => {
  console.log("I ran ...");
  extractData();
  // schedule.cancelJob("m-job");
});
