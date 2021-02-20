import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import TokenService from "../services/token-service";
import config from "../config";

function CartScreen(props) {
  const [userLoginStatus, setStatus] = useState("Place Order");

  const context = useContext(AppContext);
  var el = document.getElementById("hero");
  if (el != null) {
    el.classList.add("hide");
    el.style.minHeight = 0;
    document.getElementById("shopNowBtn").classList.add("dontShow");
    document.getElementById("checkOutHeading").classList.add("dontShow");
    document.getElementById("introText").classList.add("dontShow");
    document.getElementById("heroImage").classList.add("dontShow");
  }

  const [total, setTotal] = useState(0);

  const cartTotal = () => {
    let tot = 0;

    if (context.cart.length > 0) {
      context.cart.map((item) => {
        tot += parseFloat(item.price);
      });
    }
    return tot;
  };

  const removeItem = (product_id) => {
    if (TokenService.hasAuthToken()) {
      const { user_id } = TokenService.readJwtToken();

      fetch(`${config.API_ENDPOINT}/cart/${user_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ product_id }),
      }).then(() => {
        context.removeFromCart(product_id);
      });
    }
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <h3>Shopping Cart</h3>

        <table id="cartTable">
          <tbody>
            {context.cart.length > 0 ? (
              context.cart.map((item, i) => (
                <tr id={"pro" + item.id} key={i}>
                  <td>
                    <img
                      className="cart-image"
                      src={item.image}
                      alt="product"
                    />
                  </td>
                  <td>
                    <Link to={"/product/" + item.product_id}>{item.name}</Link>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="button"
                      onClick={(e) => removeItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="cart-price">${item.price}</td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>

        <div>
          <h3>Total : ${cartTotal()}</h3>
          {context.loggedStatus ? (
            <Link to="/orderConfirmation" product={context.cart}>
              <button> Finish Placing Order </button>
            </Link>
          ) : (
            <Link to="/signin" product={context.cart}>
              <button> Place Order </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
