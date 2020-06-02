import React from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import store from "../redux/store";
import signin from "../redux/user/user.action";

import Cookies from "universal-cookie";
import API from "../API";
const cookies = new Cookies();

function SidebarContainer(props) {
  const logout = async (event) => {
    const status = await API.logout();
    console.log(status);
    if (status.data.message) {
      event.preventDefault();
      // cookies.remove("loggedIn", { path: "/" });
      // cookies.remove("userCompanyType", { path: "/" });
      cookies.set("loggedIn", false);
      cookies.set("userCompanyType", null);
      store.dispatch(
        signin({
          isLoggedIn: false,
        })
      );
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <aside className="sidebar">
      {props.companyType === "oversee" ? (
        <>
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
              <NavLink to="/distribution/list">유통 이력 조회</NavLink>
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
        </>
      ) : (
        <>
          <h3>조회</h3>
          <ul className="sidebar-menu_list">
            <li>
              <NavLink to="/medicine/list">전문의약품 목록 조회</NavLink>
            </li>

            <li>
              <NavLink to="/distribution/temp">임시 유통 이력 조회</NavLink>
            </li>
            <li>
              <NavLink to="/distribution/list">유통 이력 조회</NavLink>
            </li>
          </ul>
        </>
      )}

      <h3>설정</h3>
      <ul className="sidebar-menu_user">
        <li>마이페이지</li>
      </ul>
      <button onClick={(event) => logout(event)} className="sub-btn">
        로그아웃
      </button>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(SidebarContainer);
