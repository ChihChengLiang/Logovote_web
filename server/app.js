const express = require('express');
const Web3 = require('web3');
const app = express();



const cors = require('cors')
app.use(cors())

// const expressWs = require('express-ws')(app);

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



const contract_address = "0x3Ab1d534Bb477f516817eFaAf0B569f419b8e292";
const logovote_abi = [{ "constant": true, "inputs": [], "name": "endBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "isAfterEnd", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLogos", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "logos", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_author", "type": "address" }, { "name": "_metadatUrl", "type": "string" }], "name": "registLogo", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "claimWinner", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "startBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getFunds", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "votePerETH", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_logoAddress", "type": "address" }], "name": "isLogo", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "vote", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "emergencyStop", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "sendToFaucet", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalReward", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "stopped", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "cleanBalance", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "release", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "isRespectTimeFrame", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_receiver", "type": "address" }], "name": "claimReward", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "faucet", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "winner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "ReceiveDonate", "type": "event" }]
  ;
const logo_abi = [{ "constant": false, "inputs": [], "name": "tips", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_metadataUrl", "type": "string" }], "name": "setMetadata", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "author", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "claimReward", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "metadataUrl", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "logoVote", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_author", "type": "address" }, { "name": "_metadatUrl", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "ReceiveTips", "type": "event" }];
const LogoVote = web3.eth.contract(logovote_abi).at(contract_address);

const token_address = "0x795a9bFa0B30b92eFE663cBfbEC1656b6378748E"
const token_abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "initialSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_address", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }]
const Token = web3.eth.contract(token_abi).at(token_address)

const logoAddresses = [
  '0xD82ce82FBe3fc5b0429De15617604A7c6A8E0B0f',
  '0x17DA2B4227bdfbF6c4dc39afea1E4F6e0af575B7',
  '0x7d10CD89b7506ddA58933e54e7774b71c28F2B53',
  '0xf010A1CF53BEe1b1eCa44F3FB6e36f1ac633Ad19',
  '0xa245D51B2683E8e13657a6C711FE23a011391700',
  '0x3503317F65b1cdA3d48009AB963Be13BB6960A38'
]


app.get('/blockNumber', (req, res) => {
  web3.eth.getBlockNumber((err, result) => {
    console.log(result)
    res.send(JSON.stringify({ blockNumber: result }))
  })
});

app.get('/votes', (req, res) => {
  Promise.all(
    logoAddresses.map(address => {
      return {
        address: address,
        vote: Token.balanceOf(address)
      }
    })
  ).then(obj => {
    addr_vote = {}
    for (let i = 0; i < obj.length; i++) {
      addr_vote[obj[i].address] = obj[i].vote.toNumber()
    }
    return addr_vote
  }).then(obj => {
    res.send(JSON.stringify(obj))
  })
})

app.listen(3000);