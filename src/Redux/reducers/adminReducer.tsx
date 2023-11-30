import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore'
import { http, httpNonAuth } from '../../Util/config'
export interface UserModel{
    id: number,
    name: string,
    email: string
    password: string
    phone: string,
    birthday: string,
    avatar: null,
    gender: boolean,
    role: string
}

export interface UserState{
    arrUser:UserModel[]
}
export interface DeleteUserModel{
    id:number
}
export interface DeleteUserState{
    arrUserDelete:DeleteUserModel[]
}
export interface FixUserModel{
    
        id: number,
        name: string,
        email: string,
        phone: string,
        birthday: string,
        gender: true,
        role: string
      
}
export interface FixUserState{
    arrUserFix:FixUserModel[]
}
export interface RoomModel{
    "id": number,
    "maPhong": number,
    "ngayDen": string,
    "ngayDi": string,
    "soLuongKhach": number,
    "maNguoiDung": number
}
export interface RoomState{
    arrBookRoom:RoomModel[]
}
export interface DeleteRoomModel{
    id:number
}
export interface fixRoomModel{
    id: number,
    maPhong: number,
    ngayDen: string,
    ngayDi: string,
    soLuongKhach: number,
    maNguoiDung: number
}
export interface fixRoomState{
    arrFixRoom:fixRoomModel[]
}
export interface DeleteRoomState{
    arrRoomDelete:DeleteRoomModel[]
}
const initialState = {
    arrUser:[],
    arrUserDelete:[],
    arrUserFix:[],
    arrBookRoom:[],
    arrRoomDelete:[],
    arrFixRoom:[]
}

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    getUser:(state:UserState,action:PayloadAction<UserModel[]>)=>{
        state.arrUser=action.payload
    },
    deleteUser:(state:DeleteUserState,action:PayloadAction<DeleteUserModel[]>)=>{
        state.arrUserDelete=action.payload
    },
    fixUser:(state:FixUserState,action:PayloadAction<FixUserModel[]>)=>{
        state.arrUserFix=action.payload
    },
    getBookRoom:(state:RoomState,action:PayloadAction<RoomModel[]>)=>{
        state.arrBookRoom=action.payload
    },
    getDeleteRoom:(state:DeleteRoomState,action:PayloadAction<DeleteUserModel[]>)=>{
        state.arrRoomDelete=action.payload
    },
    fixRoom:(state:fixRoomState,action:PayloadAction<fixRoomModel[]>)=>{
        state.arrFixRoom=action.payload
    }
  }
});

export const {getUser,deleteUser,fixUser,getBookRoom,getDeleteRoom, fixRoom} = adminReducer.actions

export default adminReducer.reducer

export const getApiUser=()=>{
    return async(dispatch:DispatchType)=>{
        const res=await http.get("/api/users")
        const action:PayloadAction<UserModel[]>=getUser(res.data.content)
        dispatch(action)
    }
}
export const deleteApiUser=(id:any)=>{
    return async(dispatch:DispatchType)=>{
        const res=await httpNonAuth.delete(`api/users?id=${id}`)
        const action:PayloadAction<DeleteUserModel[]>=deleteUser(res.data.content)
        dispatch(action)
    }
}
export const fixApiUser=(id:any,data:any)=>{
    return async(dispatch:DispatchType)=>{
        const res=await httpNonAuth.put(`/api/users/${id}`,data)
        const action:PayloadAction<FixUserModel[]>=fixUser(res.data.content)
        dispatch(action)
    }
}
export const getApiRoomManage=()=>{
    return async(dispatch:DispatchType)=>{
        const res=await http.get("/api/dat-phong")
        const action:PayloadAction<RoomModel[]>=getBookRoom(res.data.content)
        dispatch(action)
    }
}
export const DeleteRoomManage=(id:any)=>{
    return async(dispatch:DispatchType)=>{
        const res=await http.delete(`/api/dat-phong/${id}`)
        const action:PayloadAction<DeleteRoomModel[]>=getDeleteRoom(res.data)
        dispatch(action)
    }
}
export const FixRoomManage=(id:any,data:any)=>{
    return async(dispatch:DispatchType)=>{
        const res=await http.put(`api/dat-phong/${id}`,data)
        const action:PayloadAction<fixRoomModel[]>= fixRoom(res.data.content)
        dispatch(action)
    }
}