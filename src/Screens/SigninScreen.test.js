import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Signin from "./SigninScreen";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Signin />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
