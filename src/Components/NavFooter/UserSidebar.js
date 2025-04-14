import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const Logout = () => {
      localStorage.clear();
      
    };
  return (
    <>
       <div className="btn2 header-item" id="left-menu-btn" onClick={toggleSidebar}>
        <span className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>

      {/* ========== Left Sidebar ========== */}
      <div className="left-menu" style={{ display: isSidebarOpen ? 'block' : 'none' }}>
        {/*- Sidemenu */}
        <div id="sidebar-menu">
          {/* Logo Box */}
          <div className="logo-box d-flex">
            <div className="logo">
              <Link to="/">
                <img src="assets/images/logo/logo3%402x.png" alt width={197} height={48} className="img-logo" />
                <img src="assets/images/logo/toggle-logo%402x.png" alt width={46} height={48} className="toggle-logo" />
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
                  <a href="#">justthing@gmail...</a>
                </div>
              </div>
            </div>
          </div>
          <div className="title-2 fw-6">Menu</div>
          <ul className="downmenu list-unstyled" id="side-menu">
            <li>
              <Link to="/DashBoard" className="tf-effect">
                <span className="icon-dash dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M6.75682 9.35156V15.64" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.0342 6.34253V15.64" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15.2412 12.6746V15.64" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <li>
              <Link to="/DeshboardProfile" className="has-arrow tf-effect">
                <span className="icon-dash dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span className="dash-titles">Profile</span>
              </Link>
            </li>
           
            <li>
              <Link to="/DeshBoardPropertys" className="tf-effect">
                <span className="icon-applicant dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.533 2.55658H7.10561C4.28686 2.55658 2.51953 4.55216 2.51953 7.37733V14.9985C2.51953 17.8237 4.27861 19.8192 7.10561 19.8192H15.1943C18.0222 19.8192 19.7813 17.8237 19.7813 14.9985V11.3062"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.09012 10.0108L14.9404 3.16055C15.7938 2.30805 17.177 2.30805 18.0305 3.16055L19.146 4.27614C19.9995 5.12955 19.9995 6.51372 19.146 7.36622L12.2628 14.2495C11.8897 14.6226 11.3837 14.8325 10.8557 14.8325H7.42188L7.50804 11.3675C7.52087 10.8578 7.72896 10.372 8.09012 10.0108Z"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M13.8984 4.21893L18.0839 8.40443" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="dash-titles">Post Properties</span>
              </Link>
            </li>
            <li>
              <Link to="/MyFavorite" className="tf-effect">
                <span className="icon-save-candidate dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.63385 10.6318C1.65026 7.56096 2.79976 4.05104 6.02368 3.01246C7.71951 2.46521 9.59135 2.78788 11.0012 3.84846C12.3349 2.81721 14.2755 2.46888 15.9695 3.01246C19.1934 4.05104 20.3503 7.56096 19.3676 10.6318C17.8368 15.4993 11.0012 19.2485 11.0012 19.2485C11.0012 19.2485 4.21601 15.5561 2.63385 10.6318Z"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M14.668 6.14166C15.6488 6.45883 16.3418 7.33425 16.4252 8.36183" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="dash-titles">My Properties</span>
              </Link>
            </li>
            <li>
              <Link to="/MyProperty" className="tf-effect">
                <span className="icon-change-passwords dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9935 15.287V12.9614" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <li>
              <Link to="/UserSelfListingLead" className="tf-effect">
                <span className="icon-change-passwords dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9935 15.287V12.9614" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                <span className="dash-titles">My Listings Lead</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/Pricing" className="tf-effect">
                <span className="icon-change-passwords dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0713 6.98821L18.5008 5.99813C18.0181 5.16037 16.9484 4.87136 16.1095 5.35206V5.35206C15.7101 5.5873 15.2336 5.65404 14.785 5.53756C14.3364 5.42108 13.9526 5.13096 13.7182 4.73116C13.5673 4.47703 13.4863 4.18759 13.4832 3.8921V3.8921C13.4968 3.41835 13.3181 2.95927 12.9877 2.61943C12.6574 2.27959 12.2035 2.08794 11.7296 2.08813H10.5801C10.1158 2.08813 9.67059 2.27315 9.34306 2.60226C9.01552 2.93138 8.83263 3.37744 8.83486 3.84176V3.84176C8.8211 4.80041 8.03999 5.57031 7.08124 5.57021C6.78575 5.56714 6.49631 5.4861 6.24219 5.33527V5.33527C5.40328 4.85458 4.33358 5.14359 3.85088 5.98135L3.23837 6.98821C2.75626 7.82493 3.04134 8.89395 3.87605 9.37952V9.37952C4.41863 9.69277 4.75288 10.2717 4.75288 10.8982C4.75288 11.5247 4.41863 12.1036 3.87605 12.4169V12.4169C3.0424 12.8992 2.75701 13.9656 3.23837 14.7998V14.7998L3.81732 15.7983C4.04348 16.2064 4.42294 16.5075 4.87173 16.6351C5.32052 16.7626 5.80164 16.7061 6.20862 16.4779V16.4779C6.60871 16.2445 7.08548 16.1805 7.53295 16.3002C7.98042 16.42 8.36152 16.7135 8.59154 17.1156C8.74236 17.3697 8.8234 17.6592 8.82647 17.9546V17.9546C8.82647 18.9231 9.6116 19.7083 10.5801 19.7083H11.7296C12.6948 19.7083 13.4786 18.9283 13.4832 17.963V17.963C13.481 17.4973 13.665 17.0499 13.9944 16.7206C14.3237 16.3912 14.7711 16.2072 15.2368 16.2094C15.5316 16.2173 15.8199 16.298 16.0759 16.4444V16.4444C16.9126 16.9265 17.9816 16.6414 18.4672 15.8067V15.8067L19.0713 14.7998C19.3052 14.3984 19.3693 13.9204 19.2497 13.4716C19.13 13.0227 18.8363 12.6401 18.4336 12.4085V12.4085C18.031 12.1769 17.7373 11.7943 17.6176 11.3454C17.4979 10.8966 17.5621 10.4186 17.796 10.0172C17.948 9.75171 18.1682 9.53158 18.4336 9.37952V9.37952C19.2634 8.89422 19.5478 7.83143 19.0713 6.9966V6.9966V6.98821Z"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <ellipse cx="11.1587" cy="10.8982" rx="2.41648" ry="2.41648" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="dash-titles">My Coupons</span>
              </Link>
            </li> */}
            <li>
              <Link to="/MyAgent" className="tf-effect">
                <span className="icon-change-passwords dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0713 6.98821L18.5008 5.99813C18.0181 5.16037 16.9484 4.87136 16.1095 5.35206V5.35206C15.7101 5.5873 15.2336 5.65404 14.785 5.53756C14.3364 5.42108 13.9526 5.13096 13.7182 4.73116C13.5673 4.47703 13.4863 4.18759 13.4832 3.8921V3.8921C13.4968 3.41835 13.3181 2.95927 12.9877 2.61943C12.6574 2.27959 12.2035 2.08794 11.7296 2.08813H10.5801C10.1158 2.08813 9.67059 2.27315 9.34306 2.60226C9.01552 2.93138 8.83263 3.37744 8.83486 3.84176V3.84176C8.8211 4.80041 8.03999 5.57031 7.08124 5.57021C6.78575 5.56714 6.49631 5.4861 6.24219 5.33527V5.33527C5.40328 4.85458 4.33358 5.14359 3.85088 5.98135L3.23837 6.98821C2.75626 7.82493 3.04134 8.89395 3.87605 9.37952V9.37952C4.41863 9.69277 4.75288 10.2717 4.75288 10.8982C4.75288 11.5247 4.41863 12.1036 3.87605 12.4169V12.4169C3.0424 12.8992 2.75701 13.9656 3.23837 14.7998V14.7998L3.81732 15.7983C4.04348 16.2064 4.42294 16.5075 4.87173 16.6351C5.32052 16.7626 5.80164 16.7061 6.20862 16.4779V16.4779C6.60871 16.2445 7.08548 16.1805 7.53295 16.3002C7.98042 16.42 8.36152 16.7135 8.59154 17.1156C8.74236 17.3697 8.8234 17.6592 8.82647 17.9546V17.9546C8.82647 18.9231 9.6116 19.7083 10.5801 19.7083H11.7296C12.6948 19.7083 13.4786 18.9283 13.4832 17.963V17.963C13.481 17.4973 13.665 17.0499 13.9944 16.7206C14.3237 16.3912 14.7711 16.2072 15.2368 16.2094C15.5316 16.2173 15.8199 16.298 16.0759 16.4444V16.4444C16.9126 16.9265 17.9816 16.6414 18.4672 15.8067V15.8067L19.0713 14.7998C19.3052 14.3984 19.3693 13.9204 19.2497 13.4716C19.13 13.0227 18.8363 12.6401 18.4336 12.4085V12.4085C18.031 12.1769 17.7373 11.7943 17.6176 11.3454C17.4979 10.8966 17.5621 10.4186 17.796 10.0172C17.948 9.75171 18.1682 9.53158 18.4336 9.37952V9.37952C19.2634 8.89422 19.5478 7.83143 19.0713 6.9966V6.9966V6.98821Z"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <ellipse cx="11.1587" cy="10.8982" rx="2.41648" ry="2.41648" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="dash-titles">My Agents</span>
              </Link>
            </li>
            <li>
              <Link to={"/ReferEarn"} className="tf-effect">
                <span className="icon-change-passwords dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0713 6.98821L18.5008 5.99813C18.0181 5.16037 16.9484 4.87136 16.1095 5.35206V5.35206C15.7101 5.5873 15.2336 5.65404 14.785 5.53756C14.3364 5.42108 13.9526 5.13096 13.7182 4.73116C13.5673 4.47703 13.4863 4.18759 13.4832 3.8921V3.8921C13.4968 3.41835 13.3181 2.95927 12.9877 2.61943C12.6574 2.27959 12.2035 2.08794 11.7296 2.08813H10.5801C10.1158 2.08813 9.67059 2.27315 9.34306 2.60226C9.01552 2.93138 8.83263 3.37744 8.83486 3.84176V3.84176C8.8211 4.80041 8.03999 5.57031 7.08124 5.57021C6.78575 5.56714 6.49631 5.4861 6.24219 5.33527V5.33527C5.40328 4.85458 4.33358 5.14359 3.85088 5.98135L3.23837 6.98821C2.75626 7.82493 3.04134 8.89395 3.87605 9.37952V9.37952C4.41863 9.69277 4.75288 10.2717 4.75288 10.8982C4.75288 11.5247 4.41863 12.1036 3.87605 12.4169V12.4169C3.0424 12.8992 2.75701 13.9656 3.23837 14.7998V14.7998L3.81732 15.7983C4.04348 16.2064 4.42294 16.5075 4.87173 16.6351C5.32052 16.7626 5.80164 16.7061 6.20862 16.4779V16.4779C6.60871 16.2445 7.08548 16.1805 7.53295 16.3002C7.98042 16.42 8.36152 16.7135 8.59154 17.1156C8.74236 17.3697 8.8234 17.6592 8.82647 17.9546V17.9546C8.82647 18.9231 9.6116 19.7083 10.5801 19.7083H11.7296C12.6948 19.7083 13.4786 18.9283 13.4832 17.963V17.963C13.481 17.4973 13.665 17.0499 13.9944 16.7206C14.3237 16.3912 14.7711 16.2072 15.2368 16.2094C15.5316 16.2173 15.8199 16.298 16.0759 16.4444V16.4444C16.9126 16.9265 17.9816 16.6414 18.4672 15.8067V15.8067L19.0713 14.7998C19.3052 14.3984 19.3693 13.9204 19.2497 13.4716C19.13 13.0227 18.8363 12.6401 18.4336 12.4085V12.4085C18.031 12.1769 17.7373 11.7943 17.6176 11.3454C17.4979 10.8966 17.5621 10.4186 17.796 10.0172C17.948 9.75171 18.1682 9.53158 18.4336 9.37952V9.37952C19.2634 8.89422 19.5478 7.83143 19.0713 6.9966V6.9966V6.98821Z"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <ellipse cx="11.1587" cy="10.8982" rx="2.41648" ry="2.41648" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="dash-titles">Refer And Earn</span>
              </Link>
            </li>
            {/* <li>
          <a href="#" class="tf-effect">
            <span class="icon-change-passwords dash-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.0713 6.98821L18.5008 5.99813C18.0181 5.16037 16.9484 4.87136 16.1095 5.35206V5.35206C15.7101 5.5873 15.2336 5.65404 14.785 5.53756C14.3364 5.42108 13.9526 5.13096 13.7182 4.73116C13.5673 4.47703 13.4863 4.18759 13.4832 3.8921V3.8921C13.4968 3.41835 13.3181 2.95927 12.9877 2.61943C12.6574 2.27959 12.2035 2.08794 11.7296 2.08813H10.5801C10.1158 2.08813 9.67059 2.27315 9.34306 2.60226C9.01552 2.93138 8.83263 3.37744 8.83486 3.84176V3.84176C8.8211 4.80041 8.03999 5.57031 7.08124 5.57021C6.78575 5.56714 6.49631 5.4861 6.24219 5.33527V5.33527C5.40328 4.85458 4.33358 5.14359 3.85088 5.98135L3.23837 6.98821C2.75626 7.82493 3.04134 8.89395 3.87605 9.37952V9.37952C4.41863 9.69277 4.75288 10.2717 4.75288 10.8982C4.75288 11.5247 4.41863 12.1036 3.87605 12.4169V12.4169C3.0424 12.8992 2.75701 13.9656 3.23837 14.7998V14.7998L3.81732 15.7983C4.04348 16.2064 4.42294 16.5075 4.87173 16.6351C5.32052 16.7626 5.80164 16.7061 6.20862 16.4779V16.4779C6.60871 16.2445 7.08548 16.1805 7.53295 16.3002C7.98042 16.42 8.36152 16.7135 8.59154 17.1156C8.74236 17.3697 8.8234 17.6592 8.82647 17.9546V17.9546C8.82647 18.9231 9.6116 19.7083 10.5801 19.7083H11.7296C12.6948 19.7083 13.4786 18.9283 13.4832 17.963V17.963C13.481 17.4973 13.665 17.0499 13.9944 16.7206C14.3237 16.3912 14.7711 16.2072 15.2368 16.2094C15.5316 16.2173 15.8199 16.298 16.0759 16.4444V16.4444C16.9126 16.9265 17.9816 16.6414 18.4672 15.8067V15.8067L19.0713 14.7998C19.3052 14.3984 19.3693 13.9204 19.2497 13.4716C19.13 13.0227 18.8363 12.6401 18.4336 12.4085V12.4085C18.031 12.1769 17.7373 11.7943 17.6176 11.3454C17.4979 10.8966 17.5621 10.4186 17.796 10.0172C17.948 9.75171 18.1682 9.53158 18.4336 9.37952V9.37952C19.2634 8.89422 19.5478 7.83143 19.0713 6.9966V6.9966V6.98821Z"
                  stroke="#F1FAEE"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <ellipse
                  cx="11.1587"
                  cy="10.8982"
                  rx="2.41648"
                  ry="2.41648"
                  stroke="#F1FAEE"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="dash-titles">Change password</span>
          </a>
        </li> */}
             <li>
              <Link to="/DeshBoardReview" className="tf-effect">
                <span className="icon-work dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.4076 8.11353L12.3346 11.4255C11.5651 12.036 10.4824 12.036 9.71285 11.4255L5.60547 8.11353"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.4985 19.25C18.2864 19.2577 20.1654 16.9671 20.1654 14.1518V7.85584C20.1654 5.04059 18.2864 2.75 15.4985 2.75H6.49891C3.711 2.75 1.83203 5.04059 1.83203 7.85584V14.1518C1.83203 16.9671 3.711 19.2577 6.49891 19.25H15.4985Z"
                      stroke="white"
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
              <Link onClick={() => {
    Logout();
  }} to="/" className="tf-effect">
                <span className="icon-log-out dash-icon">
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.7627 6.77369V5.91844C13.7627 4.05303 12.2502 2.54053 10.3848 2.54053H5.91606C4.05156 2.54053 2.53906 4.05303 2.53906 5.91844V16.1209C2.53906 17.9864 4.05156 19.4989 5.91606 19.4989H10.394C12.2539 19.4989 13.7627 17.9909 13.7627 16.131V15.2666"
                      stroke="#F1FAEE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M19.9907 11.0196H8.95312" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.3047 8.34741L19.9887 11.0195L17.3047 13.6925" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="dash-titles">Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* left sidebar end */}
    </>
  );
};

export default UserSidebar;
