import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name :"user", // name of the slice
    initialState : null, // initial state of the slice
    reducers : { // list of reducers
        addUser : (state,action)=>{ // action
            return action.payload;
        },
        removeUser:(state ,action)=>{
            return null;
        }
    }
})
export const{addUser,removeUser} = userSlice.actions;
export default userSlice.reducer