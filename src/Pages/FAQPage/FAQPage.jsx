import React, { useState, useEffect } from "react";
import "./FAQPage.css";
import FAQS from "../../constants/faq";
import FAQSHE from "../../constants/faqHe"; 
import FAQSEN from "../../constants/faqEn";
import { useTranslation } from "react-i18next";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { t, i18n } = useTranslation();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="faq-container">
        <div className="faq-loading">
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

  return (
    <div className="faq-container">
      <h2 className="faq-title">
        {i18n.options.resources[i18n.language].faq.title}
      </h2>
      
      <div className="faq-list">
        {data.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${isMobile ? 'faq-item-mobile' : ''} ${openIndex === index ? "open" : ""} animate-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <button 
              className={`faq-question ${isMobile ? 'faq-question-mobile' : ''} ${openIndex === index ? "faq-q-selected" : ""}`} 
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
            </button>
            
            <div className={`faq-answer ${isMobile ? 'faq-answer-mobile' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;