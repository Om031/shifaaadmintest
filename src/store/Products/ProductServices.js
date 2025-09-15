
import axiosInstance from "../api"

export const getProducts=async ()=>{
    const response=await axiosInstance.get('/product/products')
    return response;
  }