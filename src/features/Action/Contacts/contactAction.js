import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";

export const getContacts = createAsyncThunk(
    "get/contacts",async({page =1},{ rejectWithValue })=>{
        try {
            const config={
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const { data } = await axiosInstance.get(`/contacts?page=${page}`,config);
            console.log("---------------contacts data", data);
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