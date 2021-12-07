import buildClient from "../api/build-client";
import { GetServerSideProps } from "next";

const LandingPage = ({ currentUser, locales }) => {
  console.log("I am in component.", currentUser, locales);
  return currentUser ? (
    <h1>You're signed in.</h1>
  ) : (
    <h1>You are not signed in.</h1>
  );
};

const doR = async () => {
  const response = await axios
    .get("/api/users/currentUser", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .catch((err) => console.log("Failed to get current user", err));
  console.log(response.data, "<<<");
};
/**
 * Fetch data from next.js during server side rendering process.
 * This fn will be executed on the server
 * Cannot do data loading inside component.
 * All of our components are executed or rendered just one single time so we can not attempt to make a http request
 * and then wait for response and then possibly try to update some state.
 * Instead, each of our components during server side rendering are just rendered once and we take the result and
 * that's it. This is what is sent back to the user.
 * Once the app shows up on the browser getInitialProps doesn't get used anymore.Then it will rely on component's
 * implementaion.
 * Any data that is returned from this fn will show up inside the component.
 * This fn is used for getting the data specifically needed for some initial rendering.
 */
// LandingPage.getInitialProps = async () => {
//   console.log("I am on server. I run only on server and not browser.");
//   if (typeof window === "undefined") {
//     // i.e we are on server, so add ingress-nginx-controller path
//     const response = await axios
//       .get(
//         // reach out ingress-nginx controller/load balancer to forward the request to auth pod/container
//         `http://ingress-nginx-controller.ingress-nginx.svc.local/api/users/currentUser`,
//         {
//           headers: req.headers,
//         }
//       )
//       .catch((err) => console.log("Failed to get current user", err));
//     return response.data;
//   } else {
//     // i.e we're browser, rely on the browser to add current domain as base url
//     const response = await axios
//       .get(`/api/users/currentUser`)
//       .catch((err) => console.log("Failed to get current user", err));
//     return response.data;
//   }
//   // const response = await axios
//   //   .get(
//   //     // reach out ingress-nginx controller/load balancer to forward the request to auth pod/container
//   //     `${url}/api/users/currentUser`,
//   //     {
//   //       headers: {
//   //         // if host is not provided when executing on server, the ingress controller will see its own base url
//   //         // as it is a forwarded request. Also the host needs to defined for ingress-service in ingress-srv.yaml
//   //         Host: "ticketing.com",
//   //       },
//   //     }
//   //   )
//   //   .catch((err) => console.log("Failed to get current user", err));
//   // return response?.data;
// };

export const getServerSideProps = async (context) => {
  console.log(
    "I am on server. I run only on server and not browser.",
    "[index.js]"
  );
  const response = await buildClient(context).get("/api/users/currentUser");
  return {
    props: {
      currentUser: response.data.currentUser,
      locales: response.data.locales,
    },
  };
};

export default LandingPage;
