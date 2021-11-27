const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const writeFile = fileContent => {
    return new Promise((resolve, reject) =>{
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the error to the Promises's `.catch()` method
            if (err){
                reject(err);
                // return out of the function here to make sure the Promise doen't accidentally execute the resolve() function as well
                return;
            }
            // if everything went well, resolve the Promise and send teh successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve,reject) =>{
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File copied!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };