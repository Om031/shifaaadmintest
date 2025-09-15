import React,{useState} from "react";
import "./StorePage.css";
import HeaderMobile from "../../Componenets/Header/headerMobile";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/cart/CartSlice";
import AnchorTemporaryDrawerMobile from "../../Componenets/Drawer/DrawerMobile";
import { useNavigate } from "react-router-dom";

export default function StorePage() {
    const rootState = useSelector((state) => state);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [openDrawer,setOpenDrawer]=useState(false);

    const handleAddToCart=(id)=>{
         dispatch(addProduct(id));
    }

    return (
      <div className="main-container1">
           <AnchorTemporaryDrawerMobile openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/>
           <div className="header-11111">
              <HeaderMobile/>
           </div>

      <div className="titleContainer">
          <div className="title">المتجر</div>
          <div className="secondTitle">منتجات طبيعية مختارة بعناية لصحتك</div>  
      </div>  

      <div className="flex-row-ea">
        {rootState.product.products.map(a=>
            <div className="product-default-sale">
                <div className="green-section" 
                onClick={()=>      navigate("/product", {
        state: {
          product:a
        },})}>
                   
                   <img className="free-pill-bottle-mockup11111"  src={a?.image} alt={a?.name}/>
                </div>
                <div className="white-section">
                 
                     <div className="focus-shape">{a?.name}</div>
                    <div className="price">₪{a?.price}</div>
                    <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"100%"}}>
                        <div className="green-button1111" onClick={()=>handleAddToCart(a?._id)}>
                            <span className="text">اضافة للسلة </span>
                        </div> 
                    </div>
                </div>
            </div>
        )}
      </div>


    </div>
  );
}
