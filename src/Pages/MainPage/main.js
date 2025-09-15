import React, { useEffect,useState } from "react";
import ModernHero from '../../components/ModernHero/ModernHero'
import ModernHeader from '../../components/ModernHeader/ModernHeader'
import FloatingCart from '../../components/FloatingCart/FloatingCart'
import AnchorTemporaryDrawer from '../../Componenets/Drawer/Drawer'
import Articles from '../Articles/Articles.jsx'
import FAQ from '../FAQ/FAQ.jsx'
import "./index.css";
import ContactUs from "../ContactUs/ContactUs.jsx";
import ModernFooter from "../../components/ModernFooter/ModernFooter";
import { useDispatch, useSelector } from 'react-redux'; 
import { getProducts } from "../../store/Products/ProductServices.js";
import { setMainProduct, setProducts } from "../../store/Products/ProductsSlice.js";
import { getAreasService } from "../../store/cart/CartService.js";
import { setAreas, setCouponCode, setCouponDiscount } from "../../store/cart/CartSlice.js";
import ContactUsMobile from "../ContactUs/ContactUsMobile.jsx";
import FAQMobile from "../FAQ/FAQMobile.jsx";
import ArticlesMobile from "../Articles/ArticlesMobile.jsx";
import ModernProductShowcase from "../../components/ModernProductShowcase/ModernProductShowcase";
import WhatsAppFab from "../../Componenets/Whatapp/WhatApp.jsx";
import FIXED_AREAS from "../../constants/areas.js"
import EidPopup from "../../components/EidPopup/EidPopup.jsx";
export default function Main() {
  const dispatch=useDispatch();
  const rootState = useSelector((state) => state);
  const [showEidPopup, setShowEidPopup] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseEidPopup = () => {
    setShowEidPopup(false);
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth < 1380);

  useEffect(() => {
    dispatch(setCouponCode(''));
    dispatch(setCouponDiscount(0));
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


   const filterAreasByValidNames = (inputAreas) => {
    const validNames = FIXED_AREAS
      .map(area => area.name)
      .filter(name => typeof name === 'string' && name.trim() !== '');
  
    return inputAreas.filter(area => validNames.includes(area.name));
  };

  useEffect(()=>{
    const handleProducts=async ()=>{
      const response=await getProducts();
      const responseAreas=await getAreasService();
      dispatch(setProducts(response.data))
      dispatch(setAreas(filterAreasByValidNames(responseAreas.data)))
    }
    handleProducts();
  },[])

  useEffect(()=>{
      if(!rootState.product.mainProduct){
      dispatch(setMainProduct(rootState.product.products[0]))
      }
  },[rootState.product.products])

  return (
    <div className="main-container">
      <ModernHeader products={rootState.product.products} onCartClick={() => setOpenDrawer(true)} />
      <ModernHero id="homePage" setOpenDrawer={setOpenDrawer} />

             <div className="main-234">
        <ModernProductShowcase products={rootState.product.products} />
      </div>

       <div className="main-234">
        {isMobile? <ArticlesMobile id="articles"/>:
        <Articles id="articles" /> }
      </div>

      <div className="main-234">
      {isMobile?  <FAQMobile id="faq" /> :<FAQ id="faq" />}
      </div>

      <div className="main-234">
        {isMobile? 
        <ContactUsMobile id="contactUs"/>:
        <ContactUs id="contactUs" />}
      </div>

    <div className="main-234">
      <ModernFooter id="footer" />
    </div>
                 {!isMobile && <FloatingCart onClick={() => setOpenDrawer(true)} />}
                 <AnchorTemporaryDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                 <WhatsAppFab/>
                 <EidPopup open={showEidPopup} onClose={handleCloseEidPopup} />
    </div>
  );
}
