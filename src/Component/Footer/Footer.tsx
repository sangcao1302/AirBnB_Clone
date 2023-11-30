import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Footer = (props: Props) => {
 
  return (
    <div className='container-fluid py-5 '>
      <div className='row text-start '>
        <div className='col-12 col-sm-3 col-md-3'>
          <h5 className='fw-semibold'>Hỗ trợ</h5>
          <p>Trung tâm trợ giúp</p>
          <p>Air cover</p>
          <p>Hỗ trợ người khuyết tật</p>
          <p>Các tùy chọn hủy</p>
          <p>Ứng phó covid-19</p>
          <p>Báo cáo lo ngại hàng xóm</p>
        </div>
        <div className='col-12 col-sm-3 col-md-3'>
           <h5 className='fw-semibold'>Cộng đồng</h5>
           <p>Airbnb.org: nhà ở cứu trợ</p>
           <p>Chống phân biệt đối xử</p>
        </div>
        <div className='col-12 col-sm-3 col-md-3'>
            <h5 className='fw-semibold'>Đón tiếp khach</h5>
            <p>Cho thuê nhà trên Airbnb</p>
            <p>AirCover cho Chủ nhà</p>
            <p>Xem tài nguyên đón tiếp khách</p>
            <p>Truy cập diễn đàn cộng đồng</p>
            <p>Đón tiếp khách có trách nhiệm</p>
        </div>
        <div className='col-12 col-sm-3 col-md-3'>
          <h5 className='fw-semibold'>AirBnB</h5>
          <p>Trang tin tức</p>
          <p>Tìm hiểu các tính năng mới</p>
          <p>Thư ngỏ từ các nhà sáng lập</p>
          <p>Cơ hội nghề nghiệp</p>
          <p>Nhà đầu tư</p>
        </div>
      </div>
      <hr />
      <div className='row '>
        <div className='col-12 col-sm-9 col-md-9'>
          <div className='d-flex flex-wrap'>
              <div className=' text-start' style={{lineHeight:"50px" , marginRight:"12px"}}><i className="fa fa-copyright "></i> 2023 AirBnB,INC All right reversed.</div>
              <div className=''>
                <NavLink to="#" className=" text-white text-decoration-none  d-block text-start w-100" style={{lineHeight:"50px" ,marginRight:"12px"}}>
                  Quyền riêng tư
                </NavLink>
              </div>
              <div className=''>
                <NavLink to="#" className=" text-white text-decoration-none d-block text-start w-100" style={{lineHeight:"50px"}}>
                  Điều khoản
                </NavLink>
              </div>
             
              
             
          </div>
        
        </div>
        <div className='col-12 col-sm-3 col-md-3'>
        <div className='d-flex flex-wrap'>
          <div style={{lineHeight:"50px"}}><i className="fa fa-globe mt-1 text-start "></i></div>
          <div style={{lineHeight:"50px"}}> <NavLink to="#" className=" text-white text-decoration-none d-block text-start w-100 mx-2">
                Tiếng Việt(VN)
              </NavLink></div>
          <div style={{lineHeight:"50px"}}>
          <NavLink to="#" className=" text-white text-decoration-none d-block text-start w-100 mx-2">
                $ USD
              </NavLink>
          </div>
          <div style={{lineHeight:"50px"}}>
          <NavLink to="#" className=" text-white text-decoration-none d-block text-start w-100 mx-2">
                Hỗ trợ tài nguyên  <i className="fa fa-angle-up mx-1" style={{fontSize:"12px"}}></i>
              </NavLink>
          </div>
          
             
              
              
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer