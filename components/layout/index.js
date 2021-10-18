import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "./layout.module.scss";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = (props) => {
  return (
    <div className="layout-container">
      <div className="header-mask"></div>
      <div className="layout-content-container-wrapper">
        <div className="layout-content-container">{props.children}</div>
      </div>
      <div className="website-footer">
        <h4 className="footer-text">
          Copyright © 2021 Happy Octopus | Powered by Happy Octopus
        </h4>
      </div>
    </div>
  );
};

export default Layout;
