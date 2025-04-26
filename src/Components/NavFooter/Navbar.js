import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cities from "../Auth/cities";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import logo from "./raw-logo-bookmipg-original.png";

import swal from "sweetalert";
const Navbar = () => {
  const Navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    cities: false,
    buy: false,
    Rent: false,
    Project: false,
    Agent: false,
  });

  const toggleDropdown = (dropdownName) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const menuOpen = () => {
    setIsMenuOpen(true);
  };

  const menuClose = () => {
    setIsMenuOpen(false);
  };

  let role = localStorage.getItem("roleType");

  const loginId = localStorage.getItem("token");
  let userExit = localStorage.getItem("userExit");


  useEffect(() => {
    if (role === "vendor") {
      Navigate("/dashboard");
    }
    else if (role === "user" && userExit === true) {
      Navigate("/");
    }
  }, [])
  

  let Logout = () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to logout ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        Navigate("/Login");
      } else {
      }
    });
    // localStorage.clear();
    // Navigate("/Login");
  };

  return (
    <>
      <div className={isMenuOpen ? "mobile-menu-visible" : ""}>
        <header id="header" className="main-header header header-fixed">
          <div className="header-lower">
            <div className="container6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner-container flex justify-space align-center">
                    {/* Logo Box */}
                    <div className="logo-box flex">
                      <div className="logo">
                        <Link to="/">
                          <img src={logo} alt width={197} height={48} />
                        </Link>
                      </div>
                    </div>
                    <div className="nav-outer flex align-center">
                      {/* Main Menu */}
                      <nav className="main-menu show navbar-expand-md">
                        <div
                          className="navbar-collapse collapse clearfix"
                          id="navbarSupportedContent"
                        >
                          <ul className="navigation clearfix">
                            <li className="dropdown2">
                              <Link>Madhya Pradesh</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Indore">
                                    Indore
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Bhopal">
                                    Bhopal
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Jabalpur">
                                    Jabalpur
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Gwalior">
                                    Gwalior
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Ujjain">
                                    Ujjain
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Sagar">Sagar</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Ratlam">
                                    Ratlam
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Satna">Satna</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Rewa">Rewa</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Dewas">Dewas</Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Madhya Pradesh <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link>Chennai</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=T Nagar">
                                    T Nagar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Adyar">Adyar</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Mylapore">
                                    Mylapore
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Velachery">
                                    Velachery
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Nungambakkam">
                                    Nungambakkam
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Alwarpet">
                                    Alwarpet
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Anna Nagar">
                                    Anna Nagar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Besant Nagar">
                                    Besant Nagar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Royapettah">
                                    Royapettah
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Kodambakkam">
                                    Kodambakkam
                                  </Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Chennai <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link>Delhi</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Connaught Place">
                                    Connaught Place
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Hauz Khas">
                                    Hauz Khas
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Karol Bagh">
                                    Karol Bagh
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Lajpat Nagar">
                                    Lajpat Nagar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Greater Kailash">
                                    Greater Kailash
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=South Extension">
                                    South Extension
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Punjabi Bagh">
                                    Punjabi Bagh
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Vasant Kunj">
                                    Vasant Kunj
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Saket">Saket</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Defence Colony">
                                    Defence Colony
                                  </Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Delhi <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link>Gurgaon</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Cyber City">
                                    Cyber City
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=MG Road">
                                    MG Road
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=DLF Phase 1">
                                    DLF Phase 1
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=DLF Phase 2">
                                    DLF Phase 2
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Sohna Road">
                                    Sohna Road
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Sector 29">
                                    Sector 29
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Golf Course Road">
                                    Golf Course Road
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Saket">Saket</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Udyog Vihar">
                                    Udyog Vihar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=New Gurgaon">
                                    New Gurgaon
                                  </Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Gurgaon <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link>Hyderabad</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Banjara Hills">
                                    Banjara Hills
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Jubilee Hills">
                                    Jubilee Hills
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Hitech City">
                                    Hitech City
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Gachibowli">
                                    Gachibowli
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Kondapur">
                                    Kondapur
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Kukatpally">
                                    Kukatpally
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Madhapur">
                                    Madhapur
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Ameerpet">
                                    Ameerpet
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Secunderabad">
                                    Secunderabad
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Hafeezpet">
                                    Hafeezpet
                                  </Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Hyderabad <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link>Kolkata</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Salt Lake">
                                    Salt Lake
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Park Street">
                                    Park Street
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Esplanade">
                                    Esplanade
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Ballygunge">
                                    Ballygunge
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Alambazar">
                                    Alambazar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Behala">
                                    Behala
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Howrah">
                                    Howrah
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Garia">Garia</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Shyambazar">
                                    Shyambazar
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Tollygunge">
                                    Tollygunge
                                  </Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Kolkata <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link>Mumbai</Link>
                              <ul>
                                <li>
                                  <h4 style={{ color: "red" }}>
                                    Popular Localities
                                  </h4>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Bandra">
                                    Bandra
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Andheri">
                                    Andheri
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Juhu">Juhu</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Colaba">
                                    Colaba
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Lower Parel">
                                    Lower Parel
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Worli">Worli</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Malabar Hill">
                                    Malabar Hill
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Kandivali">
                                    Kandivali
                                  </Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Thane">Thane</Link>
                                </li>
                                <li className="hover-effect">
                                  <Link to="/hotelList?city=Borivali">
                                    Borivali
                                  </Link>
                                </li>
                                <li>
                                  <h5 style={{ color: "black" }}>
                                    All of Mumbai <IoIosArrowForward />
                                  </h5>
                                </li>
                              </ul>
                            </li>

                            <li className="">
                              <Link to="/allCities">All Cities</Link>
                            </li>
                          </ul>
                        </div>
                      </nav>
                      {/* Main Menu End*/}
                    </div>
                    <div className="header-account flex align-center">
                      &nbsp;
                      <div className="register">
                        <ul className="flex align-center">
                          <li>
                            <Link className="agent-profile-link">
                              <svg
                                width={22}
                                height={22}
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.62501 18.5744H2.70418C2.65555 18.5744 2.60892 18.5551 2.57454 18.5207C2.54016 18.4863 2.52084 18.4397 2.52084 18.3911V17.0619C2.52084 16.3002 3.06443 15.6292 3.90226 15.059C5.39826 14.0378 7.81918 13.3943 10.5417 13.3943C10.9908 13.3943 11.4318 13.4127 11.8626 13.4466C11.9537 13.4558 12.0457 13.4466 12.1332 13.4198C12.2207 13.3929 12.3019 13.3489 12.3722 13.2902C12.4424 13.2315 12.5003 13.1594 12.5423 13.0781C12.5843 12.9968 12.6097 12.9079 12.6169 12.8166C12.6241 12.7254 12.613 12.6336 12.5842 12.5467C12.5555 12.4598 12.5097 12.3795 12.4495 12.3105C12.3893 12.2416 12.316 12.1853 12.2338 12.1451C12.1516 12.1048 12.0621 12.0814 11.9708 12.0762C11.4954 12.038 11.0186 12.0191 10.5417 12.0193C7.49651 12.0193 4.80059 12.7811 3.12676 13.9223C1.84984 14.7932 1.14584 15.8996 1.14584 17.061V18.3911C1.14609 18.8042 1.31037 19.2003 1.60259 19.4924C1.89481 19.7844 2.29104 19.9485 2.70418 19.9485L9.62501 19.9494C9.80735 19.9494 9.98221 19.877 10.1111 19.748C10.2401 19.6191 10.3125 19.4443 10.3125 19.2619C10.3125 19.0796 10.2401 18.9047 10.1111 18.7758C9.98221 18.6468 9.80735 18.5744 9.62501 18.5744ZM10.5417 1.14583C7.75868 1.14583 5.50001 3.4045 5.50001 6.1875C5.50001 8.9705 7.75868 11.2292 10.5417 11.2292C13.3247 11.2292 15.5833 8.9705 15.5833 6.1875C15.5833 3.4045 13.3247 1.14583 10.5417 1.14583ZM10.5417 2.52083C12.5657 2.52083 14.2083 4.1635 14.2083 6.1875C14.2083 8.2115 12.5657 9.85416 10.5417 9.85416C8.51768 9.85416 6.87501 8.2115 6.87501 6.1875C6.87501 4.1635 8.51768 2.52083 10.5417 2.52083Z"
                                  fill="#1C1C1E"
                                />
                                <path
                                  d="M16.6393 18.524C17.2592 18.618 17.8928 18.5515 18.4796 18.3311C19.0665 18.1106 19.5871 17.7434 19.9918 17.2646C20.3965 16.7858 20.6717 16.2112 20.7913 15.5958C20.9109 14.9804 20.8707 14.3446 20.6748 13.7491C20.4788 13.1536 20.1335 12.6182 19.6719 12.194C19.2102 11.7698 18.6476 11.471 18.0377 11.326C17.4277 11.1811 16.7908 11.1948 16.1877 11.3659C15.5846 11.537 15.0353 11.8598 14.5924 12.3035C14.186 12.7095 13.8807 13.2053 13.7013 13.751C13.5218 14.2967 13.4732 14.877 13.5593 15.4449L11.4308 17.5725C11.3669 17.6364 11.3161 17.7123 11.2815 17.7958C11.2469 17.8793 11.2291 17.9688 11.2292 18.0593V20.1667C11.2292 20.5462 11.5372 20.8542 11.9167 20.8542H14.0241C14.1145 20.8542 14.204 20.8364 14.2875 20.8018C14.3711 20.7672 14.4469 20.7165 14.5108 20.6525L16.6393 18.524ZM16.5917 17.1123C16.4753 17.0813 16.3528 17.0814 16.2365 17.1127C16.1202 17.1439 16.0141 17.2051 15.9289 17.2902L13.7399 19.4792H12.6042V18.3434L14.7932 16.1544C14.8782 16.0692 14.9395 15.9631 14.9707 15.8468C15.0019 15.7305 15.002 15.608 14.971 15.4917C14.8415 15.0042 14.8762 14.4878 15.0697 14.022C15.2632 13.5563 15.6046 13.1672 16.0413 12.915C16.478 12.6627 16.9857 12.5613 17.4858 12.6264C17.9859 12.6915 18.4506 12.9195 18.8082 13.2752C19.1638 13.6327 19.3918 14.0975 19.4569 14.5976C19.522 15.0977 19.4206 15.6053 19.1684 16.042C18.9161 16.4787 18.5271 16.8202 18.0613 17.0136C17.5956 17.2071 17.0791 17.2418 16.5917 17.1123Z"
                                  fill="#1C1C1E"
                                />
                              </svg>
                            </Link>
                            <div className="dropdown-menu">
                              <ul
                                style={{
                                  width: "100%",
                                  padding: 0,
                                  listStyle: "none",
                                }}
                              >
                                {loginId && (
                                  <>
                                    <li>
                                      <Link
                                        style={{
                                          color: "black",
                                          textDecoration: "none",
                                        }}
                                        onMouseOver={(e) =>
                                          (e.target.style.color = "red")
                                        }
                                        onMouseOut={(e) =>
                                          (e.target.style.color = "black")
                                        }
                                        to="/bookingHistory"
                                      >
                                        My Booking
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        style={{
                                          color: "black",
                                          textDecoration: "none",
                                        }}
                                        onMouseOver={(e) =>
                                          (e.target.style.color = "red")
                                        }
                                        onMouseOut={(e) =>
                                          (e.target.style.color = "black")
                                        }
                                        to="/myFavorites"
                                      >
                                        My Favorites
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        style={{
                                          color: "black",
                                          textDecoration: "none",
                                        }}
                                        onMouseOver={(e) =>
                                          (e.target.style.color = "red")
                                        }
                                        onMouseOut={(e) =>
                                          (e.target.style.color = "black")
                                        }
                                        to="/costomerProfile"
                                      >
                                        My Profile
                                      </Link>
                                    </li>
                                  </>
                                )}
                                <li>
                                  <Link
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "red")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "black")
                                    }
                                    to="/contactus"
                                  >
                                    Contact Us
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    style={{
                                      color: "black",
                                      textDecoration: "none",
                                    }}
                                    onMouseOver={(e) =>
                                      (e.target.style.color = "red")
                                    }
                                    onMouseOut={(e) =>
                                      (e.target.style.color = "black")
                                    }
                                    to="/About"
                                  >
                                    About Us
                                  </Link>
                                </li>
                                <li>
                                  {loginId ? (
                                    <Link
                                      style={{
                                        color: "black",
                                        textDecoration: "none",
                                      }}
                                      onMouseOver={(e) =>
                                        (e.target.style.color = "red")
                                      }
                                      onMouseOut={(e) =>
                                        (e.target.style.color = "black")
                                      }
                                      onClick={Logout}
                                    >
                                      Logout
                                    </Link>
                                  ) : (
                                    <Link
                                      style={{
                                        color: "black",
                                        textDecoration: "none",
                                      }}
                                      onMouseOver={(e) =>
                                        (e.target.style.color = "red")
                                      }
                                      onMouseOut={(e) =>
                                        (e.target.style.color = "black")
                                      }
                                      to="/Login"
                                    >
                                      Login
                                    </Link>
                                  )}
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className="mobile-nav-toggler mobile-button"
                      onClick={menuOpen}
                    >
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Header Lower */}
          {/* Mobile Menu  */}
          <div className="close-btn" onClick={menuClose}>
            <span className="icon flaticon-cancel-1" />
          </div>

          {/*mobile menu start */}
          <div className="mobile-menu">
            <div className="menu-backdrop" />
            <nav className="menu-box">
              <div className="nav-logo">
                <Link onClick={menuClose} to="/">
                  <img
                    src="assets/images/raw-logo-bookmipg-original.png"
                    alt
                    width={197}
                    height={48}
                  />
                </Link>
              </div>
              <div className="bottom-canvas">
                <div className="menu-outer">
                  <div
                    className="navbar-collapse collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li
                        className="dropdown2 current"
                        onClick={() => toggleDropdown("cities")}
                      >
                        <Link to="/hotelList">Cities</Link>
                        <ul
                          style={{
                            overflowY: "auto",
                            maxHeight: "300px",
                            display: dropdownOpen.cities ? "block" : "none",
                          }}
                        >
                          {cities?.map((city, index) => (
                            <li
                              style={{
                                borderBottom: "1px solid #f3f3f3",
                                padding: "8px 12px",
                              }}
                              key={index}
                              data-value={city}
                            >
                              <Link
                                to={`/hotelList?city=${encodeURIComponent(
                                  city
                                )}`}
                                onClick={menuClose}
                              >
                                {city}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      {loginId && (
                        <>
                          <li>
                            <Link to="/bookingHistory">My Booking</Link>
                          </li>
                          <li>
                            <Link to="/costomerProfile">My Profile</Link>
                          </li>
                          <li>
                            <Link to="/myFavorites">My Favorites</Link>
                          </li>
                        </>
                      )}
                      <li>
                        {!loginId ? (
                          <Link to="/login">Login</Link>
                        ) : (
                          <Link to="#" onClick={Logout}>
                            Logout
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mobi-icon-box">
                  <h3>Contact</h3>
                  <div className="box flex">
                    <div className="icon">
                      <svg
                        width={40}
                        height={41}
                        viewBox="0 0 50 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </div>
                    <div className="content fs-13">
                      Call us:
                      <h5>9999999999</h5>
                    </div>
                  </div>
                  <div className="box flex">
                    <div className="icon">
                      <svg
                        width={40}
                        height={40}
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG path for the icon */}
                      </svg>
                    </div>
                    <div className="content fs-13 lh-16">
                      Email:
                      <h5>test@gmail.com</h5>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
