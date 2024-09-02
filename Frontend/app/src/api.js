
import { LoginData } from './Redux/LoginSlice'
import { TokenRequest, basicRequest } from './AxiosCreate'

export const SignupData = async (data) => {
    try {
        const signupIfo = await basicRequest.post('/home/signup', data)
        console.log('saved signup data:', signupIfo.data)
    } catch (err) {
        console.log('err in signup')
    }
}

export const loginData = async (data, dispatch) => {
    try {
        const loginInfo = await basicRequest.post('/home/login', data)
        console.log("login sussesfully", loginInfo.data)
        dispatch(LoginData(loginInfo.data))
    } catch (err) {
        console.log(err)
    }
}

export const profileData = async (Id) => {
    try {
        const GetProfile = await TokenRequest.get(`/home/ProfileData/${Id}`)
        return GetProfile.data
    } catch (err) {
        console.log(err)

    }
}
export const updateProfile = async (data, Id) => {
    try {

        const Update = await TokenRequest.put(`/home/updateData/${Id}`, data)
        console.log(Update)
    } catch (err) {
        console.log(err)

    }
}
export const placeOrder=async(data)=>{
    console.log(data)
    try{
          await TokenRequest.post('/Admin/orderPost',data)
          console.log('susess')
    }catch(err){
        console.log(err)
    }
}

