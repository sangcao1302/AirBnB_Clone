//tsrafce
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../Redux/configStore'
import { NavLink, useParams } from 'react-router-dom'
import { RoomModel, getRoomListApi } from '../../Redux/reducers/listRoom'
import { Hidden, Zoom } from '@mui/material'
import { Carousel } from 'antd';  

type Props = {}

const List = (props: Props) => {
  const {arrRoom}=useSelector((state:RootState)=>state.listRoom)
  console.log(arrRoom)
  const params=useParams()
  const dispatch: DispatchType = useDispatch();
  const getApiRooms=()=>{
    const action=getRoomListApi(params.id)
    dispatch(action)
  }
  useEffect(()=>{
    getApiRooms()
  },[params.id])
  const contentStyle: React.CSSProperties = {
    height:"100%",
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    overflow:'hidden',
    objectFit:"cover",
    
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6" >
        {arrRoom?.map((item:RoomModel,index)=>{
            return (
              <div className="pb-5 "key={item.id}>
                <Carousel effect="fade">
                  <div>
                    <img src={item.hinhAnh} alt="" style={contentStyle}  />
                  </div>
                  <div>
                    <img src={item.hinhAnh} alt="" style={contentStyle}  />
                  </div>
                  <div>
                    <img src={item.hinhAnh} alt="" style={contentStyle}   />
                  </div>
                </Carousel>
                <div className='d-flex px-2'>
                  <NavLink to={`/detail/${item.id}`}  className='w-75 fw-semibold fs-4 text-decoration-none text-dark'>{item.tenPhong}</NavLink>
                  <p className='w-25 fs-4'><i className="fa fa-star"></i>2.8</p>
                </div>
                <div className='px-2'>
                  <p className='fs-5'>Giường:{item.giuong}  Phòng ngủ:{item.phongNgu} Phòng tắm:{item.phongTam}</p>
                  <p className='fs-5'>Giá tiền:{item.giaTien} VNĐ</p>
                </div>
                  
              </div>
            );
        })}
          
            
           
        </div>
 
        <div className="col-12 col-sm-6 col-md-6">
         <div className='w-100 h-100 pb-5'>
         <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1689689841839!5m2!1svi!2s" style={{border: 0,width:"100%",height:"100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"  title="map"  />
         </div>
          

        </div>
      </div>
    </div>
  );
}

export default List