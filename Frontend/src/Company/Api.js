import { basicRequest } from "../AxiosCreate"
import { companyLogindata } from "../Redux/CompanySlice"


export const Addcompany =async (data)=>{
    try{
        await basicRequest.post('/company/signup',data)
       
        console.log("added admin acount")

    }catch(err){
        console.log(err)
    }
}

export const login=async(data,dispatch)=>{
    try{
       const datas= await basicRequest.post('/company/login',data)
        console.log("from api login admin:",datas.data)
        dispatch(companyLogindata(datas.data))
    }catch(err){
        console.log(err)
    }
}