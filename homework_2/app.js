const express = require('express');
const expBar = require('express-handlebars');
const { join } = require('path');
const { readFile } = require('fs');

const { logInUser, regNewUser } = require('./functions');

let registeredUsers;

const app = express();

readFile(join(__dirname, 'usersList.txt'), (err, users) => {
   registeredUsers = JSON.parse(users.toString()) || [];
});

app.use(express.json());
app.use(express.urlencoded());

express.static(join(__dirname, 'views'));

app.engine('.hbs', expBar( {
   defaultLayout: false,
   extname: '.hbs',
}));

app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views'));

app.get('/', (req, res) => {
   res.render('main');
});

app.get('/login', (req, res) => {
   res.render('login');
});

app.post('/login', (req, res) => {
   const result = logInUser(req.body, registeredUsers);
   if (result) {
      const { login } = req.body;
      res.send(`Hello, ${login}`);
   } else {
      res.send ('Login or password is incorrect. Please, <a href="/login" class="navLink">try again</a> or ' +
         '<a href="/register" class="navLink">Register</a>');
   }
});

app.get('/register', (req, res) => {
   res.render('register');
});

app.post('/register', (req, res) => {
   const result = regNewUser(req.body, registeredUsers);
   const { login } = req.body;
   if (result === 'err_log') {
      res.send(`User with login <b>${login}</b> is already registered. Please, enter another login`);
   } else if (result === 'err_pass') {
      res.send(`The password and confirmed password did not match. User <b>${login}</b> is NOT registered`);
   } else if (result === 'success'){
      res.send('You are successfully registered. Now you can <a href="/login" class="navLink">Log in</a>');
   }
});

app.get('/users', (req, res) => {
   res.render('users', {registeredUsers});
});

app.listen(5000, error => {
   if (error) {
      console.log(error);
   } else {
      console.log('listening 5000...');
   }
});


