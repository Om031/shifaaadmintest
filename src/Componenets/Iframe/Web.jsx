import React from "react";

const IframeComponent = ({ src, width = "100%", height = "700px", title = "Credit Card" }) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      title={title}
      style={{ border: "none",transform:"scale(1.1)" }} // Remove border
    />
  );
};

export default IframeComponent;
