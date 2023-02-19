import { createContext, useContext, useEffect, useState } from "react";
import { APIS } from "../utilities/ApiConstants";
import { ApiCall } from "./apiCall";

export const AppContext = createContext();

const Context = ({ children }) => {
  const stringifiedCart = localStorage.getItem("CartData");
  const parsedCart = JSON.parse(stringifiedCart);

  const [cart, setCart] = useState(parsedCart || []);
  const [allProducts, setAllProducts] = useState();
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [featuredProducts, setfeaturedProducts] = useState();
  const [colorFilter, setColorFilter] = useState();
  const [materialFilter, setMaterialFilter] = useState();

  useEffect(() => {
    ApiCall(APIS.PRODUCTS)
      .then((response) => setAllProducts(response.products))
      .catch((error) => console.error(error));
    ApiCall(APIS.FEATURED_PRODUCTS)
      .then((response) => setfeaturedProducts(response.featured))
      .catch((error) => console.error(error));
    ApiCall(APIS.MATERIAL)
      .then((response) => {
        setMaterials(response.material);
        setMaterialFilter(response.material.map((item) => item.id));
      })
      .catch((error) => console.error(error));
    ApiCall(APIS.COLOURS)
      .then((response) => {
        setColors(response.colors);
        setColorFilter(response.colors.map((item) => item.id));
      })
      .catch((error) => console.error(error));
  }, []);

  const mappedProducts = allProducts
    ?.map((product) => {
      product.material = materials
        ?.filter((materialItem) => materialItem?.id === product?.materialId)
        ?.at(0)?.name;
      product.colour = colors
        ?.filter((colorItem) => colorItem?.id === product?.colorId)
        ?.at(0)?.name;
      return product;
    })
    .filter(
      (item) =>
        materialFilter?.includes(item.materialId) &&
        colorFilter?.includes(item.colorId)
    );

  const featuredProductIds = featuredProducts?.map((item) => item.productId);

  const mappedFeaturedProducts = mappedProducts?.filter((item) =>
    featuredProductIds?.includes(item.id)
  );

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        allProducts,
        featuredProducts,
        colors,
        materials,
        materialFilter,
        colorFilter,
        mappedProducts,
        mappedFeaturedProducts,
        setColorFilter,
        setMaterialFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const CartState = () => {
  return useContext(AppContext);
};

export default Context;
