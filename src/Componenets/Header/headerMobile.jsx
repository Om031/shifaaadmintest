import React,{useState,useEffect} from "react";
import "./header.css";
import { useTranslation } from "react-i18next";
import TranslationDropdown from "../Globe/Globe";
import SidebarIn from "../Sidebar/Sidebar";

export default function HeaderMobile() {

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

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      console.log("mahdjkasfnsaj")
      setIsOpen(!isOpen);
    };
  return (
    <>
    <SidebarIn isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <div className="headerContainer-mobile">
       
        
      <div  onClick={()=>toggleSidebar()} className="button-clicker">
         <img src={require("../../assets/images/Button.png")} className="logo-img-mobile-2"/>
       
   
      </div>
         
          <div className="globe2">
        <TranslationDropdown/>
        </div>
        <img src={require("../../assets/images/3e50f342-61b9-4e47-a263-c46859cf6d9e.png")} className="logo-img-mobile"/>
        
      </div>
      </>

      
     
    
  );
}
