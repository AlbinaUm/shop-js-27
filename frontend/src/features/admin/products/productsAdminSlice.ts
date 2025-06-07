import {createSlice} from "@reduxjs/toolkit";
import {createAdminProduct, editAdminProduct, fetchAdminAllProducts} from "./productsAdminThunks.ts";
import {RootState} from "../../../app/store.ts";
import {Product, ProductMutation} from "../../../types";

interface ProductsAdminState {
    items: Product[];
    item: ProductMutation | null;
    fetchLoading: boolean;
    createLoading: boolean;
    editLoading: boolean;
}

const initialState: ProductsAdminState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    editLoading: false,
};

export const productAdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminAllProducts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAdminAllProducts.fulfilled, (state, {payload: products}) => {
                state.items = products;
                state.fetchLoading = false;
            })
            .addCase(fetchAdminAllProducts.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createAdminProduct.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createAdminProduct.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createAdminProduct.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(editAdminProduct.pending, (state) => {
                state.editLoading= true;
            })
            .addCase(editAdminProduct.fulfilled, (state) => {
                state.editLoading = false;
            })
            .addCase(editAdminProduct.rejected, (state) => {
                state.editLoading = false;
            })
    }
});

export const adminProductsReducer = productAdminSlice.reducer;

export const selectAdminProducts = (state: RootState) => state.adminProduct.items;
export const selectAdminOneProduct = (state: RootState) => state.adminProduct.item;
export const selectAdminProductsLoading = (state: RootState) => state.adminProduct.fetchLoading;
export const selectAdminEditProductLoading = (state: RootState) => state.adminProduct.editLoading;