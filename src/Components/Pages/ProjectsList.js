import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
const ProjectsList = () => {
  const [dataofAgent, setdataofAgent] = useState();
  const [TopDevelopers, setTopDevelopers] = useState();
  const [order, setOrder] = useState("");

  const [count, setcount] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [Property, setProperty] = useState([]);

  const Navigate = useNavigate();
  const loginid = secureLocalStorage.getItem("loginuserid");
  useEffect(() => {
    const filteredData = Property.filter(
      (property) =>
        property?.project_name
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase()) ||
        property?.locality?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        property?.city_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filteredData);
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
      secureLocalStorage.setItem("possessionstatus");
      secureLocalStorage.setItem("locality");
      secureLocalStorage.setItem("project_type");
      secureLocalStorage.setItem("project_name");
    }
  }, [cityes]);

  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
  };

  let possion = secureLocalStorage.getItem("possessionstatus");
  let locallity = secureLocalStorage.getItem("locality");
  let projecttype = secureLocalStorage.getItem("project_type");
  let nameofproject = secureLocalStorage.getItem("project_name");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (possion) {
      GetDataoffilter();
    } else if (locallity) {
      GetDataoffilter();
    } else if (projecttype) {
      GetDataoffilter();
    } else if (nameofproject) {
      GetDataoffilter();
    } else if (order) {
      GetDataoffilter();
    }
  }, [cityes, possion, projecttype, nameofproject, locallity, order]);

  const GetDataoffilter = () => {
    const data = {
      city_name: cityes,
      possession_status: possion,
      locality: locallity,
      project_type: projecttype,
      project_name: nameofproject,
    };

    axios
      .post("http://157.66.191.24:3089/website/search_project", data)
      .then((response) => {
        let propertyData = response.data.data;
        if (order === "low-to-high") {
          propertyData = propertyData.sort(
            (a, b) => b.start_price - a.end_price
          );
        } else if (order === "high-to-low") {
          propertyData = propertyData.sort(
            (a, b) => a.start_price - b.end_price
          );
        } else if (order === "by-latest") {
          propertyData = response.data.data;
        }

        if (order === "Advanced Stage") {
          propertyData = propertyData.filter(
            (property) => property?.project_status === "Advanced Stage"
          );
        } else if (order === "Early Stage") {
          propertyData = propertyData.filter(
            (property) => property?.project_status === "Early Stage"
          );
        } else if (order === "Under Construction") {
          propertyData = propertyData.filter(
            (property) => property?.possession_status === "Under Construction"
          );
        } else if (order === "Ready To Move") {
          propertyData = propertyData.filter(
            (property) => property?.possession_status === "Ready To Move"
          );
        } else if (order === "Rera Registered Projects") {
          propertyData = propertyData.filter(
            (property) => property?.project_type === "Rera Registered Projects"
          );
        } else if (order === "Affordable Housing") {
          propertyData = propertyData.filter(
            (property) => property?.project_type === "Affordable Housing"
          );
        } else if (order === "Luxury Housing") {
          propertyData = propertyData.filter(
            (property) => property?.project_type === "Luxury Housing"
          );
        } else if (order === "Virtual Tour Projects") {
          propertyData = propertyData.filter(
            (property) => property?.project_type === "Virtual Tour Projects"
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
  const maskMobileNumber = number => 
    number ? `XXXXXX${number.replace(/\D/g, '').slice(-4)}` : number;
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
                  <div className="content-tab">
                    <div className="content-inner tab-content">
                      <div className="form-sl">
                        <form method="post">
                          <div
                            className="wd-find-select flex"
                            style={{ gap: 10 }}
                          >
                            <div
                              style={{ marginRight: "-5px" }}
                              className="form-group-1 search-form form-style relative flex align-center"
                            >
                              <i
                                style={{
                                  position: "absolute",
                                  color: "#8e8e93",
                                  top: 13,
                                  left: 19,
                                  cursor: "pointer",
                                }}
                                className="far fa-search"
                              />
                              <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                  width: 340,
                                  height: 36,
                                  fontSize: 13,
                                  color: "#333",
                                }}
                                type="search"
                                className="search-field flex align-center"
                                placeholder="Search by Project name,Locality,city"
                                name="s"
                                title="Search for"
                                required
                              />
                            </div>
                            <div
                              style={{ marginRight: "-5px" }}
                              className="form-group-3 form-style"
                            >
                              <div className="group-select">
                                <div
                                  style={{ width: 144, height: 36 }}
                                  className="nice-select flex align-center"
                                  tabIndex={0}
                                >
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      whiteSpace: "nowrap",
                                      cursor: "pointer",
                                      fontSize: 12,
                                      color: "#333",
                                    }}
                                    className="current"
                                  >
                                    Building type
                                  </span>
                                  <ul className="list">
                                    <li
                                      data-value="by-latest"
                                      onClick={() => {
                                        handleOrderChange("by-latest");
                                      }}
                                      className="option selected"
                                    >
                                      select please
                                    </li>

                                    <li
                                      value="4"
                                      data-value="Advanced Stage"
                                      className="option"
                                      onClick={() =>
                                        handleOrderChange("Advanced Stage")
                                      }
                                    >
                                      Advanced Stage
                                    </li>
                                    <li
                                      value="5"
                                      data-value="Early Stage"
                                      className="option"
                                      onClick={() =>
                                        handleOrderChange("Early Stage")
                                      }
                                    >
                                      Early Stage
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ marginRight: "-5px" }}
                              className="form-group-2 form-style"
                            >
                              <div className="group-select">
                                <div
                                  style={{ width: 184, height: 36 }}
                                  className="nice-select flex align-center"
                                  tabIndex={0}
                                >
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      whiteSpace: "nowrap",
                                      cursor: "pointer",
                                      fontSize: 12,
                                      color: "#333",
                                    }}
                                    className="current"
                                  >
                                    Select Property type
                                  </span>
                                  <ul className="list">
                                    <li
                                      data-value="by-latest"
                                      onClick={() => {
                                        handleOrderChange("by-latest");
                                      }}
                                      className="option selected"
                                    >
                                      Property type
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleOrderChange(
                                          "Rera Registered Projects"
                                        )
                                      }
                                      data-value="Rera Registered Projects"
                                      className="option"
                                    >
                                      Rera Registered Projects
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleOrderChange("Affordable Housing")
                                      }
                                      data-value="Affordable Housing"
                                      className="option"
                                    >
                                      Affordable Housing
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleOrderChange("Luxury Housing")
                                      }
                                      data-value="Luxury Housing"
                                      className="option"
                                    >
                                      Luxury Housing
                                    </li>
                                    <li
                                      data-value="Virtual Tour Projects"
                                      className="option"
                                      onClick={() =>
                                        handleOrderChange(
                                          "Virtual Tour Projects"
                                        )
                                      }
                                    >
                                      Virtual Tour Projects
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ marginRight: "-5px" }}
                              className="form-group-2 form-style"
                            >
                              <div className="group-select">
                                <div
                                  style={{ width: 144, height: 36 }}
                                  className="nice-select flex align-center"
                                  tabIndex={0}
                                >
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      whiteSpace: "nowrap",
                                      cursor: "pointer",
                                      fontSize: 12,
                                      color: "#333",
                                    }}
                                    className="current"
                                  >
                                    Select status
                                  </span>
                                  <ul className="list">
                                    <li
                                      data-value="by-latest"
                                      onClick={() => {
                                        handleOrderChange("by-latest");
                                      }}
                                      className="option selected"
                                    >
                                      Select status
                                    </li>
                                    <li
                                      className="option"
                                      onClick={() =>
                                        handleOrderChange("Furnished")
                                      }
                                      data-value="Furnished"
                                    >
                                      Furnished
                                    </li>
                                    <li
                                      className="option"
                                      onClick={() =>
                                        handleOrderChange("Semi-Furnished")
                                      }
                                      data-value="Semi-Furnished"
                                    >
                                      Semi-Furnished
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ marginRight: "-5px" }}
                              className="form-group-3 form-style"
                            >
                              <div className="group-select">
                                <div
                                  style={{ width: 144, height: 36 }}
                                  className="nice-select flex align-center"
                                  tabIndex={0}
                                >
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      whiteSpace: "nowrap",
                                      cursor: "pointer",
                                      fontSize: 12,
                                      color: "#333",
                                    }}
                                    className="current"
                                  >
                                    Project Status
                                  </span>
                                  <ul className="list">
                                    <li
                                      data-value="by-latest"
                                      onClick={() => {
                                        handleOrderChange("by-latest");
                                      }}
                                      className="option selected"
                                    >
                                      Select Please
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleOrderChange("Ready To Move")
                                      }
                                      data-value="Ready To Move"
                                      className="option"
                                    >
                                      Ready To Move
                                    </li>
                                    <li
                                      onClick={() =>
                                        handleOrderChange("Under Construction")
                                      }
                                      data-value="Under Construction"
                                      className="option"
                                    >
                                      Under Construction
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="wd-find-select wd-search-form">
                            <div className="box1 flex flex-wrap form-wg">
                              <div className="form-group wg-box3">
                                <div className="group-select">
                                  <div className="nice-select" tabIndex={0}>
                                    <span className="current">Baths: Any</span>
                                    <ul className="list">
                                      <li
                                        data-value
                                        className="option selected"
                                      >
                                        Baths: Any
                                      </li>
                                      <li data-value={1} className="option">
                                        1
                                      </li>
                                      <li data-value={2} className="option">
                                        2
                                      </li>
                                      <li data-value={3} className="option">
                                        3
                                      </li>
                                      <li data-value={4} className="option">
                                        4
                                      </li>
                                      <li data-value={5} className="option">
                                        5
                                      </li>
                                      <li data-value={6} className="option">
                                        6
                                      </li>
                                      <li data-value={7} className="option">
                                        7
                                      </li>
                                      <li data-value={8} className="option">
                                        8
                                      </li>
                                      <li data-value={9} className="option">
                                        9
                                      </li>
                                      <li data-value={9} className="option">
                                        10
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group wg-box3">
                                <div className="group-select">
                                  <div className="nice-select" tabIndex={0}>
                                    <span className="current">Beds: Any</span>
                                    <ul className="list">
                                      <li
                                        data-value
                                        className="option selected"
                                      >
                                        Beds: Any
                                      </li>
                                      <li data-value={1} className="option">
                                        1
                                      </li>
                                      <li data-value={2} className="option">
                                        2
                                      </li>
                                      <li data-value={3} className="option">
                                        3
                                      </li>
                                      <li data-value={4} className="option">
                                        4
                                      </li>
                                      <li data-value={5} className="option">
                                        5
                                      </li>
                                      <li data-value={6} className="option">
                                        6
                                      </li>
                                      <li data-value={7} className="option">
                                        7
                                      </li>
                                      <li data-value={8} className="option">
                                        8
                                      </li>
                                      <li data-value={9} className="option">
                                        9
                                      </li>
                                      <li data-value={9} className="option">
                                        10
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group wg-box3">
                                <div className="widget widget-price">
                                  <div className="caption flex-two">
                                    <div>
                                      <span className="fw-6">Form</span>
                                      <span id="slider-range-value1" />
                                      <span id="slider-range-value2" />
                                    </div>
                                  </div>
                                  <div id="slider-range" />
                                  <div className="slider-labels">
                                    <div>
                                      <input
                                        type="hidden"
                                        name="min-value"
                                        defaultValue
                                      />
                                      <input
                                        type="hidden"
                                        name="max-value"
                                        defaultValue
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* /.widget_price */}
                              </div>
                              <div className="form-group wg-box3">
                                <div className="widget widget-price">
                                  <div className="caption flex-two">
                                    <div>
                                      <span className="fw-6">Size</span>
                                      <span id="slider-range-value01" />
                                      <span id="slider-range-value02" />
                                    </div>
                                  </div>
                                  <div id="slider-range2" />
                                  <div className="slider-labels">
                                    <div>
                                      <input
                                        type="hidden"
                                        name="min-value2"
                                        defaultValue
                                      />
                                      <input
                                        type="hidden"
                                        name="max-value2"
                                        defaultValue
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* /.widget_price */}
                              </div>
                            </div>
                            <div className="boder-wg" />
                            <div className="box2 flex flex-wrap form-wg">
                              <div className="form-group wg-box3">
                                <div className="tf-amenities bg-white">
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Swimming pool
                                    </span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">Garage</span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Alarm system
                                    </span>{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="form-group wg-box3">
                                <div className="tf-amenities bg-white">
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">Balcony</span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Outdoor area
                                    </span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Broadband
                                    </span>{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="form-group wg-box3">
                                <div className="tf-amenities bg-white">
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">Ensuite</span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Built in robes
                                    </span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">Gym</span>{" "}
                                  </label>
                                </div>
                              </div>
                              <div className="form-group wg-box3">
                                <div className="tf-amenities bg-white">
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Tennis court
                                    </span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">Study</span>{" "}
                                  </label>
                                  <label className="flex">
                                    <input name="newsletter" type="checkbox" />{" "}
                                    <span className="btn-checkbox" />
                                    <span className="fs-13">
                                      Outdoor spa
                                    </span>{" "}
                                  </label>
                                </div>
                              </div>
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
          style={{ marginTop: "-20px", marginBottom: "-30px", backgroundColor:'#F7F7F7' }}
        >
          <div className="container6">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="title-inner style">
                  <div className="title-group fs-12">
                    <Link className="home fw-6 text-color-3" to="/">
                      Home
                    </Link>
                    <span>Project Listing</span>
                  </div>
                  <div className="heading-listing fs-20 lh-45 fw-7">
                    Project In {cityes}
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
              <div className="col-lg-8 bg-23">
                <div className="post">
                  <div className="category-filter flex justify-space">
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
                    {filteredProjects?.length > 0 ? (
                      filteredProjects?.map((data) => {
                        return (
                          <div className="box box-dream flex hv-one">
                            <div className="image-group relative">
                              <span class="featured fs-12 fw-6">
                                For {data?.possession_status}
                              </span>
                              <span class="featured style fs-12 fw-6">
                                {data?.bedrooms}
                              </span>

                              <span className="icon-bookmark">
                                <i className="far fa-bookmark" />
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
                                    data?.projectId
                                  );
                                  Navigate("/ProjectDetails");
                                }}
                              >
                                <h3 className="link-style-1">
                                  <Link
                                    className="text-capitalize"
                                    onClick={() => {
                                      secureLocalStorage.setItem(
                                        "ListingId",
                                        data?.projectId
                                      );
                                    }}
                                    to="/ProjectDetails"
                                  >
                                    {data?.project_name}
                                  </Link>
                                </h3>
                                <div className="icon-box">
                                  <div className="icons icon-1 flex">
                                    <span>
                                      {data?.bedrooms} {data?.project_type} in{" "}
                                      {data?.locality}
                                    </span>
                                  </div>
                                  <div className="money fs-20 fw-8 font-2 text-color-3">
                                    <Link
                                      onClick={() => {
                                        secureLocalStorage.setItem(
                                          "ListingId",
                                          data?.projectId
                                        );
                                      }}
                                      to="/ProjectDetails"
                                    >
                                      ₹{" "}
                                      {(data?.start_price / 100000)?.toFixed(2)}{" "}
                                      - {(data?.end_price / 100000)?.toFixed(2)}{" "}
                                      Lac
                                    </Link>
                                  </div>
                                  <div className="box flex">
                                    <ul
                                      style={{
                                        width: "50%",
                                        float: "left",
                                        marginTop: "-20px",
                                        marginLeft: "-16px",
                                      }}
                                    >
                                      <li className="flex">
                                        <span className="one fw-6">
                                          {data?.minimum_project_size} -{" "}
                                          {data?.maximum_project_size}{" "}
                                          {data?.project_size}{" "}
                                        </span>
                                      </li>
                                      <li className="flex p-12">
                                        <span className="two">
                                          Project Size
                                        </span>
                                      </li>
                                    </ul>
                                    <ul
                                      style={{
                                        width: "50%",
                                        float: "left",
                                        marginTop: "-20px",
                                        marginLeft: "-16px",
                                      }}
                                    >
                                      <li className="flex">
                                        <span className="one fw-6">
                                          {data?.minimum_configurations} -{" "}
                                          {data?.maximum_configurations}{" "}
                                          {data?.configurations}
                                        </span>
                                      </li>
                                      <li className="flex p-12">
                                        <span className="two">
                                          Configurations
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="text-address mt-3">
                                    <p className="p-12">
                                      {data?.project_description?.slice(0, 100)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {loginid ? (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a
                              onClick={(event) => {
                                event.preventDefault(); 
                                addleads(data?.projectId); 
                                window.open(
                                  `https://wa.me/${data?.mobile_no}`,
                                  "_blank"
                                ); 
                              }}
                              href={`https://wa.me/${data?.mobile_no}`} // WhatsApp link
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sc-buttonborder mycolor btn-icon"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/whatsappicon.svg"
                                alt="WhatsApp Icon"
                              /><span> Whatsapp</span>
                            </a>
                          </div>

                          <div
                            className="flat-bt-top sc-btn-top"
                            style={{ marginLeft: "5%" }}
                          >
                            <a
                              onClick={(event) => {
                                event.preventDefault(); 
                                addleads(data?.projectId); 
                                window.location.href = `tel:${data?.mobile_no}`; 
                              }}
                              href={`tel:${data?.mobile_no}`}
                              className="sc-button btn-icon"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/calls.svg"
                                alt="Call Icon"
                              />
                              <span>Contact Us</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a
                              onClick={() => addleads()}
                              className="sc-buttonborder mycolor btn-icon "
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/whatsappicon.svg"
                              />
                              <span> Whatsapp</span>
                            </a>
                          </div>
                          <div
                            className="flat-bt-top sc-btn-top"
                            style={{ marginLeft: "5%" }}
                          >
                            <a
                              onClick={() => addleads()}
                              className="sc-button btn-icon "
                              href="#"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/calls.svg"
                              />
                              <span>Contact Us</span>
                            </a>
                          </div>
                        </div>
                      )}
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
                    <div className="widget widget-listings style">
                      <h3 className="widget-title title-list">
                        Top Companies in {cityes}
                      </h3>

                      {TopDevelopers?.length > 0 ? (
                        TopDevelopers?.slice(0, 3)?.map((data) => {
                          return (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                secureLocalStorage.setItem(
                                  "agencisesId",
                                  data?.developerId
                                );
                                Navigate("/AgenciesDetails");
                              }}
                              className="box-listings flex hover-img3"
                            >
                              <div className="img-listings img-style3">
                                {data?.user_image ? (
                                  <img
                                    style={{ height: "80px", width: "112px" }}
                                    className="img2"
                                    src={
                                      `http://157.66.191.24:3089/uploads/` +
                                      data?.user_image
                                    }
                                    alt="images"
                                  />
                                ) : (
                                  <img
                                    src="assets/images/img-box/sidebar-listings-1.jpg"
                                    alt="images"
                                  />
                                )}
                              </div>
                              <div className="content link-style-1">
                                <Link
                                  className="fs-16 lh-24"
                                  to="/PropertyDetail"
                                >
                                  {data?.user_name}
                                </Link>
                                {/* <h4>₹7,500</h4> */}
                                <h4>
                                  {data?.projectCount} Projects by{" "}
                                  {data?.user_name} in {data?.city_name}
                                </h4>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          style={{ textAlign: "center", marginBottom: "30px" }}
                        >
                          <h2>
                          <img
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                          </h2>
                          <h3 className="mt-3">No Data Found</h3>
                        </div>
                      )}
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
                      
                      {filteredProjects?.length > 0 ? (
                      filteredProjects?.slice(0,1)?.map((data) => {
                        return (
                          <div  onClick={() => {
                            secureLocalStorage.setItem(
                              "ListingId",
                              data?.projectId
                            );
                            Navigate("/ProjectDetails")
                          }}
                           className="box-ads" 
                          style={{cursor:'pointer',
                            backgroundImage: `url(http://157.66.191.24:3089/uploads/${data?.images[0]})`,
                          }}>
                        <div className="content relative z-2">
                          <h3 className="link-style-3">
                            <Link to="#">
                            {data?.project_name}
                            </Link>
                          </h3>
                          <div className="text-addres">
                            <p className="p-12 text-color-1 icon-p">
                            {data?.bedrooms} {data?.project_type} in{" "}
                            {data?.locality}
                            </p>
                          </div>
                          <div className="star flex">
  {[...Array(data?.rating)]?.map((_, index) => (
      <svg key={index} 
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ enableBackground: "new 0 0 512 512" }}
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

export default ProjectsList;
