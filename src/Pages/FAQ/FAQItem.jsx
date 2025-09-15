import React from "react";
import './FAQ.css'

// Reusable FAQ item component with overflow protection
const FAQItem = ({ containerClass, heading, lineClass, paragraph, style }) => {
  return (
    <div className={containerClass} style={style}>
      <h3 className="heading-3f">{heading}</h3>
      <div className={lineClass} />
      <p className="paragraph-41">{paragraph}</p>
    </div>
  );
};

export default FAQItem;
