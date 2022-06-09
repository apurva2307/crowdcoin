import factory from "../ethereum/factory";
import getCampaign from "../ethereum/getCampaign";
import { Button, Card } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import web3 from "../ethereum/web3";
import MessageFlash from "../components/MessageFlash";

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  let campaignsList = [];
  for (let campaign of campaigns) {
    const item = await getCampDetails(campaign);
    campaignsList.push(item);
  }
  // Pass data to the page via props
  return { props: { campaignsList } };
}
const getCampDetails = async (address) => {
  let campaign = getCampaign(address);
  let details = await campaign.methods.getSummary().call();
  return {
    header: address,
    description: details["0"],
    meta: `Min. contribution ${details["1"]} wei (${web3.utils.fromWei(
      details["1"],
      "ether"
    )} ether)`,
    fluid: true,
    style: { margin: "10px 0" },
  };
};
const Home = ({ campaignsList }) => {
  const [items, setItems] = useState([]);
  const [msgFlash, setMsgFlash] = useState(false);
  const router = useRouter();
  const renderCampaigns = () => {
    const newitems = campaignsList.map((item) => {
      item.header = (
        <Link
          href={{
            pathname: "/campaigns/[slug]",
            query: { slug: item.header },
          }}
        >
          <a style={{ color: "inherit", fontSize: "20px" }}>{item.header}</a>
        </Link>
      );
      return item;
    });
    setItems(newitems);
  };
  useEffect(() => {
    renderCampaigns();
  }, [campaignsList]);
  useEffect(() => {
    setMsgFlash(router.query.msgFlash);
    const timer = setTimeout(() => {
      router.replace("/", undefined, {
        shallow: true,
      });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [router.query.msgFlash]);
  return (
    <div>
      <h3>Open Campaigns</h3>
      {msgFlash && (
        <MessageFlash
          color="green"
          header="Success!"
          msg="New campaign created successfully."
        />
      )}
      <Link href="/campaigns/new">
        <a>
          <Button
            content="Create Campaign"
            icon="add"
            primary
            floated="right"
            style={{ marginLeft: "10px" }}
          />
        </a>
      </Link>

      <Card.Group items={items} />
    </div>
  );
};

export default Home;
