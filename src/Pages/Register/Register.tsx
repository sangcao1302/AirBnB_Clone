import { type } from 'os'
import React  ,{ useEffect,useState }from 'react'
import { NavLink } from 'react-router-dom'
import { RegisterApi, getValid } from '../../Redux/reducers/registerReducer'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../Redux/configStore'

type Props = {

}
const data:any={email:"",password:"",name:"",gender:true,phone:"",adress:"",birthday:"",role:"USER",id:"0"}


const Register = (props:Props) => {
  const dispatch:DispatchType=useDispatch()
  const [button,setButton]=React.useState(true)
  const [display,setDisplay]=React.useState("none")
  const [backGround,setBackGround]=React.useState("")
 

  
  const {arrState,arrRegister,arrError}:any=useSelector((state:RootState)=>state.registerReducer)
  const [state,setState]=React.useState("")
  // const [dataRegister,setDataRegister]:any=React.useState(data)

  console.log(arrRegister)
  const handleBlur=(e:React.FocusEvent<HTMLInputElement>)=>{
    const data:any=e.target
    const action=getValid(data)
    dispatch(action)
  }
  const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
   const{value,id}:any=e.target
    data[id]=value
    if(value==="nam" && id==="gender")
    {
      data["gender"]=true
    }
    if(value==="nữ" && id==="gender")
    {
      data["gender"]=false
    }
    
    if(data["birthday"]!=="" &&  arrState[id]===""){
      setButton(false)
    }
  
   
  }
 
  const handleSubmit=(e: React.SyntheticEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    const action=RegisterApi(data)
    dispatch(action)
    setTimeout(()=>{
      setDisplay("")
      setTimeout(()=>{
        setDisplay("none")
      },5000)
     
    },0)
   
  }
  const handleChangeColor=()=>{
    if(arrError==="Email đã tồn tại !"){
      setBackGround("red")
      setState("Đăng kí không thành công")
    }
    else{
      setBackGround("#059862")
      setState("Đăng kí thành công")
    }
  }
 useEffect(()=>{
  handleChangeColor()
 })
  return (
    <div className="container-fulid w-screen" style={{backgroundImage: `url("./assets/image/backgroundairbnb.jpg")`,backgroundSize:"cover",backgroundPosition:"bottom left",height:"100vh",backgroundRepeat:"no-repeat",position:"relative" }}>
    <div className='container' >
      <div className='row'>
      <div className='col-12 col-sm-12 col-md-12' style={{marginTop:"5%"}}>
      <form style={{maxWidth:"500px",height:"560px"}} className='mx-auto bg-white px-2  rounded-5' onSubmit={handleSubmit}>
        <div className='logo text-center'>
        <img src="./assets/image/Logo.png" style={{maxWidth:"40%"}} alt="" />
        </div>
        <p className='text-center fs-6 fw-bold' style={{color:"#1E40AF"}}>Đăng ký</p>
      <div className="mb-3">
        <div className='row'>
          <div className='col-6 col-md-6 col-sm-6'>
            <div className='email'>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className='text-danger'>{arrState.email||arrError }</span>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onBlur={handleBlur}
                onChange={handleChange}
                />
                <span className='text-danger'>{arrState.password}</span>
             </div>
             <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onBlur={handleBlur}
                onChange={handleChange}/>
                <span className='text-danger'>{arrState.name}</span>
             </div>   
               <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                onBlur={handleBlur}
                onChange={handleChange}/>
                 <span className='text-danger'>{arrState.phone}</span>
             </div>
          </div>
          <div className='col-6 col-md-6 col-sm-6'>
          <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                onBlur={handleBlur}
                onChange={handleChange}/>
                 <span className='text-danger'>{arrState.address}</span>
             </div>
             <div className="mb-3">
              <label htmlFor="birthday" className="form-label">
                Ngày sinh
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                onBlur={handleBlur}
                onChange={handleChange}/>
                <span className='text-danger'>{arrState.birthday}</span>
             </div>
             <div className="">
             <label htmlFor="cars">Giới tính</label><br />

              <select className="form-select" aria-label="Default select example" id="gender" onChange={handleChange}>
                
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                
              </select>
             </div>
          </div>
        </div>
       
      </div>
     
      <div className='w-100 text-center'>
       
      
          <button type="submit" className="btn btn-danger w-100" disabled={button} >
          Đăng ký <br />
      </button>
      </div>
      
        
      
    </form>
      </div>
    </div>
    
    </div>
      <div className=' p-2 rounded-2 text-white' style={{position:"absolute",top:"2%",right:"20%",display:`${display}`,background:`${backGround}`}}>
      <i className="fa fa-check"></i><span className='mx-3'>{state}</span>
      </div>
  </div>
  )
}

export default Register