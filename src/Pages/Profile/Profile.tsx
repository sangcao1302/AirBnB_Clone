import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../Redux/configStore'
import { getApiAllRoom, getApiOrder, getApiProfileId, putApiProfile } from '../../Redux/reducers/profileReducer'
import { Carousel } from 'antd';  
type Props = {}
const data:any={name:"",gender:true,phone:"",birthday:"",role:"USER",id:"0",email:""}

const Profile = (props: Props) => {
  const {arrProfile,arrPutProfile,arrOrder,arrRoomOrder}:any=useSelector((state:RootState)=>state.profileReducer)
  const [display,setDisplay]=React.useState("none")
  const [disabled,setDisabled]=React.useState(true)
  console.log(arrPutProfile)
  console.log(arrProfile)
  console.log(arrOrder)
  console.log(arrRoomOrder)
  const {arrLogin}:any=useSelector((state:RootState)=>state.loginReducer)
  console.log(arrLogin)
  const dispatch:DispatchType=useDispatch()
  const getApiProfile=()=>{
    const action=getApiProfileId(arrLogin.user.id)
    dispatch(action)
  }
  const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    let{value,id}=e.target
    data[id]=value
    data["id"]=arrProfile["id"]
    data["email"]=arrProfile["email"]
    if(data[id]!==""){
      setDisabled(false)
    }
    
  }
  const putProfileApi=()=>{

    const action=putApiProfile(data["id"],data)
    dispatch(action)
  }
  const alertSucess=()=>{
    
      return (
        <>
        <div className='col-6 col-md-6 col-sm-6 p-0 ' style={{display:`${display}`}}>
        <div className='rounded-2 text-dark border border-success text-center d-flex  justify-content-center align-items-center p-2 ' style={{backgroundColor:"#e7ffec",boxSizing:"border-box"}}>
            <div className='d-inline-block border border-success rounded-circle  bg-success text-white d-flex align-items-center justify-content-center' style={{width:"30px",height:"30px"}} >
              <i className="fa fa-check" style={{fontSize:"10px"}}></i>
            </div>
              <span className='mx-3 text-success '>Cập nhật thành công</span>
          </div>
        </div>
         
        </>

      )
  }
  const handleSubmit=(e: React.SyntheticEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    
    for (let item in data){
      if(data[item]===""){
        data[item]=arrProfile[item]
      }
    }
    putProfileApi()
    setDisplay("")
    setTimeout(()=>{
      setDisplay("none")
      setDisabled(true)
    },2000)
    
  }
  const getOrderRoomApi=()=>{ 
    const action=getApiOrder(arrLogin.user.id)
    dispatch(action)
  }
 const getAllApiRoom=()=>{
  const action=getApiAllRoom()
  dispatch(action)
 }
  useEffect(()=>{
    getApiProfile()
    getOrderRoomApi()
    getAllApiRoom()
  },[])
  const contentStyle: React.CSSProperties = {
    height:"10%",
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    overflow:'hidden',
    objectFit:"cover",
    width:"300%"
  };
  return (
    <div className="container-fulid w-screen" >
    <div className='container' >
      <div className='row'>
      <div className='col-12 col-sm-6 col-md-6' style={{marginTop:"5%"}}>
      <form style={{maxWidth:"500px",maxHeight:"100vh",position:"relative"}} className='mx-auto bg-white px-2 rounded-5' onSubmit={handleSubmit}>
        <div className='row gx-3'>
          <div className='col-6 clo-md-6 col-sm-6'>
            <p className='fs-3 fw-bold text-start' style={{color:"#1E40AF"}}>Thông tin</p>
          </div>
          {alertSucess()}
        </div>
       
      <div className="mb-3 mt-3">
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
                value={arrProfile["email"]}
                onChange={handleChange}
              />
              <span className='text-danger'></span>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                defaultValue={arrProfile["password"]}
                onChange={handleChange}
                />
                <span className='text-danger'></span>
             </div>
             <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
               defaultValue={arrProfile["name"]}
                onChange={handleChange}
               />
                <span className='text-danger'></span>
             </div>   
             
          </div>
          <div className='col-6 col-md-6 col-sm-6'>
        
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
               defaultValue={arrProfile["phone"]}
                onChange={handleChange}
                />
                 <span className='text-danger'></span>
             </div>
             <div className="mb-3">
              <label htmlFor="birthday" className="form-label">
                Ngày sinh
              </label>
              <input
                type="text"
                className="form-control"
                id="birthday"
               defaultValue={arrProfile["birthday"]}
                onChange={handleChange}
                />
                <span className='text-danger'></span>
             </div>
             <div className="">
             <label htmlFor="cars">Giới tính</label><br />

              <select className="form-select" aria-label="Default select example" id="gender"  
             defaultValue={arrProfile["gender"]}  
              onChange={handleChange} >
                
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
                
              </select>
             </div>
          </div>
        </div>
       
      </div>
     
      <div className='w-100 text-center'>
          
          <input type="submit" value="Send" disabled={disabled} className="btn btn-danger w-100"/>
      </div>
     
   
      
    </form>
      </div>
      <div className='col-12 col-sm-6 col-md-6 border-start mt-5 mb-5'>
        <div className='text-center  mx-5'>
          <p className='fs-3 fw-bold mt-2' style={{color:"#1E40AF"}}>Phòng đã đặt</p>
          <div className='row g-5'>
           {arrOrder?.map((item:any)=>{
           return arrRoomOrder?.map((i:any)=>{
              if(item.maPhong===i.id){
                return <div className='col-12 col-sm-12 col-md-12'>
                  <div className='row'>
                    <div className='col-12 col-sm-6 col-md-6'>
                    <Carousel effect="fade">
                      <div className='img'>
                        <img src={i.hinhAnh} style={contentStyle} alt="" />
                      </div>
                      <div className='img'>
                        <img src={i.hinhAnh} style={contentStyle} alt="" />
                      </div>
                      <div className='img'>
                        <img src={i.hinhAnh} style={contentStyle} alt="" />
                      </div>
                    </Carousel>
             
                    </div>
                    <div className='col-12 col-sm-6 col-md-6'>
                        <p className='text-start fs-5'>{i.tenPhong}</p>
                        <p className='text-end fs-6'><span className='fw-bold fs-5'>{i.giaTien}</span>$/tháng</p>
                    </div>
                  </div>
                </div>
              }
            })
           })}
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}

export default Profile