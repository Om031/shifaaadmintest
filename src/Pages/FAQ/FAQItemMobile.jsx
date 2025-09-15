import React from "react";
import './FAQ.css'

// Reusable FAQ item component.
// containerClass allows us to switch between different item styles.
const FAQItemMobile = ({ containerClass, heading, lineClass, paragraph }) => {
  return (
    <div className={containerClass}>
      <span className="heading-3f-mobile">{heading}</span>
      <div className={lineClass} />
      <span className="paragraph-41-mobile">{paragraph}</span>
    </div>
  );
};

export default FAQItemMobile;