import {createSlice} from '@reduxjs/toolkit'

const companySlice=createSlice({
    name:'company',
    initialState:{
        CompanyLoginInfo:[]
    },
    reducers:{
         companyLogindata:(state,action)=>{
            state.CompanyLoginInfo.push(action.payload)
         },
         companyLogutdata:(state,action)=>{
            state.CompanyLoginInfo=[]
         }
    }
})

export const {companyLogindata,companyLogutdata}= companySlice.actions
export default companySlice.reducer