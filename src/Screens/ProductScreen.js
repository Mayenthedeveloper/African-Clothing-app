import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import config from "../config";
import TokenService from "../services/token-service";

function ProductScreen(props) {
  const context = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  const { id } = props.match.params;
  const product = context.products.length
    ? context.products.find((product) => product.id === parseInt(id))
    : {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (TokenService.hasAuthToken()) {
      const { user_id } = TokenService.readJwtToken();
      fetch(`${config.API_ENDPOINT}/cart`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user_id, product_id: parseInt(id) }),
      }).then(() => {
        fetch(`${config.API_ENDPOINT}/cart/${user_id}`)
          .then((res) => res.json())
          .then((cart) => context.setCart(cart));
      });
    } else {
      props.history.push({
        pathname: "/signin",
      });
    }
  };

  const setQty = (quantity) => {
    setQuantity(quantity);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {!!Object.keys(product).length && (
        <div className="details">
          <div className="detail-image">
            <img src={product.image} alt="product"></img>
          </div>
          <div className="detail-info">
            <ul className="form-detail">
              <h4>{product.name}</h4>

              <li>{product.brand}</li>
              <li>{product.size}</li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>

          <div className="details-action">
            <form onSubmit={handleSubmit}>
              <ul className="form-container">
                <li>Price:${product.price}</li>

                <li>
                  <button className="button" type="submit">
                    Add to cart
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
