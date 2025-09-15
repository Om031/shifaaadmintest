import React,{useState} from "react";
import './footer.css'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterMobile = ({id}) => {
    const [activeMenu, setActiveMenu] = useState("homePage");
      const { t, i18n } = useTranslation();
    const navigation=useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveMenu(sectionId);
    }
  }

  function openInstagram() {
    window.open("https://www.instagram.com/shifaa.online/", "_blank");
  }

  function openFacebook() {
    window.open("https://www.facebook.com/profile.php?id=61568774203434", "_blank");
  }


    return <>
    <div className="footer-section1" id={id}>
        <div className="container-5a">
          <div className="group-5b" />
        </div>
        
        <div className="line-62" />
        <div className="container-64">
          <div className="button-64">
            <div className="icon-65" />
            <span className="text-button">support@shifaa2.com</span>
          </div>
          <div className="button-66">
            <div className="icon-67" />
            <span className="text-button-68">972-51-255-1008+</span>
          </div>
          {/* <div className="button-69">
            <div className="icon-6a" />
            <span className="text-button-6b">Somewhere in the World</span>
          </div> */}
        </div>
        <div className="line-6c" />
        <div className="container-6dm">
          <div className="buttons-container23">
            <div className="button-6e" onClick={()=>openFacebook()}>
              <div className="icon-6f" />
            </div>
            <div className="button-70" onClick={()=>openInstagram()}>
              <div className="icon-71" />
            </div>
          </div>
          <span className="text-74">All Rights Reserved</span>
          <div className="sub-container-75">
            <span className="text-button-76" onClick={()=>navigation("/policy-privacy")}>Privacy Policy</span>
            <div className="line-77" />
            <span className="text-button-78" onClick={()=>navigation("/policy")}>Terms of Service</span>
          </div>
        </div>
      </div>
    </>;
  };
  
  export default FooterMobile;