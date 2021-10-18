import React from "react";
import Link from "next/link";
import { sanitize } from "../../../utils/functions";

const CheckoutError = ({ requestError }) => {
  let errorMsg = (
    <div
      className="checkout-error"
      dangerouslySetInnerHTML={{ __html: sanitize(requestError) }}
    />
  );

  if (
    'An account is already registered with your email address. <a href="#" class="showlogin">Please log in.</a>' ===
    requestError
  ) {
    errorMsg = (
      <div className="checkout-error">
        <span>
          An account is already registered with your email address. Please
        </span>
        <Link href="/my-account">login</Link>
      </div>
    );
  }

  return errorMsg;
};

export default CheckoutError;
