import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./adminApi";


const reduxStore = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,

    },
    middleware: def => [...def(), adminApi.middleware]
})
export default reduxStore