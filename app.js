const {join} = require('path');

const hw1 = require('./homework_1/hw_1');

const firstDir = join(__dirname, 'homework_1', '18_00');
const secondDir = join(__dirname, 'homework_1', '20_00');
hw1(firstDir, secondDir);
