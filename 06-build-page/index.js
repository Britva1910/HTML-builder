const fs = require('fs');
const path = require('path');
const {log} = require('util');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if (err) throw err;
    });
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data)=> {
    if (err) throw err;
    let newHtml = data;
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, data) => {
        if (err) throw err;
        data.forEach(elem => {
            fs.stat(path.join(path.join(__dirname, 'components'), elem.name), (err, stats) => {
                if (err) throw err;
                const type = path.extname(elem.name);
                if (type === '.html' && elem.isFile()) {
                    fs.readFile(path.join(__dirname, 'components', elem.name), "utf8", (err, data) => {
                        if (err) throw err;
                        let tag = elem.name.split(".")[0];
                        newHtml = newHtml.replace(new RegExp(`{{${tag}}}`), data);
                        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), newHtml, (err) => {
                            if (err) throw err;
                        });
                    });
                };
            });
        });
    });
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
                    fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${data} \n`, (err) => {
                        if (err) throw err;
                    });
                });
            }
        });
    })
});

const dir = path.join(__dirname, 'assets');
const copy = path.join(__dirname, 'project-dist', 'assets');

const copyFilesAndFolders = (dir, copy) => {
    fs.readdir(path.join(dir), { withFileTypes: true }, (err, data) => {
        if (err) throw err;
        data.forEach(file => {
            if (file.isDirectory()){
                fs.mkdir(path.join(copy, `${file.name}`), { recursive: true }, (err) => {
                    if (err) throw err;
                });
                copyFilesAndFolders(dir + `/${file.name}`, copy + `/${file.name}`);
            } else {
                fs.copyFile(path.join(dir, `/${file.name}`), path.join(copy, `/${file.name}`), (err) =>{
                    if (err) throw err;
                });
            }
        });
    });
};

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
    copyFilesAndFolders(dir, copy);
});

