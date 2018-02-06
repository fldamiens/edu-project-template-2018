const child_process = require('child_process');
const path = require('path');
const sys = require("util");
const fs = require('fs-extra');

const port = 4598;
const pathData = path.join(__dirname, 'server/data');
fs.mkdir(pathData);

const server = child_process.spawn(
    'node',
    [ path.join(__dirname, '../src/server/index.js')],
    {
      env: {PORT: port, DATA: pathData, PATH: process.env.PATH},
      stdio: 'inherit'
    }
);

setTimeout(function() {
    const test = child_process.spawn(
      'node',
      [
        path.join(__dirname, '../node_modules/.bin/jest'),
        '--verbose',
        path.join(__dirname, 'server', 'api_spec.js')
      ],
      {
        env: {
          SERVER_PORT: port,
          PATH: process.env.PATH,
          FORCE_COLOR: true,
          DATA: pathData,
        },
        stdio: 'inherit'
      }
    );

    test.on('close', function(code) {
        console.log('Close Server');
        fs.remove(pathData,function(err){
          if(err)
            console.log(err);
          else
            console.log("Directory has been deleted");
        })
        server.kill();
    });

}, 500);
