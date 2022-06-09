const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compiledCampaign = require("../ethereum/build/Campaign.json");
const campaignFactory = require("../ethereum/build/CampaignFactory.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // console.log(await web3.eth.getBalance(accounts[0]));
  // console.log(await web3.eth.getBlock("latest"));
  factory = await new web3.eth.Contract(campaignFactory.abi)
    .deploy({ data: campaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });
  await factory.methods
    .createCampaign("1000", "to develop new blockchain")
    .send({ from: accounts[0], gas: "10000000" });
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Testing campaign factory Contract", () => {
  it("deploys a contract", async () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
    assert.equal(
      "to develop new blockchain",
      await campaign.methods.description().call()
    );
  });
  it("marks caller as manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });
  it("allows contribution and marks sender as approver", async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: "2000",
    });
    const approver = await campaign.methods.approvers(accounts[1]).call();
    assert(approver);
  });
  it("requires minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: "500",
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });
  it("manager can create request", async () => {
    await campaign.methods
      .createRequest("to develop hositng", "100", accounts[2])
      .send({
        from: accounts[0],
        gas: "10000000",
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, "to develop hositng");
  });
});
