const {userRoles} = require('../constants');
const {dataService} = require('../services');

module.exports = async () => {
    const roles = await dataService.getRoles();

    if (!roles.length) {
        const roles = Object.values(userRoles);

        const rolesToInsert = roles.map((title, index) => {
            return {id: index + 1, title}
        })

        await dataService.insertRoles(rolesToInsert);
    }
};