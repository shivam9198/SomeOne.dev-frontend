import { createSlice } from "@reduxjs/toolkit";

const feedSlice =  createSlice({
    name: "feed",
    initialState: null,
   reducers: {
    addfeed:(state,action)=>{
        return action.payload;
    },
    clearfeed:()=>{
      return null;
    },
    removefeed: (state, action)=>{
      if(!state) return state;
      const newFeed = state.filter((feed)=>feed._id!=action.payload);
      return newFeed;
    }
   }
})
export const {addfeed , clearfeed, removefeed} = feedSlice.actions;
export default feedSlice.reducer;
