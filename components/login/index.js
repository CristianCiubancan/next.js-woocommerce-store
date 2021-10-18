import React, { useState } from "react";
import { sanitize, setAuth } from "../../utils/functions";
import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import LOGIN from "../../graphql/mutations/login";
import { v4 } from "uuid";
import validateAndSanitizeLoginForm from "../../validator/login";
import Spinner from "../spinner";
import "./login.module.scss";

const Login = ({ setLoggedIn }) => {
  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      variables: {
        input: {
          clientMutationId: v4(), // Generate a unique id.,
          username: loginFields.username,
          password: loginFields.password,
        },
      },
      onCompleted: (data) => {
        // If error.
        if (!isEmpty(loginError)) {
          setErrorMessage(loginError.graphQLErrors[0].message);
        }

        const { login } = data;
        const authData = {
          refreshTokenExpirationDate: Date.now() + 15778463000,
          authTokenExpiration: Number(login.user.jwtAuthExpiration),
          user: login.user,
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
    }
  );

  const onFormSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // Validation and Sanitization.
    const validationResult = validateAndSanitizeLoginForm({
      username: loginFields.username,
      password: loginFields.password,
    });

    if (validationResult.isValid) {
      setLoginFields({
        username: validationResult.sanitizedData.username,
        password: validationResult.sanitizedData.password,
      });
      login();
    } else {
      setClientSideError(validationResult);
    }
  };

  const setClientSideError = (validationResult) => {
    if (validationResult.errors.password) {
      setErrorMessage(validationResult.errors.password);
    }

    if (validationResult.errors.username) {
      setErrorMessage(validationResult.errors.username);
    }
  };

  const handleOnChange = (event) => {
    setLoginFields({
      ...loginFields,
      [event.target.name]: event.target.value,
    });
  };

  const { username, password } = loginFields;

  return (
    <div className="login-container">
      <h1 className="login-component-title">Login</h1>
      {!isEmpty(errorMessage) && (
        <div
          className="alert alert-danger"
          dangerouslySetInnerHTML={{ __html: sanitize(errorMessage) }}
        />
      )}
      <form className="login-form" onSubmit={onFormSubmit}>
        <div className="login-form-field">
          <label className="login-form-label" htmlFor="login-username">
            Username
          </label>
          <input
            type="text"
            className="login-form-input"
            name="username"
            id="login-username"
            value={username}
            onChange={handleOnChange}
          />
        </div>
        <div className="login-form-field">
          <label className="login-form-label" htmlFor="login-password">
            Password
          </label>
          <input
            type="password"
            className="login-form-input"
            name="password"
            value={password}
            id="login-password"
            onChange={handleOnChange}
          />
        </div>
        <div className="login-form-field">
          <button
            className="login-button"
            disabled={loginLoading ? "disabled" : ""}
            type="submit"
          >
            Login
          </button>
        </div>
        {loginLoading ? <Spinner /> : ""}
      </form>
    </div>
  );
};

export default Login;
