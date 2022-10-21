import React from "react";
import {CartModal} from "../components";
import {Outlet} from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <CartModal selector='#modal-root'/>
      <Outlet/>
    </>)
}

export default MainLayout;