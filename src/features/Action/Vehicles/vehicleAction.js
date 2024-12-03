import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllVehicles = createAsyncThunk(
    "get/allVehicles", async(_,{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/vehicles`,config);
            console.log('---------data of vehicle', data)
            return data;
        } catch (error) {
             if (error.response && error.response.data.message) {
                 return rejectWithValue(error.response.data.message);
             } else {
                 return rejectWithValue(error.message);
             }
        }
    }
)

export const addVehicle = createAsyncThunk(
    "add/vehicle",async(userData,{rejectWithValue})=>{
        console.log('--------------user data in action', userData)
        try {
            const formData = new FormData();
            userData.images.forEach((image) => {
                formData.append("images",image)
            });

            for(const key in userData){
                if(key !== "images"){
                    if(typeof userData[key] === "object" && userData[key] !== null){
                        formData.append(key, JSON.stringify(userData[key]))
                    }
                    else{
                        formData.append(key, userData[key])
                    }
                }
            }
            const { data } = await axiosInstance.post(`/vehicles`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
) 

/** to delete a vehicle */
export const removeVehicle = createAsyncThunk(
    "vehicle/delete",async(id,{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const data = await axiosInstance.delete(`/vehicles/${id}`,config)
            return data
        } catch (error) {
           if (error.response && error.response.data.message) {
               return rejectWithValue(error.response.data.message);
           } else {
               return rejectWithValue(error.message);
           }
        }
    }
)