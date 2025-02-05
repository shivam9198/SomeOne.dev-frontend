import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = new createSlice({
    name: "request",
    initialState: null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
          const newReq = state.filter((e)=>e._id !== action.payload);
          return newReq;
        }

    }
})
 export const {addRequest, removeRequest} =RequestSlice.actions;
export default RequestSlice.reducer