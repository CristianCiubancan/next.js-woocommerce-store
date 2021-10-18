import { v4 } from "uuid";
import { isEmpty, remove } from "lodash";
import DOMPurify from "dompurify";

export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};

export const getFloatVal = (string) => {
  let floatValue = `${string.match(/[+-]?\d+(\.\d+)?/g)[0]}.${
    string.match(/[+-]?\d+(\.\d+)?/g)[1]
  }`;
  return null !== floatValue
    ? parseFloat(parseFloat(floatValue).toFixed(2))
    : "";
};

export const getUpdatedItems = (products, newQty, cartKey) => {
  // Create an empty array.
  const updatedItems = [];

  // Loop through the product array.
  products.map((cartItem) => {
    // If you find the cart key of the product user is trying to update, push the key and new qty.
    if (cartItem.cartKey === cartKey) {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: parseInt(newQty),
      });

      // Otherwise just push the existing qty without updating.
    } else {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: cartItem.qty,
      });
    }
    return null;
  });

  // Return the updatedItems array with new Qtys.
  return updatedItems;
};

export const createCheckoutData = (order, stripe) => {
  const checkoutData = {
    clientMutationId: v4(),
    billing: {
      firstName: order.firstName,
      lastName: order.lastName,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      country: order.country,
      state: order.state,
      postcode: order.postcode,
      email: order.email,
      phone: order.phone,
      company: order.company,
    },
    shipping: {
      firstName: order.firstName,
      lastName: order.lastName,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      country: order.country,
      state: order.state,
      postcode: order.postcode,
      email: order.email,
      phone: order.phone,
      company: order.company,
    },
    shipToDifferentAddress: false,
    paymentMethod: order.paymentMethod,
    isPaid: false,
    transactionId: "hjkhjkhsdsdiui",
    customerNote: order.customerNote,
  };

  if (stripe) {
    checkoutData.paymentMethod = "stripe";
    checkoutData.metaData = [{ key: "_stripe_source_id", value: stripe }];
  }

  if (order.createAccount) {
    checkoutData.account = {
      username: order.username,
      password: order.password,
    };
  }

  return checkoutData;
};

export const getFormattedCart = (data) => {
  let formattedCart = null;

  if (undefined === data || !data?.cart?.contents?.nodes?.length) {
    return formattedCart;
  }

  const givenProducts = data.cart.contents.nodes;

  // Create an empty object.
  formattedCart = {};
  formattedCart.products = [];
  let totalProductsCount = 0;

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts[i].product;
    const product = {};
    const total = getFloatVal(givenProducts[i].total);

    product.productId = givenProduct?.node?.databaseId;
    product.cartKey = givenProducts[i].key;
    if (givenProducts[i].variation) {
      product.variationId = givenProducts[i].variation.node.databaseId;
      product.variation = givenProducts[i].variation.node.name;
    } else {
      product.variationId = null;
      product.variation = null;
    }
    product.name = givenProduct?.node?.name;
    product.qty = givenProducts[i].quantity;
    product.price = (total / product.qty).toFixed(2);
    product.totalPrice = givenProducts[i].total;

    // Ensure we can add products without images to the cart
    !isEmpty(givenProduct?.node?.image)
      ? (product.image = {
          sourceUrl: givenProduct?.node?.image.sourceUrl,
          srcSet: givenProduct?.node?.image.srcSet,
          mediaDetails: givenProduct?.node?.image.mediaDetails,
          title: givenProduct?.node?.image.title,
        })
      : (product.image = {
          sourceUrl: "https://via.placeholder.com/434",
          srcSet: "https://via.placeholder.com/434",
          title: givenProduct?.node?.name,
        });

    totalProductsCount += givenProducts[i].quantity;

    // Push each item into the products array.
    formattedCart.products.push(product);
  }

  formattedCart.totalProductsCount = totalProductsCount;
  formattedCart.totalProductsPrice = data.cart.total;
  formattedCart.subTotalProductsPrice = data.cart.subtotal;

  return formattedCart;
};

export const isUserValidated = () => {
  let userLoggedInData = "";

  if (process.browser) {
    let authTokenData = localStorage.getItem("auth");

    if (!isEmpty(authTokenData)) {
      authTokenData = JSON.parse(authTokenData);

      if (!isEmpty(authTokenData.authToken)) {
        userLoggedInData = authTokenData;
      }
    }
  }

  return userLoggedInData;
};

export const getFormattedDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const setAuth = (authData) => {
  localStorage.setItem("auth", JSON.stringify(authData));
};

export const isUserLoggedIn = () => {
  let authData = null;

  if (process.browser) {
    authData = JSON.parse(localStorage.getItem("auth"));
  }
  return authData;
};

export const logOut = () => {
  localStorage.removeItem("auth");
};
