const { join } = require('path');
const { mkdir, readdir, rename, rmdir, exists } = require('fs');


function toggleContent (dir_A, dir_B) {
   const dir_temp = join(__dirname, 'temp');
   exists(dir_temp, exists => {
      !exists && createDir(dir_temp);
   });
   readdir(dir_A, (err, files) => {
      if (err) {
         console.log(err);
         return;
      }
      moveFiles(dir_A, dir_temp, files);
      readdir(dir_B, (err, files) => {
         if (err) {
            console.log(err);
            return;
         }
         moveFiles(dir_B, dir_A, files);
         readdir(dir_temp, (err, files) => {
            if (err) {
               console.log(err);
               return;
            }
            moveFiles(dir_temp, dir_B, files);
            removeDir(dir_temp);
         });
      });
   });
}

function moveFiles (dirFrom, dirTo, filesToMove) {
   filesToMove.forEach(file => {
      rename(join(dirFrom, file), join(dirTo, file), err => {
         err && console.log(err);
      });
   });
}

function createDir (dir) {
   mkdir(dir, err => {
      err && console.log(err);
   });
}

function removeDir (dir) {
   rmdir(dir, err => {
      err && console.log(err);
   });
}

module.exports = toggleContent;
