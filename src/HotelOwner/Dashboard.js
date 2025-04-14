import React, { useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import  logo  from "./assets/images/logo.svg";
import  logo1  from "./assets/images/logo-mini.svg";
import face1 from "./assets/images/faces/face1.jpg"
import circle from "./assets/images/dashboard/circle.svg";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container-scroller">  
      <Header/>
      <div style={{ minHeight: "100vh" }} className="container-fluid page-body-wrapper">
        <Sidebar/>
        <div className="main-panel">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-home" />
                </span>{" "}
                Hello Test
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <span />
                    Overview{" "}
                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                  </li>
                </ul>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white">
                  <div className="card-body">
                    <img
                      src={circle}
                      className="card-img-absolute"
                      alt="circle-image"
                    />
                    <h4 className="font-weight-normal mb-3">
                      Total Booking{" "}
                    </h4>
                    <h2 className="mb-5">15,0000</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-info card-img-holder text-white">
                  <div className="card-body">
                    <img
                      src={circle}
                      className="card-img-absolute"
                      alt="circle-image"
                    />
                    <h4 className="font-weight-normal mb-3">
                      Total Rooms{" "}
                    </h4>
                    <h2 className="mb-5">45,6334</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-success card-img-holder text-white">
                  <div className="card-body">
                    <img
                      src={circle}
                      className="card-img-absolute"
                      alt="circle-image"
                    />
                    <h4 className="font-weight-normal mb-3">
                      Total Costomer{" "}
                    </h4>
                    <h2 className="mb-5">95,5741</h2>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2023{" "}
                <a href="https://www.bootstrapdash.com/" target="_blank">
                  BootstrapDash
                </a>
                . All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Hand-crafted &amp; made with{" "}
                <i className="mdi mdi-heart text-danger" />
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default Dashboard;
