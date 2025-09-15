import { createSlice } from "@reduxjs/toolkit";



// Example slice (You can create more slices as per your app's need)

const initialState={
  products:[],
  mainProduct:null,
  resetProducts:0,
  error:false,
  isPageExpand:false,
}


export const ProductsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: { 
     setProducts:(state,action)=>{
        state.products=action.payload;
     },
     setResetProducts:(state)=>{
      state.resetProducts=state.resetProducts+1;
     },
     setProductsError:(state,action)=>{
      state.error=action.payload;
     },
     setMainProduct:(state,action)=>{
      state.mainProduct=action.payload;
     },
     setIsPageExpand:(state,action)=>{
      state.isPageExpand=action.payload;
     },

    },
  });
  
export const { setProducts,setResetProducts,setProductsError,setMainProduct,setIsPageExpand} =  ProductsSlice.actions;
export default ProductsSlice.reducer;