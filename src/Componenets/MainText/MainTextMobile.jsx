import React from "react";
import "./MainText.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/cart/CartSlice";
import { useTranslation } from "react-i18next";


export default function MainTextMobile({setOpenDrawer}) {
  const rootState = useSelector((state) => state);
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch();


  const handleAddToCart=(isNow)=>{
    if(isNow){
       dispatch(addProduct( rootState.product.mainProduct._id));
       setOpenDrawer(true);
    }else{
      dispatch(addProduct( rootState.product.mainProduct._id));
    }
  }

  return (
    
      <div className="flex-row-d3-mobile">
        
        <span className="s-text1-mobile">{i18n.options.resources[i18n.language].mainText.greenTitle}
        </span>
        <span className="l-text1-mobile">
         {i18n.options.resources[i18n.language].mainText.whiteTitle} <br />

        </span>
         
         <div className="buttonContainer-mobile">
            
            <div className="green-button1-mobile" onClick={()=>handleAddToCart(true)}>
             <span className="text-811-mobile"> {i18n.options.resources[i18n.language].mainText.btn1}</span>
             </div>

            <div className="white-button1-mobile" onClick={()=>handleAddToCart(false)}>
            <span className="text111-mobile">{i18n.options.resources[i18n.language].mainText.btn2}</span>
            </div>
         
         </div>

      </div>

      
     
    
  );
}
