import { RootState } from "../RootReducers";

export const selectProducts= (state) => state.products.products;
// export const selectResetProducts=(state: RootState) => state.product.resetProducts;
// export const selectProductsError= (state: RootState) => state.product.error;
// export const selectProductUpload= (state: RootState) => state.product.uploadSucess;