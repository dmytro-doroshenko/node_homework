const cron = require('node-cron');

const clearOldTokens = require('./clearOldTokens.cron');
const {CRON_JOB_PERIOD} = require('../config');
const findProductsWithoutPhoto = require('./findProductsWithoutPhoto.cron');

module.exports = () => {
  cron.schedule(CRON_JOB_PERIOD, async () => {

      console.log(`Cron Job started at ${new Date().toISOString()}`);

      await clearOldTokens();
      await findProductsWithoutPhoto();

      console.log(`Cron Job finished at ${new Date().toISOString()}`);
  });
};