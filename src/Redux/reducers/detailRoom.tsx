import {Action, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { httpNonAuth,http } from '../../Util/config'
import { DispatchType, RootState } from '../configStore'
import { stat } from 'fs'
import { useSelector } from 'react-redux'

export interface DetailModel{
    "id": number
    "tenPhong": string,
    "khach": number
    "phongNgu": number
    "giuong": number
    "phongTam": number
    "moTa": number
    "giaTien": number,
    "mayGiat":boolean,
    "banLa":boolean,
    "tivi":boolean,
    "dieuHoa":boolean,
    "wifi":boolean,
    "bep":boolean,
    "doXe":boolean,
    "hoBoi":boolean,
    "banUi":boolean,
    "maViTri": number,
    "hinhAnh": string
}
export interface RoomModel{
    "id": number,
    "maPhong": number,
    "ngayDen": string,
    "ngayDi": string,
    "soLuongKhach": number,
    "maNguoiDung": number
}
export interface BookModel{
    "id": number,
    "maPhong": number,
    "ngayDen": string,
    "ngayDi": string,
    "soLuongKhach": number,
    "maNguoiDung": number
}
export interface CommentModel{
    ngayBinhLuan:string
    noiDung: string
    saoBinhLuan: number
    tenNguoiBinhLuan: string
    avatar: string
}
export interface DetailState{
    arrDetailRoom:DetailModel[],
    
}
export interface RoomState{
    arrBookRoom:RoomModel[]
}
export interface BookState{
    arrDataBook:BookModel[]
}
export interface CommentState{
    arrComment:CommentModel[]
}
const initialState = {
    arrDetailRoom:[],
   arrBookRoom:[],
   arrDataBook:[],
   arrComment:[],
  
}

const detailRoom = createSlice({
  name: "detailRoom",
  initialState,
  reducers: {
    getDetailRoom:(state:DetailState,action:PayloadAction<DetailModel[]>)=>{
        state.arrDetailRoom=action.payload
    },
    getBookRoom:(state:RoomState,action:PayloadAction<RoomModel[]>)=>{
        state.arrBookRoom=action.payload
    },
    getBookData:(state:BookState  ,action:PayloadAction<BookModel[]>)=>{
        state.arrDataBook=action.payload
    },
    getComment:(state:CommentState,action:PayloadAction<CommentModel[]>)=>{
        state.arrComment=action.payload
    },
   
  }
  
});

export const {getDetailRoom,getBookRoom,getBookData,getComment} = detailRoom.actions

export default detailRoom.reducer

export const getApiDetailRoom=(id:any)=>{
    return async(dispatch:DispatchType)=>{
        const res=await http.get(`/api/phong-thue/${id}`)
        const action:PayloadAction<DetailModel[]>=getDetailRoom(res.data.content)
        dispatch(action)
    }
}
export const getApiRoom=()=>{
    return async(dispatch:DispatchType)=>{
        const res=await http.get("/api/dat-phong")
        const action:PayloadAction<RoomModel[]>=getBookRoom(res.data.content)
        dispatch(action)
    }
}
export const getApiBookRoom=(data:any)=>{
    return async(dispatch:DispatchType)=>{
        const res =await http.post("/api/dat-phong",data)
        const action:PayloadAction<BookModel[]>=getBookData(res.data.content)
        dispatch(action)
       
    }
}

export const getApiComment=(id:any)=>{
    return async (dispatch:DispatchType) => {
        const res=await http.get(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`)
        const action:PayloadAction<CommentModel[]>=getComment(res.data.content)
        dispatch(action)
    }
}
