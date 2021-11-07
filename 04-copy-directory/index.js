const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'files-copy')

fs.rm(dir, { recursive: true}, (err) => {
  if (err) throw err;
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'files'), (err, data) => {
      data.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) =>{
          if (err) throw err;
        });
      });
    })
  });
});



