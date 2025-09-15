import { createSlice } from "@reduxjs/toolkit";



// Example slice (You can create more slices as per your app's need)

const initialState={
  cart:[],
  customer:undefined,
  areas:[],
  creditUrl:"",
  filledCustomer: undefined,
  paymnetType:"credit",
  couponCode:"",
  couponDiscount:0,
}


export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: { 
        addProduct: (state, action) => {
            const productId = action.payload; // action.payload is the product ID
            const existingProduct = state.cart.find(item => item.productId === productId);
        
            if (existingProduct) {
                // If product exists, increase quantity
                existingProduct.quantity += 1;
            } else {
                // If product doesn't exist, add it with quantity 1
                state.cart.push({ productId, quantity: 1 });
            }
        },
            // Remove Product (completely from the cart)
    removeProduct: (state, action) => {
        const productId = action.payload;
        state.cart = state.cart.filter(item => item.productId !== productId);
      },
      // Update Product Quantity
    updateQuantity: (state, action) => {
        const productId = action.payload; // action.payload is the product ID
        const existingProduct = state.cart.find(item => item.productId === productId);
    
        if (existingProduct) {
            // If product exists, increase quantity
            existingProduct.quantity -= 1;
        } 
      },
      setCustomer:(state, action)=>{
        state.customer=action.payload;
      },

           setAreas:(state, action)=>{
        state.areas=action.payload;
      },
      setCreditUrl:(state, action)=>{
        state.creditUrl=action.payload;
      },
      setPaymentType:(state, action)=>{
        state.paymnetType=action.payload;
      },
      setFilledCustomer:(state, action)=>{
        state.filledCustomer=action.payload;
      },
      setResetCart:(state)=>{
        state.cart=[];
        state.couponCode="";
        state.couponDiscount=0;
      },
      setCouponDiscount:(state,action)=>{
        state.couponDiscount=action.payload;
      },
      setCouponCode:(state,action)=>{
        state.couponCode=action.payload;
      },
        
    },
  });
  
export const { addProduct,updateQuantity,removeProduct,setCustomer,setAreas,setCreditUrl,setPaymentType,setFilledCustomer,setResetCart,setCouponCode,setCouponDiscount} =  CartSlice.actions;
export default CartSlice.reducer;