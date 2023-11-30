import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../Redux/configStore'
import { DeleteRoomManage, FixRoomManage, deleteApiUser, fixApiUser, getApiRoomManage, getApiUser } from '../../Redux/reducers/adminReducer'
import { getApiRoom } from '../../Redux/reducers/detailRoom'

type Props = {}
const data:any={name:"",gender:true,phone:"",birthday:"",role:"USER",id:"0",email:""}
const dataSearch:any={name:"",birthday:"",email:"",id:""}
const dataRoom:any={ id: "",maPhong:0,ngayDen:"0001-01-01T00:00:00",ngayDi: "0001-01-01T00:00:00",soLuongKhach: 0,maNguoiDung:""}
const Admin = (props: Props) => {
   const { arrUser,arrUserDelete, arrUserFix,arrBookRoom,arrRoomDelete,arrFixRoom }=useSelector((state:RootState)=>state.adminReducer)
   console.log(arrBookRoom)
   console.log(arrUserFix)
   console.log(arrUser)
   console.log(arrUserDelete)
   console.log(arrRoomDelete)
   console.log(arrFixRoom)
   const [search,setStateSearch]=React.useState("")
   const[display,setDisplay]:any=React.useState({})
   const [button,setButton]=React.useState("none")
   console.log(display)
   const dispatch:DispatchType=useDispatch()
   const getUserApi=()=>{
    const action= getApiUser()
    dispatch(action)
   }
  
   const deleteUserApi=(id:any)=>{
 
    
    const action=deleteApiUser(id)
    dispatch(action)
    setTimeout(()=>{
        window.location.reload()
    },1000)
   }
   const handelChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        let{value,id}=e.target
        data[id]=value
       
   }
   const handleClick=(item:any)=>{
    data["id"]=item.id
    data["email"]=item.email
    const action=fixApiUser(data["id"],data)
    dispatch(action)
    // setTimeout(()=>{
    //     window.location.reload()
    // },1000)
    console.log(data)
   }
   const getRoomApi=()=>{
    const action= getApiRoomManage()
    dispatch(action)
   }
   useEffect(()=>{
    getUserApi()
    getRoomApi()
   },[])
   const handleSearch=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    const {value}:any=e.target
    setStateSearch(value)
    
   }
   const renderSearch=()=>{
    arrUser.map((item:any)=>{
        if(item.id==search){
           dataSearch["id"]=item.id
           dataSearch["name"]=item.name
           dataSearch["birthday"]=item.birthday
           dataSearch["email"]=item.email
        
        }
    })
    setDisplay(dataSearch)
    setButton("")
   }
   const handleCloseButton=()=>{
    setButton("none")
   }
   const deleteRoomApi=(id:any)=>{
 
    
    const action=DeleteRoomManage(id)
    dispatch(action)
    setTimeout(()=>{
        window.location.reload()
    },1000)
    
   }
  
   const handelChangeRoom=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    let{value,id}=e.target
    dataRoom[id]=value
   
}
   const handleFixRoom=(item:any)=>{
    dataRoom["id"]=item.id
    dataRoom["maNguoiDung"]=item.maNguoiDung
    arrBookRoom.map((i:any)=>{
        if(i.id===dataRoom.id){
            if(dataRoom.ngayDen=="0001-01-01T00:00:00"){
                dataRoom["ngayDen"]=item.ngayDen
            }
            if(dataRoom.ngayDi=="0001-01-01T00:00:00"){
                dataRoom["ngayDi"]=item.ngayDi
            }
            if(dataRoom.soLuongKhach===0){
                dataRoom["soLuongKhach"]=item.soLuongKhach
            }
            if(dataRoom.maPhong===0){
                dataRoom["maPhong"]=item.maPhong
            }
            
           
        }
      
    })
    const action=FixRoomManage(dataRoom["id"],dataRoom)
    dispatch(action)
    setTimeout(()=>{
        window.location.reload()
    },1000)
    
    console.log(dataRoom)
   }
  return (
    <div className='container' style={{position:"relative"}}>
        <div className='row g-0'>
            <div className='col-12 col-4 col-sm-4'>
                <div className='tab'>
                   <div className='border text-center'>
                    <p>Dashboard <span><i className="fa fa-align-justify"></i></span></p>
                    <hr />
                    <ul className="nav nav-tabs d-flex flex-column border-0 align-items-start" id="myTab" role="tablist" >
                        <li className="nav-item " role="presentation">
                        <button className="nav-link active border-0 text-black" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" >Quản lý người dùng</button>
                        </li>
                        <li className="nav-item " role="presentation">
                        <button className="nav-link text-black border-0" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" >Quản lý đặt phòng</button>
                        </li>
                      
                    </ul> 
                   </div>
                   
                </div>
            </div>
            <div className='col-12 col-8 col-sm-8'>
                <div className='border py-4'>
                    <hr className='w-100' />
                    <button className='btn btn-primary'>Thêm quản trị viên</button>
                   
                    <div className="tab-content">
                        <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab"> 
                        <div className='table-responsive'>
                        <div className="input-group mt-4 mb-3">
                        <input type="text" className="form-control" placeholder="(Only ID)" aria-label="Recipient's username" aria-describedby="button-addon1" onChange={handleSearch} />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={renderSearch}>Tìm kiếm</button>
                    </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">BIRTHDAY</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">ROLE</th>
                                    <th scope="col"></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                               {arrUser?.map((item:any,index)=>{
                                return(
                                    <tr key={index} >
                                        
                                        <td><input type="text" className='border-0 outline-none ' id='id' style={{outline:"none",width:"50%"}} defaultValue={item.id} onChange={handelChange}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='name' style={{outline:"none"}} defaultValue={item.name} onChange={handelChange}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='birthday' style={{outline:"none"}} defaultValue={item.birthday} onChange={handelChange}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='email' style={{outline:"none"}} defaultValue={item.email} onChange={handelChange}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='role' style={{outline:"none"}} defaultValue={item.role} onChange={handelChange}/></td>
                                        <td><button className='bg-danger border-0 btn text-white' id={item.id} onClick={()=>deleteUserApi(item.id)}>Xóa</button></td>
                                        <td><button className=' border-0 btn btn-primary ' onClick={()=>handleClick(item)}>Sửa</button></td>
                                    </tr>
                                )
                               })}
                               
                            </tbody>
                            </table>
                        </div>
                        
                        </div>
                        <div className="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab"> 
                        <div className='table-responsive'>
                        <div className="input-group mt-4 mb-3">
                        <input type="text" className="form-control" placeholder="(Only ID)" aria-label="Recipient's username" aria-describedby="button-addon1" onChange={handleSearch} />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={renderSearch}>Tìm kiếm</button>
                    </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Mã Người Dùng</th>
                                    <th scope="col">Mã phòng</th>
                                    <th scope="col">Ngày đến</th>
                                    <th scope="col">Ngày đi</th>
                                    <th scope="col">Số lượng khách</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                               {arrBookRoom?.map((item:any,index)=>{
                                return(
                                    <tr key={index} >
                                        
                                        <td><input type="text" className='border-0 outline-none ' id='id' style={{outline:"none",width:"100%"}} defaultValue={item.id} onChange={handelChangeRoom}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='maNguoiDung' style={{outline:"none"}} defaultValue={item.maNguoiDung} onChange={handelChangeRoom}/></td>
                                        <td><input type="number" className='border-0 outline-none w-100' id='maPhong' style={{outline:"none"}} defaultValue={item.maPhong
} onChange={handelChangeRoom}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='ngayDen' style={{outline:"none"}} defaultValue={item.ngayDen} onChange={handelChangeRoom}/></td>
                                        <td><input type="text" className='border-0 outline-none w-100' id='ngayDi' style={{outline:"none"}} defaultValue={item.ngayDi} onChange={handelChangeRoom}/></td>
                                        <td><input type="number" className='border-0 outline-none w-100' id='soLuongKhach' style={{outline:"none"}} defaultValue={item.soLuongKhach} onChange={handelChangeRoom}/></td>
                                        <td><button className='bg-danger border-0 btn text-white' id={item.id} onClick={()=>deleteRoomApi(item.id)}>Xóa</button></td>
                                        <td><button className=' border-0 btn btn-primary ' onClick={()=>handleFixRoom(item)}>Sửa</button></td>
                                    </tr>
                                )
                               })}
                               
                            </tbody>
                            </table>
                        </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
        <div className='resultSearch border-2 py-2 px-4 rounded-5' style={{border:"1px solid black",position:"absolute",top:"10%" ,display:`${button}`}}>
            <h3 className='text-center'>Kết quả tìm kiếm</h3>
            <p><span className='mx-2'></span>id:{display.id}</p>
            <p><span className='mx-2'></span>Email:{display.email}</p>
            <p><span className='mx-2'></span>Name:{display.name}</p>
            <p><span className='mx-2'></span>BirthDay:{display.birthday}</p>
            <div className='text-end'>
                <button className='bg-danger border-0 rounded-2 text-white' onClick={handleCloseButton}>Đóng</button>               
            </div>
           
        </div>
        
    </div>
  )
}

export default Admin