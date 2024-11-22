import { createSlice } from "@reduxjs/toolkit"
import { getReviews } from "../../Action/ReviewsAction/reviewsAction"
import { toast } from "sonner"

const initialState={
    isLoading: false,
    isError: false,
    isSuccess:false,
    reviewInfo:{}
}

const reviewSlice = createSlice({
    name:"reviews",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getReviews.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getReviews.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError= true;
            state.isSuccess= false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getReviews.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError= false
            state.isSuccess= true
            state.reviewInfo = action.payload.data;
            toast.success("All reviews fetched",{position:"top-right"})
        })
    }
})

export default reviewSlice.reducer;