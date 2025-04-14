import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
const AgentSidebar = () => {
  const Navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const Logout = () => {
    secureLocalStorage.clear();
  };

  let role = secureLocalStorage.getItem("roleType");
  let subscription = secureLocalStorage.getItem("subscription");

  const Subscriber = () => {
    swal({
      title:
        "Your listing limit is exhausted. As an owner, you can list only three properties. Please check My Listings!",
      icon: "error",
    }).then(() => {
      const redirectPath =
        role === "Agent" ? "/AgentSubscriptions" : "/DeveloperSubscriptions";

      setTimeout(() => {
        Navigate(redirectPath);
      }, 2000);
    });
  };

  return (
    <>
      <div>
        <div
          className="btn2 header-item "
          id="left-menu-btn"
          onClick={toggleSidebar}
        >
          <span className="hamburger-icon">
            <span />
            <span />
            <span />
          </span>
        </div>
        {/* ========== Left Sidebar ========== */}
        <div
          className="left-menu"
          style={{ display: isSidebarOpen ? "block" : "none" }}
        >
          {/*- Sidemenu */}
          <div id="sidebar-menu">
            {/* Logo Box */}
            <div className="logo-box d-flex">
              <div className="logo">
                <Link to="/">
                  <img
                    src="assets/images/logo/logo3%402x.png"
                    alt
                    width={197}
                    height={48}
                    className="img-logo"
                  />
                  <img
                    src="assets/images/logo/toggle-logo%402x.png"
                    alt
                    width={46}
                    height={48}
                    className="toggle-logo"
                  />
                </Link>
              </div>
            </div>
            <div className="profile-box">
              <div className="title-1 fw-6">Profile</div>
              <div className="avatar-box flex align-center">
                <div className="avatar flex-none">
                  <img src="assets/images/author/avatar.png" alt title />
                </div>
                <div className="content">
                  <div className="sub-title fs-12 lh-18">Account</div>
                  <div className="titles fw-6">
                    <a href="#">justthing@gmail...</a>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="title-2 fw-6">Menu</div>
            <ul className="downmenu list-unstyled" id="side-menu">
              <li>
                <Link to="/AgentProfile" className="tf-effect">
                  <span className="icon-dash dash-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M6.75682 9.35156V15.64"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0342 6.34253V15.64"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.2412 12.6746V15.64"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.2939 1.83331H6.70346C3.70902 1.83331 1.83203 3.95272 1.83203 6.95304V15.0469C1.83203 18.0472 3.70029 20.1666 6.70346 20.1666H15.2939C18.2971 20.1666 20.1654 18.0472 20.1654 15.0469V6.95304C20.1654 3.95272 18.2971 1.83331 15.2939 1.83331Z"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </span>
                  <span className="dash-titles">Dashboard</span>
                </Link>
              </li>
              {role == "Developer" ? (
                subscription == "false" ? (
                  <li>
                    <Link
                      to="/DeveloperProject"
                      className="has-arrow tf-effect"
                    >
                      <span className="icon-dash dash-icon">
                        <svg
                          width={22}
                          height={22}
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.987 14.0674C7.44168 14.0674 4.41406 14.6034 4.41406 16.7502C4.41406 18.8969 7.42247 19.4521 10.987 19.4521C14.5323 19.4521 17.5591 18.9152 17.5591 16.7694C17.5591 14.6235 14.5515 14.0674 10.987 14.0674Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.9866 11.0054C13.3132 11.0054 15.1989 9.11885 15.1989 6.79226C15.1989 4.46567 13.3132 2.57996 10.9866 2.57996C8.66005 2.57996 6.77346 4.46567 6.77346 6.79226C6.7656 9.11099 8.6391 10.9976 10.957 11.0054H10.9866Z"
                            stroke="white"
                            strokeWidth="1.42857"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="dash-titles">Post Project</span>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      onClick={() => {
                        Subscriber();
                      }}
                      className="has-arrow tf-effect"
                    >
                      <span className="icon-dash dash-icon">
                        <svg
                          width={22}
                          height={22}
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.987 14.0674C7.44168 14.0674 4.41406 14.6034 4.41406 16.7502C4.41406 18.8969 7.42247 19.4521 10.987 19.4521C14.5323 19.4521 17.5591 18.9152 17.5591 16.7694C17.5591 14.6235 14.5515 14.0674 10.987 14.0674Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.9866 11.0054C13.3132 11.0054 15.1989 9.11885 15.1989 6.79226C15.1989 4.46567 13.3132 2.57996 10.9866 2.57996C8.66005 2.57996 6.77346 4.46567 6.77346 6.79226C6.7656 9.11099 8.6391 10.9976 10.957 11.0054H10.9866Z"
                            stroke="white"
                            strokeWidth="1.42857"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="dash-titles">Post Project</span>
                    </Link>
                  </li>
                )
              ) : null}

              {subscription == "false" ? (
                <li>
                  <Link to="/AgentProperty" className="has-arrow tf-effect">
                    <span className="icon-dash dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.987 14.0674C7.44168 14.0674 4.41406 14.6034 4.41406 16.7502C4.41406 18.8969 7.42247 19.4521 10.987 19.4521C14.5323 19.4521 17.5591 18.9152 17.5591 16.7694C17.5591 14.6235 14.5515 14.0674 10.987 14.0674Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.9866 11.0054C13.3132 11.0054 15.1989 9.11885 15.1989 6.79226C15.1989 4.46567 13.3132 2.57996 10.9866 2.57996C8.66005 2.57996 6.77346 4.46567 6.77346 6.79226C6.7656 9.11099 8.6391 10.9976 10.957 11.0054H10.9866Z"
                          stroke="white"
                          strokeWidth="1.42857"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">Post Property</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    onClick={() => {
                      Subscriber();
                    }}
                    className="has-arrow tf-effect"
                  >
                    <span className="icon-dash dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.987 14.0674C7.44168 14.0674 4.41406 14.6034 4.41406 16.7502C4.41406 18.8969 7.42247 19.4521 10.987 19.4521C14.5323 19.4521 17.5591 18.9152 17.5591 16.7694C17.5591 14.6235 14.5515 14.0674 10.987 14.0674Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.9866 11.0054C13.3132 11.0054 15.1989 9.11885 15.1989 6.79226C15.1989 4.46567 13.3132 2.57996 10.9866 2.57996C8.66005 2.57996 6.77346 4.46567 6.77346 6.79226C6.7656 9.11099 8.6391 10.9976 10.957 11.0054H10.9866Z"
                          stroke="white"
                          strokeWidth="1.42857"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">Post Property</span>
                  </Link>
                </li>
              )}

              {role == "Developer" ? (
                <li>
                  <Link
                    to="/DeveloperAllProject"
                    className="has-arrow tf-effect"
                  >
                    <span className="icon-dash dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.987 14.0674C7.44168 14.0674 4.41406 14.6034 4.41406 16.7502C4.41406 18.8969 7.42247 19.4521 10.987 19.4521C14.5323 19.4521 17.5591 18.9152 17.5591 16.7694C17.5591 14.6235 14.5515 14.0674 10.987 14.0674Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.9866 11.0054C13.3132 11.0054 15.1989 9.11885 15.1989 6.79226C15.1989 4.46567 13.3132 2.57996 10.9866 2.57996C8.66005 2.57996 6.77346 4.46567 6.77346 6.79226C6.7656 9.11099 8.6391 10.9976 10.957 11.0054H10.9866Z"
                          stroke="white"
                          strokeWidth="1.42857"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">My Project</span>
                  </Link>
                </li>
              ) : null}

              <li>
                <Link to="/AgentListing" className="tf-effect">
                  <span className="icon-change-passwords dash-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9935 15.287V12.9614"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="dash-titles">My Listings</span>
                </Link>
              </li>
              {role === "Developer" ? (
                <li>
                  <Link to="/DeveloperLeads" className="tf-effect">
                    <span className="icon-change-passwords dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9935 15.287V12.9614"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">My Listing Leads</span>
                  </Link>
                </li>
              ) : null}
              {role === "Developer" ? (
                <li>
                  <Link to="/DeveloperProjectLeads" className="tf-effect">
                    <span className="icon-change-passwords dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9935 15.287V12.9614"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">My Project Leads</span>
                  </Link>
                </li>
              ) : null}

              {role === "Agent" ? (
                <li>
                  <Link to="/AgentLeads" className="tf-effect">
                    <span className="icon-change-passwords dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9935 15.287V12.9614"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                          stroke="#F1FAEE"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">My Leads</span>
                  </Link>
                </li>
              ) : null}

              {role == "Agent" ? (
                <li>
                  <Link
                    to="/Agentcitylistinglead"
                    className="has-arrow tf-effect"
                  >
                    <span className="icon-dash dash-icon">
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.987 14.0674C7.44168 14.0674 4.41406 14.6034 4.41406 16.7502C4.41406 18.8969 7.42247 19.4521 10.987 19.4521C14.5323 19.4521 17.5591 18.9152 17.5591 16.7694C17.5591 14.6235 14.5515 14.0674 10.987 14.0674Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.9866 11.0054C13.3132 11.0054 15.1989 9.11885 15.1989 6.79226C15.1989 4.46567 13.3132 2.57996 10.9866 2.57996C8.66005 2.57996 6.77346 4.46567 6.77346 6.79226C6.7656 9.11099 8.6391 10.9976 10.957 11.0054H10.9866Z"
                          stroke="white"
                          strokeWidth="1.42857"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="dash-titles">My City Listing Lead</span>
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to="/FavoriteProperties" className="tf-effect">
                  <span className="icon-change-passwords dash-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9935 15.287V12.9614"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="dash-titles">My Properties</span>
                </Link>
              </li>
              <li>
                <Link
                  to={
                    role === "Agent"
                      ? "/AgentSubscriptions"
                      : "/DeveloperSubscriptions"
                  }
                  className="tf-effect"
                >
                  <span className="icon-change-passwords dash-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9935 15.287V12.9614"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="dash-titles">Subscriptions Plain</span>
                </Link>
              </li>

              <li>
                <Link
                  to={
                    role === "Agent" ? "/Agentcontactus" : "/Developercontactus"
                  }
                  className="tf-effect"
                >
                  <span className="icon-change-passwords dash-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9935 15.287V12.9614"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.6729 4.88599C18.222 4.88599 19.4687 6.14182 19.4687 7.69099V10.8443C17.2137 12.1643 14.2345 12.9618 10.9895 12.9618C7.74453 12.9618 4.77453 12.1643 2.51953 10.8443V7.68182C2.51953 6.13265 3.77536 4.88599 5.32453 4.88599H16.6729Z"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.2018 4.88196V4.54646C14.2018 3.42813 13.2943 2.52063 12.176 2.52063H9.81099C8.69266 2.52063 7.78516 3.42813 7.78516 4.54646V4.88196"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.54297 14.1927L2.71622 16.4927C2.83355 18.0427 4.12514 19.2408 5.67889 19.2408H16.3113C17.8651 19.2408 19.1566 18.0427 19.274 16.4927L19.4472 14.1927"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="dash-titles">Contact Us Data</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    Logout();
                  }}
                  to="/"
                  className="tf-effect"
                >
                  <span className="icon-log-out dash-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7627 6.77369V5.91844C13.7627 4.05303 12.2502 2.54053 10.3848 2.54053H5.91606C4.05156 2.54053 2.53906 4.05303 2.53906 5.91844V16.1209C2.53906 17.9864 4.05156 19.4989 5.91606 19.4989H10.394C12.2539 19.4989 13.7627 17.9909 13.7627 16.131V15.2666"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.9907 11.0196H8.95312"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.3047 8.34741L19.9887 11.0195L17.3047 13.6925"
                        stroke="#F1FAEE"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="dash-titles">Log out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* left sidebar end */}
      </div>
    </>
  );
};

export default AgentSidebar;
