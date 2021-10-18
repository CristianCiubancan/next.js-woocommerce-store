import { AppContext } from "../context/AppContext";
import { useState, useContext } from "react";
import { v4 } from "uuid";
import { useQuery, useMutation } from "@apollo/client";
import GET_CART from "../../graphql/queries/get-cart";
import { getFormattedCart } from "../../utils/functions";
import ADD_TO_CART from "../../graphql/mutations/add-to-cart";
import "./add-to-cart-button.module.scss";

const AddToCartButton = (props) => {
  const { product, chosenVariationId } = props;
  let productQtyInput;
  if (chosenVariationId) {
    productQtyInput = {
      clientMutationId: v4(), // Generate a unique id.
      productId: product.databaseId,
      variationId: Number(chosenVariationId),
    };
  } else {
    productQtyInput = {
      clientMutationId: v4(), // Generate a unique id.
      productId: product.databaseId,
      variationId: product.databaseId,
    };
  }
  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const { data, loading: getCartLoading, refetch, networkStatus } = useQuery(
    GET_CART,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: () => {
        // console.warn( 'completed GET_CART' );
        // Update cart in the localStorage.
        const updatedCart = getFormattedCart(data);
        localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

        // Update cart data in React Context.
        setCart(updatedCart);
      },
    }
  );

  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQtyInput,
    },
    onCompleted: async () => {
      // If error.
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0].message);
      }
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      await refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleAddToCartClick = () => {
    setRequestError(null);
    addToCart();
  };

  return (
    <div className="add-to-cart-button-wrapper">
      {/*	Check if its an external product then put its external buy link */}

      {addToCartLoading || networkStatus === 4 ? (
        <button className="add-to-cart-button-loading">
          <img
            height="25"
            height="25"
            className="spinner-icon"
            src={require("../../public/cart-spinner.gif")}
            alt="Menu"
          />
        </button>
      ) : (
        <div>
          {"ExternalProduct" === product.nodeType ? (
            <a href={product.externalUrl} target="_blank">
              <button className="add-to-cart-button">Buy Now</button>
            </a>
          ) : (
            <button
              className="add-to-cart-button"
              onClick={handleAddToCartClick}
            >
              Add to cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
