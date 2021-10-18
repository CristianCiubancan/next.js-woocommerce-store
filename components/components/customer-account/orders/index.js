import React from "react";
import { useQuery } from "@apollo/client";
import GET_CUSTOMER_ORDER from "../../../graphql/queries/get-customer-orders";
import { isEmpty } from "lodash";
import { getFormattedDate } from "../../../utils/functions";
import Link from "next/link";
import Spinner from "../../spinner";

const Orders = ({ authData }) => {
  const queryInput = authData.user.databaseId;
  // Get Cart Data.
  const { data, loading, refetch } = useQuery(GET_CUSTOMER_ORDER, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: queryInput,
    onCompleted: () => {
      if (data.customer.id === "guest") {
        refetch();
      }
    },
  });

  return loading ? (
    <Spinner />
  ) : (
    <div className="">
      {!isEmpty(data.customer.orders.edges) ? (
        data.customer.orders.edges.map((order) => {
          return (
            <div className="" key={order.node.id}>
              <div className="card-header">
                <h4>Order #{order.node.id}</h4>
                <time>Order Placed: {getFormattedDate(order.node.date)}</time>
                <div>Payment Method: {order.node.paymentMethodTitle}</div>
                <div>Total: {order.node.total}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-3">
          <h4 className="mb-3">No orders found</h4>
          <Link href="/">
            <button
              className="btn-outline-dark"
              style={{ fontSize: "12px", padding: "8px 12px" }}
            >
              Shop now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
