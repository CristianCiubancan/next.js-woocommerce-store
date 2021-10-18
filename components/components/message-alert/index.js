import React from "react";
import { sanitize } from "../../utils/functions";
import "./message-alert.module.scss";

const MessageAlert = ({ message, success, onCloseButtonClick }) => {
  return (
    <div className="message-alert-container">
      <button
        type="button"
        onClick={onCloseButtonClick}
        className="message-alert-close"
        data-dismiss="alert"
      >
        <small>&times;</small>
      </button>
      <span
        className={success ? "text-success" : "text-danger"}
        dangerouslySetInnerHTML={{ __html: sanitize(message) }}
      />
    </div>
  );
};

export default MessageAlert;
