import { useState } from "react";
import Router from "next/router";
import { useCustomRequestHook } from "../hooks/useRequest";

export const signIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useCustomRequestHook({
    url: "/api/users/signIn",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmitSignUp = async (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmitSignUp}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <br />
      {errors}
      <button className="btn btn-primary"> Sign In</button>
    </form>
  );
};

export default signIn;
