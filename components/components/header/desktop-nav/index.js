import React, { useContext } from "react";
import Link from "next/link";
import Navigation from "../navigation";
import { AppContext } from "../../context/AppContext";
import "./desktop-header.module.scss";

const DesktopHeader = (props) => {
  const { data } = props;
  const [cart, setCart] = useContext(AppContext);
  return (
    <div className="desktop-header-container">
      <ul className="link-list">
        <li className="link-list-item">
          <Link href="/">
            <p className="nav-link">HOME</p>
          </Link>
        </li>
        <li className="link-list-item item-with-children">
          <Link href="/shop">
            <p className="nav-link">SHOP</p>
          </Link>

          <div className="navigation-container">
            <Navigation data={data} />
            <div className="navigation-border"></div>
          </div>
        </li>
        <li className="link-list-item">
          <Link href="/profile">
            <p className="nav-link">PROFILE</p>
          </Link>
        </li>
        <li className="link-list-item">
          <Link href="/cart">
            <p className="nav-link">CART</p>
          </Link>
        </li>
        {cart !== null ? (
          <li className="link-list-item ">
            <Link href="/checkout">
              <p className="nav-link checkout-link">CHECKOUT</p>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default DesktopHeader;
