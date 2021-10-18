import withApollo from "next-with-apollo";
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { isEmpty } from "lodash";
import { setAuth } from "../utils/functions";
import fetch from "isomorphic-unfetch";

// Update the GraphQL endpoint to any instance of GraphQL that you like
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://premiumshop.happyoctopus.net";

export const middleware = new ApolloLink((operation, forward) => {
  let headersData = null;

  /**
   * If session data exist in local storage, set value as session header.
   */
  const session = process.browser ? localStorage.getItem("woo-session") : null;

  if (!isEmpty(session)) {
    headersData = {
      "woocommerce-session": `Session ${session}`,
    };
  }

  /**
   * If auth token exist in local storage, set value as authorization header.
   */
  const auth = process.browser
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

  const token = !isEmpty(auth) ? auth.user.jwtAuthToken : null;

  if (!isEmpty(token)) {
    if (auth.refreshTokenExpirationDate < Date.now()) {
      localStorage.removeItem("auth");
      alert(
        `Session expired, for your account's security you've been logged out, please relog`
      );
      throw new Error("invalid refresh token");
    } else {
      if (auth.authTokenExpiration < Date.now()) {
        async function updateToken() {
          let response = await fetch(`${API_URL}/graphql`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: ` mutation RefreshAuthToken { refreshJwtAuthToken(input: { clientMutationId: "${auth.user.id}", jwtRefreshToken: "${auth.user.jwtRefreshToken}"}) { authToken } }`,
            }),
          });
          let normalizedResponse = await response.json();
          let newToken = await normalizedResponse.data.refreshJwtAuthToken
            .authToken;
          const authData = {
            user: { ...auth.user, jwtAuthToken: newToken },
            authTokenExpiration: Date.now() + 240000,
            refreshTokenExpirationDate: auth.refreshTokenExpirationDate,
          };
          setAuth(authData);

          const token = !isEmpty(auth) ? auth.user.jwtAuthToken : null;

          if (!isEmpty(token)) {
            headersData = {
              ...headersData,
              authorization: token ? `Bearer ${newToken}` : "",
            };
          }
        }
        if (!isEmpty(auth)) {
          updateToken();
        }
        if (!isEmpty(headersData)) {
          operation.setContext(({ headers = {} }) => ({
            headers: headersData,
          }));
        }
      } else {
        const token = !isEmpty(auth) ? auth.user.jwtAuthToken : null;

        if (!isEmpty(token)) {
          headersData = {
            ...headersData,
            authorization: token ? `Bearer ${token}` : "",
          };
        }

        if (!isEmpty(headersData)) {
          operation.setContext(({ headers = {} }) => ({
            headers: headersData,
          }));
        }
      }
    }
  } else {
    if (!isEmpty(headersData)) {
      operation.setContext(({ headers = {} }) => ({
        headers: headersData,
      }));
    }
  }

  return forward(operation);
});

export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const session = headers.get("woocommerce-session");

    if (session) {
      // Remove session data if session destroyed.
      if ("false" === session) {
        localStorage.removeItem("woo-session");

        // Update session new data if changed.
      } else if (localStorage.getItem("woo-session") !== session) {
        localStorage.setItem("woo-session", headers.get("woocommerce-session"));
      }
    }

    return response;
  });
});

const link = middleware.concat(
  afterware.concat(
    createHttpLink({
      fetch, // Switches between unfetch & node-fetch for client & server.
      uri: `${API_URL}/graphql`, // Server URL (must be absolute)
    })
  )
);

export async function getStandaloneApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {}),
    })
);
