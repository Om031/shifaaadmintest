import React from "react";
import './About.css'
import { useTranslation } from "react-i18next";

const About = ({id}) => {
 const { t, i18n } = useTranslation();
    return       <div className="flex-row1" id={id}>
    <div className="image1" />
    <div className="text-container1">
      <span className="l-text-e1">{i18n.options.resources[i18n.language].about.sectionTitle}</span>
      <div className="paragraph1">
        <p>{i18n.options.resources[i18n.language].about.paragraphs[0]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[1]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[2]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[3]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[4]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[5]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[6]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[7]}</p>
        <p>{i18n.options.resources[i18n.language].about.paragraphs[8]}</p>
      </div>
      
    </div>
  </div>
};
  
  export default About;