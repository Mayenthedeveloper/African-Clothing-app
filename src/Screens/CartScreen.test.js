import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CartScreen from "./CartScreen";
import AppContext from "../AppContext";

it("renders without crashing", () => {
  const div = document.createElement("div");

  window.HTMLCanvasElement.prototype.getContext = () => {};

  ReactDOM.render(
    <AppContext.Provider value={{ cart: [] }}>
      <BrowserRouter>
        <CartScreen />
      </BrowserRouter>
    </AppContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
