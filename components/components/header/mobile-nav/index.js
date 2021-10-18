import React, { useContext, useState } from "react";
import Link from "next/link";
import { AppContext } from "../../context/AppContext";
import CartIcon from "../../cart/CartIcon";
import Navigation from "../navigation";
import "./mobile-header.module.scss";

const MobileHeader = (props) => {
  const { data } = props;
  const [cart, setCart] = useContext(AppContext);
  const [displayMenu, setDisplayMenu] = useState(false);

  const closeMenu = () => {
    setDisplayMenu(false);
  };

  return (
    <div className="mobile-header-container">
      <div className="mobile-header-icons">
        <div className="mobile-header-cart-icon">
          <CartIcon />
        </div>
        <img
          className="burger-menu-icon"
          onClick={() => setDisplayMenu(true)}
          src={require("../../../public/menu.svg")}
          alt="Menu"
        />
      </div>

      {displayMenu ? (
        <div className="mobile-header-menu">
          <div className="cross-container">
            <img
              onClick={() => closeMenu()}
              className="menu-cross-icon"
              src={require("../../../public/cross.svg")}
              alt="close"
            />
          </div>

          <div className="menu-links-container">
            <Link href="/">
              <div onClick={() => closeMenu()} className="menu-link">
                HOME
              </div>
            </Link>
            <div className="nested-menu-link">
              <input type="checkbox" id="shop" />
              <div className="menu-link-with-children">
                <Link href="/shop">
                  <p onClick={() => closeMenu()} className="menu-link">
                    SHOP
                  </p>
                </Link>
                <label className="menu-arrow-icon-container" htmlFor="shop">
                  <img
                    className="menu-arrow-icon"
                    src={require("../../../public/down-arrow.svg")}
                    alt=""
                  />
                </label>
              </div>
              <Navigation data={data} closeMenu={closeMenu} />
            </div>
            <Link href="/profile">
              <div onClick={() => closeMenu()} className="menu-link">
                PROFILE
              </div>
            </Link>
            <Link href="/cart">
              <div onClick={() => closeMenu()} className="menu-link">
                CART
              </div>
            </Link>
            {cart !== null ? (
              <Link href="/checkout">
                <div
                  onClick={() => closeMenu()}
                  className="menu-link checkout-link"
                >
                  CHECKOUT
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : null}
      {displayMenu ? (
        <div
          onClick={() => setDisplayMenu(false)}
          className="mobile-header-menu-backdrop"
        ></div>
      ) : null}
    </div>
  );
};

export default MobileHeader;
