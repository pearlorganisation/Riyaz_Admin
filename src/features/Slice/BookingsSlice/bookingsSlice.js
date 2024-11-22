import { createSlice } from "@reduxjs/toolkit"
import { getBookings } from "../../Action/Bookings/bookingsAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    paginate:{},
    bookingInfo:{}
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getBookings.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getBookings.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError= true;
            state.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getBookings.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.paginate = action.payload.pagination;
            state.bookingInfo = action.payload.data;}
        )
    }
})

export default bookingSlice.reducer;