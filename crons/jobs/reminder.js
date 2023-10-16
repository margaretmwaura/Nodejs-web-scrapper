// https://stackoverflow.com/questions/42621024/run-a-cron-job-that-depends-on-entries-of-a-database-in-nodejs-using-aws
// https://github.com/lykmapipo/kue-scheduler
// https://stackoverflow.com/questions/33993130/dynamically-update-nodejs-cronjob-period#:~:text=In%20case%20you%20want%20to,the%20functions%20a.

// async function testingCrons() {
//   const CronJob = require("./../lib/cron.js").CronJob;

//   console.log("Before job instantiation");
//   let date = new Date();
//   date.setSeconds(date.getSeconds() + 2);
//   const job = new CronJob(date, function () {
//     const d = new Date();
//     console.log("Specific date:", date, ", onTick at:", d);
//   });
//   console.log("After job instantiation");
//   job.start();
// }

// testingCrons();

// Managers
// https://github.com/cfurst/CronJobManager
// https://medium.com/m2p-yap-fintech/building-a-cron-job-manager-from-scratch-using-node-js-d7abc7a3646b
// https://m2pfintech.com/blog/building-a-cron-job-manager-from-scratch-using-node-js/
