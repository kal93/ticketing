import { useState } from "react";
import Router from "next/router";
import { useCustomRequestHook } from "../hooks/useRequest";

export const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useCustomRequestHook({
    url: "/api/users/signUp",
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
      <h1>Sign up</h1>
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
      <button className="btn btn-primary"> Sign Up</button>
    </form>
  );
};

export default signUp;