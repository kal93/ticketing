import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (context) => {
  console.log(context);
  console.log("Inside getInitialProps for _app.js");
  const response = await buildClient(context.ctx).get("/api/users/currentUser");
  let pageProps = {};
  if (context.Component.getServerSideProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }
  console.log(response, "<<<<< from _app.js");
  console.log(pageProps, "<< page props", "[_app.js]");
  return {
    pageProps,
    currentUser: response.data.currentUser,
    locales: response.data.locales,
  };
};
export default AppComponent;
