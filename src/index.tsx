import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import HomeLayout from './Layout/HomeLayout';
import { Provider } from 'react-redux';
import Home from './Pages/Home/Home';
import { store } from './Redux/configStore';
import  List  from './Pages/List/List';
import Detail from './Pages/Detail/Detail';
import  Login  from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import Admin from './Pages/Admin/Admin';
import ResponsiveItem from './Layout/MobileTemplate';
import Header from './Component/Header/Header';
//Setup redux



export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeLayout></HomeLayout>}>
            <Route index element={<Home></Home>}></Route>
            <Route path="/list">
              <Route path=":id" element={<List></List>}></Route>
          </Route>
          
          <Route path="/detail">
              <Route path=":roomId" element={<Detail></Detail>}></Route>
          </Route>
         <Route path="/profile" element={<Profile></Profile>}></Route>
       
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

