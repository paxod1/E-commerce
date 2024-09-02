
import { PassRequest, basicRequest } from '../AxiosCreate'
import { AdminLoginData } from '../Redux/Admin'



export const loginData=async(data,dispatch)=>{
    try{
        const loginInfo=await basicRequest.post('/Admin/login',data)
        console.log("login sussesfully",loginInfo.data)
        dispatch(AdminLoginData(loginInfo.data))
      
    }catch(err){
        console.log(err)
    }
}
export const AdminprofileData=async (id)=>{
 try{
   const GetProfile=await PassRequest.get(`/Admin/AdminProfile/${id}`)
   console.log(GetProfile.data)
   return GetProfile.data
   
 }catch(err){
    console.log(err)
 }
}
export const  updateAdminProfile= async (data,id)=>{
    try{
        const UpdateProfile=await PassRequest.put(`/Admin/UpdateProfile/${id}`,data)
        console.log(UpdateProfile)
    }catch(err){
        console.log(err)
    }
}
export const GetAllUsers= async ()=>{
    try{
       
        const alldata=await PassRequest.get('/home/getalldata')
        console.log("api",alldata.data)
        return alldata.data

    }catch(err){
        console.log(err)
    }
}
 
export const DeleteUser =async (id)=>{
    try{
        await PassRequest.delete(`/home/deletedata/${id}`)
        console.log("delated user")
    }
    catch(err){
        console.log(err)
    }
}

