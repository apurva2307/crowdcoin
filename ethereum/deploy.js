require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const campaignFactory = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.ACCOUNT_PHRASES,
  process.env.RINKBEY_ENDPOINT
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account: ", accounts[0]);
  const campaignF = await new web3.eth.Contract(campaignFactory.abi)
    .deploy({ data: campaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });
  console.log("Deployed at: ", campaignF.options.address);
  provider.engine.stop();
};
// deploy();

const deployed = async () => {
  const campaignF = await new web3.eth.Contract(
    campaignFactory.abi,
    "0x6275156015949C2b2124a14Ffd57Ce6449d78883"
  );
  const accounts = await web3.eth.getAccounts();
  const campaign = await campaignF.methods
    .createCampaign("1000", "to develop new blockchain")
    .send({ from: accounts[0], gas: "10000000" });
  console.log(await campaignF.methods.getDeployedCampaigns().call());
  provider.engine.stop();
};
deployed();
