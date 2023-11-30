import { Action,PayloadAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { http, httpNonAuth } from '../../Util/config'
import { DispatchType } from '../configStore';
export interface RoomModel{
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
  arrRoom:RoomModel[]
}
const initialState = {
  arrRoom:[]
}

const listRoom = createSlice({
  name: "listRoom",
  initialState,
  reducers: {
    getRoomList:(state:RoomState,action:PayloadAction<RoomModel[]>)=>{
      state.arrRoom=action.payload
    }
  }
});

export const {getRoomList} = listRoom.actions

export default listRoom.reducer

export const getRoomListApi=(id:any)=>{
  return async(dispatch:DispatchType)=>{
      const res=await http.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
      const action:PayloadAction<RoomModel[]> = getRoomList(res.data.content);
      dispatch(action);
    }
  }
