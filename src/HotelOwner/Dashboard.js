import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import  logo  from "./assets/images/logo.svg";
import  logo1  from "./assets/images/logo-mini.svg";
import face1 from "./assets/images/faces/face1.jpg"
import circle from "./assets/images/dashboard/circle.svg";
import "./Dashboard.css";
import axios from "axios";
import { FaHotel, FaClipboardList, FaClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";


const Dashboard = () => {
  let token = localStorage.getItem("token");
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalHotel, setTotalHotel] = useState(0);
  const [totalPendingBooking, setTotalPendingBooking] = useState(0);
  const [totalCompletedBooking, setTotalCompletedBooking] = useState(0);
  const [totalCancelledBooking, setTotalCancelledBooking] = useState(0);
  const [totalUpcomingBooking, setTotalUpcomingBooking] = useState(0);



  const dashboardCount = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/hotelOwnerData`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTotalBooking(response.data.totalBookings);
        setTotalHotel(response.data.totalHotel);
        setTotalPendingBooking(response.data.totalPendingBooking);
        setTotalCompletedBooking(response.data.totalCompletedBooking);
        setTotalCancelledBooking(response.data.totalCancelledBooking);
        setTotalUpcomingBooking(response.data.totalUpcomingBooking);
        console.log("Dashboard data fetched successfully", response.data);
      }
      console.log("Dashboard data fetched successfully");
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };
  
  useEffect(() => {
    dashboardCount();
  }, []);

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
            <img src={circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">
              <FaClipboardList className="me-2" />
              Total Booking
            </h4>
            <h2 className="mb-5">{totalBooking}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-info card-img-holder text-white">
          <div className="card-body">
            <img src={circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">
              <FaHotel className="me-2" />
              Total Hotels
            </h4>
            <h2 className="mb-5">{totalHotel}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-warning card-img-holder text-white">
          <div className="card-body">
            <img src={circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">
              <FaClock className="me-2" />
              Pending Bookings
            </h4>
            <h2 className="mb-5">{totalPendingBooking}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-success card-img-holder text-white">
          <div className="card-body">
            <img src={circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">
              <FaCheckCircle className="me-2" />
              Completed Bookings
            </h4>
            <h2 className="mb-5">{totalCompletedBooking}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-dark card-img-holder text-white">
          <div className="card-body">
            <img src={circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">
              <FaTimesCircle className="me-2" />
              Cancelled Bookings
            </h4>
            <h2 className="mb-5">{totalCancelledBooking}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4 stretch-card grid-margin">
        <div className="card bg-gradient-primary card-img-holder text-white">
          <div className="card-body">
            <img src={circle} className="card-img-absolute" alt="circle" />
            <h4 className="font-weight-normal mb-3">
              <FaCalendarAlt className="me-2" />
              Upcoming Bookings
            </h4>
            <h2 className="mb-5">{totalUpcomingBooking}</h2>
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
