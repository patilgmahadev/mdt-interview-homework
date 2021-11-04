import React, { useState } from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";

import LoginApi from "../../common/Api/Login";

import "../../App.css";

export default function Login() {
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
    setFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    setBtnDisabled(true);
    event.preventDefault();
    console.log('login test');
    try {
        const resp = await LoginApi(fields);
        // TBD - set the expiry time in localStorage for 5 mins as new Date().getTime() + (5 * 60 * 1000)
        // Remove token if expires based on current time new Date().getTime()
        if (get(resp, "data.status", "") === "success") {
          localStorage.setItem("token", get(resp, "data.token", ""));
          setFields({
            username: "",
            password: "",
          })
          history.push("/dashboard");
        }
    }
    catch(e) {
        console.error('Error', e);
    }
    finally {
        setBtnDisabled(false);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={get(fields, "username", "")}
        onChange={handleChange}
        name="username"
        data-testid="Login-username"
        required
      />
      <div>
        <input
          type="password"
          placeholder="Password"
          value={get(fields, "password", "")}
          onChange={handleChange}
          name="password"
          data-testid="Login-password"
          required
        />
      </div>
      <div>
        <input type="submit" value="Login" disabled={btnDisabled} data-testid="Login-submit" />
      </div>
    </form>
  );
}
