import buildClient from "../api/build-client";

const Index = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are logged out</h1>;
};

Index.getInitialProps = async ( ctx ) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default Index;
