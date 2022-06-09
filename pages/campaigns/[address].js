import getCampaign from "../../ethereum/getCampaign";
import web3 from "../../ethereum/web3";
import { Card, Grid, Message, Button } from "semantic-ui-react";
import ContributionForm from "../../components/ContributeForm";
import { useState } from "react";
import Link from "next/link";
import MessageFlash from "../../components/MessageFlash";

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = getCampaign(address);
  const details = await campaign.methods.getSummary().call();
  const campaignDetails = {
    address: address,
    description: details[0],
    minContribution: details[1],
    balance: details[2],
    requestsCount: details[3],
    approversCount: details[4],
    manager: details[5],
  };
  // Pass data to the page via props
  return { props: { campaignDetails } };
}

const Campaign = ({ campaignDetails }) => {
  const {
    address,
    description,
    minContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
  } = campaignDetails;
  const [successMessage, setSuccessMessage] = useState("");

  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of Manager of this Campaign",
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wi to become an approver.",
      },
      {
        header: requestsCount,
        meta: "Total number of requests",
        description:
          "A request tries to withdraw money from this campaign contract. Requests must be approved by approvers.",
      },
      {
        header: approversCount,
        meta: "Total number of approvers",
        description:
          "Number of people who have already donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];
    return <Card.Group items={items} />;
  };
  if (successMessage) {
    setTimeout(() => {
      setSuccessMessage("");
    }, 6000);
  }
  return (
    <div>
      <h3>Campaign Details</h3>
      <div className="camp-address">
        <b>Campaign Address: </b>
        {address}
      </div>
      <div className="camp-about">
        <b>About campaign: </b>
        {description}
      </div>
      <h3></h3>
      <MessageFlash color="green" header="Success!" msg={successMessage} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributionForm
              address={address}
              setSuccessMessage={setSuccessMessage}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link
              href={{
                pathname: "/campaigns/[slug]/requests",
                query: { slug: address },
              }}
            >
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Campaign;
