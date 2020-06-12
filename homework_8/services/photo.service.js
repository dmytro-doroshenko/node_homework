const fsExtra = require('fs-extra').promises;
const {resolve} = require('path');
const uuid = require('uuid').v1();

const db = require('../database').getInstance();

module.exports = {
    addPhoto: async (fileToAdd, modelName, photoDir, id) => {
        const Model = db.getModel(modelName);

        const fileExtension = fileToAdd.name.split('.').pop();
        const photoName = `${uuid}.${fileExtension}`;

        await fsExtra.mkdir(resolve(process.cwd(), 'public', photoDir), {recursive: true});
        await fileToAdd.mv(resolve(process.cwd(), 'public', photoDir, photoName));

        return Model.update(
            {photo: `${photoDir}/${photoName}`},
            {where: {id}}
        );

    },

    removePhoto: async (modelName, id) => {
        const Model = db.getModel(modelName);

        return Model.update(
            {photo: null},
            {where: {id}}
        );
    }
}