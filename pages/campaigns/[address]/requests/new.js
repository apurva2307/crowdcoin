import Link from "next/link";
import { Button, Form, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState } from "react";
import web3 from "../../../../ethereum/web3";
import getCampaign from "../../../../ethereum/getCampaign";
import MessageFlash from "../../../../components/MessageFlash";

const NewCampaignRequest = () => {
  const router = useRouter();
  const { address } = router.query;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = getCampaign(address);
      await campaign.methods
        .createRequest(desc, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      router.push({
        pathname: "/campaigns/[pid]/requests",
        query: { pid: address, msgFlash: true },
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Link
        href={{
          pathname: "/campaigns/[slug]/requests",
          query: { slug: address },
        }}
      >
        <a>Back</a>
      </Link>
      <h3> Create a Request</h3>

      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Description of new request"
          placeholder="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Form.Input
          fluid
          label="Amount to be withdrawn from campaign balance"
          placeholder="please enter amount in ether"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Form.Input
          fluid
          label="Recipient address"
          placeholder="please enter address of the recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Message error header="Oops.." content={errorMessage} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </>
  );
};

export default NewCampaignRequest;
