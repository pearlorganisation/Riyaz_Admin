import { createSlice } from "@reduxjs/toolkit"
import { deleteContact, getContacts } from "../../Action/Contacts/contactAction"
import { toast } from "sonner"

const initialState ={
    isLoading: false,
    isError: false,
    isSuccess: false,
    contactsInfo:{},
    paginate:{},
    deleteContact:{
         isLoading: false,
         isError: false,
         isSuccess: false,
        }
}

const contactSlice = createSlice({
    name:"contacts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getContacts.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getContacts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError= true;
            state.isSuccess= false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(getContacts.fulfilled,(state,action)=>{
            state.isError =false;
            state.isLoading= false;
            state.isSuccess= true;
            state.contactsInfo = action.payload.data;
            state.paginate = action.payload.pagination;
            toast.success("Retrieved all the contacts",{position:"top-right"})
        })
        .addCase(deleteContact.pending,(state)=>{
            state.deleteContact = state.deleteContact ?? {};
            state.deleteContact.isLoading= true
        })
        .addCase(deleteContact.rejected,(state,action)=>{
            state.deleteContact = state.deleteContact ?? {};
            state.deleteContact.isLoading = false;
            state.deleteContact.isError= true;
            state.deleteContact.isSuccess = false;
            toast.error(action.payload,{position:"top-right"})
        })
        .addCase(deleteContact.fulfilled,(state,action)=>{
            state.deleteContact = state.deleteContact ?? {};
            state.deleteContact.isLoading = false;
            state.deleteContact.isError = false;
            state.deleteContact.isSuccess = true;
            toast.success("Successfully deleted the contact",{position:"top-center"})
        })
    }
})

export default contactSlice.reducer;