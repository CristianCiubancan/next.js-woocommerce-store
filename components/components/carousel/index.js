import React, { useState } from "react";
import Image from "next/image";
import "./carousel.module.scss";

const Carousel = ({ images }) => {
  const [imagesArray] = useState(images);
  const [x, setX] = useState(0);
  const goLeft = () => {
    x === 0 ? setX(-100 * (images.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    x === -100 * (images.length - 1) ? setX(0) : setX(x - 100);
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-buttons">
        <button className="carousel-button" id="goLeft" onClick={goLeft}>
          {"<"}
        </button>
        <button className="carousel-button" id="goRight" onClick={goRight}>
          {">"}
        </button>
      </div>
      <div className="slider">
        {imagesArray.map((image, idx) => {
          return (
            <div
              className="slide"
              key={idx}
              style={{ transform: `translateX(${x}%)` }}
            >
              <Image
                src={
                  image.mediaDetails === null
                    ? image.mediaItemUrl
                    : image.mediaDetails.sizes[7].sourceUrl
                }
                width={600}
                height={600}
                priority={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
