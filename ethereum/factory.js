import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

export default new web3.eth.Contract(
  campaignFactory.abi,
  "0x6275156015949C2b2124a14Ffd57Ce6449d78883"
);
