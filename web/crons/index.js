// const schedule = require("node-schedule");

// const { getAllData } = require("./jobs/scrapVowels");
// schedule.scheduleJob("20 6 * * *", () => {
//   getAllData();
// });

// // 0 5 * * *

async function testingCrons() {
  const CronJob = require("./../lib/cron.js").CronJob;

  console.log("Before job instantiation");
  let date = new Date();
  date.setSeconds(date.getSeconds() + 2);
  const job = new CronJob(date, function () {
    const d = new Date();
    console.log("Specific date:", date, ", onTick at:", d);
  });
  console.log("After job instantiation");
  job.start();
}

testingCrons();

// Managers
// https://github.com/cfurst/CronJobManager
// https://medium.com/m2p-yap-fintech/building-a-cron-job-manager-from-scratch-using-node-js-d7abc7a3646b
// https://m2pfintech.com/blog/building-a-cron-job-manager-from-scratch-using-node-js/
