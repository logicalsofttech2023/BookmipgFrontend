import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src" style={{ backgroundImage: "" }} />
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6" />
              </span>
            </button>
          </span>
        </div>{" "}
        <div className="scrollbar-sidebar">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu">
              <li className="app-sidebar__heading">Dashboards</li>
              <li>
                <a href="/dashboard" className="mm-active">
                  <i className="metismenu-icon pe-7s-rocket" />
                  Dashboard
                </a>
              </li>
              <li className="app-sidebar__heading">Hotel Management</li>
              <li>
                <a href="#">
                  <i className="metismenu-icon fas fa-hotel" />
                  Hotel
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                </a>
                <ul>
                  <li>
                    <a href="/addHotel">
                      <i className="metismenu-icon" />
                      Add Hotel
                    </a>
                  </li>
                  <li>
                    <a href="/totalHotel">
                      <i className="metismenu-icon" />
                      Total Hotel
                    </a>
                  </li>
                  <li>
                    <a href="elements-dropdowns.html">
                      <i className="metismenu-icon"></i>Total Room
                    </a>
                  </li>
                </ul>
              </li>
              <li className="app-sidebar__heading">Booking Management</li>
              <li>
                <a href="#">
                  <i className="metismenu-icon pe-7s-date" />
                  Booking
                  <i className="metismenu-state-icon pe-7s-angle-down caret-left" />
                </a>
                <ul>
                  <li>
                    <a href="/addHotel">
                      <i className="metismenu-icon" />
                      All Booking
                    </a>
                  </li>
                  <li>
                    <a href="elements-dropdowns.html">
                      <i className="metismenu-icon"></i>Cancelled Booking
                    </a>
                  </li>
                  <li>
                    <a href="elements-icons.html">
                      <i className="metismenu-icon"></i>Completed Booking
                    </a>
                  </li>
                </ul>
              </li>
              <li className="app-sidebar__heading">Costomer Management</li>
              <li>
                <a href="forms-controls.html">
                  <i className="metismenu-icon pe-7s-users" />
                  Costomers List
                </a>
              </li>

              <li className="app-sidebar__heading">Support</li>
              <li>
                <a href="contact.html">
                  <i className="metismenu-icon pe-7s-mail"></i> Contact Us
                </a>
              </li>
              <li>
                <a href="about.html">
                  <i className="metismenu-icon pe-7s-info"></i> About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Sidebar;
