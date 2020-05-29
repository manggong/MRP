import React from "react";
import { NavLink } from "react-router-dom";

import store from "../redux/store";
import signin from "../redux/user/user.action";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function SidebarContainer(props) {
  const logout = () => {
    cookies.remove("loggedIn", { path: "/" });
    cookies.remove("userCompanyType", { path: "/" });
    store.dispatch(
      signin({
        isLoggedIn: false,
      })
    );
  };

  return (
    <aside className="sidebar">
      <h3>조회</h3>
      <ul className="sidebar-menu_list">
        <li>
          <NavLink exact to="/user">
            유저 목록 조회
          </NavLink>
        </li>
        <li>
          <NavLink to="/company/list">업체 목록 조회</NavLink>
        </li>

        <li>
          <NavLink to="/medicine/list">전문의약품 목록 조회</NavLink>
        </li>

        <li>
          <NavLink to="/distribution">유통 이력 조회</NavLink>
        </li>
      </ul>
      <h3>등록</h3>
      <ul className="sidebar-menu_register">
        <li>
          <NavLink to="/company/register">업체 정보 등록</NavLink>
        </li>
        <li>
          <NavLink to="/medicine/register">전문의약품 정보 등록</NavLink>
        </li>
      </ul>
      <button onClick={logout} className="sub-btn">
        로그아웃
      </button>
    </aside>
  );
}

export default SidebarContainer;
