import React, { useState } from "react";
import Spinner from "../../components/spinner";
import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import Image from "next/image";
import Head from "next/head";
import AddToCartButton from "../../components/cart/AddToCartButton";
import PRODUCT from "../../graphql/queries/product";
import Carousel from "../../components/carousel";
import "./single-product.module.scss";

const SingleProduct = ({ productId, productSlug }) => {
  const [chosenVariationId, setChosenVariationId] = useState();
  const [chosenVariationPrice, setChosenVariationPrice] = useState();
  const { data, error, loading } = useQuery(PRODUCT, {
    variables: {
      id: productId,
      idType: "DATABASE_ID",
    },
  });
  if (error) return <h1>Error while fetching data</h1>;

  const displayProductImages = () => {
    if (!isEmpty(data.product.galleryImages.nodes)) {
      return (
        <figure className="single-product-page-figure">
          <Carousel images={data.product.galleryImages.nodes} />
        </figure>
      );
    } else if (!isEmpty(data.product.image)) {
      return (
        <figure className="single-product-page-figure">
          <Image
            className="single-product-page-image"
            alt={data.product.image.altText ? product.image.altText : ""}
            src={data.product.image.sourceUrl} // use normal <img> attributes as props
            height={600}
            width={600}
          />
        </figure>
      );
    } else if (!isEmpty(productImagePlaceholder)) {
      return (
        <figure className="single-product-page-figure">
          <Image
            className="single-product-page-image"
            alt="default"
            height={600}
            width={600}
            src={productImagePlaceholder}
          />
        </figure>
      );
    } else {
      return null;
    }
  };

  return loading ? (
    <div className="spinner-single-product-page">
      <Spinner />
    </div>
  ) : (
    <div className="single-product-page">
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_WEBSITE_TITLE}- Products -{productSlug}
        </title>
        <meta
          name="description"
          content={`Quality ${productSlug} handmade with love `}
        ></meta>
      </Head>
      <div className="single-product-page-container">
        <div className="single-product-page-left-side product-page-side">
          <div className="single-product-image">{displayProductImages()}</div>
        </div>

        <div className="single-product-page-right-side product-page-side">
          <h2 className="single-product-page-product-title">
            {data.product.name}
          </h2>

          <div>
            {chosenVariationId ? (
              <p className="single-product-page-product-price">
                {chosenVariationPrice}
              </p>
            ) : (
              <p className="single-product-page-product-price">
                {data.product.price}
              </p>
            )}
          </div>

          {data.product.type !== "VARIABLE" ? (
            ""
          ) : (
            <div className="single-product-page-options-select">
              <div>
                <h3 className="single-product-page-options-label">Options</h3>
              </div>
              <select
                className="variations-select"
                name="Variations"
                id="variations"
                onChange={(event) => {
                  setChosenVariationId(event.target.value);
                  setChosenVariationPrice(
                    event.target.selectedOptions[0].getAttribute("data-price")
                  );
                }}
              >
                <option className="variations-option" value="null">
                  No option selected
                </option>
                {data.product.variations.nodes.map((variation) => {
                  return (
                    <option
                      className="variations-option"
                      key={variation.databaseId}
                      value={variation.databaseId}
                      data-price={variation.price}
                    >
                      {variation.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {(data.product.type === "VARIABLE" && chosenVariationId === "null") ||
          (data.product.type === "VARIABLE" &&
            chosenVariationId === undefined) ? (
            <div>
              <button className="single-product-page-buttons">
                Choose an option first
              </button>
            </div>
          ) : (
            <AddToCartButton
              product={data.product}
              chosenVariationId={chosenVariationId}
            />
          )}
        </div>
      </div>

      {data.product.description ? (
        <div>
          <h3>Description:</h3>
          <p className="single-product-description">
            {data.product.description.replace(/<[^>]*>?/gm, "")}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleProduct;
