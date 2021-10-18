import { set } from "nprogress";
import React, { useEffect, useState } from "react";
import ProductsSlide from "../products-slide";
import "./products-slider.module.scss";

const ProductsSlider = ({ data }) => {
  const [draging, setDraging] = useState(false);
  useEffect(() => {
    const slider = document.querySelector(".items");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
      if (draging) {
        setDraging(false);
      }
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      setDraging(true);
    });
  });
  return (
    <main className="grid-item main">
      <div className="items">
        {data.map((item, idx) => {
          return (
            <div key={idx}>
              <ProductsSlide
                isDraging={draging}
                image={
                  item.node.image.mediaDetails
                    ? item.node.image.mediaDetails.sizes[4].sourceUrl
                    : item.node.image.mediaItemUrl
                }
                name={item.node.name}
                price={item.node.price}
                link={`/product/${item.node.slug}-${item.node.databaseId}`}
                lastItem={idx === data.length - 1 ? true : false}
                firstItem={idx === 0 ? true : false}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProductsSlider;
