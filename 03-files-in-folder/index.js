const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'secret-folder');

fs.readdir(directory, {withFileTypes: true}, function(err, items) {
   items.forEach(elem => {
    if(elem.isFile()){
      fs.stat(path.join(directory, elem.name), (err, stats) => {
        if (err) throw err;
        const name =  path.parse(elem.name).name;
        const  type = path.extname(elem.name);
        const size =  stats.size;
        console.log(`${name} - ${type.slice(1)} - ${size}b`);
      });
      };
    });
  });


