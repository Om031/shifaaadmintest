import React, { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import "./FAQ.css";
import FAQS from "../../constants/faq";
import FAQSHE from "../../constants/faqHe"; 
import FAQSEN from "../../constants/faqEn";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FAQ = ({ id }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      if (i18n.language === "ar") {
        setData(FAQS);
      } else if (i18n.language === "he") {
        setData(FAQSHE);
      } else {
        setData(FAQSEN);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [i18n.language]);

  if (loading) {
    return (
      <div id={id} className="container-3e1">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          color: '#b8b8b8',
          fontSize: '1.1rem'
        }}>
          {i18n.language === 'ar' ? 'جاري التحميل...' : 
           i18n.language === 'he' ? 'טוען...' : 
           'Loading...'}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Split FAQs into two rows for better layout
  const row1 = data.slice(0, 2);
  const row2 = data.slice(2, 4);

  return (
    <div className="container-3e1" id={id}>
      {/* Header Section */}
      <div className="flex-row-7d11">
        <div className="text-container-7e1">
          <h2 className="heading-7f1">
            {i18n.options.resources[i18n.language].faq.title}
          </h2>
          <p className="long-content-811">
            {i18n.options.resources[i18n.language].faq.secondTitle}
          </p>
        </div>
        <div className="rectangle-801" />
      </div>

      {/* FAQ Items Container */}
      <div className="items-container">
        {/* First Row */}
        <div className="row">
          {row1.map((item, index) => (
            <FAQItem
              key={item.id}
              containerClass="faq-item-1 animate-in"
              heading={item.question}
              lineClass="line-40"
              paragraph={item.answer}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        
        {/* Second Row */}
        <div className="row-46">
          {row2.map((item, index) => (
            <FAQItem
              key={item.id}
              containerClass="faq-item-1 animate-in"
              heading={item.question}
              lineClass="line-44"
              paragraph={item.answer}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className="button-2" onClick={() => navigate("faq")}>
        <span className="view-more">
          {i18n.options.resources[i18n.language].faq.btn}
        </span>
        <div className="icon-4f" />
      </div>
    </div>
  );
};

export default FAQ;
