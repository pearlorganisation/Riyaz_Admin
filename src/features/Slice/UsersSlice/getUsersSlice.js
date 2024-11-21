import { createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../../Action/Users/getUsersAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    usersInfo:{} 
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.usersInfo = action.payload;
            toast.success("Retrieved all the users data",{position:"top-right"})
        })
    }
})

export default usersSlice.reducer;