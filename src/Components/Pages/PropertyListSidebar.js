import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { Button, InputAdornment } from "@mui/material";
import { DateRangePicker } from 'rsuite';


const PropertyListSidebar = () => {
  const [dataofAgent, setdataofAgent] = useState();
  const [TopDevelopers, setTopDevelopers] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [order, setOrder] = useState("");
  const [count, setcount] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [Property, setProperty] = useState([]);
  const Navigate = useNavigate();
  const loginid = secureLocalStorage.getItem("loginuserid");
  useEffect(() => {
    const filteredData = Property.filter(
      (property) =>
        property?.building_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property?.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.city_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filteredData);
    setcount(filteredData.length);
  }, [searchTerm, Property]);

  const [cityes, setCityes] = useState(null);

  useEffect(() => {
    const storedCityes = secureLocalStorage.getItem("cityname");
    setCityes(storedCityes);
  });
  const [type, settype] = useState();

  useEffect(() => {
    if (type) {
      GetDataoffilter();
    }
  }, [type]);

  useEffect(() => {
    const storedtyes = secureLocalStorage.getItem("properttype");
    settype(storedtyes);
  });

  useEffect(() => {
    if (cityes) {
      setOrder(null);

      GetDataoffilter();
    }
  }, [cityes]);

  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
  };

  let bugdet = secureLocalStorage.getItem("selectedBajat");
  let roomss = secureLocalStorage.getItem("rooms");
  let type2 = secureLocalStorage.getItem("properttype2");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (type2) {
      GetDataoffilter();
    } else if (roomss) {
      GetDataoffilter();
    } else if (bugdet) {
      GetDataoffilter();
    } else if (order) {
      GetDataoffilter();
    }
  }, [cityes, type, type2, roomss, bugdet, order]);

  const GetDataoffilter = () => {
    const data = {
      city_name: cityes,
      property_type: type,
      building_type_two: type2,
      rooms: roomss,
      budget: bugdet,
    };

    axios
      .post("http://157.66.191.24:3089/website/search_header", data)
      .then((response) => {
        let propertyData = response.data.data;
        if (order === "low-to-high") {
          propertyData = propertyData.sort((a, b) => b.price - a.price);
        } else if (order === "high-to-low") {
          propertyData = propertyData.sort((a, b) => a.price - b.price);
        } else if (order === "by-latest") {
          propertyData = response.data.data;
        }

        if (order === "residential") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_one === "Residential"
          );
        } else if (order === "commercial") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_one === "Commercial"
          );
        } else if (order === "Under Construction") {
          propertyData = propertyData.filter(
            (property) => property?.possession_status === "Under Construction"
          );
        } else if (order === "Ready To Move") {
          propertyData = propertyData.filter(
            (property) => property?.possession_status === "Ready To Move"
          );
        } else if (order === "Office Space") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Office Space"
          );
        } else if (order === "Shop") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Shop"
          );
        } else if (order === "Land") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Land"
          );
        } else if (order === "Office Space in IT/SEZ") {
          propertyData = propertyData.filter(
            (property) =>
              property?.building_type_two === "Office Space in IT/SEZ"
          );
        } else if (order === "Showroom") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Showroom"
          );
        } else if (order === "Warehouse") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Warehouse"
          );
        } else if (order === "Industrial Plot") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Industrial Plot"
          );
        } else if (order === "Co-Working Space") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Co-Working Space"
          );
        } else if (order === "Apartment") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Apartment"
          );
        } else if (order === "Villa") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Villa"
          );
        } else if (order === "Builder Floor") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Builder Floor"
          );
        } else if (order === "Penthouse") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Penthouse"
          );
        } else if (order === "Independent House") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Independent House"
          );
        } else if (order === "Plot") {
          propertyData = propertyData.filter(
            (property) => property?.building_type_two === "Plot"
          );
        } else if (order === "Semi-Furnished") {
          propertyData = propertyData.filter(
            (property) => property?.furnishing_status === "Semi-Furnished"
          );
        } else if (order === "Furnished") {
          propertyData = propertyData.filter(
            (property) => property?.furnishing_status === "Furnished"
          );
        }

        setProperty(propertyData);

        setcount(propertyData?.length);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetallPdevelopers();
  }, [cityes]);

  const GetallPdevelopers = () => {
    const data = {
      city_name: cityes ? cityes : "",
    };

    axios
      .post("http://157.66.191.24:3089/website/get_city_developer", data)
      .then((response) => {
        setTopDevelopers(response.data.data);
      })
      .catch((error) => {});
  };

  const GetCityAgent = () => {
    const data = {
      city_name: cityes,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_city_agent", data)
      .then((res) => {
        setdataofAgent(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (cityes) {
      GetCityAgent();
    }
  }, [cityes]);

  const addleads = (item) => {
    if (!loginid) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          Navigate("/login");
        }, 2000);
      });
      return;
    }
    const data = {
      userId: loginid,
      propertyId: item,
      lead_status: "1",
      favourite_status: "1",
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
      .then((res) => {
        swal({
          title: "Your Details Share With Our Expert",
          icon: "success",
        });
      })
      .catch((error) => {
        swal({
          title: error.response.data.msg,
          icon: "error",
        });
      });
  };
  const maskMobileNumber = (number) =>
    number ? `XXXXXX${number.replace(/\D/g, "").slice(-4)}` : number;
  return (
    <>
      <div>
        <div
          className="top-filters"
          style={{
            // padding: "78px 0px 0px 0px",
            boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.0784313725)",
            backgroundColor: "#fff",
          }}
        >
          <div className="container6">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="flat-tabs style2 flex"
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <div className="content-tab mt-5 w-100">
                    <div className="content-inner tab-content">
                      <div className="">
                        <form method="post">
                          <div
                            className="wd-find-select flex"
                            style={{ gap: 10 }}
                          >
                            <div className="" style={{ flex: 1 }}>
                              <TextField
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                  height: "100%",
                                  fontSize: 13,
                                  color: "#333",
                                  width: "100%"
                                }}
                                type="search"
                                className="search-field flex align-center"
                                placeholder="Search by Building name, Locality, city"
                                name="s"
                                title="Search for"
                                required
                              />
                            </div>

                            <div
                              className=""
                              style={{ flex: 1 }}
                            >
                              <DateRangePicker showOneCalendar />

                            </div>

                            <div style={{ flex: 1 }} className="form-group-1 search-form form-style relative flex align-center">
                              <Button
                                style={{ color: "red", borderColor: "red", width: "100%", height: "-webkit-fill-available" }}
                                variant="outlined"
                                
                              >
                                Search
                              </Button>
                            </div>
                          </div>
                        </form>

                        {/* End Job  Search Form*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          className="flat-title"
          style={{
            marginTop: "-20px",
            marginBottom: "-30px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <div className="container6">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="title-inner style">
                  <div className="title-group fs-12">
                    <Link className="home fw-6 text-color-3" to="/">
                      Home
                    </Link>
                    <span>Rooms Listing</span>
                  </div>
                  <div className="heading-listing fs-20 lh-45 fw-7">
                    Rooms In {cityes}
                  </div>
                  <div className>There are currently {count} properties.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" flat-property flat-property-list flat-properties-rent tf-section2 wg-dream style">
          <div className="container6">
            <div className="row flex">
              <div className="col-lg-8" style={{ backgroundColor: "#F7F7F7" }}>
                <div className="post">
                  <div
                    className="category-filter flex justify-space"
                    style={{ alignContent: "start" }}
                  >
                    <div className="box-2 flex">
                      <div className="wd-find-select flex">
                        <div className="group-select">
                          <div className="nice-select" tabIndex={0}>
                            <span className="current">Default order</span>
                            <ul className="list style">
                              <li
                                data-value="default"
                                className="option selected"
                                onClick={() => handleOrderChange("")}
                              >
                                Default order
                              </li>
                              <li
                                value="1"
                                data-value="by-latest"
                                className="option"
                                onClick={() => handleOrderChange("by-latest")}
                              >
                                All
                              </li>
                              <li
                                value="2"
                                data-value="low-to-high"
                                className="option"
                                onClick={() => handleOrderChange("low-to-high")}
                              >
                                Low to high
                              </li>
                              <li
                                value="3"
                                data-value="high-to-low"
                                className="option"
                                onClick={() => handleOrderChange("high-to-low")}
                              >
                                High to low
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="wrap-list"
                    style={{
                      overflow: "scroll",
                      height: "1150px",
                      overflowX: "hidden",
                      scrollbarWidth: "none",
                    }}
                  >
                    {filteredProperties?.length > 0 ? (
                      filteredProperties?.map((data) => {
                        return (
                          <div className="box box-dream flex hv-one">
                            <div className="image-group relative">
                              {/* <span class="featured fs-12 fw-6">
                                For {data?.property_listing_type}
                              </span>
                              <span class="featured style fs-12 fw-6">
                                {data?.building_type_one}
                              </span>
                              <span className="icon-bookmark">
                                <i className="far fa-bookmark" />
                              </span> */}
                              <span className="featured fs-12 fw-6">
                                Company-Serviced
                              </span>
                              <div
                                id="carousel5"
                                className="carousel slide swiper-z propertylistslider"
                                data-ride="carousel"
                              >
                                <div className="item active">
                                  <AwesomeSlider
                                    style={{
                                      "--slider-height-percentage": "269px",
                                      "--slider-width-percentage": "284px",
                                      "--organic-arrow-height": "17px",
                                      "--organic-arrow-color": "#fff",
                                      "--animation-duration": "100ms",

                                      "--control-button-opacity": 1,
                                      "--animation-duration": "100ms",
                                    }}
                                    bullets={false}
                                    mobileTouch={true}
                                    // animation="cubeAnimation"
                                  >
                                    {data?.images?.map((imageName, index) => (
                                      <div
                                        key={index}
                                        data-src={`http://157.66.191.24:3089/uploads/${imageName}`}
                                      />
                                    ))}
                                  </AwesomeSlider>
                                </div>
                              </div>
                            </div>
                            <div className="content">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  secureLocalStorage.setItem(
                                    "ListingId",
                                    data?._id
                                  );
                                  Navigate("/PropertyDetail");
                                }}
                              >
                                <h3 className="link-style-1">
                                  <Link
                                    className="text-capitalize"
                                    onClick={() => {
                                      secureLocalStorage.setItem(
                                        "ListingId",
                                        data?._id
                                      );
                                    }}
                                    to="/PropertyDetail"
                                  >
                                    {data?.building_name}
                                  </Link>
                                </h3>
                                <div className="icon-box">
                                  <div className="icons icon-1 flex">
                                    <span>
                                      {data?.building_type_two} in{" "}
                                      {data?.locality}
                                    </span>
                                  </div>
                                  <div className="money fs-20 fw-8 font-2 text-color-3">
                                    <Link
                                      onClick={() => {
                                        secureLocalStorage.setItem(
                                          "ListingId",
                                          data?._id
                                        );
                                      }}
                                      to="/PropertyDetail"
                                    >
                                      ₹
                                      {data?.price
                                        ? `${(data?.price / 100000)?.toFixed(
                                            2
                                          )}`
                                        : `${(
                                            data?.rent_amount / 100000
                                          )?.toFixed(2)}`}
                                    </Link>
                                  </div>

                                  <div className="fs-16 fw-6 text-color-3">
                                    <Link>
                                      {/* Custom Rating Section */}
                                      <div className="rating">
                                        <span className="rating-stars">
                                          {/* Display stars for 4.9 */}
                                          {[...Array(5)].map((_, i) => (
                                            <i
                                              key={i}
                                              className={`fas fa-star ${
                                                i < 4
                                                  ? "filled"
                                                  : i < 4.9
                                                  ? "half"
                                                  : ""
                                              }`}
                                            />
                                          ))}
                                        </span>
                                        <span className="rating-value">
                                          4.9
                                        </span>
                                      </div>
                                    </Link>
                                  </div>
                                  {/* Services Section */}
                                  <div className="services">
                                    <ul className="service-list">
                                      <li>
                                        <i className="fas fa-wifi"></i> Free
                                        Wifi
                                      </li>
                                      <li>
                                        <i className="fas fa-tv"></i> AV TV
                                      </li>
                                      <li>
                                        <i className="fas fa-sun"></i> Geyser
                                      </li>
                                      <li>
                                        <i className="fas fa-plug"></i> Power
                                        Backup
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="text-address mt-3">
                                    <p className="p-12">
                                      {data?.property_description?.slice(
                                        0,
                                        100
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="img-box flex align-center">
                                <div className="flat-bt-top sc-btn-top">
                                  <Link
                                    onClick={() => {
                                      secureLocalStorage.setItem(
                                        "ListingId",
                                        data?._id
                                      );
                                    }}
                                    to="/PropertyDetail"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sc-buttonborder mycolor btn-icon"
                                  >
                                    <span> View Details</span>
                                  </Link>
                                </div>

                                <div
                                  className="flat-bt-top sc-btn-top"
                                  style={{ marginLeft: "5%" }}
                                >
                                  <a className="sc-button btn-icon">
                                    <span>Book Now</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <h2>
                          <img
                            width={100}
                            src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                            alt="No Property Found"
                          />
                        </h2>
                        <h3 className="mt-3">No Property Found</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="side-bar">
                  <div className="inner-side-bar">
                    <div
                      style={{ marginTop: "30px", border: "none" }}
                      className="widget-rent"
                    >
                      <div className="flat-tabs style2">
                        <div className="content-tab">
                          <div className="content-inner tab-content" style={{}}>
                            <div className="form-s2">
                              <h3
                                className="widget-title title-list"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span>Filters</span>
                                <a
                                  href="#"
                                  className="clear-all-link"
                                  onClick={""} // Define the function to clear all filters
                                  style={{
                                    fontSize: "14px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  Clear All
                                </a>
                              </h3>

                              <form method="post">
                                <div className="wd-find-select ">
                                  <div className="form-group-2 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Collections
                                        </span>
                                        <ul className="list style">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Choose
                                          </li>
                                          <li
                                            data-value="apartment"
                                            className="option"
                                          >
                                            Standard Room
                                          </li>
                                          <li
                                            data-value="house"
                                            className="option"
                                          >
                                            Suite
                                          </li>
                                          <li
                                            data-value="rent"
                                            className="option"
                                          >
                                            Luxury Suite
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group-3 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Categories
                                        </span>
                                        <ul className="list">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Categories
                                          </li>
                                          <li
                                            data-value="Japan"
                                            className="option"
                                          >
                                            New York
                                          </li>
                                          <li
                                            data-value="America"
                                            className="option"
                                          >
                                            Los Angeles
                                          </li>
                                          <li
                                            data-value="England"
                                            className="option"
                                          >
                                            London
                                          </li>
                                          <li
                                            data-value="Japan"
                                            className="option"
                                          >
                                            Paris
                                          </li>
                                          <li
                                            data-value="England"
                                            className="option"
                                          >
                                            Berlin
                                          </li>
                                          <li
                                            data-value="VietNam"
                                            className="option"
                                          >
                                            Sydney
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group-4 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Accommodation Type
                                        </span>
                                        <ul className="list">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Baths
                                          </li>
                                          <li
                                            data-value="floating"
                                            className="option"
                                          >
                                            Floating baths
                                          </li>
                                          <li
                                            data-value="massage"
                                            className="option"
                                          >
                                            Massage baths
                                          </li>
                                          <li
                                            data-value="floor-standing"
                                            className="option"
                                          >
                                            Floor-standing bath
                                          </li>
                                          <li
                                            data-value="built-in"
                                            className="option"
                                          >
                                            Built-in baths
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group-5 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Hotel Facilities
                                        </span>
                                        <ul className="list">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Beds
                                          </li>
                                          <li
                                            data-value="twin"
                                            className="option"
                                          >
                                            Twin beds
                                          </li>
                                          <li
                                            data-value="bunk"
                                            className="option"
                                          >
                                            Bunk beds
                                          </li>
                                          <li
                                            data-value="kids"
                                            className="option"
                                          >
                                            Kids beds
                                          </li>
                                          <li
                                            data-value="single"
                                            className="option"
                                          >
                                            Single bed
                                          </li>
                                          <li
                                            data-value="queen"
                                            className="option"
                                          >
                                            Queen size bed
                                          </li>
                                          <li
                                            data-value="king"
                                            className="option"
                                          >
                                            King size bed
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="price-group style-group">
                                    <h4>Price</h4>
                                    <div className="inner flex flex-wrap">
                                      <div className="group-select">
                                        <div
                                          className="nice-select"
                                          tabIndex={0}
                                        >
                                          <span className="current">Min</span>
                                          <ul className="list">
                                            <li
                                              data-value
                                              className="option selected"
                                            >
                                              Min
                                            </li>
                                            <li
                                              data-value={0}
                                              className="option"
                                            >
                                              $0
                                            </li>
                                            <li
                                              data-value={50}
                                              className="option"
                                            >
                                              $50
                                            </li>
                                            <li
                                              data-value={100}
                                              className="option"
                                            >
                                              $100
                                            </li>
                                            <li
                                              data-value={200}
                                              className="option"
                                            >
                                              $200
                                            </li>
                                            <li
                                              data-value={300}
                                              className="option"
                                            >
                                              $300
                                            </li>
                                            <li
                                              data-value={500}
                                              className="option"
                                            >
                                              $500
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="group-select">
                                        <div
                                          className="nice-select"
                                          tabIndex={0}
                                        >
                                          <span className="current">Max</span>
                                          <ul className="list">
                                            <li
                                              data-value
                                              className="option selected"
                                            >
                                              Max
                                            </li>
                                            <li
                                              data-value={1000}
                                              className="option"
                                            >
                                              $1,000
                                            </li>
                                            <li
                                              data-value={1500}
                                              className="option"
                                            >
                                              $1,500
                                            </li>
                                            <li
                                              data-value={2000}
                                              className="option"
                                            >
                                              $2,000
                                            </li>
                                            <li
                                              data-value={2500}
                                              className="option"
                                            >
                                              $2,500
                                            </li>
                                            <li
                                              data-value={3000}
                                              className="option"
                                            >
                                              $3,000
                                            </li>
                                            <li
                                              data-value={5000}
                                              className="option"
                                            >
                                              $5,000
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="button-search sc-btn-top center">
                                    <a className="sc-button" href="#">
                                      <span>Search Now</span>
                                      <i className="far fa-search text-color-1" />
                                    </a>
                                  </div>
                                </div>
                              </form>
                              {/* End Job  Search Form*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget widget-contact">
                      <h3 className="widget-title title-contact">
                        Contact Agents
                      </h3>
                      {dataofAgent?.length > 0 ? (
                        dataofAgent?.slice(0, 3)?.map((data) => {
                          return (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                secureLocalStorage.setItem(
                                  "agentdetailsId",
                                  data.agentId
                                );
                                Navigate("/agentsdetails");
                              }}
                              className="box-contact flex align-center"
                            >
                              <div className="img-author">
                                {data?.user_image ? (
                                  <img
                                    style={{
                                      borderRadius: "100%",
                                      height: 65,

                                      width: 65,
                                    }}
                                    src={
                                      `http://157.66.191.24:3089/uploads/` +
                                      data?.user_image
                                    }
                                    alt="images"
                                  />
                                ) : (
                                  <img
                                    src="assets/images/author/author-sidebar-2.jpg"
                                    alt="images"
                                  />
                                )}
                              </div>
                              <div className="content">
                                <p className="text-capitalize">
                                  {data?.user_name}
                                </p>
                                <Link className="fw-6" to="tel:012345678">
                                  {maskMobileNumber(data?.mobile_no)}
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <h2>
                            <img
                              width={100}
                              src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                              alt="No Property Found"
                            />
                          </h2>
                          <h3 className="mt-3">No Agent Found</h3>
                        </div>
                      )}
                    </div>
                    <div className="widget widget-ads">
                      {filteredProperties?.length > 0 ? (
                        filteredProperties?.slice(0, 1)?.map((data) => {
                          return (
                            <div
                              onClick={() => {
                                secureLocalStorage.setItem(
                                  "ListingId",
                                  data?._id
                                );
                                Navigate("/PropertyDetail");
                              }}
                              className="box-ads"
                              style={{
                                cursor: "pointer",
                                backgroundImage: `url(http://157.66.191.24:3089/uploads/${data?.images[0]})`,
                              }}
                            >
                              <div className="content relative z-2">
                                <h3 className="link-style-3">
                                  <Link to="#">{data?.building_name}</Link>
                                </h3>
                                <div className="text-addres">
                                  <p className="p-12 text-color-1 icon-p">
                                    {data?.building_type_two} in{" "}
                                    {data?.locality} {data?.city_name}
                                  </p>
                                </div>
                                <div className="star flex">
                                  {[...Array(data?.rating)]?.map((_, index) => (
                                    <svg
                                      key={index}
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      x="0px"
                                      y="0px"
                                      viewBox="0 0 512 512"
                                      style={{
                                        enableBackground: "new 0 0 512 512",
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <g>
                                        <g>
                                          <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />
                                        </g>
                                      </g>
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                      <g />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <h2>
                            <img
                              width={100}
                              src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                              alt="No Property Found"
                            />
                          </h2>
                          <h3 className="mt-3">No Property Found</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyListSidebar;
