import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TranslationDropdown from "../Globe/Globe";
const SidebarIn = ({isOpen,toggleSidebar}) => {
    const { t, i18n } = useTranslation();
    const navigation=useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname==="/store"? "store":"homePage");


    
    
    // <div className="vector-6" /> //green indicator
        const scrollToSection = (sectionId) => {
          if(sectionId==="store"){
            setActiveMenu(sectionId);
            navigation("/store")
            return;
          }
          if(activeMenu==="store"){
            navigation("/");
          }
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
    <div >

      {/* Sidebar Overlay */}
      <div style={{ 
        ...styles.sidebar, 
        transform: !isOpen ? "translateX(200%)" : "translateX(70%)",
      }}>
        {/* Close Button */}
        <button style={styles.closeButton} onClick={toggleSidebar}>
          ✖
        </button>

        {/* Sidebar Content */}
        <ul style={styles.menuList}>

       
            <li  style={ activeMenu!=="homePage"? styles.contactUs:styles.contactUsActive} onClick={()=>scrollToSection("homePage")}> {i18n.options.resources[i18n.language].header.homePage}</li>
            <li  style={ activeMenu!=="aboutUs"?  styles.contactUs:styles.contactUsActive}  onClick={()=>scrollToSection("aboutUs")}> {i18n.options.resources[i18n.language].header.aboutUs}</li>
            <li  style={ activeMenu!=="articles"? styles.contactUs :styles.contactUsActive} onClick={()=>scrollToSection("articles")}> {i18n.options.resources[i18n.language].header.articles}</li>
            <li  style={ activeMenu!=="faq"?  styles.contactUs :styles.contactUsActive} onClick={()=>scrollToSection("faq")}> {i18n.options.resources[i18n.language].header.faq}</li>
            <li  style={ activeMenu!=="contactUs"? styles.contactUs :styles.contactUsActive} onClick={()=>scrollToSection("contactUs")}> {i18n.options.resources[i18n.language].header.contactUs}</li>
            <li  style={ activeMenu!=="store"? styles.contactUs :styles.contactUsActive} onClick={()=>scrollToSection("store") }> {i18n.options.resources[i18n.language].header.store}</li>
             
           
     
        </ul>
        <TranslationDropdown/>
      </div>

    </div>
  );
};

// Styles
const styles = {

  menuButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    background: "#333",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    borderRadius: "5px",
    zIndex:199,
  },
  sidebar: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "60%",
    height: "100%",
    background: "#222",
    color: "#fff",
    padding: "40px 20px",
    boxSizing: "border-box",
    transition: "transform 0.3s ease-in-out",
    zIndex: "2000",
    
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    left: "20px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
  },
  menuList: {
    listStyle: "none",
    padding: "0",
    marginTop: "50px",
  },
  menuItem: {
    padding: "15px 0",
    fontSize: "22px",
    cursor: "pointer",
    borderBottom: "1px solid #444",
  },
  contactUsActive: {
    display: "flex",
    alignItems: "flex-start",
    // justifyContent: "center",
    color: "#62cc90",
    fontFamily: "Tajawal, var(--default-font-family)",
    fontSize: "17px",
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "right",
    whiteSpace: "nowrap",
    zIndex: 11,
    marginLeft: "16px",
    marginRight: "16px",
    borderBottomStyle: "solid",
    borderBottomWidth: "4px",
    borderBottomColor: "#62cc90",
    paddingBottom: "10px",
    marginBottom:"20px"
  },
  contactUs: {
    display: "flex",
    alignItems: "flex-start",
    // justifyContent: "center",
    color: "#ffffff",
    fontFamily: "Tajawal, var(--default-font-family)",
    fontSize: "17px",
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "center",
    whiteSpace: "nowrap",
    zIndex: 11,
    marginLeft: "16px",
    marginRight: "16px",
    paddingBottom: "10px",
      marginBottom:"20px"
  },
};

export default SidebarIn;
