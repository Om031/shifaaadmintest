import React, { useState } from "react";
import "./Section1.css";
import Header from "../../Componenets/Header/header";
import GreenZone from "../../Componenets/GreenZone/GreenZone";
import MainText from "../../Componenets/MainText/MainText";
import AnchorTemporaryDrawer from "../../Componenets/Drawer/Drawer";
import ProductList from "../../Componenets/ProductList/ProductList";
import { useSelector } from "react-redux";
import AnchorTemporaryDrawerMobile from "../../Componenets/Drawer/DrawerMobile";



export default function Section1({id}) {

  const rootState = useSelector((state) => state);
  const [openDrawer,setOpenDrawer]=useState(false);
  const expanded=rootState.product.isPageExpand
  console.log(rootState);


  return (
    
      <div className="flex-row-d2" id={id}>
        <AnchorTemporaryDrawerMobile openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} isMobile={false}/>
        <Header/>
        <div className="first-page-container">
          {!expanded && (
          <MainText setOpenDrawer={setOpenDrawer}/>
        )}
          <GreenZone/>
        </div>
        {!expanded && (
         <div className="products-container">
          <ProductList products={rootState.product.products} />
  
        </div>
        )}
        <div className="loggos2">
            <img src={require("../../assets/images/1.png")} alt={"close button"} style={{width:100,marginLeft:20}} />
            <img src={require("../../assets/images/2.png")} alt={"close button"} style={{width:100,marginLeft:20}} />
            <img src={require("../../assets/images/3.png")} alt={"close button"} style={{width:100,marginLeft:20}} />
          </div>

        {/* <div className="group-9" />
         <div className="arrow" />
        <div className="group-a" />
        <div className="group-b" />
        <div className="group-c" />
        <div className="arrow-d" />  */}

      </div>

      
     
    
  );
}
