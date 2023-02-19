import React, { useContext, useState } from "react";
import { AppContext } from "./Context";

const sidebarFilters = () => {
  const {
    materials,
    colors,
    materialFilter,
    colorFilter,
    setColorFilter,
    setMaterialFilter,
  } = useContext(AppContext);

  const materialFIltersList = document.querySelectorAll(".material--filters");
  const colorsFIltersList = document.querySelectorAll(".color--filters");

  const modifyColorFilter = (selectedId, e) => {
    setColorFilter([selectedId]);

    colorsFIltersList.forEach((item) =>
      item.textContent === e.target.textContent
        ? item.classList.add("isfocus")
        : item.classList.remove("isfocus")
    );
  };
  const modifyMaterialFilter = (selectedId, e) => {
    setMaterialFilter([selectedId]);

    materialFIltersList.forEach((item) =>
      item.textContent === e.target.textContent
        ? item.classList.add("isfocus")
        : item.classList.remove("isfocus")
    );
  };

  const clearColorsflag = () => {
    setColorFilter(colors.map((item) => item.id));

    colorsFIltersList.forEach((item) => item.classList.remove("isfocus"));
  };
  const clearMaterialflag = () => {
    setMaterialFilter(materials.map((item) => item.id));

    materialFIltersList.forEach((item) => item.classList.remove("isfocus"));
  };

  return (
    <div className="sideBar">
      <div className="sidebar--title">Tags</div>
      <div className="filters--title">
        <span>Materials </span>{" "}
        {materialFilter?.length !== materials?.length ? (
          <span className="clear" onClick={() => clearMaterialflag()}>
            Clear
          </span>
        ) : null}
      </div>
      {materials.map((material, index) => (
        <div
          key={material.id}
          className="material--filters"
          tabIndex={index}
          onClick={(e) => modifyMaterialFilter(material.id, e)}
        >
          {material.name}
        </div>
      ))}
      <div className="filters--title">
        <span>Colors </span>{" "}
        {colorFilter?.length !== colors?.length ? (
          <span className="clear" onClick={() => clearColorsflag()}>
            Clear
          </span>
        ) : null}
      </div>

      {colors.map((color, index) => (
        <div
          key={color.id}
          className="color--filters"
          tabIndex={materials.length + index}
          onClick={(e) => modifyColorFilter(color.id, e)}
        >
          {color.name}
        </div>
      ))}
    </div>
  );
};

export default sidebarFilters;
