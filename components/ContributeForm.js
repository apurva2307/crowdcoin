import { Form, Message, Button } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import getCampaign from "../ethereum/getCampaign";
import web3 from "../ethereum/web3";

const ContributionForm = ({ address, setSuccessMessage }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contributionAmt, setContributionAmt] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = getCampaign(address);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contributionAmt, "ether"),
      });
      setSuccessMessage("You have successfully contributed to this campaign.");
      router.replace(router.asPath);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <h3>Contribute to this Campaign</h3>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Contribution amount"
          placeholder="please enter amount in ether"
          value={contributionAmt}
          onChange={(e) => setContributionAmt(e.target.value)}
        />

        <Message error header="Oops.." content={errorMessage} />
        <Button primary loading={loading}>
          Contribute
        </Button>
      </Form>
    </>
  );
};

export default ContributionForm;
