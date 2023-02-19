import React, { useContext } from "react";
import { AppContext } from "./Context";
import SingleProduct from "./singleProduct";

const cart = () => {
  const { mappedProducts, cart } = useContext(AppContext);

  const distinctCartItems = [...new Set(cart?.map((item) => item.id))];

  const cartMappedProducts = mappedProducts?.filter((item) =>
    distinctCartItems?.includes(item.id)
  );

  return (
    <div>
      <div className="products--container">
        {cartMappedProducts
          ? cartMappedProducts?.map((product) => (
              <SingleProduct
                key={product?.id}
                id={product?.id}
                img={product?.image}
                title={product?.name}
                material={product?.material}
                cost={product?.price}
                count={cart?.filter((item) => item?.id === product?.id)?.length}
                colour={product?.colour}
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default cart;
