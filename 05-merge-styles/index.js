const fs = require('fs');
const path = require('path');
//создаем новый пустой файл со стилями
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;
});

//
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, data) => {
    if (err) throw err;
    data.forEach(elem => {
        fs.stat(path.join(path.join(__dirname, 'styles'), elem.name), (err, stats) => {
            if (err) throw err;
            const  type = path.extname(elem.name);
            if(type === '.css' && elem.isFile()){
                const stream = fs.createReadStream(path.join(__dirname, 'styles', elem.name));
                let data = '';
                stream.on('data', chunk => data += chunk);
                stream.on('end',   () => {
                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
                        if (err) throw err;
                    });
                });
            }
        });
    })
});