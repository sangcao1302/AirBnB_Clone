import {configureStore} from '@reduxjs/toolkit'
import location from './reducers/location';
import locationSearch from './reducers/locationSearch';
import listRoom from './reducers/listRoom';
import detailRoom from './reducers/detailRoom';
import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';
import profileReducer from './reducers/profileReducer';
import adminReducer from './reducers/adminReducer';

export const store = configureStore({
    reducer: {
        location:location,
        locationSearch:locationSearch,
        listRoom:listRoom,
        detailRoom:detailRoom,
        loginReducer:loginReducer,
        registerReducer:registerReducer,
        profileReducer:profileReducer,
        adminReducer:adminReducer
    }
});

//Lấy ra kiểu dữ liệu của store 
export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;

