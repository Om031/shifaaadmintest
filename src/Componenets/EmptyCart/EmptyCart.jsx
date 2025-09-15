import React from "react";
import './EmptyCart.css'

const EmptyCart = ({toggleDrawer}) => {
    return <div className="empty-container">
        <img src={require("../../assets/images/greenBag.png")} className="bagImg"/>
        <div className="empty-text">السلة فارغه</div>
        <button onClick={() => toggleDrawer()} className="payment-failed-button">
          اضافة للسلة 
        </button>
    </div>
};
  
export default EmptyCart;