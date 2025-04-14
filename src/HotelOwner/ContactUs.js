import React from "react";
import { FaUserTie } from "react-icons/fa";
import "./Dashboard.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Contact Us</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Contact Us</h4>



                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
