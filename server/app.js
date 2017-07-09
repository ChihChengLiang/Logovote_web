const express = require('express');
const Web3 = require('web3');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


const contract_address = "0x3Ab1d534Bb477f516817eFaAf0B569f419b8e292";
const logovote_abi = [{ "constant": true, "inputs": [], "name": "endBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "isAfterEnd", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLogos", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "logos", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_author", "type": "address" }, { "name": "_metadatUrl", "type": "string" }], "name": "registLogo", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "claimWinner", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "startBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getFunds", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "votePerETH", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_logoAddress", "type": "address" }], "name": "isLogo", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "vote", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "emergencyStop", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "sendToFaucet", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalReward", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "stopped", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "cleanBalance", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "release", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "isRespectTimeFrame", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_receiver", "type": "address" }], "name": "claimReward", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "faucet", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "winner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "ReceiveDonate", "type": "event" }]
  ;
const logo_abi = [{ "constant": false, "inputs": [], "name": "tips", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_metadataUrl", "type": "string" }], "name": "setMetadata", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "author", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "claimReward", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "metadataUrl", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "logoVote", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_author", "type": "address" }, { "name": "_metadatUrl", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "ReceiveTips", "type": "event" }];
const LogoVote = web3.eth.contract(logovote_abi).at(contract_address);
const logoAddresses = [
  '0xD82ce82FBe3fc5b0429De15617604A7c6A8E0B0f',
  '0x17DA2B4227bdfbF6c4dc39afea1E4F6e0af575B7',
  '0x7d10CD89b7506ddA58933e54e7774b71c28F2B53',
  '0xf010A1CF53BEe1b1eCa44F3FB6e36f1ac633Ad19',
  '0xa245D51B2683E8e13657a6C711FE23a011391700',
  '0x3503317F65b1cdA3d48009AB963Be13BB6960A38'
]

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  web3.eth.getBlockNumber((error, result) => {
    ws.send(JSON.stringify({ blockNumber: result }))
  });
  
});

server.listen(3000, function listening() {
  console.log('Listening on %d', server.address().port);
});