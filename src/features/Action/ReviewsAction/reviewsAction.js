import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../services/axiosInterceptor";
export const getReviews = createAsyncThunk(
    "get/allReviews",async(_,{rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"applcation/json"
                }
            }
            const {data} = await axiosInstance(`/reviews/allreviews`,config)
            console.log('---------reviews data',data)
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


/**------------------To Delete a Review------------------------------*/

export const deleteReview = createAsyncThunk(
    "delete/review",async(id,{ rejectWithValue})=>{
        try {
            const config ={
                headers:{
                    "Content-Type":"application/json"
                }
            }
        const {data} = await axiosInstance.delete(`/reviews/${id}`,config);
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