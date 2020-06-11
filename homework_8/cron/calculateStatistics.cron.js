const {userService} = require('../services')

module.exports = async () => {
    let users = await userService.getUsers();

    console.log(users.length);

}