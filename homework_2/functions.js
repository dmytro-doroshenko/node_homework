const { writeFile } = require('fs');
const { join } = require('path');


const logInUser = (userData, registeredUsersList) => {
   const registeredUser = registeredUsersList.find(user => user.login === userData.login);
   if (registeredUser && registeredUser.password === userData.password) {
      return true;
   }
};

const regNewUser = (userData, registeredUsersList) => {
   const { login, password } = userData;
   const existedLogin = registeredUsersList.find(user => user.login === login);
   if (existedLogin) {
      return 'err_log';
   } else if (password[0] !== password[1]) {
      return 'err_pass';
   } else {
      registeredUsersList.push({login, password: password[0]});
      writeFile(join(__dirname, 'usersList.txt'), JSON.stringify(registeredUsersList), err => {
         err && console.log(err);
      });
      return 'success';
   }
};

module.exports = { logInUser, regNewUser };
