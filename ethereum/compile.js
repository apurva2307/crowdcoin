const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    campaign: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const result = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "campaign"
];
fs.ensureDirSync(buildPath);
fs.outputJSONSync(
  path.resolve(buildPath, "CampaignFactory.json"),
  result.CampaignFactory
);
fs.outputJSONSync(path.resolve(buildPath, "Campaign.json"), result.Campaign);
