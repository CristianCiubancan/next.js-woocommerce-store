import Link from "next/link";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getFormattedCart, getUpdatedItems } from "../../utils/functions";
import CartItem from "./CartItem";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../../graphql/mutations/update-cart";
import GET_CART from "../../graphql/queries/get-cart";
import CLEAR_CART_MUTATION from "../../graphql/mutations/clear-cart";
import "./cart-items-container.module.scss";

const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch, networkStatus } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART', data );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

  // Update Cart Mutation.
  const [clearCart, { loading: clearCartProcessing }] = useMutation(
    CLEAR_CART_MUTATION,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
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
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  return (
    <div className="cart-items-container-wrapper">
      {cart ? (
        <div className="cart-items-container">
          <div className="cart-items-container-with-items">
            <div className="cart-items-left">
              {cart.products.length &&
                cart.products.map((item) => (
                  <CartItem
                    networkStatus={networkStatus}
                    key={item.variationId ? item.variationId : item.productId}
                    item={item}
                    updateCartProcessing={updateCartProcessing}
                    products={cart.products}
                    handleRemoveProductClick={handleRemoveProductClick}
                    updateCart={updateCart}
                  />
                ))}

              {/*Clear entire cart*/}
              <div className="clear-cart-loading">
                {clearCartProcessing ? (
                  <button
                    className="clear-cart-button-clearing"
                    disabled={clearCartProcessing}
                  >
                    <img
                      height="15"
                      height="15"
                      className="spinner-icon"
                      src={require("../../public/cart-spinner.gif")}
                      alt="Menu"
                    />
                  </button>
                ) : (
                  <button
                    className="clear-cart-button "
                    onClick={(event) => handleClearCart(event)}
                    disabled={clearCartProcessing}
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>

            {/* Display Errors if any */}
            {requestError ? (
              <div className="cart-items-left-error">{requestError}</div>
            ) : (
              ""
            )}

            {/*Cart Total*/}
            <div className="cart-items-right">
              <table className="cart-total-table">
                <tbody>
                  <tr className="cart-total-table-row">
                    <td className="cart-table-cell">Subtotal</td>
                    <td className="cart-table-cell">
                      {"string" !== typeof cart.subTotalProductsPrice
                        ? cart.subTotalProductsPrice.toFixed(2)
                        : cart.subTotalProductsPrice}
                    </td>
                  </tr>
                  <tr className="cart-total-table-row">
                    <td className="cart-table-cell">Shipping</td>
                    <td className="cart-table-cell">20,00lei</td>
                  </tr>
                  <tr className="cart-total-table-row">
                    <td className="cart-table-cell">Total</td>
                    <td className="cart-table-cell">
                      {"string" !== typeof cart.totalProductsPrice
                        ? cart.totalProductsPrice.toFixed(2)
                        : cart.totalProductsPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link href={`/checkout`}>
                <button className="cart-proceed-to-checkout">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-items-container-without-items">
          <h2>No items in the cart</h2>
          <Link href={`/shop`}>
            <button className="no-items-button">Add New Products</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
