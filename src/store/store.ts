import { configureStore } from "@reduxjs/toolkit";
import habitsReducers from "./habitSlice"

const store =  configureStore({
    reducer: {
        habits: habitsReducers
    }
})

export type RootState =ReturnType <typeof store.getState > ;
export type AppDispatch = typeof store.dispatch;

export default store;