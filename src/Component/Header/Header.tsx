import React, {
  SyntheticEvent,
  useRef,
  useEffect,
  ReactEventHandler,
  useState,
} from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useOnClickOutside } from "usehooks-ts";

import { getLogin } from "../../Redux/reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { LocationModel, getLocationApi } from "../../Redux/reducers/location";
import { USER_LOGIN, clearStorage } from "../../Util/config";
import { url } from "inspector";
type Props = {};

export default function Header({}: Props) {
  // const [value, setValue] = React.useState("1");
  const [location, setLocation] = useState("");
   const [display, setDisPlay] = useState("none");
  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };
  const { arrLocation } = useSelector((state: RootState) => state.location);
  const { arrLogin } = useSelector((state: RootState) => state.loginReducer);
  console.log(arrLogin);
  const dispatch: DispatchType = useDispatch();
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ): void => {
    e.preventDefault();

    setDisPlay("");
  };
  const navigate=useNavigate()
  const ref = useRef(null);
  const handleClickOutside = () => {
    setDisPlay("none");
  };
  useOnClickOutside(ref, handleClickOutside);
  const getLocationList = () => {
    const action = getLocationApi();
    dispatch(action);
  };
  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    arrLocation?.map((item: any) => {
      if (e.target.value === item.tinhThanh) {
        return setLocation(item.id);
      }
    });
  };
  const renderLoginLink = () => {
    if (arrLogin) {
      return (
        <>
          {/* <li className='nav-item'>
          <NavLink className="nav-link" to={"/profile"}>Hello ! {arrLogin.user.email}</NavLink>
        </li> */}
        <div>
          <button
              
              className="text-decoration-none text-black mx-2 bg-white border-0 p-0"
              onClick={() => {
              
                window.location.reload()
                clearStorage(USER_LOGIN);
                
              }}
            >
              Logout
            </button>
        </div>
        

          
        </>
      );
     
    }
  
  };
 
  useEffect(() => {
    getLocationList();
   
  }, []);
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url("../assets/image/background.jpg")`,
        minHeight: "600px",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row">
        <div className="col-12 col-sm-4 col-md-4">
          <div className="logo w-100">
            <NavLink to={"/"}>
            <img src="../assets/image/Logo.png" alt="" />

            </NavLink>
          </div>
        </div>
        <div className="col-12 col-sm-4 col-md-4">
          <div className="dropDown mt-4" >
            <div
             className="w-100 justify-content-center d-flex"
              ref={ref}
              onClick={handleClick || handleClickOutside}
            >
              <div  className=" text-white text-center rounded-pill py-3 px-3"
              style={{
                border: "1px solid gray",
                backgroundColor: "transparent",
                cursor: "pointer",
                position:"absolute"
              }}>
                <span className="mx-2">Địa điểm bất kì  |</span>
                <span className="mx-2">Tuần bất kì |</span>
                <span className="mx-2">Them khach</span>
                <span
                    style={{
                      backgroundColor: "#ff385c",
                      width: "25px",
                      height: "25px",
                    }}
                    className="rounded-circle px-2 py-1"
                  >
                    <i className="fab fa-sistrix fs-6" />
                  </span>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
            <ul
              className="nav nav-tabs rounded-pill justify-content-around py-3 w-75 "
              id="myTab"
              role="tablist"
              style={{ backgroundColor: "#EBEBEB", display: `${display}` ,position:"absolute",top:"83.2px"}}
              ref={ref}
              
            >
              <div className="row g-5">
                <div className="col-3 col-md-3 col-sm-3">
                  <li className="nav-item mt-1" role="presentation">
                    <button
                      className="nav-link active rounded-pill text-start text-dark border-0"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#message"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="false"
                    >
                      <span>Địa điểm</span>
                    <br />
                      <input
                        list="browsers"
                        id="browser"
                        style={{
                          border: "none",
                          outline: "none",
                          maxWidth: "110px",
                          backgroundColor: "transparent",
                        }}
                        onChange={handleLocation}
                        placeholder="Search place"
                      />

                      <datalist id="browsers">
                        {arrLocation?.map((item: LocationModel) => {
                          return (
                            <option key={item.id}>{item.tinhThanh}</option>
                          );
                        })}
                      </datalist>
                    </button>
                  </li>
                </div>
                
                <div className="col-3 col-md-3 col-sm-3">
                  <li className="nav-item mt-1" role="presentation">
                    <button
                      className="nav-link rounded-pill text-start text-dark"
                      id="messages-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#messages"
                      type="button"
                      role="tab"
                      aria-controls="messages"
                      aria-selected="false"
                    >
                      <span>Nhận phòng</span>
                        <br />
                      <input
                        name="checkIn"
                        type="date"
                        id="checkInDate"
                        className="bg-transparent outline-none"
                        style={{
                          border: "none",
                          outline: "none",
                          maxWidth: "110px",
                          backgroundColor: "transparent",
                        }}
                      />
                    </button>
                  </li>
                </div>
                <div className="col-3 col-md-3 col-sm-3">
                  <li className="nav-item mt-1" role="presentation">
                    <button
                      className="nav-link rounded-pill text-start text-dark"
                      id="messages-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#messages"
                      type="button"
                      role="tab"
                      aria-controls="messages"
                      aria-selected="false"
                    >
                      <span>Trả phòng</span>
                        <br />
                      <input
                        name="checkIn"
                        type="date"
                        id="checkInDate"
                        className="bg-transparent outline-none"
                        style={{
                          border: "none",
                          outline: "none",
                          maxWidth: "110px",
                          backgroundColor: "transparent",
                        }}
                      />
                    </button>
                  </li>
                </div>
                <div className="col-3 col-md-3 col-sm-3">
                  <li className="nav-item mt-1" role="presentation">
                    <button
                      className="nav-link rounded-pill text-start text-dark w-100"
                      id="person-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#person"
                      type="button"
                      role="tab"
                      aria-controls="person"
                      aria-selected="false"
                    >
                     
                      <div className="d-flex">
                        <div className="w-50">
                        <span>Khach</span>
                        <br />
                          <input
                            type="text"
                            style={{
                              border: "none",
                              outline: "none",
                              maxWidth: "110px",
                              backgroundColor: "transparent",
                            }}
                          />
                        </div>
                        <div className="icon-search mt-3 w-50 text-end">
                          <NavLink
                            className="rounded-circle mx-3 mt-2 border-0 d-inline"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at center,#ff385c 0%,#e61e4d 27.5%,#e31c5f 40%,#d70466 57.5%,#bd1e59 75%,#bd1e59 100%)",
                              width: "100px",
                              height: "100px",
                            }}
                            to={`/list/${location}`}
                          >
                            <span
                              style={{
                                backgroundColor: "#ff385c",
                                width: "25px",
                                height: "25px",
                              }}
                              className="rounded-circle px-2 py-1 text-white"
                            >
                              <i className="fab fa-sistrix fs-6" />
                            </span>
                          </NavLink>
                        </div>
                      </div>
                    </button>
                  </li>
                </div>
              </div>
            </ul>
              </div>        
           
          </div>
        </div>

        <div className="col-12 col-sm-4 col-md-4 mt-3">
          <div
            className="d-flex align-items-start justify-content-center"
            style={{ lineHeight: "75px" }}
          >
            <span className="text-white host mx-2">Trở thành chủ nhà</span>

            <span className="mx-2">
              {" "}
              <i className="fa fa-globe" style={{ color: "white" }} />
            </span>

        
            <div className="dropdown mb-2 ">
            <a className="btn  text-white border border-dark-subtle" href="#"  data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-align-justify mx-2 text-white fs-6 mt-1" />
                    <i className="fa fa-user-circle text-white fs-6 mt-1 mx-2"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" style={{lineHeight:"45px"}}>
              <div>
                <NavLink to={"/login"} className="text-decoration-none text-black mx-2" style={{display:`${arrLogin ? "none":""}`}}>
                Đăng nhập
                </NavLink>
              </div>
              <div>
                <NavLink to={"/register"} className="text-decoration-none text-black mx-2" style={{display:`${arrLogin ? "none":""}`}}>
                  Đăng ký
                </NavLink>
              </div>
       
              {renderLoginLink()}
              <div>
                <NavLink to={"/profile"} className="text-decoration-none text-black mx-2" style={{display:`${arrLogin ? "":"none"}`}}>
                   Profile
                </NavLink>
              </div>
             
            </ul>
          </div>

          </div>
  

        </div>
      </div>
     

    </div>
  );
}
