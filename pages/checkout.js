import React from "react";
import CheckoutForm from "../components/checkout/checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { Elements } from "@stripe/react-stripe-js";
import "./checkout.module.scss";

const stripePromise = loadStripe("your_stripe_key");

const Checkout = () => (
  <div className="checkout-page-container">
    <Head>
      <title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}- Checkout page</title>
      <meta
        name="description"
        content="here you can place orders and pay"></meta>
    </Head>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default Checkout;
