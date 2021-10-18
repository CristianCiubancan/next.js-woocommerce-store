import React, { useState } from "react";
import MessageAlert from "../message-alert";
import { isUserValidated, setAuth } from "../../utils/functions";
import REGISTER_CUSTOMER from "../../graphql/mutations/register-customer";
import { v4 } from "uuid";
import validateAndSanitizeRegisterForm from "../../validator/register";
import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import Spinner from "../spinner";
import "./register.module.scss";

function Register({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlertBar, setShowAlertBar] = useState(true);

  // Check if the user is validated already.
  if (process.browser) {
    const userValidated = isUserValidated();

    // Redirect the user to My Account page if user is already validated.
    if (!isEmpty(userValidated)) {
      // @TODO
    }
  }

  /**
   * Hide the Status bar on cross button click.
   */
  const onCloseButtonClick = () => {
    setErrorMessage("");
    setShowAlertBar(false);
  };

  /**
   * Sets client side error.
   *
   * Sets error data to result of our client side validation,
   * and statusbars to true so that its visible.
   *
   * @param {Object} validationResult Validation result data.
   */
  const setClientSideError = (validationResult) => {
    if (validationResult.errors.password) {
      setErrorMessage(validationResult.errors.password);
    }

    if (validationResult.errors.email) {
      setErrorMessage(validationResult.errors.email);
    }

    if (validationResult.errors.username) {
      setErrorMessage(validationResult.errors.username);
    }

    setShowAlertBar(true);
  };

  // Register Mutation.
  const [
    register,
    { loading: registerLoading, error: registerError },
  ] = useMutation(REGISTER_CUSTOMER, {
    variables: {
      input: {
        clientMutationId: v4(), // Generate a unique id.,
        username,
        password,
        email,
      },
    },
    onCompleted: (data) => {
      // If error.
      if (!isEmpty(registerError)) {
        setErrorMessage(registerError.graphQLErrors[0].message);
      }

      const {
        registerCustomer: { customer },
      } = data;

      handleRegisterSuccess();

      const authData = {
        refreshTokenExpirationDate: Date.now() + 15778463000,
        authTokenExpiration: Number(customer.jwtAuthExpiration),
        user: customer,
      };

      setAuth(authData);
      setLoggedIn(true);
    },
    onError: (error) => {
      if (error) {
        if (!isEmpty(error)) {
          setErrorMessage(error.graphQLErrors[0].message);
        }
      }
    },
  });

  /**
   * Handles user registration.
   *
   * @param {object} event Event Object.
   * @return {void}
   */
  const handleRegister = async (event) => {
    if (process.browser) {
      event.preventDefault();

      // Validation and Sanitization.
      const validationResult = validateAndSanitizeRegisterForm({
        username,
        email,
        password,
      });

      // If the data is valid.
      if (validationResult.isValid) {
        setUsername(validationResult.sanitizedData.username);
        setPassword(validationResult.sanitizedData.password);
        setEmail(validationResult.sanitizedData.email);

        register();
      } else {
        setClientSideError(validationResult);
      }
    }
  };

  /**
   * Handle Register success.
   *
   * @return {void}
   */
  const handleRegisterSuccess = () => {
    // Set form fields value to empty.
    setErrorMessage("");
    setUsername("");
    setPassword("");

    // localStorage.setItem( 'registration-success', 'yes' );

    // Add a message.
    setSuccessMessage(
      "Registration Successful! . You will be logged in now..."
    );
  };

  return (
    <div className="register-container">
      <h1 className="register-component-title">Register</h1>
      {"" !== errorMessage
        ? showAlertBar && (
            <MessageAlert
              message={errorMessage}
              success={false}
              onCloseButtonClick={onCloseButtonClick}
            />
          )
        : ""}

      {"" !== successMessage
        ? showAlertBar && (
            <MessageAlert
              message={successMessage}
              success={true}
              onCloseButtonClick={onCloseButtonClick}
            />
          )
        : ""}
      <form
        className="register-form"
        onSubmit={(event) => handleRegister(event)}
      >
        <div className="register-form-field">
          <label className="register-form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className="register-form-input"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="register-form-field">
          <label className="register-form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="register-form-input"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="register-form-field">
          <label className="register-form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="register-form-input"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="register-form-field">
          <button
            className="register-button"
            disabled={registerLoading ? "disabled" : ""}
            type="submit"
          >
            Register
          </button>
        </div>
        {registerLoading ? <Spinner /> : ""}
      </form>
    </div>
  );
}

export default Register;
