import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import AddToCartButton from "../cart/AddToCartButton";
import { isEmpty } from "lodash";
import "./product.module.scss";

const productImagePlaceholder = "https://via.placeholder.com/434";

const Product = ({ product }) => {
  const router = useRouter();
  return (
    <div className="product">
      {product.onSale ? <div className="sale-buble"> SALE </div> : ""}
      {!isEmpty(product.image) ? (
        <figure>
          <figure
            onClick={() =>
              router.push(
                `/product/${product.slug}-${product.databaseId}`,
                undefined,
                { shallow: true }
              )
            }
          >
            <Image
              src={product.image.mediaItemUrl}
              alt={product.image.altText ? product.image.altText : ""}
              width={500}
              height={500}
            />
          </figure>
        </figure>
      ) : !isEmpty(productImagePlaceholder) ? (
        <figure>
          <figure
            onClick={() =>
              router.push(
                `/product/${product.slug}-${product.databaseId}`,
                undefined,
                { shallow: true }
              )
            }
          >
            <Image
              src={productImagePlaceholder}
              alt="default"
              width={500}
              height={500}
            />
          </figure>
        </figure>
      ) : null}
      <div className="product-footer">
        <span className="value product-name">
          {product.name.length > 20
            ? `${product.name.substring(0, 20)}...`
            : product.name}
        </span>
        <span className="value product-price">{product.price}</span>
      </div>
      {product.type === "VARIABLE" || product.type === "GROUPED" ? (
        <button
          onClick={() =>
            router.push(
              `/product/${product.slug}-${product.databaseId}`,
              undefined,
              { shallow: true }
            )
          }
          className="product-button"
        >
          View options
        </button>
      ) : (
        <AddToCartButton product={product} chosenVariationId={null} />
      )}
    </div>
  );
};

export default Product;
