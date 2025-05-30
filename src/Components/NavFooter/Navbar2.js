import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import cities from "../Auth/cities";
import axios from "axios";
import swal from "sweetalert";
const Navbar2 = () => {
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

  // Function to open the menu
  const menuOpen = () => {
    setIsMenuOpen(true);
  };

  // Function to close the menu
  const menuClose = () => {
    setIsMenuOpen(false);
  };
  let role = localStorage.getItem("roleType");
  const loginid = localStorage.getItem("loginuserid");



  let Logout = () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to logout ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletebannerimage = () => {
         
         }
        deletebannerimage();
        localStorage.clear();
Navigate("/Login")
      } else {
        
      }
    });
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataofheader, setdataofheader] = useState();

  useEffect(() => {
    const defaultCity = "Mumbai";
    localStorage.setItem("cityname", defaultCity);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleCityClick = (city) => {
    localStorage.setItem("cityname", city);
    setIsDropdownOpen(false);
    GetHeaderListing();
  };

  const [dataOfBuy, setDataOfBuy] = useState();

  const [dataOfRent, setDataOfRent] = useState();
  const [dataofAgent, setdataofAgent] = useState();
  const [dataOfproject, setDataOfproject] = useState();

  useEffect(() => {
    GetHeaderListing();
  }, [localStorage.getItem("cityname")]);

  const GetHeaderListing = () => {
    const data = {
      city_name: localStorage.getItem("cityname") || "",
    };
    axios
      .post("http://157.66.191.24:3089/website/get_buy_data", data)
      .then((response) => {
        if (response.data.result === "true") {
          setDataOfBuy(response.data.data[0]);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetHeaderListings();
  }, [localStorage.getItem("cityname")]);

  const GetHeaderListings = () => {
    const data = {
      city_name: localStorage.getItem("cityname") || "",
    };
    axios
      .post("http://157.66.191.24:3089/website/get_rent_data", data)
      .then((response) => {
        if (response.data.result === "true") {
          setDataOfRent(response.data.data[0]);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetHeaderProject();
  }, [localStorage.getItem("cityname")]);

  const GetHeaderProject = () => {
    const data = {
      city_name: localStorage.getItem("cityname") || "",
    };
    axios
      .post("http://157.66.191.24:3089/website/get_project_data", data)
      .then((response) => {
        if (response.data.result === "true") {
          setDataOfproject(response.data.data[0]);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetCityAgent();
  }, [0]);
  const GetCityAgent = () => {
    const data = {
      city_name: localStorage.getItem("cityname"),
    };
    axios
      .post("http://157.66.191.24:3089/website/get_city_agent", data)
      .then((res) => {
        setdataofAgent(res.data.data);
      })
      .catch((error) => {});
  };


  useEffect(() => {
    GetuserData();
  }, [0]);
  const GetuserData = () => {
    const userdata = {
      userId: loginid,
    };
    axios
      .post("http://157.66.191.24:3089/website/user_profile", userdata)
      .then((response) => {
        
        localStorage.setItem("subscription",response.data.data.uploaded_status)
      })
      .catch((error) => {});
  };
  return (
    <>
      <div
        className={`dashboard show ${isMenuOpen ? "mobile-menu-visible" : ""}`}
      >
        <header id="header" className="main-header">
          <div className="header-lower">
            <div className="container6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner-container flex justify-space align-center">
                    {/* Logo Box */}
                    <div className="logo-box flex">
                      <div className="logo"></div>
                    </div>
                    <div className="nav-outer flex align-center">
                      {/* Main Menu */}
                      <nav className="main-menu show navbar-expand-md">
                        <div
                          className="navbar-collapse collapse clearfix"
                          id="navbarSupportedContent"
                        >
                          <ul className="navigation clearfix">
                            <li
                              className={`dropdown2 ${
                                isDropdownOpen ? "open" : ""
                              }`}
                              onMouseEnter={() => setIsDropdownOpen(true)}
                              onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                              <Link
                                to="#"
                                onClick={() =>
                                  setIsDropdownOpen(!isDropdownOpen)
                                }
                              >
                                {localStorage.getItem("cityname")}
                              </Link>

                              {isDropdownOpen && (
                                <ul
                                  style={{
                                    overflow: "scroll",
                                    height: 400,
                                    overflowX: "hidden",
                                    scrollbarWidth: "thin",
                                  }}
                                >
                                  <input
                                    type="text"
                                    className="mb-3 form-group-1"
                                    placeholder="Select or type your city"
                                    value={searchTerm}
                                    onChange={handleChange}
                                    required
                                    style={{
                                      color: "black",
                                      backgroundColor: "#fff",
                                      padding: "7px",
                                      borderRadius: "4px",
                                      border: "1px solid #c4c4c9",
                                      boxSizing: "border-box",
                                      borderBottom: "1px solid #c4c4c9",
                                    }}
                                  />
                                  {filteredCities.map((city, index) => (
                                    <li
                                      style={{
                                        borderBottom: "1px solid #f3f3f3",
                                      }}
                                      key={index}
                                      data-value={city}
                                    >
                                      <Link
                                        onClick={() => {
                                          handleCityClick(city);

                                          localStorage.setItem(
                                            "properttype"
                                          );
                                          localStorage.setItem(
                                            "properttype2"
                                          );

                                          localStorage.setItem("rooms");

                                          localStorage.setItem(
                                            "selectedBajat"
                                          );
                                          localStorage.setItem(
                                            "propertiestype"
                                          );
                                        }}
                                        to="#"
                                      >
                                        {city}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                            <li className="dropdown2">
                              <Link to="#">Buy</Link>
                              <ul
                                className="row"
                                style={{
                                  width: "740px",
                                  fontSize: "12px",
                                  paddingLeft: "30px",
                                  paddingRight: "15px",
                                }}
                              >
                                <div className="megaDropDownLinks Buy">
                                  <div className="sliderNavigation">
                                    <div
                                      className="bx-wrapper"
                                      style={{ maxWidth: "1140px" }}
                                    >
                                      <div
                                        className="bx-viewport"
                                        aria-live="polite"
                                        style={{
                                          width: "100%",
                                          overflow: "hidden",
                                          position: "relative",
                                          height: "300px",
                                        }}
                                      >
                                        <div
                                          className="bx-slider"
                                          style={{
                                            width: "5215%",
                                            position: "relative",
                                            transitionDuration: "0s",
                                            transform:
                                              "translate3d(0px, 0px, 0px)",
                                          }}
                                        >
                                          {/* Popular Searches */}
                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "175px",
                                            }}
                                          >
                                            <h5
                                              className="text-color-3"
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                            >
                                              Popular Searches
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfBuy?.PopularSearches
                                                ?.length > 0 ? (
                                                dataOfBuy?.PopularSearches?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Sale"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms"
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {
                                                          item?.building_type_two
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "175px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Residential Properties
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfBuy?.ResidentialProperties
                                                ?.length > 0 ? (
                                                dataOfBuy?.ResidentialProperties?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Sale"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms"
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {
                                                          item?.building_type_two
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "175px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Commercial Properties
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfBuy?.CommercialProperties
                                                ?.length > 0 ? (
                                                dataOfBuy?.CommercialProperties?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Sale"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms"
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {
                                                          item?.building_type_two
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "185px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              No. of Rooms
                                            </h5>

                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfBuy?.IndependentHouse
                                                ?.length > 0 ? (
                                                dataOfBuy?.IndependentHouse?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Sale"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms",
                                                            item?.rooms
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {item?.rooms} BHK Flats
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            </li>

                            <li className="dropdown2">
                              <Link to="#">Rent</Link>
                              <ul
                                className="row"
                                style={{
                                  width: "675px",
                                  fontSize: "12px",
                                  paddingLeft: "20px",
                                  paddingRight: "15px",
                                }}
                              >
                                <div className="megaDropDownLinks Buy">
                                  <div className="sliderNavigation">
                                    <div
                                      className="bx-wrapper"
                                      style={{ maxWidth: "1140px" }}
                                    >
                                      <div
                                        className="bx-viewport"
                                        aria-live="polite"
                                        style={{
                                          width: "100%",
                                          overflow: "hidden",
                                          position: "relative",
                                          height: "300px",
                                        }}
                                      >
                                        <div
                                          className="bx-slider"
                                          style={{
                                            width: "5215%",
                                            position: "relative",
                                            transitionDuration: "0s",
                                            transform:
                                              "translate3d(0px, 0px, 0px)",
                                          }}
                                        >
                                          {/* Popular Searches */}
                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "160px",
                                            }}
                                          >
                                            <h5
                                              className="text-color-3"
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                            >
                                              Popular Searches
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfRent?.PopularSearches
                                                ?.length > 0 ? (
                                                dataOfRent?.PopularSearches?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Rent"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms"
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {
                                                          item?.building_type_two
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "160px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Residential Properties
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfRent?.ResidentialProperties
                                                ?.length > 0 ? (
                                                dataOfRent?.ResidentialProperties?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Rent"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms"
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {
                                                          item?.building_type_two
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "160px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Commercial Properties
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfRent?.CommercialProperties
                                                ?.length > 0 ? (
                                                dataOfRent?.CommercialProperties?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Rent"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms"
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {
                                                          item?.building_type_two
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "175px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              No. of Rooms
                                            </h5>

                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfRent?.IndependentHouse
                                                ?.length > 0 ? (
                                                dataOfRent?.IndependentHouse?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Rent"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms",
                                                            item?.rooms
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {item?.rooms} BHK Flats
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            </li>
                            <li className="dropdown2">
                              <Link to="#">Projects</Link>
                              <ul
                                className="row"
                                style={{
                                  width: "675px",
                                  fontSize: "12px",
                                  paddingLeft: "20px",
                                  paddingRight: "15px",
                                }}
                              >
                                <div className="megaDropDownLinks Buy">
                                  <div className="sliderNavigation">
                                    <div
                                      className="bx-wrapper"
                                      style={{ maxWidth: "1140px" }}
                                    >
                                      <div
                                        className="bx-viewport"
                                        aria-live="polite"
                                        style={{
                                          width: "100%",
                                          overflow: "hidden",
                                          position: "relative",
                                          height: "300px",
                                        }}
                                      >
                                        <div
                                          className="bx-slider"
                                          style={{
                                            width: "5215%",
                                            position: "relative",
                                            transitionDuration: "0s",
                                            transform:
                                              "translate3d(0px, 0px, 0px)",
                                          }}
                                        >
                                          {/* Popular Searches */}
                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "160px",
                                            }}
                                          >
                                            <h5
                                              className="text-color-3"
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                            >
                                              Top Searched Projects
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfproject?.TopSearches
                                                ?.length > 0 ? (
                                                dataOfproject?.TopSearches?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "possessionstatus",
                                                            item?.possession_status
                                                          );
                                                          localStorage.setItem(
                                                            "locality"
                                                          );
                                                          localStorage.setItem(
                                                            "project_type"
                                                          );
                                                          localStorage.setItem(
                                                            "project_name"
                                                          );
                                                        }}
                                                        to="/ProjectsList"
                                                      >
                                                        {
                                                          item?.possession_status
                                                        }{" "}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "160px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Projects in Mumbai
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfproject?.ProjectIn
                                                ?.length > 0 ? (
                                                dataOfproject?.ProjectIn?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "possessionstatus"
                                                          );
                                                          localStorage.setItem(
                                                            "locality",
                                                            item?.locality
                                                          );
                                                          localStorage.setItem(
                                                            "project_type"
                                                          );
                                                          localStorage.setItem(
                                                            "project_name"
                                                          );
                                                        }}
                                                        to="/ProjectsList"
                                                      >
                                                        {item?.locality} in{" "}
                                                        {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "160px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Top Seller Projects
                                            </h5>
                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfproject?.TopSellerProject
                                                ?.length > 0 ? (
                                                dataOfproject?.TopSellerProject?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "possessionstatus"
                                                          );
                                                          localStorage.setItem(
                                                            "locality"
                                                          );
                                                          localStorage.setItem(
                                                            "project_type",
                                                            item?.project_type
                                                          );
                                                          localStorage.setItem(
                                                            "project_name"
                                                          );
                                                        }}
                                                        to="/ProjectsList"
                                                      >
                                                        {item?.project_type} in{" "}
                                                        {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>

                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "165px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              Projects Comming
                                            </h5>

                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfproject?.TopSearchsProject
                                                ?.length > 0 ? (
                                                dataOfproject?.TopSearchsProject?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect" 
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "possessionstatus"
                                                          );
                                                          localStorage.setItem(
                                                            "locality"
                                                          );
                                                          localStorage.setItem(
                                                            "project_type"
                                                          );
                                                          localStorage.setItem(
                                                            "project_name",
                                                            item?.project_name
                                                          );
                                                        }}
                                                        to="/ProjectsList"
                                                      >
                                                        {item?.project_name}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>
                                          <div
                                            className="dropDownListBox"
                                            aria-hidden="false"
                                            style={{
                                              float: "left",
                                              listStyle: "none",
                                              position: "relative",
                                              width: "170px",
                                            }}
                                          >
                                            <h5
                                              style={{
                                                borderBottom:
                                                  "1px solid #e5e5e5",
                                                marginBottom: "10px",
                                                paddingBottom: "7px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                              }}
                                              className="text-color-3 mb-2"
                                            >
                                              No. of Rooms
                                            </h5>

                                            <ul
                                              style={{
                                                height: "255px",
                                                overflow: "scroll",
                                                overflowX: "hidden",
                                                scrollbarWidth: "none",
                                              }}
                                            >
                                              {dataOfproject?.TopSearchsProject
                                                ?.length > 0 ? (
                                                dataOfproject?.TopSearchsProject?.map(
                                                  (item) => (
                                                    <li
                                                      className="mt-2 hover-effect"
                                                      key={item._id}
                                                    >
                                                      <Link
                                                        onClick={() => {
                                                          localStorage.setItem(
                                                            "properttype",
                                                            "Rent"
                                                          );

                                                          localStorage.setItem(
                                                            "properttype2",
                                                            item?.building_type_two
                                                          );
                                                          localStorage.setItem(
                                                            "rooms",
                                                            item?.rooms
                                                          );
                                                        }}
                                                        to="/PropertyListSidebar"
                                                      >
                                                        {item?.project_name}
                                                        in {item?.city_name}
                                                      </Link>
                                                    </li>
                                                  )
                                                )
                                              ) : (
                                                <li>No Listing Found</li>
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            </li>
                            <li className="dropdown2">
                              <a href="#">Agent</a>
                              <ul>
                                {dataofAgent?.length > 0 ? (
                                  dataofAgent?.slice(0, 1)?.map((data) => {
                                    return (
                                      <li className="hover-effect">
                                        <Link to="/Agents">
                                          Agent for{" "}
                                          {localStorage.getItem(
                                            "cityname"
                                          )}
                                        </Link>
                                      </li>
                                    );
                                  })
                                ) : (
                                  <li className>
                                    <Link to="#">No Agent Found</Link>
                                  </li>
                                )}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </nav>
                      {/* Main Menu End*/}
                    </div>
                    <div className="header-account flex align-center">
                      <div className="img-box flex align-center">
                        <div className="flat-bt-top sc-btn-top">
                          <Link
                            className="sc-buttonborder btn-icon"
                            to="/ContactUs"
                          >
                            <span>Advertise With Us</span>
                          </Link>
                        </div>
                      </div>
                      &nbsp;
                      <div className="flat-bt-top sc-btn-top">
                        <Link
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#fff",
                          }}
                          className="sc-button btn-icon"
                          to={
                            role === "Agent" || role === "Developer"
                              ? "/AgentProperty"
                              : "/DeshBoardPropertys"
                          }
                        >
                          Sell / Rent Property
                        </Link>
                      </div>
                      &nbsp;
                      <div className="register">
                        <ul className="flex align-center">
                          <li>
                            {" "}
                            <Link
                              to={
                                role === "Agent" || role === "Developer"
                                  ? "/AgentProfile"
                                  : "/DashBoard"
                              }
                            >
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
                                <path
                                  d="M16.4835 15.5998C16.3877 15.5083 16.3111 15.3984 16.2583 15.2768C16.2055 15.1552 16.1775 15.0243 16.1761 14.8917C16.1746 14.7592 16.1996 14.6276 16.2497 14.5049C16.2998 14.3822 16.374 14.2707 16.4678 14.177C16.5616 14.0833 16.6732 14.0093 16.796 13.9594C16.9188 13.9095 17.0503 13.8846 17.1829 13.8862C17.3154 13.8879 17.4463 13.916 17.5679 13.9689C17.6894 14.0219 17.7991 14.0986 17.8906 14.1946C18.0698 14.3826 18.1683 14.6333 18.1651 14.893C18.1619 15.1527 18.0572 15.4009 17.8734 15.5845C17.6896 15.768 17.4413 15.8724 17.1816 15.8752C16.9219 15.8781 16.6713 15.7793 16.4835 15.5998Z"
                                  fill="#1C1C1E"
                                />
                              </svg>
                            </Link>
                          </li>

                          {!loginid ? (
                            <li className>
                              {" "}
                              <Link to="/Login">Login</Link>
                            </li>
                          ) : (
                            <li className>
                              {" "}
                              <Link
                                onClick={() => {
                                  Logout();
                                }}
                                
                              >
                                LogOut
                              </Link>
                            </li>
                          )}
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
                <Link to="/" onClick={menuClose}>
                  <img
                    src="assets/images/logo/logo%402x.png"
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
                        <Link to="#">Cities</Link>
                        <ul
                          style={{
                            overflow: "scroll",
                            height: "300px",
                            display: dropdownOpen.cities ? "block" : "none",
                          }}
                        >
                          {cities?.map((city, index) => (
                            <li
                              onClick={menuClose}
                              style={{
                                borderBottom: "1px solid #f3f3f3",
                              }}
                              key={index}
                              data-value={city}
                            >
                              <Link
                                onClick={() => {
                                  handleCityClick(city);

                                  localStorage.setItem("properttype");
                                  localStorage.setItem("properttype2");

                                  localStorage.setItem("rooms");

                                  localStorage.setItem("selectedBajat");
                                  localStorage.setItem("propertiestype");
                                }}
                                to="#"
                              >
                                {city}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="dropdown2-btn" />
                      </li>

                      <li
                        className="dropdown2"
                        onClick={() => toggleDropdown("buy")}
                      >
                        <Link to="#">Buy</Link>
                        <ul
                          className="row"
                          style={{
                            width: 700,
                            display: dropdownOpen.buy ? "block" : "none",
                          }}
                        >
                          <div className="megaDropDownLinks Buy">
        <div className="sliderNavigation">
          <div
            className="bx-wrapper"
            style={{ maxWidth: "1140px" }}
          >
            <div
              className="bx-viewport"
              aria-live="polite"
              style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
                height: "300px",
              }}
            >
              <div
                className="bx-slider"
                style={{
                  width: "5215%",
                  position: "relative",
                  transitionDuration: "0s",
                  transform:
                    "translate3d(0px, 0px, 0px)",
                }}
              >
                {/* Popular Searches */}
                <div
                  className="dropDownListBox"
                  aria-hidden="false"
                  style={{
                    float: "left",
                    listStyle: "none",
                    position: "relative",
                    width: "160px",
                  }}
                >
                  <h5
                    className="text-color-3"
                    style={{
                      borderBottom:
                        "1px solid #e5e5e5",
                      marginBottom: "10px",
                      paddingBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    Popular Searches
                  </h5>
                  <ul style={{
                    height:'255px',
                    overflow:'scroll', overflowX:'hidden',scrollbarWidth:'none'  
                  }}>
                     {dataOfBuy?.PopularSearches
                      ?.length > 0 ? (
                      dataOfBuy?.PopularSearches?.map(
                        (item) => (
                          <li onClick={menuClose}
                            className="mt-2"
                            key={item._id}
                          >
                            <Link
                              onClick={() =>{
                                localStorage.setItem(
                                  "properttype",
                                  "Sale"
                                )

                                localStorage.setItem(
                                  "properttype2",
                                  item?.building_type_two
                                )
                                localStorage.setItem("rooms")
                              }
                              }
                              to="/PropertyListSidebar"
                            >
                              {
                                item?.building_type_two
                              }{" "}
                              in {item?.city_name}
                            </Link>
                          </li>
                        )
                      )
                    ) : (
                      <li>No Listing Found</li>
                    )}
                  </ul>
                </div>

                <div
                  className="dropDownListBox"
                  aria-hidden="false"
                  style={{
                    float: "left",
                    listStyle: "none",
                    position: "relative",
                    width: "160px",
                  }}
                >
                  <h5
                    style={{
                      borderBottom:
                        "1px solid #e5e5e5",
                      marginBottom: "10px",
                      paddingBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                    className="text-color-3 mb-2"
                  >
                    Residential Properties
                  </h5>
                  <ul style={{
                    height:'255px',
                    overflow:'scroll', overflowX:'hidden',scrollbarWidth:'none'  
                  }}>
                     {dataOfBuy?.ResidentialProperties
                      ?.length > 0 ? (
                      dataOfBuy?.ResidentialProperties?.map(
                        (item) => (
                          <li onClick={menuClose}
                            className="mt-2"
                            key={item._id}
                          >
                            <Link
                              onClick={() =>{
                                localStorage.setItem(
                                  "properttype",
                                  "Sale"
                                )

                                localStorage.setItem(
                                  "properttype2",
                                  item?.building_type_two
                                )
                                localStorage.setItem("rooms")
                              }
                              }
                              to="/PropertyListSidebar"
                            >
                              {
                                item?.building_type_two
                              }{" "}
                              in {item?.city_name}
                            </Link>
                          </li>
                        )
                      )
                    ) : (
                      <li>No Listing Found</li>
                    )}
                  </ul>
                </div>

                <div
                  className="dropDownListBox"
                  aria-hidden="false"
                  style={{
                    float: "left",
                    listStyle: "none",
                    position: "relative",
                    width: "165px",
                  }}
                >
                  <h5
                    style={{
                      borderBottom:
                        "1px solid #e5e5e5",
                      marginBottom: "10px",
                      paddingBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                    className="text-color-3 mb-2"
                  >
                    Commercial Properties
                  </h5>
                  <ul style={{
                    height:'255px',
                    overflow:'scroll', overflowX:'hidden',scrollbarWidth:'none'  
                  }}>
                    {dataOfBuy?.CommercialProperties
                      ?.length > 0 ? (
                      dataOfBuy?.CommercialProperties?.map(
                        (item) => (
                          <li onClick={menuClose}
                            className="mt-2"
                            key={item._id}
                          >
                            <Link
                              onClick={() =>{
                                localStorage.setItem(
                                  "properttype",
                                  "Sale"
                                )

                                localStorage.setItem(
                                  "properttype2",
                                  item?.building_type_two
                                )
                                localStorage.setItem("rooms")
                              }
                              }
                              to="/PropertyListSidebar"
                            >
                              {
                                item?.building_type_two
                              }{" "}
                              in {item?.city_name}
                            </Link>
                          </li>
                        )
                      )
                    ) : (
                      <li>No Listing Found</li>
                    )}
                  </ul>
                </div>

                <div
                  className="dropDownListBox"
                  aria-hidden="false"
                  style={{
                    float: "left",
                    listStyle: "none",
                    position: "relative",
                    width: "175px",
                  }}
                >
                  <h5
                    style={{
                      borderBottom:
                        "1px solid #e5e5e5",
                      marginBottom: "10px",
                      paddingBottom: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    className="text-color-3 mb-2"
                  >
                    No. of Rooms
                  </h5>

                  <ul style={{
                    height:'255px',
                    overflow:'scroll', overflowX:'hidden',scrollbarWidth:'none'  
                  }}>
                    {dataOfBuy?.IndependentHouse
                      ?.length > 0 ? (
                      dataOfBuy?.IndependentHouse?.map(
                        (item) => (
                          <li onClick={menuClose}
                            className="mt-2"
                            key={item._id}
                          >
                            <Link
                              onClick={() =>{
                                localStorage.setItem(
                                  "properttype",
                                  "Sale"
                                )

                                localStorage.setItem(
                                  "properttype2",
                                  item?.building_type_two
                                )
                                localStorage.setItem(
                                  "rooms",
                                  item?.rooms
                                )
                              }
                              }
                              to="/PropertyListSidebar"
                            >
                              {item?.rooms} BHK Flats
                              in {item?.city_name}
                            </Link>
                          </li>
                        )
                      )
                    ) : (
                      <li>No Listing Found</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                        </ul>
                        <div className="dropdown2-btn" />
                      </li>
                      <li
                        className="dropdown2"
                        onClick={() => toggleDropdown("Rent")}
                      >
                        <Link to="#">Rent</Link>
                        <ul
                          className="row"
                          style={{
                            width: 700,
                            display: dropdownOpen.Rent ? "block" : "none",
                          }}
                        >
                          <div className="megaDropDownLinks Buy">
                            <div className="sliderNavigation">
                              <div
                                className="bx-wrapper"
                                style={{ maxWidth: "1140px" }}
                              >
                                <div
                                  className="bx-viewport"
                                  aria-live="polite"
                                  style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    position: "relative",
                                    height: "300px",
                                  }}
                                >
                                  <div
                                    className="bx-slider"
                                    style={{
                                      width: "5215%",
                                      position: "relative",
                                      transitionDuration: "0s",
                                      transform: "translate3d(0px, 0px, 0px)",
                                    }}
                                  >
                                    {/* Popular Searches */}
                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "160px",
                                      }}
                                    >
                                      <h5
                                        className="text-color-3"
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Popular Searches
                                      </h5>
                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfRent?.PopularSearches?.length >
                                        0 ? (
                                          dataOfRent?.PopularSearches?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "properttype",
                                                      "Rent"
                                                    );

                                                    localStorage.setItem(
                                                      "properttype2",
                                                      item?.building_type_two
                                                    );
                                                    localStorage.setItem(
                                                      "rooms"
                                                    );
                                                  }}
                                                  to="/PropertyListSidebar"
                                                >
                                                  {item?.building_type_two} in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "160px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        Residential Properties
                                      </h5>
                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfRent?.ResidentialProperties
                                          ?.length > 0 ? (
                                          dataOfRent?.ResidentialProperties?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "properttype",
                                                      "Rent"
                                                    );

                                                    localStorage.setItem(
                                                      "properttype2",
                                                      item?.building_type_two
                                                    );
                                                    localStorage.setItem(
                                                      "rooms"
                                                    );
                                                  }}
                                                  to="/PropertyListSidebar"
                                                >
                                                  {item?.building_type_two} in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "165px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        Commercial Properties
                                      </h5>
                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfRent?.CommercialProperties
                                          ?.length > 0 ? (
                                          dataOfRent?.CommercialProperties?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "properttype",
                                                      "Rent"
                                                    );

                                                    localStorage.setItem(
                                                      "properttype2",
                                                      item?.building_type_two
                                                    );
                                                    localStorage.setItem(
                                                      "rooms"
                                                    );
                                                  }}
                                                  to="/PropertyListSidebar"
                                                >
                                                  {item?.building_type_two} in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "175px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                          cursor: "pointer",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        No. of Rooms
                                      </h5>

                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfRent?.IndependentHouse?.length >
                                        0 ? (
                                          dataOfRent?.IndependentHouse?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "properttype",
                                                      "Rent"
                                                    );

                                                    localStorage.setItem(
                                                      "properttype2",
                                                      item?.building_type_two
                                                    );
                                                    localStorage.setItem(
                                                      "rooms",
                                                      item?.rooms
                                                    );
                                                  }}
                                                  to="/PropertyListSidebar"
                                                >
                                                  {item?.rooms} BHK Flats in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ul>
                        <div className="dropdown2-btn" />
                      </li>
                      <li
                        className="dropdown2"
                        onClick={() => toggleDropdown("Project")}
                      >
                        <Link to="#">Projects</Link>
                        <ul
                          className="row"
                          style={{
                            width: 700,
                            display: dropdownOpen.Project ? "block" : "none",
                          }}
                        >
                          <div className="megaDropDownLinks Buy">
                            <div className="sliderNavigation">
                              <div
                                className="bx-wrapper"
                                style={{ maxWidth: "1140px" }}
                              >
                                <div
                                  className="bx-viewport"
                                  aria-live="polite"
                                  style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    position: "relative",
                                    height: "300px",
                                  }}
                                >
                                  <div
                                    className="bx-slider"
                                    style={{
                                      width: "5215%",
                                      position: "relative",
                                      transitionDuration: "0s",
                                      transform: "translate3d(0px, 0px, 0px)",
                                    }}
                                  >
                                    {/* Popular Searches */}
                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "160px",
                                      }}
                                    >
                                      <h5
                                        className="text-color-3"
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Top Searched Projects
                                      </h5>
                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfproject?.TopSearches?.length >
                                        0 ? (
                                          dataOfproject?.TopSearches?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "possessionstatus",
                                                      item?.possession_status
                                                    );
                                                    localStorage.setItem(
                                                      "locality"
                                                    );
                                                    localStorage.setItem(
                                                      "project_type"
                                                    );
                                                    localStorage.setItem(
                                                      "project_name"
                                                    );
                                                  }}
                                                  to="/ProjectsList"
                                                >
                                                  {item?.possession_status} in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "160px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        Projects in Mumbai
                                      </h5>
                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfproject?.ProjectIn?.length >
                                        0 ? (
                                          dataOfproject?.ProjectIn?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "possessionstatus"
                                                    );
                                                    localStorage.setItem(
                                                      "locality",
                                                      item?.locality
                                                    );
                                                    localStorage.setItem(
                                                      "project_type"
                                                    );
                                                    localStorage.setItem(
                                                      "project_name"
                                                    );
                                                  }}
                                                  to="/ProjectsList"
                                                >
                                                  {item?.locality} in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "160px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        Top Seller Projects
                                      </h5>
                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfproject?.TopSellerProject
                                          ?.length > 0 ? (
                                          dataOfproject?.TopSellerProject?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "possessionstatus"
                                                    );
                                                    localStorage.setItem(
                                                      "locality"
                                                    );
                                                    localStorage.setItem(
                                                      "project_type",
                                                      item?.project_type
                                                    );
                                                    localStorage.setItem(
                                                      "project_name"
                                                    );
                                                  }}
                                                  to="/ProjectsList"
                                                >
                                                  {item?.project_type} in{" "}
                                                  {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "165px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                          cursor: "pointer",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        Projects Comming
                                      </h5>

                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfproject?.TopSearchsProject
                                          ?.length > 0 ? (
                                          dataOfproject?.TopSearchsProject?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "possessionstatus"
                                                    );
                                                    localStorage.setItem(
                                                      "locality"
                                                    );
                                                    localStorage.setItem(
                                                      "project_type"
                                                    );
                                                    localStorage.setItem(
                                                      "project_name",
                                                      item?.project_name
                                                    );
                                                  }}
                                                  to="/ProjectsList"
                                                >
                                                  {item?.project_name}
                                                  in {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>
                                    <div
                                      className="dropDownListBox"
                                      aria-hidden="false"
                                      style={{
                                        float: "left",
                                        listStyle: "none",
                                        position: "relative",
                                        width: "170px",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          borderBottom: "1px solid #e5e5e5",
                                          marginBottom: "10px",
                                          paddingBottom: "7px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                          cursor: "pointer",
                                        }}
                                        className="text-color-3 mb-2"
                                      >
                                        No. of Rooms
                                      </h5>

                                      <ul
                                        style={{
                                          height: "255px",
                                          overflow: "scroll",
                                          overflowX: "hidden",
                                          scrollbarWidth: "none",
                                        }}
                                      >
                                        {dataOfproject?.TopSearchsProject
                                          ?.length > 0 ? (
                                          dataOfproject?.TopSearchsProject?.map(
                                            (item) => (
                                              <li
                                                onClick={menuClose}
                                                className="mt-2"
                                                key={item._id}
                                              >
                                                <Link
                                                  onClick={() => {
                                                    localStorage.setItem(
                                                      "properttype",
                                                      "Rent"
                                                    );

                                                    localStorage.setItem(
                                                      "properttype2",
                                                      item?.building_type_two
                                                    );
                                                    localStorage.setItem(
                                                      "rooms",
                                                      item?.rooms
                                                    );
                                                  }}
                                                  to="/PropertyListSidebar"
                                                >
                                                  {item?.project_name}
                                                  in {item?.city_name}
                                                </Link>
                                              </li>
                                            )
                                          )
                                        ) : (
                                          <li>No Listing Found</li>
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ul>
                        <div className="dropdown2-btn" />
                      </li>
                      <li
                        className="dropdown2"
                        onClick={() => toggleDropdown("Agent")}
                      >
                        <Link to="#">Agent</Link>
                        <ul
                          style={{
                            display: dropdownOpen.Agent ? "block" : "none",
                          }}
                        >
                          {dataofAgent?.length > 0 ? (
                            dataofAgent?.slice(0, 1)?.map((data) => {
                              return (
                                <li onClick={menuClose}>
                                  <Link to="/Agents">
                                    Agent for{" "}
                                    {localStorage.getItem("cityname")}
                                  </Link>
                                </li>
                              );
                            })
                          ) : (
                            <li className>
                              <Link to="#">No Agent Found</Link>
                            </li>
                          )}
                        </ul>
                        <div className="dropdown2-btn" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="button-mobi-sell">
                  <Link
                    className="sc-button btn-icon center"
                    to={
                      role === "Agent" || role === "Developer"
                        ? "/AgentProperty"
                        : "/DeshBoardPropertys"
                    }
                  >
                    <svg
                      width={25}
                      height={24}
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.25 15.75V15H11.375C10.7547 15 10.25 14.4953 10.25 13.875V12.375C10.25 11.7547 10.7547 11.25 11.375 11.25H11.75V10.5H13.25V11.25H14C14.1989 11.25 14.3897 11.329 14.5303 11.4697C14.671 11.6103 14.75 11.8011 14.75 12C14.75 12.1989 14.671 12.3897 14.5303 12.5303C14.3897 12.671 14.1989 12.75 14 12.75H11.75V13.5H13.625C14.2453 13.5 14.75 14.0047 14.75 14.625V16.125C14.75 16.7453 14.2453 17.25 13.625 17.25H13.25V18H11.75V17.25H11C10.8011 17.25 10.6103 17.171 10.4697 17.0303C10.329 16.8897 10.25 16.6989 10.25 16.5C10.25 16.3011 10.329 16.1103 10.4697 15.9697C10.6103 15.829 10.8011 15.75 11 15.75H13.25Z"
                        fill="white"
                      />
                      <path
                        d="M22.469 10.6447L14.315 2.96925C13.8234 2.50736 13.1742 2.25024 12.4996 2.25024C11.825 2.25024 11.1759 2.50736 10.6842 2.96925L8.74998 4.791V3C8.74998 2.80109 8.67096 2.61032 8.53031 2.46967C8.38966 2.32902 8.19889 2.25 7.99998 2.25H4.99998C4.80107 2.25 4.6103 2.32902 4.46965 2.46967C4.329 2.61032 4.24998 2.80109 4.24998 3V9.027L2.55273 10.6252C2.03748 11.0722 1.86348 11.784 2.10798 12.4387C2.34873 13.0837 2.93823 13.5 3.60948 13.5H4.24998V21C4.24998 21.1989 4.329 21.3897 4.46965 21.5303C4.6103 21.671 4.80107 21.75 4.99998 21.75H20C20.1989 21.75 20.3897 21.671 20.5303 21.5303C20.671 21.3897 20.75 21.1989 20.75 21V13.5H21.389C22.061 13.5 22.6512 13.083 22.892 12.438C23.1357 11.7832 22.961 11.0715 22.469 10.6447ZM5.74998 3.75H7.24998V6.2025L5.74998 7.61475V3.75ZM21.4865 11.9138C21.4542 12 21.4047 12 21.389 12H20C19.8011 12 19.6103 12.079 19.4697 12.2197C19.329 12.3603 19.25 12.5511 19.25 12.75V20.25H5.74998V12.75C5.74998 12.5511 5.67096 12.3603 5.53031 12.2197C5.38966 12.079 5.19889 12 4.99998 12H3.60948C3.59373 12 3.54498 12 3.51273 11.9138C3.50022 11.8834 3.49792 11.8498 3.50617 11.818C3.51442 11.7862 3.53278 11.7579 3.55848 11.7375L11.7125 4.062C11.9257 3.86178 12.2071 3.75032 12.4996 3.75032C12.7921 3.75032 13.0735 3.86178 13.2867 4.062L21.4625 11.7578C21.5187 11.8058 21.4977 11.883 21.4865 11.9138Z"
                        fill="white"
                      />
                    </svg>
                    <span>Sell Property</span>
                  </Link>
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
                        <path
                          d="M26.4648 13.7812C26.4648 14.5902 27.1207 15.2461 27.9297 15.2461C28.7387 15.2461 29.3945 14.5902 29.3945 13.7812C29.3945 12.9723 28.7387 12.3164 27.9297 12.3164C27.1207 12.3164 26.4648 12.9723 26.4648 13.7812Z"
                          fill="#E5E5EA"
                        />
                        <path
                          d="M32.3242 13.7812C32.3242 14.5902 32.9801 15.2461 33.7891 15.2461C34.598 15.2461 35.2539 14.5902 35.2539 13.7812C35.2539 12.9723 34.598 12.3164 33.7891 12.3164C32.9801 12.3164 32.3242 12.9723 32.3242 13.7812Z"
                          fill="#E5E5EA"
                        />
                        <path
                          d="M38.1836 13.7812C38.1836 14.5902 38.8395 15.2461 39.6484 15.2461C40.4574 15.2461 41.1133 14.5902 41.1133 13.7812C41.1133 12.9723 40.4574 12.3164 39.6484 12.3164C38.8395 12.3164 38.1836 12.9723 38.1836 13.7812Z"
                          fill="#E5E5EA"
                        />
                        <path
                          d="M22.6771 37.2188L27.0716 34.2891L35.8398 37.2188V43.0781C35.8398 44.6961 34.549 46.0078 32.931 46.0078C16.7508 46.0078 1.46484 30.8195 1.46484 14.6394C1.46484 13.0214 2.77656 11.7305 4.39453 11.7305H10.2539L13.1836 20.4987L10.2539 24.8933C12.1247 29.5703 18 35.3479 22.6771 37.2188Z"
                          stroke="#E5E5EA"
                          strokeWidth="1.7"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.1406 13.7812C19.1406 18.6354 23.0756 22.5703 27.9297 22.5703V28.4297L33.7891 22.5703H39.6484C44.5025 22.5703 48.5352 18.6354 48.5352 13.7812C48.5352 8.92715 44.5025 4.99219 39.6484 4.99219H27.9297C23.0756 4.99219 19.1406 8.92715 19.1406 13.7812Z"
                          stroke="#E5E5EA"
                          strokeWidth="1.7"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="content fs-13">
                      Call us:
                      <h5>(201) 555-0124</h5>
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
                        <path
                          d="M36.6559 17.8341L36.6559 17.8341L36.6609 17.8392C36.8315 18.0113 37.0549 18.0969 37.2788 18.0969C37.5021 18.0969 37.7258 18.0116 37.8976 17.8411C38.2409 17.5005 38.241 16.9425 37.8996 16.5985C37.5586 16.2548 37.0037 16.2526 36.66 16.5934L36.6559 17.8341ZM36.6559 17.8341L36.6551 17.8332M36.6559 17.8341L36.6551 17.8332M36.6551 17.8332C36.3141 17.4895 36.3163 16.9345 36.66 16.5935L36.6551 17.8332Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M46.4639 27.8825H46.7054L46.5346 27.7118L39.3343 20.5115C38.992 20.1691 38.992 19.6141 39.3343 19.2718C39.6767 18.9296 40.2317 18.9296 40.574 19.2718L49.6441 28.3419C49.8085 28.5063 49.9009 28.7294 49.901 28.9618C49.901 29.1943 49.8086 29.4172 49.6442 29.5816L34.0757 45.1502C33.9114 45.3145 33.6884 45.4069 33.4559 45.4069C33.2235 45.4069 33.0005 45.3145 32.8361 45.1502L9.34306 21.6572C9.34306 21.6572 9.34305 21.6572 9.34305 21.6572C9.00075 21.3148 9.00076 20.7598 9.34305 20.4175L24.9114 4.84884C25.2537 4.50664 25.8087 4.50664 26.151 4.84884C26.151 4.84884 26.151 4.84884 26.1511 4.84884L34.9723 13.67C35.3146 14.0124 35.3146 14.5675 34.9723 14.9098C34.6299 15.252 34.0749 15.2519 33.7326 14.9098L26.7811 7.95839L26.6104 7.78768V8.0291V25.1994C26.6104 26.679 27.8139 27.8825 29.2935 27.8825H46.4639ZM24.8575 7.62373V7.38231L24.6868 7.55302L12.2497 19.9901L12.079 20.1608H12.3204H24.7575H24.8575V20.0608V7.62373ZM32.4087 42.2434L32.5794 42.4141V42.1727V29.7356V29.6356H32.4794H29.2937C26.8477 29.6356 24.8575 27.6455 24.8575 25.1994V22.0139V21.9139H24.7575H12.3204H12.079L12.2497 22.0846L32.4087 42.2434ZM34.3324 42.1728V42.4142L34.5031 42.2435L46.9401 29.8064L47.1108 29.6356H46.8694H34.4324H34.3324V29.7356V42.1728Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M0.976562 24.9047H6.70225C7.18637 24.9047 7.57881 25.2972 7.57881 25.7812C7.57881 26.2654 7.18637 26.6578 6.70225 26.6578H0.976562C0.492442 26.6578 0.1 26.2653 0.1 25.7812C0.1 25.2972 0.492442 24.9047 0.976562 24.9047Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M9.59961 24.9047H9.61426C10.0984 24.9047 10.4908 25.2972 10.4908 25.7812C10.4908 26.2653 10.0984 26.6578 9.61426 26.6578H9.59961C9.11549 26.6578 8.72305 26.2653 8.72305 25.7812C8.72305 25.2972 9.11549 24.9047 9.59961 24.9047Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M0.978516 14.6508H4.10381C4.58793 14.6508 4.98037 15.0433 4.98037 15.5273C4.98037 16.0114 4.58793 16.4039 4.10381 16.4039H0.978516C0.494395 16.4039 0.101953 16.0114 0.101953 15.5273C0.101953 15.0433 0.494395 14.6508 0.978516 14.6508Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M7.29315 14.6508H10.9873C11.4714 14.6508 11.8639 15.0433 11.8639 15.5273C11.8639 16.0114 11.4714 16.4039 10.9873 16.4039H7.29315C6.80903 16.4039 6.41659 16.0114 6.41659 15.5273C6.41659 15.0433 6.80903 14.6508 7.29315 14.6508Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M7.64453 30.2758H13.1132C13.5972 30.2758 13.9897 30.6683 13.9897 31.1523C13.9897 31.6364 13.5973 32.0289 13.1132 32.0289H7.64453C7.16041 32.0289 6.76797 31.6364 6.76797 31.1523C6.76797 30.6683 7.16041 30.2758 7.64453 30.2758Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                        <path
                          d="M3.61328 36.5258H17.3827C17.8668 36.5258 18.2593 36.9183 18.2593 37.4023C18.2593 37.8864 17.8668 38.2789 17.3827 38.2789H3.61328C3.12916 38.2789 2.73672 37.8864 2.73672 37.4023C2.73672 36.9183 3.12916 36.5258 3.61328 36.5258Z"
                          fill="#E5E5EA"
                          stroke="white"
                          strokeWidth="0.2"
                        />
                      </svg>
                    </div>
                    <div className="content fs-13 lh-16">
                      Email:
                      <h5>Justthing@gmail.com</h5>
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

export default Navbar2;
