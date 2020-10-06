import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
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
