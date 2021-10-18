import React, { useState } from "react";
import Dashboard from "./dashboard";
import Orders from "./orders";
import { isUserLoggedIn } from "../../utils/functions";
import Logout from "./logout";
import Addresses from "./addresses";
import AccountDetails from "./account-details";
import "./customer-account.module.scss";

const CustomerAccount = ({ handleLogout }) => {
  const [active, setActive] = useState(1);
  const [auth] = useState(isUserLoggedIn());

  const tabItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: "tabitem__icon tab-dashboard",
      content: <Dashboard authData={auth} />,
    },
    {
      id: 2,
      title: "Orders",
      icon: "tabitem__icon tab-users",
      content: <Orders authData={auth} />,
    },
    {
      id: 3,
      title: "Addresses",
      icon: "tabitem__icon tab-addresses",
      content: <Addresses authData={auth} />,
    },
    {
      id: 4,
      title: "Account Details",
      icon: "tabitem__icon tab-account-details",
      content: <AccountDetails authData={auth} />,
    },
    {
      id: 5,
      title: "Logout",
      icon: "tabitem__icon tab-logout",
      content: "",
    },
  ];

  const TabItemComponent = ({
    icon = "",
    title = "",
    onItemClicked = () =>
      console.error("You passed no action to the component"),
    isActive = false,
  }) => {
    return (
      <div className={isActive ? "tabitem" : "tabitem tabitem--inactive"}>
        <button className="account-dashboard-button" onClick={onItemClicked}>
          <i className={icon} />
          <p className="tabitem__title">{title}</p>
        </button>
      </div>
    );
  };

  return (
    <div className="account-details-row">
      <div className="account-details-menu">
        {tabItems.map(({ id, icon, title }) => {
          return 5 === id ? (
            <Logout key={id} handleLogout={handleLogout} />
          ) : (
            <TabItemComponent
              key={id}
              icon={icon}
              title={title}
              onItemClicked={() => setActive(id)}
              isActive={active === id}
            />
          );
        })}
      </div>
      <div className="account-details-content card col-9 px-0">
        {tabItems.map(({ id, content }) => {
          return active === id ? <div key={id}>{content}</div> : "";
        })}
      </div>
    </div>
  );
};

export default CustomerAccount;
