// // 0 5 * * *

const { getAllData } = require("./jobs/scrapVowels");

var CronJobManager = require("cron-job-manager");
let manager = new CronJobManager();
manager.add("scrap_vowels", "*/5 * * * *", getAllData);
manager.start("scrap_vowels");
module.exports = manager;
