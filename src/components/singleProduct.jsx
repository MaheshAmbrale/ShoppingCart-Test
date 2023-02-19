import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import altImg from "../assets/300x400.png";
import { AppContext } from "./Context";
const singleProduct = ({ id, img, title, colour, material, cost, count }) => {
  const { mappedProducts, setCart } = useContext(AppContext);

  const addToCart = (id) => {
    setCart((prev) => {
      const newCart = [
        ...prev,
        ...mappedProducts.filter((item) => item.id === id),
      ];
      localStorage.setItem("CartData", JSON.stringify(newCart));
      return newCart;
    });
  };
  return (
    <div className="single--product--container">
      <div className="product--image">
        <LazyLoadImage
          src={img}
          height={400}
          width={300}
          effect="blur"
          alt="Image Is Not Available"
          placeholderSrc={altImg}
          onClick={() => addToCart(id)}
        />
        <div className="product--image--hover" onClick={() => addToCart(id)}>
          Add To Cart
        </div>
      </div>
      <div className="product--title">{title || "Title not Available"}</div>
      <span className="product--color">
        {colour ? colour?.toUpperCase() : "Color Not Found"}
      </span>
      <span className="product--material">
        {material ? material?.toUpperCase() : "Material Not Found"}
      </span>
      <div className="product--cost">
        {cost ? `INR  ${cost}.00` : "Cost not Found"}
      </div>
      <div>{count ? `Count : ${count}` : null}</div>
    </div>
  );
};

export default singleProduct;
