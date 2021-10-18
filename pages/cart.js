import React from "react";
import Head from "next/head";
import CartItemsContainer from "../components/cart/CartItemsContainer";

function Cart() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}- Check your cart</title>
        <meta
          name="description"
          content="cart page where you can review your cart items, you can add and remove items in here"
        ></meta>
      </Head>
      <CartItemsContainer />
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default Cart;
