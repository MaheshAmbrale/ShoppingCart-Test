import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "./Context";

const headers = () => {
  const { cart } = useContext(AppContext);
  const cartTotal = cart.reduce((accu, current) => accu + current.price, 0);

  const { pathname } = useLocation();

  const liElements = document.querySelectorAll("li");

  useEffect(() => {
    if (pathname === "/") {
      liElements[0]?.classList.add("isfocus");
    } else if (pathname === "/featuredProducts") {
      liElements[1]?.classList.add("isfocus");
    } else {
      liElements[2]?.classList.add("isfocus");
    }
  }, [liElements]);

  const selector = (e) => {
    liElements.forEach((items) =>
      items.textContent === e.target.textContent
        ? items.classList.add("isfocus")
        : items.classList.remove("isfocus")
    );
  };

  return (
    <ul className="nav">
      <li className="all--products" tabIndex={1} onClick={(e) => selector(e)}>
        <Link to="/">All Products</Link>
      </li>
      <li
        className="featured--products"
        tabIndex={2}
        onClick={(e) => selector(e)}
      >
        <Link to="/featuredProducts">Featured Products</Link>
      </li>
      <li className="cart" tabIndex={3} onClick={(e) => selector(e)}>
        <Link to="/cart">
          {`🛒 Total Items : ${cart?.length} `}&
          <span className="product--cost">{` Cost is: INR ${cartTotal}`}</span>
        </Link>
      </li>
    </ul>
  );
};

export default headers;
