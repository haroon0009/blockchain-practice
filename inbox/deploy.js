const dotenv = require('dotenv');
dotenv.config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  process.env.MNEMONIC_CODE,
  process.env.DEPLOYMENT_URL
);
const web3 = new Web3(provider);

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log('ACCOUNTS', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there...!'] })
    .send({ gas: 1_000_000, from: accounts[0] });

  console.log('result', result.options.address);

  provider.engine.stop();
}

deploy();
