import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";
import AppContext from "../AppContext";
import config from "../config";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const context = useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setError(null);

    const products = props.product;

    const insertOrder = (e) => {
      e.preventDefault();
    };

    AuthApiService.postLogin({
      email,
      password,
    })
      .then(() => {
        setEmail("");
        setPassword("");
        context.setLoggedStatus(TokenService.hasAuthToken);
        if (TokenService.hasAuthToken()) {
          const { user_id } = TokenService.readJwtToken();

          var url = `${config.API_ENDPOINT}/cart/` + user_id;
          fetch(url, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          }).then((res) => {});
        }

        props.history.push({
          pathname: "/cart",
          state: "loggedin",
        });
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>

          <li>
            <label>Email</label>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              placeholder="Enter email"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Password</label>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              placeholder="Password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              SignIn
            </button>
          </li>
          <li>New to African Clothings</li>
          <li>
            <Link to="/register" className="button secondary">
              Create your account
            </Link>
          </li>
        </ul>

        <p>Demo email: maya@gmail.com</p>
        <p>Demo password: P@ssword1</p>
      </form>
    </div>
  );
}

export default SigninScreen;
