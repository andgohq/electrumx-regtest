'use strict';

const AUTH = '-rpcuser=electrum -rpcpassword=electrum -conf=/home/bitcoin/bitcoin.conf';
const UPDATE_INTERVAL_SEC = 20;
const PORT_FAUCET = 3000;

const schedule = require('node-schedule');
const execSync = require('child_process').execSync;
const express = require('express');
var bodyParser = require('body-parser');
const app = new express();

function systemSync(cmd) {
  try {
    execSync(cmd, { timeout: 1000 });
    return { status: 200, message: 'ok' };
  } catch (error) {
    return { status: 500, message: error.stderr.toString() };
  }
}

schedule.scheduleJob(`*/${UPDATE_INTERVAL_SEC} * * * * *`, function() {
  systemSync(`bitcoin-cli -regtest ${AUTH} generate 1`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// faucet api
app.post('/faucet/:address', (req, res) => {
  const address = req.params.address;
  const amount = req.body.amount || 0;

  if (!amount) {
    res.status(500).send({ error: 'Wrong Amount', body: req.body });
    return;
  }

  if (!address) {
    res.status(500).send({ error: 'Wrong Address' });
  } else {
    console.log(`send ${amount} to ${address}`);

    const cmd = `sendmany "" '{"${address}":${amount}}'`;

    const result = systemSync(`bitcoin-cli -regtest ${AUTH} ${cmd}`);
    if (result.status === 200) {
      res.send({ message: result.message });
    } else {
      res.status(500).send({ error: result.message, body: req.body });
    }
  }
});


app.listen(PORT_FAUCET, () => {
    console.log('Faucet server up!');
});
