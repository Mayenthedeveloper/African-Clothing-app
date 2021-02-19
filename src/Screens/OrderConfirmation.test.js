import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";
import AppContext from "../AppContext";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AppContext.Provider value={{ cart: [] }}>
      <BrowserRouter>
        <OrderConfirmation />
      </BrowserRouter>
    </AppContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
