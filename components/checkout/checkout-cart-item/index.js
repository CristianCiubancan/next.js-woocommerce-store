import React from "react";
import Image from "next/image";
import "./checkout-cart-item.styles.scss";

const CheckoutCartItem = ({ item }) => {
  return (
    <tr className="woo-next-cart-item" key={item.variationId}>
      <td className="woo-next-cart-element">
        <figure className="checkout-item-image">
          <Image
            alt={item.image.title}
            src={
              item.mediaDetails
                ? item.mediaDetails.sizes[5]
                : item.image.sourceUrl
            }
            width={300}
            height={300}
          />
        </figure>
      </td>
      <td className="woo-next-cart-element">
        {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
      </td>
      <td className="woo-next-cart-element">{item.totalPrice}</td>
    </tr>
  );
};

export default CheckoutCartItem;
