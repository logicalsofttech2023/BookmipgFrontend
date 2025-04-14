import React from "react";
import { FaUserTie } from "react-icons/fa";
import "./Dashboard.css";
import  Header  from "./Header";
import  Sidebar  from "./Sidebar";
import  Footer  from "./Footer";

const BlanckPage = () => {
    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
          <Header/>
          <div className="app-main">
          <Sidebar/>
            <div className="app-main__outer">
              <div className="app-main__inner">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-card mb-3 card">
                      <div className="card-header">
                        Active Users
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      );
}

export default BlanckPage