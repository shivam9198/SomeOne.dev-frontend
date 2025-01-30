import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";


const appStore = configureStore({
    reducer : { // this is a big reducer of the store which consist of small small reduces of each slices
               user :  userReducer,
               feed : feedReducer,
    }
});

export default appStore;