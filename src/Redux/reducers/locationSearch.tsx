import {Action, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http, httpNonAuth } from '../../Util/config';
export interface PageModel{
    "id": number,
    "tenViTri": string,
    "tinhThanh": string,
    "quocGia": string,
    "hinhAnh": string
}
export interface PageState{
    arrLocationSearch:PageModel[]
}
const initialState:PageState = {
    arrLocationSearch:[]
}

const locationSearch = createSlice({
  name: "locationSearch",
  initialState,
  reducers: {
    getLocationSearch:(state:PageState,action:PayloadAction<PageModel[]>)=>{
        state.arrLocationSearch=action.payload
    }
  }
});

export const {getLocationSearch} = locationSearch.actions

export default locationSearch.reducer
export const getApiLocationSearch=()=>
{
    return async(dispatch:DispatchType)=>{
        const res=await http.get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
        const action:PayloadAction<PageModel[]>=getLocationSearch(res.data.content.data)
        dispatch(action)
    }
}