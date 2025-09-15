import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getProducts } from "./ProductServices";
import { setProducts } from "./ProductsSlice";




export const getProductsThunk = createAsyncThunk(
    "product/products", // A unique string to identify this thunk
    async ({dispatch}) => {

      try {
        console.log("Mahmood")
        const response= await getProducts();
        // const allProducts = collectAllProducts(response.data);
        console.log(response.data);
        // if(response.status===200 && allProducts.length>0){
        //     dispatch(setProducts(allProducts));
          
        // }

      } catch (error) {
        console.log(error);
      }
    }
  );


  
// export const addProductsThunk = createAsyncThunk(
//   "product/products", // A unique string to identify this thunk
//   async ({token,req}:{token:string,req:ProductRequest},{dispatch}) => {

//     try {
     
//       const response= await addProducts(token,req);

//       if(response.status===201){
//           dispatch(setResetProducts());
//           dispatch(setProductsError(false));
//       }else{
//       dispatch(setProductsError(true));
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch(setProductsError(true));
//     }
//   }
// );


  
// export const updateProductsThunk = createAsyncThunk(
//   "product/products", // A unique string to identify this thunk
//   async ({token,req,id}:{token:string,req:ProductRequest,id:string},{dispatch}) => {

//     try {
     
//       const response= await updateProducts(token,req,id);
//       if(response.status===200){
//           dispatch(setResetProducts());
//           dispatch(setProductsError(false));
//       }
//       else{
//       dispatch(setProductsError(true));
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch(setProductsError(true));

//     }
//   }
// );


// export const disableProductsThunk = createAsyncThunk(
//   "product/products", // A unique string to identify this thunk
//   async ({token,id}:{token:string,id:string},{dispatch}) => {

//     try {
     
//       const response= await disableProducts(token,id);
//       if(response.status===200){
//           dispatch(setResetProducts());
//           dispatch(setProductsError(false));
//       }
//       else{
//         dispatch(setProductsError(true));
//         }
//     } catch (error) {
//       console.log(error);
//       dispatch(setProductsError(true));
//     }
//   }
// );

// export const UploadProductsThunk = createAsyncThunk(
//   "product/products", // A unique string to identify this thunk
//   async ({token,id,data}:{token:string,id:string,data:FormData},{dispatch}) => {

//     try {
     
//       const response= await UploadImageProduct(token,id,data);
//       if(response.status===200){
//         dispatch(setResetProducts());
//           dispatch(setUploadSuccess(true));
//           dispatch(setProductsError(false));
//       }
//       else{
//         dispatch(setProductsError(true));
//         }
//     } catch (error) {
//       console.log(error);
//       dispatch(setProductsError(true));
      
//     }
//   }
// );