import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { getFormattedCart } from "../../utils/functions";
import GET_CART from "../../graphql/queries/get-cart";
import { AppContext } from "../context/AppContext";
import Link from "next/link";
import "./cart-icon.module.scss";

function CartIcon() {
  const [cart, setCart] = useContext(AppContext);
  const { data } = useQuery(GET_CART, {
    onCompleted: () => {
      const updatedCart = getFormattedCart(data);
      setCart(updatedCart);
    },
  });

  const productCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : "";
  return (
    <div className="cart-icon">
      <Link href="/cart">
        <img
          className="cart-icon-image"
          src={require("../../public/cart-icon.svg")}
          alt="Menu"
        />
      </Link>
      {productCount ? (
        <span className="cart-total-products-count">{productCount}</span>
      ) : (
        ""
      )}
    </div>
  );
}

export default CartIcon;
