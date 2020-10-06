import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";
import Head from "next/head";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Head>
        <title>Ticketing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appCtx) => {
  const client = buildClient(appCtx.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appCtx.Component.getInitialProps) {
    pageProps = await appCtx.Component.getInitialProps(appCtx.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
