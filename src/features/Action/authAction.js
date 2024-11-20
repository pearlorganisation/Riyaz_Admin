import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInterceptor";

export const login = createAsyncThunk(
    "admin/login",async({email, password},{ rejectWithValue })=>{
        try {
            const config ={
                
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const {
                data
            } = await axiosInstance.post(`/auth/login`, {
                email,
                password
            }, config);
            console.log("----------logged in data", data);
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