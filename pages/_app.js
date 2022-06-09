import "semantic-ui-css/semantic.min.css";
import "../style/global.css";
import Head from "next/head";
import Header from "../components/Header";
import { Container } from "semantic-ui-react";

function MyApp({ Component, pageProps }) {
  return (
    <Container style={{ position: "relative" }}>
      <Head>
        <meta
          name="description"
          content="CrowdCoin to source crowd funding for your startup project"
        />
        <title>CrowdCoin</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
