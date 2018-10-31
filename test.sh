#!/bin/bash

echo TEST1
curl -d "amount=10"  http://localhost:3001/faucet/mnJQyeDFmGjNoxyxKQC6MMFdpx77rYV3Bo
echo

echo TEST2
node rpctest.js
echo

