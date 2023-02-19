import React, { useContext } from "react";
import { AppContext } from "./Context";
import SingleProduct from "./singleProduct";

const allProducts = () => {
  const { mappedProducts } = useContext(AppContext);

  return (
    <div className="products--container">
      {mappedProducts
        ? mappedProducts?.map((product) => (
            <SingleProduct
              key={product.id}
              id={product.id}
              img={product.image}
              title={product.name}
              material={product.material}
              cost={product.price}
              colour={product.colour}
            />
          ))
        : "Loading..."}
    </div>
  );
};

export default allProducts;
