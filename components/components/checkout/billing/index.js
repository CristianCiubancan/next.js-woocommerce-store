import React from "react";
import Error from "../error";
import "./billing.module.scss";

const Billing = ({ input, handleOnChange }) => {
  return (
    <div className="billing-wrapper">
      {/*Name*/}

      <div className="billing-form">
        <div className="billing-form-input">
          <label htmlFor="first-name">First name:</label>
          <input
            onChange={handleOnChange}
            value={input.firstName}
            type="text"
            name="firstName"
            id="first-name"
            label="First Name"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"firstName"} />
        <div className="billing-form-input">
          <label htmlFor="last-name">Last name:</label>
          <input
            onChange={handleOnChange}
            value={input.lastName}
            type="text"
            name="lastName"
            id="last-name"
            label="Last Name"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"lastName"} />
        <div className="billing-form-input">
          <label htmlFor="company-name">Company:</label>
          <input
            onChange={handleOnChange}
            value={input.company}
            type="text"
            name="company"
            id="company-name"
            label="Company Name"
          />
        </div>
        <Error errors={input.errors} fieldName={"company"} />
        <div className="billing-form-input">
          <label htmlFor="street-address">Address:</label>
          <input
            type="text"
            onChange={handleOnChange}
            value={input.address1}
            name="address1"
            id="street-address"
            label="Street"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"address1"} />
        <div className="billing-form-input">
          <label htmlFor="address-2">Address 2:</label>
          <input
            type="text"
            onChange={handleOnChange}
            value={input.address2}
            name="address2"
            id="address-2"
            label="Apartment, suite etc."
          />
        </div>
        <div className="billing-form-input">
          <label htmlFor="city">City:</label>
          <input
            onChange={handleOnChange}
            value={input.city}
            type="text"
            name="city"
            id="city"
            label="City"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"city"} />
        <div className="billing-form-input">
          <label htmlFor="state">State/Country:</label>
          <input
            onChange={handleOnChange}
            value={input.state}
            type="text"
            name="state"
            id="state"
            label="State"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"state"} />
        <div className="billing-form-input">
          <label htmlFor="post-code">Zip code:</label>
          <input
            onChange={handleOnChange}
            value={input.postcode}
            type="text"
            name="postcode"
            id="post-code"
            label="Postal Code"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"postcode"} />
        <div className="billing-form-input">
          <label htmlFor="phone">Phone no.:</label>
          <input
            onChange={handleOnChange}
            value={input.phone}
            type="text"
            name="phone"
            id="phone"
            label="Phone"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"phone"} />
        <div className="billing-form-input">
          <label htmlFor="email">E-mail:</label>
          <input
            onChange={handleOnChange}
            value={input.email}
            type="email"
            name="email"
            id="email"
            label="Email"
            required
          />
        </div>
        <Error errors={input.errors} fieldName={"email"} />
        {/*Phone & Email*/}
      </div>

      <h1 className="aditional-info-title">Additional Information</h1>
      <div className="form-notes">
        <label htmlFor="order-notes" className="order-notes">
          Order Notes
        </label>
        <div>
          <textarea
            onChange={handleOnChange}
            defaultValue={input.customerNote}
            name="customerNote"
            className="form-text-area"
            id="order-notes"
            rows="4"
          />
        </div>

        <Error errors={input.errors} fieldName={"customerNote"} />
      </div>
    </div>
  );
};

export default Billing;
