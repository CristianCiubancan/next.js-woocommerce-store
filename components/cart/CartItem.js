import React, { useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { getUpdatedItems } from "../../utils/functions";
import { isEmpty } from "lodash";
import "./cart-item.module.scss";

function CartItem({
  networkStatus,
  item,
  products,
  updateCartProcessing,
  handleRemoveProductClick,
  updateCart,
}) {
  const [productCount, setProductCount] = useState(item.qty);

  const handleQtyChange = (event, cartKey, type) => {
    if (process.browser) {
      event.stopPropagation();
      let newQty;

      // If the previous update cart mutation request is still processing, then return.
      if (
        updateCartProcessing ||
        ("decrement" === type && 1 === productCount)
      ) {
        return;
      }

      if (!isEmpty(type)) {
        newQty = "increment" === type ? productCount + 1 : productCount - 1;
      } else {
        // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
        newQty = event.target.value ? parseInt(event.target.value) : 1;
      }

      // Set the new qty in state.
      setProductCount(newQty);

      if (products.length) {
        const updatedItems = getUpdatedItems(products, newQty, cartKey);

        updateCart({
          variables: {
            input: {
              clientMutationId: v4(),
              items: updatedItems,
            },
          },
        });
      }
    }
  };

  return (
    <div className="cart-item-container">
      <figure className="cart-item-image">
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
      <div className="cart-item-info-cotnainer">
        <h2 className="cart-product-title">
          {item.variation !== null
            ? item.variation.length > 25
              ? item.variation.substring(0, 20)
              : item.variation
            : item.name.length > 25
            ? `${item.name.substring(0, 20)}...`
            : item.name}
        </h2>
        <span className="cart-product-price">{item.price}lei</span>
        <button
          className="qty-button cart-remove-item"
          onClick={(event) =>
            handleRemoveProductClick(event, item.cartKey, products)
          }
        >
          x
        </button>
        <div className="cart-item-buttons">
          <button
            className="qty-button qty-button-plus"
            onClick={(event) =>
              handleQtyChange(event, item.cartKey, "decrement")
            }
          >
            -
          </button>
          <input
            type="number"
            min="1"
            className="cart-item-qty-input"
            value={productCount}
            onChange={(event) => handleQtyChange(event, item.cartKey, "")}
          />
          <button
            className="qty-button qty-button-plus"
            onClick={(event) =>
              handleQtyChange(event, item.cartKey, "increment")
            }
          >
            +
          </button>
          {updateCartProcessing || networkStatus === 4 ? (
            <img
              height="25"
              height="25"
              className="spinner-icon"
              src={require("../../public/cart-spinner.gif")}
              alt="Menu"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
