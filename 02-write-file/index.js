const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
  stdout.write('Hey! We have created a file for recording. You can write something and we will save the line to a file!');

  rl.on('line', (input) => {
    if(input.toString() === 'exit'){
      console.log('Are you leaving? Bye!');
      rl.close();
    } else{
       fs.appendFile(path.join(__dirname, 'text.txt'), `${input}\n`, (err) => {
        if(err) throw err;
        console.log(`We saved your line  ${input} to a file`);
      });
    }
  });

  rl.on('SIGINT', () => {
    console.log('Are you leaving? Bye!');
    rl.close();
  });
});

