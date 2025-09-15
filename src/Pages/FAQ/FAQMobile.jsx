import React,{useState,useEffect} from "react";
import FAQItem from "./FAQItem";
import FAQItemMobile from "./FAQItemMobile";
import "./FAQ.css";
import FAQS from "../../constants/faq";
import FAQSHE from "../../constants/faqHe"; 
import FAQSEN from "../../constants/faqEn";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



const FAQMobile = ({id}) => {
  // Optionally, split the FAQs into two rows:
  const { t, i18n } = useTranslation();
  const [data,setData]=useState();
  const navigate=useNavigate();


  const row1 = data?.slice(0, 2);
  const row2 = data?.slice(2, 4);


  useEffect(()=>{
    if(i18n.language==="ar"){
      setData(FAQS);
    }
    if(i18n.language==="he"){
      setData(FAQSHE);
    }
    if(i18n.language==="en"){
      setData(FAQSEN);
    }

  },[i18n.language])



  if(!data){
    return <></>
  }
  return (
    <div className="container-3e1" id={id}>
        

      <div className="flex-row-7d11-mobile1">
        <div className="text-container-7e-mobile">
          <span className="heading-7f-mobile">{i18n.options.resources[i18n.language].faq.title}</span>
          <span className="long-content-81-mobile">
          {i18n.options.resources[i18n.language].faq.secondTitle}
          </span>
        </div>
 
        <div className="rectangle-80-mobile" />
      </div>
 
      {/* <div className="items-container-mobile"> */}
        <div className="row-mobile">
          {row1.map((item) => (
            <FAQItemMobile
              key={item.id}
              containerClass={"faq-item-mobile"}
              heading={item.question}
              lineClass={item.question}
              paragraph={item.answer}
            />
          ))}
        {/* </div> */}
        {/* <div className="linear" /> */}
      </div>
      <div className="button-1" onClick={()=>navigate("faq")}>
        <span className="view-more">
        {i18n.options.resources[i18n.language].faq.btn}</span>
        <div className="icon-4f" />
      </div>
    </div>
  );
};

export default FAQMobile;
