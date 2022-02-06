const { spawn } = require('child_process');
const net = require('net');
const port = process.env.PORT ? process.env.PORT - 100 : 3000;
require('./../server/index.js');

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const mySpawn = spawn('yarn', ['electron'], { shell: true });
      mySpawn.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      mySpawn.on('close', (code) => {
        console.log('Child process was killed...');
        console.log('Respawning electron...');
        startedElectron = false;
        tryConnection();
      });
    }
  });

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});
