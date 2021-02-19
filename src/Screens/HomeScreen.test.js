import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HomeScreen from "./HomeScreen";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const name = {
    match: {
      params: {
        id: 0,
      },
    },
  };
  ReactDOM.render(
    <BrowserRouter>
      <HomeScreen match={name.match} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
