const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'files-copy')


fs.rm(dir, { recursive: true, force: true }, (err) => {
    if (err) {
        console.log('err 1', err)
    } ;
  fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
            console.log('err 2', err)
        };
        fs.readdir(path.join(__dirname, 'files'), (err, data) => {
            data.forEach(file => {
                fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
                    if (err) {
                        console.log('err 3', err)
                    };
                });
            });
        })
    });

});
