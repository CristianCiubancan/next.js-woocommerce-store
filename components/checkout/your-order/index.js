import React from "react";
import CheckoutCartItem from "../checkout-cart-item";
import "./your-order.styles.scss";

const Index = ({ cart }) => {
  return (
    <>
      {cart ? (
        <>
          {/*Product Listing*/}
          <table className="your-order-table">
            <thead>
              {/* eslint-disable */}
              <tr className="">
                <th />
                <th className="table-heading">Product</th>
                <th className="table-heading">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.length &&
                cart.products.map((item) => (
                  <CheckoutCartItem
                    key={item.variation ? item.variation : item.productId}
                    item={item}
                  />
                ))}
              {/*Total*/}
              <tr className="table-light">
                <td className="" />
                <td className="woo-next-cart-element-total">Subtotal</td>
                <td className="woo-next-cart-element-amt">
                  {"string" !== typeof cart.subTotalProductsPrice
                    ? cart.subTotalProductsPrice.toFixed(2)
                    : cart.subTotalProductsPrice}
                </td>
              </tr>
              <tr className="table-light">
                <td className="" />
                <td className="woo-next-cart-element-total">Shipping</td>
                <td className="woo-next-cart-element-amt">20,00lei</td>
              </tr>
              <tr className="">
                <td className="" />
                <td className="">Total</td>
                <td className="">{cart.totalProductsPrice}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Index;
