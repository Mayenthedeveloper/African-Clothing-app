import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ProductScreen from "./ProductScreen";
import AppContext from "../AppContext";

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
    <AppContext.Provider value={{ products: [] }}>
      <BrowserRouter>
        <ProductScreen match={name.match} />
      </BrowserRouter>
    </AppContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
