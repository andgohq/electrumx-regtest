# Bitcoin Regtest with Electrum Server and Faucet API

* New blocks are mined automatically every 20 seconds
* Insight API: tls@55002
* Faucet API: http://localhost:3000/faucet/

# Requirement
* docker & docker-compose

# Usage

Following commands are enabled under the root dir of the project.

* build: `docker-compose build`
* start daemon: `docker-compose up -d`
* stop & remove daemon: `docker-compose down`
* list process: `docker-compose ps`
* login to the server: `docker-compose exec bitcoind bash`
* run command: `docker-compose exec bitcoind [command]`

# Electrum API example

after `$ npm install`, try `$ node rpctest.js`.

# Faucet API example

`curl -d "amount=10"  http://localhost:3000/faucet/mnJQyeDFmGjNoxyxKQC6MMFdpx77rYV3Bo`

# Other examples

```
$ docker exec --user bitcoin electrumx-regtest_bitcoind_1 bitcoin-cli -rpcuser=electrum -rpcpassword=electrum -regtest getmininginfo
```

```
$ docker exec -it --user bitcoin electrumx-regtest_bitcoind_1 bash
```
