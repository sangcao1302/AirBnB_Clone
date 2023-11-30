import React, {
    SyntheticEvent,
    useRef,
    useEffect,
    ReactEventHandler,
    useState,
  } from "react";
  import { NavLink } from "react-router-dom";
  
  import { useOnClickOutside } from "usehooks-ts";
  
  import { getLogin } from "../../Redux/reducers/loginReducer";
  import { useDispatch, useSelector } from "react-redux";
  import { DispatchType, RootState } from "../../Redux/configStore";
  import { LocationModel, getLocationApi } from "../../Redux/reducers/location";
  import { USER_LOGIN, clearStorage } from "../../Util/config";
  type Props = {};
  
  export default function HeaderMobile({}: Props) {
    const [location, setLocation] = useState("");
    const [display, setDisPlay] = useState("none");
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
            <NavLink
                to={"/login"}
                className="text-decoration-none text-black mx-2"
                onClick={() => {
                  clearStorage(USER_LOGIN);
                }}
              >
                Logout
              </NavLink>
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
        <div className="row p-0">
        
          <div className="col-12 col-sm-12 col-md-12 p-0">
            <div className="dropDown mt-4 w-100">
              <div
                className=" text-white text-center p-3 d-flex w-100 justify-content-center"
              
                ref={ref}
                onClick={handleClick || handleClickOutside}
              >
                {/* <div className="row text-center">
                  <div className="col-4">
                    <div><span className="text-nowrap" style={{fontSize:"14px"}}>Địa điểm bất kì</span></div>
                  </div>
                  <div className="col-4 ">
                    <span className="" style={{fontSize:"14px"}}>Tuần bất kì</span>
                  </div>
                  <div className="col-4 text-nowrap p-0">
                    <span className=" mx-2" style={{fontSize:"14px"}}>Thêm khách</span>
                 
                  </div>
                </div> */}
                <div className="rounded-pill py-2"  style={{
                  border: "1px solid gray",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  position:"absolute",
                  
                }}>
                <span className="mx-2">Địa điểm bất kì  |</span>
                <span className="mx-2">Tuần bất kì |</span>
                <span className="mx-2">Them khach</span>
                </div>
              </div>
  
              <ul
                className="nav nav-tabs py-2 w-100 border-5"
                id="myTab"
                role="tablist"
                style={{ backgroundColor: "#EBEBEB", display: `${display}`,position:"absolute",top:"107px", right:"0",left:"0" }}
                ref={ref}
              >
                <div className="row w-100 justify-content-center mx-2">
                  <div className="col-12">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active rounded-pill text-start text-dark border-0 w-100"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        <span>Địa điểm</span>
                        <br />
  
                        <input
                          list="browsers"
                          id="browser"
                          style={{
                            border: "none",
                            outline: "none",
                            maxWidth:"100%",
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
                  <div
                    className="col-12"
                  >
                    <li className="nav-item mt-2" role="presentation">
                      <button
                        className="nav-link rounded-pill text-start text-dark border-0 w-100"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        <span>Nhận phòng</span>
                        <br />
                        <input
                          name="checkIn"
                          type="date"
                          id="checkInDate"
                          className="bg-transparent outline-none"
                          placeholder="Thêm ngày"
                          style={{
                            border: "none",
                            outline: "none",
                            maxWidth:"100%",
                            backgroundColor: "transparent",
                          }}
                        />
                      </button>
                    </li>
                  </div>
                  <div className="col-12 ">
                    <li className="nav-item mt-2" role="presentation">
                      <button
                        className="nav-link rounded-pill text-start text-dark w-100"
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
                          placeholder="Thêm ngày"
                          style={{
                            border: "none",
                            outline: "none",
                            maxWidth:"100%",
                            backgroundColor: "transparent",
                          }}
                        />
                      </button>
                    </li>
                  </div>
                  <div className="col-12">
                    <li className="nav-item mt-2" role="presentation">
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
                          <div className="w-100">
                            <label htmlFor="">Khách</label>
                            <input
                              type="text"
                              style={{
                                border: "none",
                                outline: "none",
                                maxWidth: "120px",
                                backgroundColor: "transparent",
                              }}
                            />
                          </div>
                          <div className="icon-search mt-3 w-100 text-end">
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
          <div className="row">
          <div className="col-12">
          <div className="dropdown-center mb-2 tex-center " style={{position:"fixed",bottom:"-10px",right:"0px",left:"0px"}}>
            <div className="btn text-white bg-white d-flex " data-bs-toggle="dropdown" aria-expanded="false">
                <div className="w-50">
                <i className="fa fa-align-justify mx-2 text-dark fs-6 mt-1" />

                </div>
                <span className="text-dark">|</span>
                <div className="w-50">
                <i className="fa fa-user-circle text-dark fs-6 mt-1 mx-2"></i>

                  </div>               
            </div>
            <ul className="dropdown-menu" style={{lineHeight:"45px"}}>
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
   {/* <div className="dropdown-center bg-white" style={{position:"fixed",bottom:"-9px" }}>
  <button className="btn w-100 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa fa-align-justify mx-2 text-dark fs-6 mt-1" />
              <i className="fa fa-user-circle text-dark fs-6 mt-1 mx-2"></i>
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Action two</a></li>
    <li><a className="dropdown-item" href="#">Action three</a></li>
  </ul>
</div> */}

        </div>
       
      </div>
    );
  }
  