import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore'
import { http, httpNonAuth } from '../../Util/config'
import { RoomModel } from './listRoom'
export interface ProfileModel{
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
export interface ProfileState{
  arrProfile:ProfileModel[]
}
export interface PutProfileModel{
 id: number,
 name:string,
 email:string,
 phone:string,
 birthday:string
 gender: true,
 role:string
}
export interface PutProfileState{
  arrPutProfile:PutProfileModel[]
}
export interface orderIdModel{
      id: number
      maPhong: number,
      ngayDen:string
      ngayDi: string,
      soLuongKhach: number,
      maNguoiDung: number
}
export interface orderIdState{
  arrOrder:orderIdModel[]
}
export interface roomModel{
  "id": number,
  "tenPhong": string
  "khach": number
  "phongNgu":number
  "giuong": number
  "phongTam": number
  "moTa": string
  "giaTien": number
  "mayGiat": boolean
  "banLa": boolean
  "tivi": boolean
  "dieuHoa": boolean
  "wifi": boolean
  "bep": boolean
  "doXe": boolean
  "hoBoi": boolean
  "banUi": boolean
  "maViTri": number
  "hinhAnh": string
}
export interface RoomState{
  arrRoomOrder:roomModel[]
}
const initialState = {
  arrProfile:[],
  arrPutProfile:[],
  arrOrder:[],
  arrRoomOrder:[]
}

const profileReducer = createSlice({
  name: "profileReducer",
  initialState,
  reducers: {
    getProfile:(state:ProfileState,action:PayloadAction<ProfileModel[]>)=>{
      state.arrProfile=action.payload
    },
    putProfile:(state:PutProfileState,action:PayloadAction<PutProfileModel[]>)=>{
      state.arrPutProfile=action.payload
    },
    getOrder:(state:orderIdState,action:PayloadAction<orderIdModel[]>)=>{
      state.arrOrder=action.payload
    },
   getAllRoom:(state:RoomState,action:PayloadAction<roomModel[]>)=>{
    state.arrRoomOrder=action.payload
   }
  }
});

export const { getProfile,putProfile,getOrder,getAllRoom} = profileReducer.actions

export default profileReducer.reducer

export const getApiProfileId=(id:any)=>{
  return async(dispatch:DispatchType)=>{
    const res=await http.get(`/api/users/${id}`)
    const action:PayloadAction<ProfileModel[]>=getProfile(res.data.content)
    dispatch(action)
  }
}

export const putApiProfile=(id:any,data:any)=>{
  return async(dispatch:DispatchType)=>{
    const res=await http.put(`/api/users/${id}`,data)
    const action:PayloadAction<PutProfileModel[]>=putProfile(res.data.content)
    dispatch(action)
  }
}

export const getApiOrder=(id:any)=>{
  return async(dispatch:DispatchType)=>{
    const res= await http.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`)
    const action:PayloadAction<orderIdModel[]>=getOrder(res.data.content)
    dispatch(action)
  }
}
export const getApiAllRoom=()=>{
  return async(dispatch:DispatchType)=>{
    const res=await http.get("/api/phong-thue")
    const action:PayloadAction<roomModel[]>=getAllRoom(res.data.content)
    dispatch(action)
  }
}