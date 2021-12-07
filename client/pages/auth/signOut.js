import { useEffect } from "react";
import Router from "next/router";
import useCustomRequestHook from "../hooks/useRequest";

export default () => {
  const { doRequest } = useCustomRequestHook({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};
