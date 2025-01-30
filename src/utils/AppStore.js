import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";


const appStore = configureStore({
    reducer : { // this is a big reducer of the store which consist of small small reduces of each slices
               user :  userReducer,
    }
});

export default appStore;