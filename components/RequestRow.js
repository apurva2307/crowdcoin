import { Table, Button } from "semantic-ui-react";
import getCampaign from "../ethereum/getCampaign";
import web3 from "../ethereum/web3";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const RequestRow = ({
  request,
  address,
  id,
  approversCount,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const { Row, Cell } = Table;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [floading, setFloading] = useState(false);
  const [account, setAccount] = useState("");

  const approve = async () => {
    setLoading(true);
    try {
      const campaign = getCampaign(address);
      await campaign.methods.approveRequest(id).send({ from: account });
      router.replace(router.asPath);
      setSuccessMessage("You have successfully approved the request.");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };
  const finalize = async () => {
    setFloading(true);
    try {
      const campaign = getCampaign(address);
      await campaign.methods.finalizeRequest(id).send({ from: account });
      router.replace(router.asPath);
      setSuccessMessage("You have successfully finalized the request.");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setFloading(false);
  };
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getAccount();
  }, []);

  return (
    <Row
      disabled={request.complete}
      positive={request.votingCount > approversCount / 2 && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.votingCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? (
          ""
        ) : (
          <Button loading={loading} color="green" basic onClick={approve}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? (
          ""
        ) : (
          <Button loading={floading} color="teal" basic onClick={finalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
