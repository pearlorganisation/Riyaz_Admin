import { createSlice } from "@reduxjs/toolkit";
import { FaS } from "react-icons/fa6";
import { login } from "../Action/authAction";
import { toast } from "sonner";

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isAdminLoggedIn: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError= true;
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.isAdminLoggedIn = true;
            toast.success("Successfully Logged In",{position:"top-right"})
        })
    }
})

export default authSlice.reducer;