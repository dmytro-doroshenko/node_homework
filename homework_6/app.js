const express = require('express');
const expBars = require('express-handlebars');
const {join} = require('path');

const {authRouter, productRouter, userRouter} = require('./routes');
const db = require('./database').getInstance();

db.setModels();
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(join(__dirname, 'views')));

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

app.listen(5000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port 5000');
    }
});

process.on("unhandledRejection", reason => {
    console.log("Unhandled Error:", reason);

    process.exit(0);
});