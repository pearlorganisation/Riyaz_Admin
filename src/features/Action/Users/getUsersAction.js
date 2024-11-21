import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getAllUsers = createAsyncThunk(
    "get/allUsers", async(_,{ rejectWithValue })=>{
        try {
            const config ={
                headers:{
                    "Content-Type": "application/json"
                }
            }
            const { data }= await axiosInstance.get(`/users`,config);
            console.log("The registered users data", data)
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