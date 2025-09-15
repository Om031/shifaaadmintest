import React, { useState } from 'react';
import './CartScreen.css'; // optional: import your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, updateQuantity } from '../../store/cart/CartSlice';
import { setIsPageExpand,setMainProduct } from '../../store/Products/ProductsSlice';
const DELIVERY_FEE = 40;
const CartScreen = ({setStep,step,toggleDrawer}) => {

  const rootState = useSelector((state) => state);

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
  const totalPrice = ()=>{
    let sum=0;
    rootState?.cart?.cart.forEach((a)=>{
      sum+=handleProductPrice(a.productId)*a.quantity
    })
    return sum;
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
    return product?.image2;
  }

  const handleInfo=(id)=>{
    const product=rootState.product?.products?.find(a=>a._id===id);
    dispatch(setMainProduct(product))
    toggleDrawer("right",false);
    dispatch(setIsPageExpand(true))
  }
  


  return (
    <div className="cart-screen">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {rootState?.cart?.cart.map((item) => (
          <div key={item.id} className="cart-item">
           <div className="item-actions">
              <a href={item.productUrl} className="info-button" onClick={()=>handleInfo(item.productId)}>Info</a>
            </div>

            <div className="quantity-control">
              <button onClick={() => handleDecrement(item)} className="quantity-btn">-</button>
              <span className="item-quantity">{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} className="quantity-btn">+</button>
            </div>

            <div className="item-details">
               
               <div className='itemContainer'>
               <div className="item-name">{handleProductName(item.productId)}</div>
               <div className="item-price">₪{handleProductPrice(item.productId)}</div>
               
               </div>
              <img src={handleProductImage(item.productId)} alt={handleProductName(item.productId)} className="product-image1" />
            </div>

          </div>
          
        ))}

      </div>
      <div className="cart-total">
        <h2>Total: ₪{totalPrice()}</h2>
      </div>
      <div className="cart-buttons">
        <button onClick={handleContinue} className="continue-btn">Continue</button>
        <button onClick={handleContinueShopping} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
