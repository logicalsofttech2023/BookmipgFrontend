import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import face1 from "./assets/images/faces/face1.jpg";
import axios from "axios";

const Sidebar = () => {
  const location = useLocation();
  const [ownerData, setOwnerData] = useState("");
  const [totalHotel, setTotalHotel] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const getInitialMenuState = () => {
    const savedState = localStorage.getItem("sidebarMenus");
    return savedState ? JSON.parse(savedState) : {};
  };

  const [openMenus, setOpenMenus] = useState(getInitialMenuState);

  const toggleMenu = (menu, event) => {
    event.preventDefault();
    setOpenMenus((prev) => {
      const newState = { ...prev, [menu]: !prev[menu] };
      localStorage.setItem("sidebarMenus", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    localStorage.setItem("sidebarMenus", JSON.stringify(openMenus));
  }, [location.pathname]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/user/getOwnerById`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.status === 200) {
          console.log("Owner data fetched successfully:", response.data);

          setOwnerData(response.data.data);
          setTotalHotel(response.data.totalHotel);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwnerData();
  }, [token]);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <div className="nav-link">
            <div className="nav-profile-image">
              <img src={face1} alt="profile" />
              <span className="login-status online" />
            </div>
            <div className="nav-profile-text d-flex flex-column">
              <span className="font-weight-bold mb-2">
                Hello {ownerData.name}
              </span>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <Link
            className={`nav-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
            to={"/dashboard"}
          >
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon" />
          </Link>
        </li>

        {/* Hotel Management */}
        <li className="nav-item">
          <div
            className="nav-link d-flex justify-content-between"
            onClick={(e) => toggleMenu("hotel", e)}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-title">Hotel Management</span>
            <i
              className={`menu-arrow transition ${
                openMenus.hotel ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <div
            className="submenu-container"
            style={{
              maxHeight: openMenus.hotel ? "200px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.4s ease-in-out",
            }}
          >
            {!loading && (
              <ul className="nav flex-column sub-menu">
                {totalHotel < 1 && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/addHotel" ? "active" : ""
                      }`}
                      to={"/addHotel"}
                    >
                      Add Hotel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/totalHotel" ? "active" : ""
                    }`}
                    to={"/totalHotel"}
                  >
                    Hotel List
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </li>

        {/* Booking Management */}
        <li className="nav-item">
          <div
            className="nav-link d-flex justify-content-between"
            onClick={(e) => toggleMenu("booking", e)}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-title">Booking Management</span>
            <i
              className={`menu-arrow transition ${
                openMenus.booking ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <div
            className="submenu-container"
            style={{
              maxHeight: openMenus.booking ? "200px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.4s ease-in-out",
            }}
          >
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/bookingList" ? "active" : ""
                  }`}
                  to={"/bookingList"}
                >
                  Booking List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/cancelledBooking" ? "active" : ""
                  }`}
                  to={"/cancelledBooking"}
                >
                  Cancelled Booking List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/upcomingBooking" ? "active" : ""
                  }`}
                  to={"/upcomingBooking"}
                >
                  Upcoming Booking List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/completedBooking" ? "active" : ""
                  }`}
                  to={"/completedBooking"}
                >
                  Completed Booking List
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Transition  */}
        <li className="nav-item">
          <div
            className="nav-link d-flex justify-content-between"
            onClick={(e) => toggleMenu("transaction", e)}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-title">Billing Management</span>
            <i
              className={`menu-arrow transition ${
                openMenus.transaction ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <div
            className="submenu-container"
            style={{
              maxHeight: openMenus.transaction ? "200px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.4s ease-in-out",
            }}
          >
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
              <Link
  className={`nav-link ${
    location.pathname === "/transactionList" ? "active" : ""
  }`}
  to={"/transactionList"}
>
  Booking List
</Link>

              </li>
              
            </ul>
          </div>
        </li>

        {/* Contact Us */}
        <li
          className={`nav-item ${
            location.pathname === "/hotelOwnerContactUs" ? "active" : ""
          }`}
        >
          <Link
            className={`nav-link ${
              location.pathname === "/hotelOwnerContactUs" ? "active" : ""
            } `}
            to={"/hotelOwnerContactUs"}
          >
            <span className="menu-title">Contact Us</span>
            <i className="mdi mdi-phone menu-icon" />
          </Link>
        </li>

        <li
          className={`nav-item ${
            location.pathname === "/hotelOwnerPrivacyPolicy" ? "active" : ""
          }`}
        >
          <Link
            className={`nav-link ${
              location.pathname === "/hotelOwnerPrivacyPolicy" ? "active" : ""
            }`}
            to={"/hotelOwnerPrivacyPolicy"}
          >
            <span className="menu-title">Privacy Policy</span>
            <i className="mdi mdi-shield-lock menu-icon" />
          </Link>
        </li>

        <li
          className={`nav-item ${
            location.pathname === "/hotelOwnerTermsAndCondition" ? "active" : ""
          }`}
        >
          <Link
            className={`nav-link ${
              location.pathname === "/hotelOwnerTermsAndCondition"
                ? "active"
                : ""
            }`}
            to={"/hotelOwnerTermsAndCondition"}
          >
            <span className="menu-title">Terms And Condition</span>
            <i className="mdi mdi-file-document menu-icon" />
          </Link>
        </li>

        {/* About Us */}
        <li
          className={`nav-item ${
            location.pathname === "/hotelOwnerAboutUs" ? "active" : ""
          }`}
        >
          <Link
            className={`nav-link ${
              location.pathname === "/hotelOwnerAboutUs" ? "active" : ""
            }`}
            to={"/hotelOwnerAboutUs"}
          >
            <span className="menu-title">About Us</span>
            <i className="mdi mdi-information menu-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
