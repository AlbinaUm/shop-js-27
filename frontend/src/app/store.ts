import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "../features/products/productsSlice.ts";
import {categoriesReducer} from "../features/categories/categoriesSlice.ts";
import {usersReducer} from "../features/users/usersSlice.ts";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, } from "redux-persist";
import {adminProductsReducer} from "../features/admin/products/productsAdminSlice.ts";


const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user', 'accessToken'],
};

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    adminProduct: adminProductsReducer,
    users:  persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;