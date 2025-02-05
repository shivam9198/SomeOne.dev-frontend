import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./ConnectionSlice"
import requestReducer from "./RequestSlice"



const appStore = configureStore({
    reducer : { // this is a big reducer of the store which consist of small small reduces of each slices
               user :  userReducer,
               feed : feedReducer,
         connections: connectionReducer,
         request : requestReducer,

    }
});

export default appStore;