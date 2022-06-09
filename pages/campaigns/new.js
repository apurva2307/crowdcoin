import { Form, Message, Button } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const NewCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [desc, setDesc] = useState("");
  const [minAmt, setMinAmt] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minAmt, desc)
        .send({ from: accounts[0] });
      router.push({
        pathname: "/",
        query: { msgFlash: true },
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <h3>Create a Campaign</h3>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Description of Campaign"
          placeholder="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Form.Input
          fluid
          label="Minimum contribution"
          placeholder="please enter amount in wei"
          value={minAmt}
          onChange={(e) => setMinAmt(e.target.value)}
        />
        {minAmt && <p className="ether">{web3.utils.fromWei(minAmt)} ether</p>}
        <Message error header="Oops.." content={errorMessage} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </>
  );
};

export default NewCampaign;
