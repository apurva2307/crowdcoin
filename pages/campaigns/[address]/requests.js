import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MessageFlash from "../../../components/MessageFlash";
import getCampaign from "../../../ethereum/getCampaign";
import RequestRow from "../../../components/RequestRow";

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = getCampaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  // Pass data to the page via props
  return {
    props: { address, requests: JSON.stringify(requests), approversCount },
  };
}

const CampaignRequests = ({ address, requests, approversCount }) => {
  requests = JSON.parse(requests);
  const { Header, Row, HeaderCell, Body } = Table;
  const [msgFlash, setMsgFlash] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    setMsgFlash(router.query.msgFlash);
    const timer = setTimeout(() => {
      router.replace(`/campaigns/${address}/requests`, undefined, {
        shallow: true,
      });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [router.query.msgFlash]);
  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }
  if (successMessage) {
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }
  return (
    <>
      <h3> Requests</h3>
      {msgFlash && (
        <MessageFlash
          color="green"
          header="Success!"
          msg="Your request created successfully."
        />
      )}
      {errorMessage && (
        <MessageFlash color="red" header="Oops.." msg={errorMessage} />
      )}
      {successMessage && (
        <MessageFlash color="green" header="Success!" msg={successMessage} />
      )}
      <Link
        href={{
          pathname: "/campaigns/[slug]/requests/new",
          query: { slug: address },
        }}
      >
        <a>
          <Button floated="right" primary style={{ marginBottom: 15 }}>
            Create Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount (ether)</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Arrpoval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, index) => {
            return (
              <RequestRow
                key={index.toString()}
                request={request}
                address={address}
                id={index}
                approversCount={approversCount}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
              />
            );
          })}
        </Body>
      </Table>
    </>
  );
};

export default CampaignRequests;
