import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore'
import { http, httpNonAuth } from '../../Util/config'
export interface RegisterModel{
    email:string
    password:string,
    address:string,
    phone:string,
    name:string,
    birthday:string,
    gender:boolean,
    id:number,
    role:string
}
export interface validState{
    arrState:any
}
export interface RegisterState{
  arrRegister:RegisterModel[]
}
export interface ErrorModel{
  valid:"string"
}
export interface ErrorState{
  arrError:ErrorModel[]
}
const initialState = {
    arrState:{
      email:"",
      phone:"",
      password:"",
      birthday:"",
      address:"",
      name:"",
      
    },
    arrRegister:[],
    arrError:[]
}

const registerReducer = createSlice({
  name: "registerReducer",
  initialState,
  reducers: {
    getValid:(state:validState,action:PayloadAction)=>{
      const {id,value}:any=action.payload
      const regexEmail= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
      const regexName =
      /^[a-z A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
      const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      state.arrState[id]="Vui lòng không để trống"
      if(value!==""){
        state.arrState[id]=""
      }
      if(id==="email" && !regexEmail.test(value) ){
        state.arrState[id]="Email không đúng định dạng"    
    }
    if(id==="password" && !regexPass.test(value) ){
      state.arrState[id]="Mật khẩu dài tối thiểu 6 kí tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"  
     }
     if (id==="name" && !regexName.test(value)){
      state.arrState[id]="Vui lòng nhập tên bằng chữ" 
    }
    if(id==="phone" && !regexPhone.test(value)){
      state.arrState[id]="Vui lòng nhập số" 
    }
    },
    getRegister:(state:RegisterState,action:PayloadAction<RegisterModel[]>)=>{
      state.arrRegister=action.payload
    },
    getError:(state:ErrorState,action:PayloadAction<ErrorModel[]>)=>{
      state.arrError=action.payload
    }
  }
});

export const {getValid,getRegister,getError} = registerReducer.actions

export default registerReducer.reducer

export const RegisterApi=(data:any)=>{
  return async(dispatch:DispatchType)=>{
    try{
      const res=await  http.post("/api/auth/signup",data)
      const action:PayloadAction<RegisterModel[]>=getRegister(res.data)
      dispatch(action)
    }
    catch(err:any)
    {
      const action:PayloadAction<ErrorModel[]>=getError(err.response?.data.content)
      dispatch(action)
    }
  
  }
}