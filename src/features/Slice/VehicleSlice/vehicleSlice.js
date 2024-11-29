import { createSlice } from "@reduxjs/toolkit"
import { addVehicle, getAllVehicles } from "../../Action/Vehicles/vehicleAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    vehiclesData:{}
}

const vehicleSlice = createSlice({
    name:"vehicles",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllVehicles.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getAllVehicles.rejected,(state,action)=>{
            state.isError = true 
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getAllVehicles.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess= true
            state.isLoading = false
            state.vehiclesData = action.payload.data
            toast.success("All vehicles retrieved",{position:"top-right"})
        })
        .addCase(addVehicle.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addVehicle.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(addVehicle.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("Vehicle Added",{position:"top-right"})
        })
    }
})


export default vehicleSlice.reducer