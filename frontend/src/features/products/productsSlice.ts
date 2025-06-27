import {Product, ProductMutation} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchAllProducts, fetchProductById} from "./productsThunks.ts";

interface ProductsState {
    items: Product[];
    item: ProductMutation | null;
    fetchLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    item: null,
    fetchLoading: false,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, {payload: products}) => {
                state.items = products;
                state.fetchLoading = false;
            })

            .addCase(fetchProductById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, {payload: product}) => {
                state.item = product;
                state.fetchLoading = false;
            })
    }
});

export const productsReducer = productSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;