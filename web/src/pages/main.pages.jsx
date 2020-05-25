import React from "react";
import SidebarContainer from "../components/sidebar-container";
import MainContainer from "../components/main-container";
import { HashRouter } from "react-router-dom";

// import { ReactComponent as Medicine } from "../assets/medicine.svg";

import "../scss/styles.scss";
import Footer from "../components/footer";

class Main extends React.Component {
  render() {
    return (
      <section className="mainpage">
        <header className="mainpage-header">
          {/* <Medicine /> */}
          <h1>MRP System</h1>
        </header>

        <HashRouter>
          <section className="mainpage-container">
            <SidebarContainer />
            <MainContainer />
          </section>
        </HashRouter>

        <Footer />
      </section>
    );
  }
}

export default Main;
