import React, { useState, useEffect } from "react";
import Link from "next/link";
import DesktopHeader from "./desktop-nav";
import CartIcon from "../cart/CartIcon";
import MobileHeader from "./mobile-nav";
import "./header.module.scss";

const Header = (props) => {
  const { data } = props;
  const [deviceWidth, setDeviceWidth] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setDeviceWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="header-wrapper-container">
      <div className="header-wrapper">
        <div className="header-content">
          <div className="header-logo">
            <Link href="/">
              <img src={require("../../public/logo.svg")} alt="Menu" />
            </Link>
          </div>
          {deviceWidth > 1023 ? (
            <DesktopHeader data={data} className="desktop-header-container" />
          ) : (
            <MobileHeader data={data} className="mobile-header-container" />
          )}
          {deviceWidth > 1023 ? (
            <li className="header-cart-icon">
              <CartIcon />
            </li>
          ) : (
            ""
          )}
        </div>
        <div className="header-border"></div>
      </div>
    </div>
  );
};

export default Header;
