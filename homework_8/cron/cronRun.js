const cron = require('node-cron');
const calculateStatistics = require('./calculateStatistics.cron');

module.exports = () => {
  cron.schedule('* * * * * *', async () => {
      console.log(22);
      await calculateStatistics();

  });
};