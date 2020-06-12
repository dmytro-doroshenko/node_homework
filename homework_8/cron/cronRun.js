const cron = require('node-cron');

const clearOldTokens = require('./clearOldTokens.cron');
const {CRON_JOB_PERIOD} = require('../config');

module.exports = () => {
  cron.schedule(CRON_JOB_PERIOD, async () => {

      console.log(`Cron Job started at ${new Date().toISOString()}`);

      await clearOldTokens();

      console.log(`Cron Job finished at ${new Date().toISOString()}`);
  });
};