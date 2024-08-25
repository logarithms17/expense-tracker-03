import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import filterReducer from "./filterSlice"
import authReducer from "./authSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    filter: filterReducer
})

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token']    
}

const persistedReducer = persistReducer(authPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)