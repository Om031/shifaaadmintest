import React, { useState } from 'react';
import './CartMobile.css'; // optional: import your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, updateQuantity } from '../../store/cart/CartSlice';
import { setIsPageExpand,setMainProduct } from '../../store/Products/ProductsSlice';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import EmptyCart from '../EmptyCart/EmptyCart';
import MyModal from '../Modal/Modal';
const DELIVERY_FEE = 40;

const CartScreenMobile = ({setStep,step,toggleDrawer,isMobile=true}) => {

 const { t, i18n } = useTranslation();
  const rootState = useSelector((state) => state);
  const [isOpen,setIsOpen]=useState(false);
  const [showC,setShowC]=useState(false);
  const dispatch=useDispatch();
 

  // Increase the quantity for a given item
  const handleIncrement = (item) => {
      dispatch(addProduct(item.productId))
  };

  // Decrease the quantity for a given item (keeping a minimum of 1)
  const handleDecrement = (item) => {
    if(item.quantity>1){
     dispatch(updateQuantity(item.productId))
    }else{
      dispatch(removeProduct(item.productId))
    }
  };

  // Calculate total price (sum of each item’s price * quantity)
  const totalPrice = (isCoupon=false)=>{
    let sum=0;
    rootState?.cart?.cart.forEach((a)=>{
      const extraDis=calcaulatePriceDiscount(a.productId);
      sum+=(handleProductPrice(a.productId)==295? (handleProductPrice(a.productId)*0.75)*a.quantity:handleProductPrice(a.productId)*a.quantity-extraDis)
    })
    
    return isCoupon? sum*(1-rootState?.cart.couponDiscount/100):sum;
  };

  // Handlers for button clicks (you can integrate your navigation or checkout logic here)
  const handleContinue = () => {
    setStep(2);
    // e.g., navigate to checkout page
  };

  const handleContinueShopping = () => {
    toggleDrawer("right",false);
    // e.g., navigate back to the products listing
  };

  const handleProductName=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.name
  }

  const handleProductPrice=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.price.toFixed(2)
  }

  const handleProductImage=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    return product.image2;
  }

  const handleInfo=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    dispatch(setMainProduct(product))
    toggleDrawer("right",false);
    dispatch(setIsPageExpand(true))
  }



  const calcaulatePriceDiscount=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    const temp=rootState?.cart?.cart.find(a=>a.productId===id);
    if(rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode)
    {
      return 0;
    }
    // if(temp.quantity>=2 ){
    //   return temp.quantity%2===0? (temp.quantity*((product.discountForTwo/100)*product.price)).toFixed(1)
    //   :(temp.quantity-1)*((product.discountForTwo/100)*product.price).toFixed(1);
    // }
    // if(product.price===295){
    //   return (temp.quantity*((25/100)*product.price)).toFixed(1);
    // }
    return 0;
  }



  return (
    <div className={isMobile? "cart-screen-mobile":"cart-screen-mobile2"}>
      <h1 className='title-cart'>{i18n.options.resources[i18n.language].cart.title}</h1>
      <IconButton
        onClick={() => toggleDrawer("right", false)}
        sx={{ position: 'absolute', top: 25, left: 30 }}
        aria-label="close drawer"
      >
         <img src={require("../../assets/images/greenClose.png")} alt={"close button"} style={{width:40}} />
      </IconButton>
      {rootState?.cart?.cart.length >0 ?
      <>
      <div className="cart-items-mobile">
        {rootState?.cart?.cart.map((item) => (
          <>
          <div key={item.id} className="cart-item-mobile">
             <img src={handleProductImage(item.productId)} alt={handleProductName(item.productId)} className="product-image1-mobile" />
             
             <div className="item-details-mobile">
               
                    <div className="item-name-mobile">{handleProductName(item.productId)}</div>
                    {handleProductPrice(item.productId)!=295? 
                    <div className="item-price-mobile" >₪{handleProductPrice(item.productId)}</div>
                    :  
                    <><div className="item-price-mobile" style={{textDecoration: 'line-through'}}>₪{handleProductPrice(item.productId)}</div>
                    <div className="item-price-mobile" >₪{handleProductPrice(item.productId)-0.25*handleProductPrice(item.productId)}</div></>
}
            </div>

           {/* <div className="item-actions">
              <a href={item.productUrl} className="info-button" onClick={()=>handleInfo(item.productId)}>Info</a>
            </div> */}

            <div className="quantity-control-mobile">
              <button onClick={() => handleDecrement(item)} className="quantity-btn-mobile">-</button>
              <span className="item-quantity-mobile">{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} className="quantity-btn-mobile">+</button>
            </div>

 

          </div>
          {(!rootState?.cart.couponDiscount>0 || !rootState?.cart.couponCode) && item.quantity>=2&& 
          <div className={isMobile? "cart-total-mobile":"cart-total-mobile2"}>
                     <div className={isMobile? 'cart-total-price':'cart-total-price2'}>
                         <div className='total-text3'> {i18n.options.resources[i18n.language].cart.discount}</div>
                         <div className='total-text4' >₪-{calcaulatePriceDiscount(item.productId)}</div>
                     </div>
           </div>  
          }    
          </>
        ))}

      </div>
   
      <div className={isMobile? "cart-buttons-mobile":"cart-buttons-mobile2"}>


      <MyModal isOpen={isOpen} onClose={()=>setIsOpen(false)}/>

      {rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode && 
      <div className={isMobile? "cart-total-mobile":"cart-total-mobile2"}>
            <div className={isMobile? 'cart-total-price':'cart-total-price2'}>
                <div className='total-text'> {i18n.options.resources[i18n.language].cart.discount}</div>
                <div className='total-text2' >{rootState?.cart.couponDiscount}</div>
            </div>
        </div>
      }

      <div className="cart-total-mobile">
            <div className={isMobile? 'cart-total-price':'cart-total-price2'}>
                <div className='total-text'> {i18n.options.resources[i18n.language].cart.totalB}</div>
                <div className='total-text2' >₪{totalPrice()}</div>
            </div>
        </div>
       {totalPrice()>250 ?(
        <div className="cart-total-mobile">
            <div className={isMobile? 'cart-total-price':'cart-total-price2'}>
                <div className='total-text'> {i18n.options.resources[i18n.language].cart.deTotal}</div>
                <div className='total-text2' > <span className='slashed'>₪40</span> ₪{0}  </div>
                
            </div>
        </div>
        ):<div className="cart-total-mobile">
            <div className={isMobile? 'cart-total-price':'cart-total-price2'}>
                <div className='total-text'> {i18n.options.resources[i18n.language].cart.deTotal}</div>
                <div className='total-text2' >  ₪{40}  </div>
                
            </div>
        </div>}
        <div className="cart-total-mobile">
            <div className={isMobile? 'cart-total-price':'cart-total-price2'}>
                <div className='total-text'> {i18n.options.resources[i18n.language].cart.total}</div>
                <div className='total-text2' >
                {rootState?.cart.couponDiscount>0 && rootState?.cart.couponCode ? <><span className='slashed'> ₪{totalPrice()}</span> ₪{totalPrice(true).toFixed(2)}</> :
                    <> ₪{totalPrice()+(totalPrice()>250 ? 0 : 40)} </>}
                  </div>
            </div>
        </div>

        <button onClick={handleContinue} className="continue-btn-mobile">{i18n.options.resources[i18n.language].cart.continue}</button>
         <div className='insideBtns'>
            <button onClick={handleContinueShopping} className="continue-shopping-btn-mobile">
              {i18n.options.resources[i18n.language].cart.conShop}
            </button>
            <button onClick={()=>setIsOpen(true)} className="continue-shopping-btn-mobile">
              {i18n.options.resources[i18n.language].cart.coupon}
            </button>
        </div>
      </div>
      </>:
           <EmptyCart toggleDrawer={() => toggleDrawer("right", false)}/>
           }
    </div>
  );
};

export default CartScreenMobile;
