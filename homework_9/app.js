const dotenv = require('dotenv');
const express = require('express');
const expBars = require('express-handlebars');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const {join} = require('path');

dotenv.config();

const {PORT} = require('./config');
const {cronRun} = require('./cron');
const db = require('./database').getInstance();
const {setDefaultData} = require('./helper');
const {authRouter, productRouter, userRouter} = require('./routes');

const app = express();

db.setModels();

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(fileUpload({}));
app.use(morgan('dev'));

app.engine('hbs', expBars({
    extname: 'hbs',
    defaultLayout: false,
}));


app.get('/', (req, res) => {
    res.render('main');
});

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customErrorCode,
        })
})

app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

cronRun();
setTimeout(() => {
    setDefaultData();
}, 1000) // todo: remake without using setTimeout

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

process.on("unhandledRejection", reason => {
    console.log("Unhandled Error:", reason);

    process.exit(0);
});