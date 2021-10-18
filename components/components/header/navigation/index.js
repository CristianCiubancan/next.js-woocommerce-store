import React from "react";
import Link from "next/link";

import "./navigation.module.scss";

function Navigation(props) {
  const { closeMenu, data } = props;
  return (
    <ul className="children-container">
      {data.productCategories.nodes.map((mainCategory) => {
        if (
          mainCategory.parentId === null &&
          mainCategory.products.nodes.length > 0 &&
          mainCategory.children.nodes.length === 0
        ) {
          return (
            <Link
              key={mainCategory.slug}
              href={`/shop/${mainCategory.slug}-${mainCategory.databaseId}`}
            >
              <li onClick={closeMenu ? closeMenu : null} className="child-item">
                {mainCategory.name}
              </li>
            </Link>
          );
        } else if (
          mainCategory.parentId === null &&
          mainCategory.products.nodes.length > 0 &&
          mainCategory.children.nodes.length > 0
        ) {
          return (
            <li
              key={mainCategory.slug}
              className="child-item child-item-with-children"
            >
              <input type="checkbox" id={mainCategory.slug} />
              <div className="child-item-with-children-title">
                <Link
                  href={`/shop/${mainCategory.slug}-${mainCategory.databaseId}`}
                >
                  <a onClick={closeMenu ? closeMenu : null}>
                    {mainCategory.name}
                  </a>
                </Link>
                <label htmlFor={mainCategory.slug}>
                  <img
                    className="item-arrow-icon"
                    src={require("../../../public/down-arrow.svg")}
                    alt=""
                  />
                </label>
              </div>
              <ul className="sub-category-children-container">
                {mainCategory.children.nodes.map((subCategory) => {
                  if (
                    subCategory.products.nodes.length > 0 &&
                    subCategory.children.nodes.length === 0
                  ) {
                    return (
                      <Link
                        key={subCategory.slug}
                        href={`/shop/${subCategory.slug}-${subCategory.databaseId}`}
                      >
                        <li
                          onClick={closeMenu ? closeMenu : null}
                          className="child-item"
                        >
                          {subCategory.name}
                        </li>
                      </Link>
                    );
                  } else if (
                    subCategory.products.nodes.length > 0 &&
                    subCategory.children.nodes.length > 0
                  ) {
                    return (
                      <li
                        key={subCategory.slug}
                        className="child-item child-item-with-children"
                      >
                        <input type="checkbox" id={subCategory.slug} />
                        <div className="child-item-with-children-title">
                          <Link
                            href={`/shop/${subCategory.slug}-${subCategory.databaseId}`}
                          >
                            <a onClick={closeMenu ? closeMenu : null}>
                              {subCategory.name}
                            </a>
                          </Link>
                          <label htmlFor={subCategory.slug}>
                            <img
                              className="item-arrow-icon"
                              src={require("../../../public/down-arrow.svg")}
                              alt=""
                            />
                          </label>
                        </div>
                        <ul className="sub-category-children-container">
                          {subCategory.children.nodes.map((subSubCategory) => {
                            return (
                              <Link
                                key={subSubCategory.slug}
                                href={`/shop/${subSubCategory.slug}-${subSubCategory.databaseId}`}
                              >
                                <li
                                  className="child-item"
                                  onClick={closeMenu ? closeMenu : null}
                                >
                                  {subSubCategory.name}
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default Navigation;
