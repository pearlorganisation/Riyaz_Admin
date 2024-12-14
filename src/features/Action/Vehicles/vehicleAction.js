import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllVehicles = createAsyncThunk(
    "get/allVehicles", async({page=1},{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/vehicles?page=${page}`,config);
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


/**----------------------Action for getting a single vehicle--------------------------*/
export const getVehicleById = createAsyncThunk(
    "get/vehicleById",async(id,{rejectWithValue})=>{
        try {
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.get(`/vehicles/${id}`,config)
            console.log('=============single vehicle',data)
            return data.data
        } catch (error) {
             if (error.response && error.response.data.message) {
                 return rejectWithValue(error.response.data.message);
             } else {
                 return rejectWithValue(error.message);
             }
        }
    }
)

/**-------------------------To Update the vehicle---------------------------*/
export const updateVehicleById= createAsyncThunk(
    "update/vehicle",async(userData,{rejectWithValue})=>{
        try {
            const { id } = userData
            console.log('--------------------userData', userData)
            console.log('--------------------id', id)

            const formData = new FormData();
            userData.images.forEach((image) => {
                formData.append("images", image)
            });
           for (const key in userData) {
               if (key !== "images") {
                   if (typeof userData[key] === "object" && userData[key] !== null) {
                       formData.append(key, JSON.stringify(userData[key]))
                   } else {
                       formData.append(key, userData[key])
                   }
               }
           }
           const {
               data
           } = await axiosInstance.patch(`/vehicles/${id}`,formData,{
             headers: {
                 "Content-Type": "multipart/form-data"
             }
           })
           return data.data
        } catch (error) {
              if (error.response && error.response.data.message) {
                  return rejectWithValue(error.response.data.message);
              } else {
                  return rejectWithValue(error.message);
              }
        }
    }
)