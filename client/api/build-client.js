import axios from "axios";

axios.defaults.withCredentials = true;

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // i.e we're on server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // i.e we're on browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
