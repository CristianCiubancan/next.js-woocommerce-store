import React from "react";
import "./error.styles.scss";

const Error = ({ errors, fieldName }) => {
  return errors && errors.hasOwnProperty(fieldName) ? (
    fieldName === "address1" ? (
      <div className="input-error">
        Address must be at least 20 characters long and under 100.
      </div>
    ) : (
      <div className="input-error">{errors[fieldName]}</div>
    )
  ) : (
    ""
  );
};

export default Error;
