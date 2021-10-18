import React from "react";
import Link from "next/link";
import "./order-success.module.scss";

const OrderSuccess = (props) => {
  const { response } = props;

  if (!response) {
    return null;
  }

  const responseData = response.checkout;

  return (
    <div>
      {"success" === responseData.result ? (
        <div className="order-success-container">
          <img
            className="succes-icon"
            height={100}
            width={100}
            src={require("../../../public/check.svg")}
            alt="Menu"
          />
          <h2>Your order has been placed. </h2>
          <h2>Order no: {responseData.order.orderKey} </h2>
          <Link href="/shop">
            <button className="shop-more-button">Add more products</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderSuccess;
