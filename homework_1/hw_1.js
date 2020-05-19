const { join } = require('path');
const { mkdir, readdir, rename, rmdir, exists } = require('fs');


function toggleContent (dir_A, dir_B) {
   const dir_temp = join(__dirname, 'temp');
   exists(dir_temp, exists => {
      !exists && createDir(dir_temp);
   });
   readdir(dir_A, (err, files) => {
      err && console.log(`error while reading files from ${dir_A}` ,err);
      moveFiles(dir_A, dir_temp, files);
      readdir(dir_B, (err, files) => {
         err && console.log(`error while reading files from ${dir_B}` ,err);
         moveFiles(dir_B, dir_A, files);
         readdir(dir_temp, (err, files) => {
            err && console.log(`error while reading files from ${dir_temp}` ,err);
            moveFiles(dir_temp, dir_B, files);
            removeDir(dir_temp);
         });
      });
   });
}

function moveFiles (dirFrom, dirTo, filesToMove) {
   filesToMove.forEach(file => {
      rename(join(dirFrom, file), join(dirTo, file), err => {
         err && console.log(`error while moving file ${file} from ${dirFrom} to ${dirTo}`, err);
      });
   });
}

function createDir (dir) {
   mkdir(dir, err => {
      err && console.log(`error while creating ${dir}:`, err);
   });
}

function removeDir (dir) {
   rmdir(dir, err => {
      err && console.log(`error while removing ${dir}:`, err);
   });
}

module.exports = toggleContent;
