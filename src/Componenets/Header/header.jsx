import React,{useState,useEffect} from "react";
import "./header.css";
import { useTranslation } from "react-i18next";
import TranslationDropdown from "../Globe/Globe";

export default function Header() {

    const { t, i18n } = useTranslation();
    const [activeMenu, setActiveMenu] = useState("homePage");



// <div className="vector-6" /> //green indicator
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveMenu(sectionId);
      }
    }

    useEffect(() => {
      const sections = ["homePage", "aboutUs", "articles", "faq", "contactUs"];
  
      const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.6, // Trigger when 60% of the section is visible
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveMenu(entry.target.id);
          }
        });
      }, observerOptions);
  
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
  
      return () => {
        sections.forEach((id) => {
          const section = document.getElementById(id);
          if (section) observer.unobserve(section);
        });
      };
    }, []);

  return (
    
      <div className="headerContainer">
       

        <div className="logo-img" />

        <div className="header-menu">
          <div className="header-menu1">
            <div className={activeMenu!=="homePage"? "contact-us1":"contact-us1-active"} onClick={()=>scrollToSection("homePage")}> {i18n.options.resources[i18n.language].header.homePage}</div>
            <span className={activeMenu!=="aboutUs"? "contact-us1":"contact-us1-active"} onClick={()=>scrollToSection("aboutUs")}> {i18n.options.resources[i18n.language].header.aboutUs}</span>
            <span className={activeMenu!=="articles"? "contact-us1":"contact-us1-active"} onClick={()=>scrollToSection("articles")}> {i18n.options.resources[i18n.language].header.articles}</span>
            <span className={activeMenu!=="faq"? "contact-us1":"contact-us1-active"} onClick={()=>scrollToSection("faq")}> {i18n.options.resources[i18n.language].header.faq}</span>
            <span className={activeMenu!=="contactUs"? "contact-us1":"contact-us1-active"} onClick={()=>scrollToSection("contactUs")}> {i18n.options.resources[i18n.language].header.contactUs}</span>
            </div>

            <div className="side-menu">
              {/* <div className="search" /> */}
              <div className="basket" />
             {/* <div className="person" /> */}
             <TranslationDropdown/>
           </div>
        </div>

 
        


       

      </div>

      
     
    
  );
}
