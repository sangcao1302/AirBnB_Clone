import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/configStore';
import { getApiLogin } from '../../Redux/reducers/loginReducer';
import {history} from '../../index';

type Props = {}
const data:any={
  email:"",
  password:""
}
const Login = (props: Props) => {
  const {arrLogin,arrError}:any=useSelector((state:RootState)=>state.loginReducer)
  console.log(arrLogin)
  const dispatch:DispatchType=useDispatch()
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    const {id,value}:any=e.target
      data[id]=value
  }
  const getLoginApi=()=>{
    const action=getApiLogin(data)
    dispatch(action)
  }
  const handleSubmit=(e: React.SyntheticEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    getLoginApi()
   
  }
  
  return (
    <div className="container-fulid w-screen h-screen" style={{backgroundImage: `url("./assets/image/backgroundairbnb.jpg")`,backgroundSize:"cover",backgroundPosition:"bottom left",height:"100vh",backgroundRepeat:"no-repeat" }}>
      <div className='container' >
        <div className='row'>
        <div className='col-12 col-sm-12 col-md-12' style={{marginTop:"15%"}}>
        <form style={{maxWidth:"520px"}} className='mx-auto bg-white px-2 rounded-5' onSubmit={handleSubmit}>
          <div className='logo text-center'>
          <img src="./assets/image/Logo.png" style={{width:"50%"}} alt="" />
          </div>
          <p className='text-center fs-1 fw-bold' style={{color:"#1E40AF"}}>Đăng nhập</p>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
        
          />
          
         <span className='text-danger'>{arrError}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className='row'>
          <div className='col-12 col-sm-8 col-md-9 '>
            <NavLink to={"#"} className="text-decoration-none text-nowrap" style={{color:"blue"}}>Quên mật khẩu</NavLink>
          </div>
          <div className='col-12 col-sm-4 col-md-3 '>
            <button type="submit" className="btn btn-danger text-nowrap">
            Đăng nhập
        </button>
          </div>
        </div>
        <div className='help py-3'>
          <p className='text-center mt-5 '>Chưa có tài khoản <NavLink to={"/register"} style={{color:"#F43F5E",cursor:"pointer"}}>Đăng ký ngay</NavLink></p>
        </div>
          
        
      </form>
        </div>
        </div>
      
      </div>
    </div>
  );
}

export default Login
