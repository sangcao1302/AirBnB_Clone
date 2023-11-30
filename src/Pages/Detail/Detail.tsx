import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DispatchType, RootState } from "../../Redux/configStore";
import { NavLink, useParams } from "react-router-dom";
import {
  getApiBookRoom,
  getApiComment,
  getApiDetailRoom,
  getApiRoom,
} from "../../Redux/reducers/detailRoom";
import IosShareIcon from "@mui/icons-material/IosShare";
import { DatePicker, Space } from "antd";

type Props = {};
const Post: any = {
  id: 0,
  maPhong: 0,
  ngayDen: "",
  ngayDi: "",
  soLuongKhach: 0,
  maNguoiDung: 0,
};
const Detail = (props: Props) => {
  const { arrDetailRoom }: any = useSelector(
    (state: RootState) => state.detailRoom
  );
  const { arrLocation } = useSelector((state: RootState) => state.location);
  const { arrBookRoom, arrDataBook, arrComment }: any = useSelector(
    (state: RootState) => state.detailRoom
  );
  const { arrLogin }: any = useSelector(
    (state: RootState) => state.loginReducer
  );
  console.log(arrBookRoom);
  console.log(arrDataBook);
  console.log(arrLogin);
  const [checkIn, setCheckIn] = React.useState("");
  console.log(checkIn);
  const [checkOut, setCheckOut] = React.useState("");
  console.log(checkOut);
  const [customer, setCustomer] = React.useState();
  const [count, setCount]: any = React.useState(0);
  const [display,setDisPLay]=React.useState("none")
  const [notification,setNotification]=React.useState("")
  const [color,setColor]=React.useState("#198754")
  console.log(arrDetailRoom);
  const dispatch: DispatchType = useDispatch();
  const params = useParams();
  const getApiDetail = () => {
    const action = getApiDetailRoom(params.roomId);
    dispatch(action);
  };
  const getApiStateRoom = () => {
    const action = getApiRoom();
    dispatch(action);
  };
  const getCommentApi = () => {
    const action = getApiComment(params.roomId);
    dispatch(action);
  };

  const getPostRoom = () => {
    const action = getApiBookRoom(Post);
    dispatch(action);
  };

  useEffect(() => {
    getApiDetail();
    getApiStateRoom();
    getCommentApi();
  }, [params.roomId]);

  const { RangePicker }: any = DatePicker;

  const handleChange = (value: any, dateString: string) => {
    console.log(dateString[0]);
    Post.ngayDen = dateString[0];
    Post.ngayDi = dateString[1];
    console.log(dateString);
  };

  const handleCountUp = () => {
    setCount(count + 1);
  };
  const handleCountDown = () => {
    setCount(count - 1);
    if (count < 0) {
      setCount(count + 1);
    }
  };
 
  const handleClick = () => {
    if (arrLogin===undefined) {
      setDisPLay("")
      setTimeout(()=>{
        setDisPLay("none")
      },2000)
      setNotification("Vui lòng đăng nhập")
      setColor("red")
    } else {
      Post["maPhong"] = arrDetailRoom.id;
      Post["soLuongKhach"] = count;
      Post["maNguoiDung"] = arrLogin.user.id;
      getPostRoom();
      setDisPLay("")
      setNotification("Đặt phòng thành công")
      setTimeout(()=>{
        setDisPLay("none")
      },2000)
      
      setColor("#198754")
    }
    console.log();
  };

  return (
    <div className="container">
      <div className="">
        <h3 className="mx-1">{arrDetailRoom["tenPhong"]}</h3>
        <div className="row">
          <div className="col-12 col-md-10 col-sm-10 ">
            <span>
              <i className="fa fa-star"></i> 4. 64 đánh giá{" "}
              <span className="mx-2"></span>
              <i className="fa-solid fa-award "></i> Chủ nhà siêu cấp{" "}
            </span>
          </div>
          <div className="col-12 col-md-2 col-sm-2 p-0">
            <NavLink to={"#"} className="text-dark text-decoration-none">
              <IosShareIcon className="mx-2 text-dark mb-2"></IosShareIcon> Chia
              sẽ
            </NavLink>
            <NavLink
              to={"#"}
              className="text-dark text-decoration-none w-100 text-nowrap"
              style={{ marginLeft: `${window.innerWidth > 920 ? "25%" : ""}` }}
            >
              <i className="fa fa-heart mx-2 text-dark"></i>Lưu
            </NavLink>
          </div>
        </div>
        <img src={arrDetailRoom.hinhAnh} className="w-100" alt="" />
      </div>
      <div className="row mt-2">
        <div className="col-12 col-md-8 col-sm-8">
          <div className="d-flex align-items-center">
            <div className="product w-50">
              <p className="fs-3">Toàn bộ căn hộ</p>
            </div>
            <div
              className="avatar w-50 text-end"
              style={{ position: "relative" }}
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="text-gray-500"
                style={{ height: "10%", width: "10%", fill: "currentcolor" }}
              >
                <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
              </svg>
              <div
                className="text-2xl"
                style={{ position: "absolute", top: "62%", right: "1px" }}
              >
                <svg
                  viewBox="0 0 14 24"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                  style={{
                    height: "1em",
                    width: "1em",
                    display: "block",
                    fill: "currentcolor",
                  }}
                >
                  <path
                    d="m10.5 20.0005065c0 1.9326761-1.56704361 3.4994935-3.5 3.4994935s-3.5-1.5668174-3.5-3.4994935c0-1.9326762 1.5670426-3.5005065 3.5-3.5005065s3.5 1.5678303 3.5 3.5005065m-9.99486248-18.58757644-.00513752 8.13836018c0 .45796416.21682079.88992936.58880718 1.17090736l5.07730539 3.831699c.4870761.367971 1.16836618.367971 1.65647028.0009994l5.08141685-3.8266984c.3719859-.2789784.5898342-.7109444.5908612-1.16790827.0010271-1.75186288.0041101-6.21051146.0051391-8.14035983 0-.50396002-.4202834-.91292822-.9392158-.91292822l-11.11643181-.00699945c-.51790391-.00099942-.93818728.40796878-.93921487.91292823"
                    fill="#fff"
                  />
                  <path
                    d="m12 9.5-5-3.70124468 5-3.79875532zm-6.1292309 9.187485c-.52182677.3180834-.8707691.8762459-.8707691 1.5144379 0 .9937534.83703449 1.7980771 1.870162 1.7980771.81806646 0 1.50434636-.5065007 1.75946763-1.2095239z"
                    fill="#ffb400"
                  />
                  <path d="m12 9.5-5 3.75-5-3.75v-7.5z" fill="#ff5a5f" />
                  <path
                    d="m7 24c-2.2060547 0-4-1.7939453-4-3.9990234 0-2.2060547 1.7939453-4.0009766 4-4.0009766s4 1.7949219 4 4.0009766c0 2.2050781-1.7939453 3.9990234-4 3.9990234zm0-7c-1.6542969 0-3 1.3466797-3 3.0009766 0 1.6533203 1.3457031 2.9990234 3 2.9990234s3-1.3457031 3-2.9990234c0-1.6542969-1.3457031-3.0009766-3-3.0009766zm.0039062-1.8242188c-.4560547 0-.9121094-.1064453-1.2617188-.3164062l-5.0458984-3.8642578c-.4697265-.3642578-.696289-.8525391-.696289-1.4951172v-8c.0009766-.3730469.1679688-.7529297.4580078-1.0429688.2900391-.2905273.6689453-.4570312 1.0410156-.4570312h.0019531 10.9990235c.7851562 0 1.5.7148438 1.5 1.5v7.9277344c-.0009766.6762695-.2421875 1.2177734-.6953125 1.5668945l-5.0009766 3.8325195c-.3505859.2333985-.8251953.3486328-1.2998047.3486328zm-5.5058593-14.1757812c-.1044922 0-.2324219.0625-.3330078.1635742-.1015625.1020508-.1650391.230957-.1650391.3374024v7.9990234c0 .3305664.0888672.5341797.3066406.703125l4.9970703 3.8310547c.3330078.1953125 1.0859375.2001953 1.4208984-.0205078l4.9716797-3.8125c.2001954-.1542969.3027344-.4155274.303711-.7749024v-7.9267578c0-.2285156-.2714844-.4995117-.5-.4995117h-11-.0009766s0 0-.0009765 0z"
                    fill="#484848"
                  />
                </svg>
              </div>
            </div>
          </div>

          <hr />
          <div className="d-flex">
            <div className="px-3 mt-2">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "inline-block",
                  height: 24,
                  width: 24,
                  fill: "currentcolor",
                }}
              >
                <path d="m16 17c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm9.6666667-18.66666667c1.0543618 0 1.9181651.81587779 1.9945142 1.85073766l.0054858.14926234v6.38196601c0 .70343383-.3690449 1.35080636-.9642646 1.71094856l-.1413082.0779058-9.6666667 4.8333334c-.5067495.2533747-1.0942474.2787122-1.6171466.0760124l-.1717078-.0760124-9.66666666-4.8333334c-.62917034-.3145851-1.04315599-.93418273-1.09908674-1.62762387l-.00648607-.16123049v-6.38196601c0-1.05436179.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm0 2h-19.33333337v6.38196601l9.66666667 4.83333336 9.6666667-4.83333336z" />
              </svg>
            </div>
            <div className="mx-3">
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg ">
                Sungwon là Chủ nhà siêu cấp
              </h3>
              <p className="tracking-wider text-gray-500">
                Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá
                cao và là những người cam kết mang lại quãng thời gian ở tuyệt
                vời cho khách.
              </p>
            </div>
          </div>

          <div className="d-flex ">
            <div className="px-3 mt-2">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'inline-block', height: 24, width: 24, fill: 'currentcolor'}}><path d="M16 0c6.627 0 12 5.373 12 12 0 6.337-3.814 12.751-11.346 19.257L16 31.82l-1.076-.932C7.671 24.509 4 18.218 4 12 4 5.423 9.397 0 16 0zm0 2C10.504 2 6 6.525 6 12c0 5.44 3.249 11.118 9.831 17.02l.169.149.576-.518c6.178-5.65 9.293-11.092 9.42-16.318L26 12c0-5.523-4.477-10-10-10zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>

              
            </div>

            <p className="mx-3">
              <span className="d-block fw-bold fs-5 text-gray-800 text-base sm:text-lg ">
                Địa điểm tuyệt vời
              </span>
              90% khách gần đây đã xếp hạng 5 sao cho vị trí này.
            </p>
          </div>
          <div className="d-flex">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "inline-block",
                height: 24,
                width: 54,
                fill: "currentcolor",
                marginTop: "1%",
              }}
            >
              <path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z" />
            </svg>

            <p className="mx-3 fw-bold fs-5">Miễn phí hủy trong 48 giờ.</p>
          </div>
          <hr />
          <div className="airCover">
            <div className="img w-100">
              <img
                src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
                style={{ maxWidth: "30%" }}
                alt=""
              />
            </div>

            <p className="mt-4 text-dark">
              Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà
              hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề
              khác như sự cố trong quá trình nhận phòng.
            </p>
            <NavLink to={"#"} className="text-dark fs-5 fw-bold">
              Tìm hiểu thêm
            </NavLink>
          </div>
          <hr />
          <div className=" mt-2 p-0">
            <h3>Tiện nghi</h3>
            <div className="row ">
              <div className="col-12 col-sm-6 col-md-6 text-start">
                <p>
                  <span>
                    {arrDetailRoom.tivi === true ? (
                      <i className="fa fa-tv"></i>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="mx-4">
                    {arrDetailRoom.tivi === true ? "Tivi" : ""}
                  </span>
                </p>
                <p>
                  <span>
                    {arrDetailRoom.hoBoi === true ? (
                      <i className="fa fa-parking"></i>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="mx-4">
                    {arrDetailRoom.doXe === true ? "Đỗ xe" : ""}
                  </span>
                </p>
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <p
                  style={{
                    display: `${arrDetailRoom.bep === true ? "" : "none"}`,
                  }}
                >
                  <span>
                    {arrDetailRoom.bep === true ? (
                      <i className="fa fa-tv"></i>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="mx-4">
                    {arrDetailRoom.bep === true ? "Bếp" : ""}
                  </span>
                </p>
                <p>
                  <span>
                    {arrDetailRoom.hoBoi === true ? (
                      <i className="fa fa-swimming-pool"></i>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="mx-4">
                    {arrDetailRoom.hoBoi === true ? "Hồ bơi" : ""}
                  </span>
                </p>
              </div>
            </div>
            <button className="p-2 text-dark bg-white rounded-2 mb-5">
              Hiển thị tất cả tiện nghi
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 col-sm-4">
          <div className="alert d-flex justify-content-end p-0" >
            <p className="text-white text-end text-end px-3 py-1 fs-6 rounded-2" style={{display:`${display}`,backgroundColor:`${color}`}}>{notification}</p>      
          </div>    
          <div
            className="p-4 rounded-5 w-100 mt-2"
            style={{
              border: "1px solid black",

              position: "relative",
            }}
          >
            <div className="headerDetail mx-2 d-flex mt-4">
              <h5 className="w-50">{arrDetailRoom.giaTien}$/đêm</h5>
              <span className="text-end w-50">
                <i className="fa fa-star text-end"></i> 4. 64
                <span className="mx-2">(18 đánh giá)</span>
              </span>
            </div>
            {/* <div
              className="d-flex "
              style={{
                position: "absolute",
                top: "26%",
                zIndex: "999",
                right: "34%",
              }}
            >
              <span className=" w-100 fw-bold">Trả Phòng</span>
            </div>
            <div
              className="d-flex "
              style={{
                position: "absolute",
                top: "26%",
                zIndex: "999",
                left: "15.9%",
              }}
            >
              <p className=" w-100 fw-bold">Nhận Phòng</p>
            </div> */}

            <Space
              direction="vertical"
              style={{ border: "1px solid black" }}
              className="text-center mt-5 mb-2 rounded-5 w-100"
            >
              <RangePicker
                style={{
                  width: "80%",

                  textAlign: "center",
                  margin: "auto",
                }}
                className=" border-0 mt-3  rounded-1 py-3 px-2 "
                // defaultValue={[dayjs(item.ngayDen, dateFormat),dayjs(item.ngayDi, dateFormat)]}
                onChange={handleChange}
              />

              <div
                className="countPerson mb-2 text-center border-0 w-100 border-top border-black"
                style={{ border: "1px solid black", width: "52.4%" }}
              >
                <p className="text-start mx-5 fw-bold fs-6 mt-2">KHÁCH</p>
                <button
                  className="mx-5 rounded-1 mb-2 border-0"
                  style={{ width: "30px", height: "30px" }}
                  onClick={handleCountDown}
                >
                  -
                </button>
                {/* {arrBookRoom?.map((item:any)=>{
                  if(item.maPhong===arrDetailRoom.id){
                    <span className="fs-5">{item.soLuongKhach}</span>
                  }
                })} */}
                <span className="">{count}</span>
                <button
                  className="mx-5 rounded-1 mb-2 border-0"
                  style={{ width: "30px", height: "30px" }}
                  onClick={handleCountUp}
                >
                  +
                </button>
              </div>
            </Space>

            <div className="btn-submit text-center mx-3">
              <button
                className="btn text-white bg-danger text-center mb-2"
                style={{ width: "100%" }}
                onClick={handleClick}
              >
                Đặt phòng
              </button>
              <p className="mt-2">Bạn vẫn chưa bị trừ tiền</p>
            </div>
            <div className="d-flex">
              <p></p>
              <p></p>
            </div>
            <div className="d-flex w-100">
              <NavLink to={"#"} className="w-50 text-start">
                Phí dịch vụ
              </NavLink>
              <p className="w-50 text-end">0$</p>
            </div>
          </div>
        </div>
      </div>
      <div className="comment mt-5">
        <h4>Bình Luận</h4>
        <div className="row">
          {arrComment?.map((item: any) => {
            return (
              <div className="col-12 col-md-6 col-sm-6">
                <div className="d-flex">
                  <div className="avatar">
                    <img
                      src={item.avatar}
                      style={{ width: "50px", height: "50px" }}
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <div className="name w-50 mx-5">
                    <p className="fw-bold">
                      {item.tenNguoiBinhLuan} <br />
                      <span className="fw-normal">{item.ngayBinhLuan}</span>
                    </p>
                  </div>
                </div>
                <p className="mt-3">{item.noiDung}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
