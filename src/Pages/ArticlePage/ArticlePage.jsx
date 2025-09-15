import React,{useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import "./ArticlePage.css";
import articlesData from '../../constants/articles';
import articlesDataEn from '../../constants/articlesEn';
import articlesDataHe from '../../constants/articlesHe';
import { useTranslation } from "react-i18next";


export default function ArticlePage() {
   const { t, i18n } = useTranslation();
    const location = useLocation();
    const {index } = location.state || {};

    const [data,setData]=useState();

    useEffect(()=>{
      if(i18n.language==="ar"){
        setData(articlesData);
      }
      if(i18n.language==="he"){
        setData(articlesDataHe);
      }
      if(i18n.language==="en"){
        setData(articlesDataEn);
      }
  
    },[i18n.language])
  
    if(!data){
      return <></>
    }
    
  return (
    <div className="article-container">
      {/* Article Display Section */}
      {index>=0&& (
        <div className="article-content">
         
          <h1 className="article-title">{data[index].title}</h1>
          <div className="image33" />
          {data[index].content.map(a=> <p className="article-text">{a}</p>)}
         
        </div>
      )}
    </div>
  );
}
