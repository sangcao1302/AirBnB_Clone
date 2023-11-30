import React from "react";
import Header from "../Component/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import ResponsiveItem from '../Layout/MobileTemplate';
import HeaderMobile from "../Component/Header/HeaderMobile";

type Props = {};

const HomeLayout: React.FC = ({}: Props): JSX.Element => {
  return (
    <div>
      <ResponsiveItem component={ Header} mobileComponent={HeaderMobile}></ResponsiveItem>
 
      <div className="content-layout" style={{ minHeight: "80vh" }}>
        <Outlet></Outlet>
      </div>

      <footer className="bg-dark text-white text-center mt-5">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;

