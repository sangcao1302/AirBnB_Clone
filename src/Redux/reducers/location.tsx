import {Action, createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import axios from 'axios';
import { http, httpNonAuth } from '../../Util/config';
export interface LocationModel {
    "id": number,
    "tenViTri": string
    "tinhThanh": string,
    "quocGia": string,
    "hinhAnh":string
}
export interface LocationState{
    arrLocation:LocationModel[]
}
const initialState:LocationState = {
    arrLocation:[]
}

const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocation:(state:LocationState,action:PayloadAction<LocationModel[]>)=>{
        state.arrLocation=action.payload
    }
  }
});

export const {getLocation} = location.actions

export default location.reducer
export const getLocationApi=()=>{
    return async (dispatch:DispatchType) => {
        const res = await http.get('/api/vi-tri');
        //Sau khi lấy dữ liệu từ api về ta sẽ đưa lên reducer
        //cách 1:
        // const action: PayloadAction<ProductModel[]> = {
        //     type: 'productReducer/getProductsAction',
        //     payload: res.data.content
        // }
        //cách 2: 
        const action:PayloadAction<LocationModel[]> = getLocation(res.data.content);
        dispatch(action);
    }
}