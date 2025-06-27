import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosApi.ts";
import {Product, ProductMutation} from "../../../types";


export const fetchAdminAllProducts = createAsyncThunk<Product[], void>(
    'admin/fetchAdminAllProducts',
    async () => {
        const response = await axiosAPI.get<Product[]>('/admin/products', {withCredentials: true});
        return response.data;
    }
);

export const createAdminProduct = createAsyncThunk<void, ProductMutation>(
    'admin/createAdminProduct',
    async (productToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(productToAdd) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/admin/products', formData, {withCredentials: true});
    }
);

export const editAdminProduct = createAsyncThunk<
    void,
    {productToEdit: ProductMutation, id: string}
>(
    'admin/editAdminProduct',
    async ({productToEdit, id}) => {
        const formData = new FormData();

        if (productToEdit.image === null) {
            delete productToEdit.image;
        }

        const keys = Object.keys(productToEdit) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productToEdit[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.patch('/admin/products/' + id, formData, {withCredentials: true});
    }
);