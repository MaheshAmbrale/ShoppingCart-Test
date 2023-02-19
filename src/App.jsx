import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/cart";
import Headers from "./components/headers";
import SideBarFilters from "./components/sidebarFilters";
import AllProducts from "./components/allProducts";
import FeaturedProducts from "./components/featuredProducts";
import "./App.css";

const App = () => {
  return (
    <div className="main--component">
      <div className="top">
        <div className="title">MYCOOLSHOP.COM</div>
        <Headers />
      </div>
      <div className="top--hidden"></div>

      <SideBarFilters />

      <Routes>
        <Route exact path="/" element={<AllProducts />} />

        <Route exact path="/featuredProducts" element={<FeaturedProducts />} />

        <Route exact path="/cart" element={<Cart />} />
      </Routes>
      {/* </div> */}
    </div>
  );
};

export default App;
