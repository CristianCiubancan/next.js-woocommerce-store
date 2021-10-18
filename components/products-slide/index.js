import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./products-slide.module.scss";

const ProductsSlide = ({
  image,
  name,
  price,
  link,
  isDraging,
  lastItem,
  firstItem,
}) => {
  let isLastItem;
  let isFirstItem;
  if (lastItem) {
    isLastItem = "last-item";
  } else if (firstItem) {
    isFirstItem = "first-item";
  }
  return (
    <div>
      {!isDraging ? (
        <Link href={link}>
          <div className={`item ${isLastItem} ${isFirstItem}`}>
            <div
              className="item-image"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="item-footer">
              <div className="item-name">{name}</div>
              <p>{price}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className={`item ${isLastItem} ${isFirstItem}`}>
          <div
            className="item-image"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="item-footer">
            <div className="item-name">{name}</div>
            <p>{price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSlide;
