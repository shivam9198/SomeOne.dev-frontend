import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = new createSlice({
    name: "request",
    initialState: null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        }

    }
})
 export const {addRequest} =RequestSlice.actions;
export default RequestSlice.reducer