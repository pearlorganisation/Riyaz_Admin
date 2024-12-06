import { createSlice } from "@reduxjs/toolkit"
import { addVehicle, getAllVehicles, removeVehicle } from "../../Action/Vehicles/vehicleAction"
import { toast } from "sonner"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    vehiclesData:{},
    paginationData:{}
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
            state.paginationData = action.payload.pagination
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
        .addCase(removeVehicle.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(removeVehicle.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(removeVehicle.fulfilled,(state)=>{
            state.isLoading = false
            state.isError= false
            state.isSuccess = true
            toast.success("Deleted the vehicle",{position:"top-right"})
        })
    }
})


export default vehicleSlice.reducer