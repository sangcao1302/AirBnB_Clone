import { PayloadAction, createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { DispatchType, RootState } from '../configStore';
import { http, httpNonAuth,USER_LOGIN, setStoreJson, getStoreJson, } from '../../Util/config';
import {history} from '../../index';

export interface LoginModel{
    name: string,
    email: string,
   
}
export interface LoginState{
    arrLogin:LoginModel[],
}
export interface LoginValidModel{
    valid:string
}

export interface ValidState{
    arrvalid:LoginValidModel[]
}
export interface ErrorModel{
    valid:"string"
  }
  export interface ErrorState{
    arrError:ErrorModel[]
  }
const initialState = {
    arrLogin:getStoreJson(USER_LOGIN),
    arrError:[]
}

const loginReducer = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {
    getLogin:(state:LoginState,action:PayloadAction<LoginModel[]>)=>{
        state.arrLogin=action.payload
    },
    getError:(state:ErrorState,action:PayloadAction<ErrorModel[]>)=>{
        state.arrError=action.payload
      }
  }
})
export const {getLogin,getError} = loginReducer.actions

export default loginReducer.reducer

export const getApiLogin=(data:any)=>{
    return async(dispatch:DispatchType)=>{
        try{
            const res=await http.post("/api/auth/signin",data)
            const action:PayloadAction<LoginModel[]>=getLogin(res.data.content)
            dispatch(action)
            
            setStoreJson(USER_LOGIN,res.data.content)
           if(res.data.content.user.role==="ADMIN"){
            history.push("/admin")
           }
           else{
            history.push("/")
           }
            
           
        }catch(err:any)
        {
            const action:PayloadAction<ErrorModel[]>=getError(err.response?.data.content)
            dispatch(action)
        }
       
    }
}
