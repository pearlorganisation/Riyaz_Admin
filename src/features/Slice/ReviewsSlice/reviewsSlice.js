import { createSlice } from "@reduxjs/toolkit"
import { deleteReview, getReviews } from "../../Action/ReviewsAction/reviewsAction"
import { toast } from "sonner"

const initialState={
    isLoading: false,
    isError: false,
    isSuccess:false,
    reviewInfo:{},
    deleteReviewInfo:{
        isLoading: false,
        isError: false,
        isSuccess: false,}
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
        .addCase(deleteReview.pending,(state)=>{
            state.deleteReviewInfo = state.deleteReviewInfo ?? {};
            state.deleteReviewInfo.isLoading = true
        })
        .addCase(deleteReview.rejected,(state,action)=>{
            state.deleteReviewInfo = state.deleteReviewInfo ?? {};
            state.deleteReviewInfo.isLoading = false;
            state.deleteReviewInfo.isError = true;
            state.deleteReviewInfo.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
         .addCase(deleteReview.fulfilled, (state, action) => {
             state.deleteReviewInfo = state.deleteReviewInfo ?? {};
             state.deleteReviewInfo.isLoading = false;
             state.deleteReviewInfo.isError = false;
             state.deleteReviewInfo.isSuccess = true;
             toast.success("Deleted the Review", {
                 position: "top-right"
             })
         })
    }
})

export default reviewSlice.reducer;