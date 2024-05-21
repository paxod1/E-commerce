import {createSlice  } from "@reduxjs/toolkit";

const Login =createSlice({
    name:'login',
    initialState:{
        LoginInfo:[]
    },
    reducers :{
        LoginData: (state, action) => {
            state.LoginInfo.push(action.payload);
        },
        LogoutData:(state,action)=>{
            state.LoginInfo = []
        }
    }
})

export const { LoginData, LogoutData} = Login.actions
export default Login.reducer