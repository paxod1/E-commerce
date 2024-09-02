import {createSlice  } from "@reduxjs/toolkit";


const Adminlogin =createSlice({
    name:'admin',
    initialState:{
        AdminLoginInfo:[]
    },
    reducers :{
        AdminLoginData: (state, action) => {
            state.AdminLoginInfo.push(action.payload);
        },
        AdminLogoutData:(state,action)=>{
            state.AdminLoginInfo = []
        }
    }
})

export const { AdminLoginData,AdminLogoutData} = Adminlogin.actions
export default Adminlogin.reducer