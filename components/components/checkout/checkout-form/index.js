import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Billing from "../billing";
import YourOrder from "../your-order";
import { AppContext } from "../../context/AppContext";
import validateAndSanitizeCheckoutForm from "../../../validator/checkout";
import { useMutation, useQuery } from "@apollo/client";
import { getFormattedCart, createCheckoutData } from "../../../utils/functions";
import OrderSuccess from "../order-success";
import GET_CART from "../../../graphql/queries/get-cart";
import CHECKOUT_MUTATION from "../../../graphql/mutations/checkout";
import CheckoutError from "../checkout-error";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PaymentMode from "../payment-mode";
import Spinner from "../../spinner";
import "./checkout-form.module.scss";

const CheckoutForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    company: "",
    country: "RO",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    createAccount: false,
    username: "",
    password: "",
    customerNote: "",
    paymentMethod: "",
    errors: null,
  };

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  // const initialState = {
  //   firstName: "Imran",
  //   lastName: "Sayed",
  //   address1: "109 Hills Road Valley",
  //   address2: "Station Road",
  //   city: "Pune",
  //   state: "Maharastra",
  //   country: "IN",
  //   postcode: "400298",
  //   phone: "9959338989",
  //   email: "codeytek.academy@gmail.com",
  //   company: "Tech",
  //   createAccount: false,
  // username: '',
  // password: '',
  // customerNote: "My Order notes",
  //   paymentMethod: "cod",
  //   errors: null,
  // };
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      // console.warn( 'completed CHECKOUT_MUTATION' );
      refetch();
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const result = validateAndSanitizeCheckoutForm(input);
    if (!result.isValid) {
      setInput({ ...input, errors: result.errors });
      return;
    }
    const checkOutData = createCheckoutData(input);
    setOrderData(checkOutData);
    setRequestError(null);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    if ("createAccount" === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    } else {
      const newState = { ...input, [event.target.name]: event.target.value };
      setInput(newState);
    }
  };

  //stripe-part
  const handleStripeSubmit = async (event) => {
    setIsLoading(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const { error, source } = await stripe.createSource(cardElement, {
      currency: "ron",
      owner: {
        name: input.firstName,
      },
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const result = validateAndSanitizeCheckoutForm(input);
      if (!result.isValid) {
        setInput({ ...input, errors: result.errors });
        setIsLoading(false);
        return;
      }
      const sourceId = source.id;
      const checkOutData = createCheckoutData(input, sourceId);
      setOrderData(checkOutData);
    }
    setIsLoading(false);
  };
  /* eslint-disable */
  let unmounted = false;
  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      /* eslint-disable */
      if (!unmounted) {
        checkout();
      }
    }
    return () => {
      unmounted = true;
    };
  }, [orderData]);

  return (
    <>
      {cart ? (
        <div className="checkout-form-wrapper">
          <form
            onSubmit={
              input.paymentMethod === "cod"
                ? handleFormSubmit
                : handleStripeSubmit
            }
          >
            <div className="billing-main-wrapper">
              {/*Billing Details*/}
              <div className="billing-details-wrapper">
                <h1 className="billing-header">Billing Details</h1>
                <Billing input={input} handleOnChange={handleOnChange} />
              </div>
              {/* Order & Payments*/}
              <div className="billing-order-payment-wrapper">
                {/*	Order*/}
                <h1 className="billing-header">Your Order</h1>
                <YourOrder cart={cart} />
                <PaymentMode input={input} handleOnChange={handleOnChange} />
                {!input.paymentMethod ? (
                  <div className="payment-method-placeholder"></div>
                ) : (
                  <div>
                    {input.paymentMethod === "stripe" ? (
                      <div className="stripe-block">
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: "20px",
                                color: "#000000",
                                "::placeholder": {
                                  color: "#000000",
                                },
                              },
                              invalid: {
                                color: "#9e2146",
                              },
                            },
                          }}
                        />
                        {checkoutLoading || isLoading ? (
                          <Spinner />
                        ) : (
                          <button type="submit" className="checkout-button">
                            Place Order
                          </button>
                        )}
                      </div>
                    ) : (
                      <div>
                        {input.errors ? (
                          <div className="input-error">
                            There were errors, please check your input!
                          </div>
                        ) : (
                          ""
                        )}
                        {!checkoutLoading ? (
                          <button type="submit" className="checkout-button">
                            Place Order
                          </button>
                        ) : (
                          <Spinner />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Checkout Loading*/}
                {requestError && <CheckoutError requestError={requestError} />}
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="checkout-without-items">
          <h2>No items in the cart</h2>
          <Link href={`/shop`}>
            <button className="checkout-no-items-button">
              Add New Products
            </button>
          </Link>
        </div>
      )}

      {/*Show message if Order Success*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  );
};

export default CheckoutForm;
