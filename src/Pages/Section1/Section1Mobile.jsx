import React, { useState } from "react";
import "./Section1.css";
import Header from "../../Componenets/Header/header";
import GreenZone from "../../Componenets/GreenZone/GreenZone";
import MainText from "../../Componenets/MainText/MainText";
import AnchorTemporaryDrawer from "../../Componenets/Drawer/Drawer";
import ProductList from "../../Componenets/ProductList/ProductList";
import { useSelector } from "react-redux";
import HeaderMobile from "../../Componenets/Header/headerMobile";
import GreenZoneMobile from "../../Componenets/GreenZone/GreenZoneMobile";
import MainTextMobile from "../../Componenets/MainText/MainTextMobile";
import ProductListMobile from "../../Componenets/ProductList/ProductListMobile";
import AnchorTemporaryDrawerMobile from "../../Componenets/Drawer/DrawerMobile";



export default function Section1Mobile({id}) {

  const rootState = useSelector((state) => state);
  const [openDrawer,setOpenDrawer]=useState(false);
  const expanded=rootState.product.isPageExpand;


  return (
    
   
        <>
        <AnchorTemporaryDrawerMobile openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
        <div className="header-1111">
           <HeaderMobile/>
           <GreenZoneMobile/>
        </div>

        
           <div>
        

          <div className="first-page-container-mobile">
            {!expanded && (
            <MainTextMobile setOpenDrawer={setOpenDrawer}/>
          )}
          
          </div>
          {!expanded && (
          
            <ProductListMobile products={rootState.product.products} />
       
          )}
          <div className="loggos">
            <img src={require("../../assets/images/1.png")} alt={"close button"} style={{width:100,marginLeft:20}} />
            <img src={require("../../assets/images/2.png")} alt={"close button"} style={{width:100,marginLeft:20}} />
            <img src={require("../../assets/images/3.png")} alt={"close button"} style={{width:100,marginLeft:20}} />
          </div>
          
        </div>

  

      </>

      
     
    
  );
}
