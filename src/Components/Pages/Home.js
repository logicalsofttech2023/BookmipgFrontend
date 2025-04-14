import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Toplocalty from "./Toplocalty";
import Projecthomepage from "./Projecthomepage";
import BannerStrip1 from "./BannerStrip1";
import PopulerDestination from "./PopulerDestination";
import { DateRangePicker } from "rsuite";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Skeleton } from "@mui/material";

const Home = () => {
  const [hotels, setHotels] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [latLong, setLatLong] = useState({ lat: null, lon: null });

  useEffect(() => {
    getAllHotels();
  }, []);

  const getAllHotels = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/getAllHotelsForWeb`)
      .then((response) => {
        if (response.status === 200) {
          setHotels(response.data?.hotels);
        }
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCurrentLocation = () => {
    console.log("call");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;

          console.log("Latitude:", lat, "Longitude:", lon);

          // State update
          setLatLong({ lat, lon });
          setSearchTerm(`📍 ${lat.toFixed(6)}, ${lon.toFixed(6)}`);
        },
        (error) => {
          let errorMessage = "Unable to retrieve location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location access denied. Please enable location services.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
            case error.UNKNOWN_ERROR:
            default:
              errorMessage = "An unknown error occurred.";
              break;
          }
          console.error("Error getting location:", error);
          alert(errorMessage);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Debugging to check if latLong is updating
  useEffect(() => {
    console.log("Updated Location:", latLong);
  }, [latLong]);

  return (
    <>
      {/* slider */}
      <section className="slider home2 bg-1">
        <div className="slider-item">
          <div className="container6 relative">
            <div className="row">
              <div className="col-lg-12">
                <div className="content po-content-two mt-4">
                  <div
                    style={{ marginBottom: 10 }}
                    className="heading center mt-3"
                  >
                    <h2
                      className="text-color- fw-7 "
                      style={{
                        fontSize: "30px",
                        lineHeight: "38px",
                        color: "#fff",
                        marginBottom: 10,
                      }}
                    >
                      BookmiPG
                    </h2>
                    <h2
                      className="text-color- fw-7"
                      style={{
                        fontSize: "38px",
                        lineHeight: "38px",
                        color: "#fff",
                        marginBottom: 24,
                      }}
                    >
                      Over 174,000+ hotels and homes across 35+ countries
                    </h2>
                  </div>

                  <div
                    className=" content-inner tab-content flex-center"
                    style={{}}
                  >
                    <div
                      className="form-sl"
                      style={{
                        background: "#00000080",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        className=" content-inner tab-content flex-center home-slider-box"
                        style={{ top: "-67px" }}
                      ></div>
                      <div className="wd-find-select flex">
      <div className="wrap-icon flex align-center justify-center link-style-3">
        <div
          className="skude form-group-1 search-form form-style"
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Search Input Field */}
          <input
            type="search"
            className="search-field skude"
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "380px",
              padding: "10px",
              borderRadius: "0px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              boxSizing: "border-box",
              lineHeight: "27px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />

          {/* Location Icon */}
          <button
            type="button"
            onClick={getCurrentLocation}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "10px",
              border: "1px solid #ccc",
              borderLeft: "none",
              background: "#f8f8f8",
              cursor: "pointer",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              height: "49px",
              color: "black",
              width: "120px",
              fontSize: "12px",
            }}
          >
            <FaMapMarkerAlt color="red" />
            <span style={{ width: "50px" }}>Near me</span>
          </button>
        </div>

        <div style={{ width: "100%" }}>
          <DateRangePicker showOneCalendar />
        </div>

        <button
          type="button"
          className="sc-button skude"
          style={{ borderStyle: "none", height: "52px" }}
        >
          <div className="button-search sc-btn-top">
            <CiSearch style={{ margin: "0px" }} /> Search Now
          </div>
        </button>
      </div>
    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section
        className="flat-featured wg-dream home mb-0"
        style={{ background: "#faf8ff", paddingBottom: "0px" }}
      >
        <div className="container6">
          <div className="row">
            <div className="col-lg-12 pt-5">
              <div className="heading-section center mb-0">
                <h2
                  style={{ fontSize: 26, lineHeight: "normal", color: "#333" }}
                >
                  Latest Hotels
                </h2>
              </div>
              <div className="flat-tabs themesflat-tabs">
                <div className="content-tab">
                  {loading ? (
                    <div className="content-inner tab-content">
                      <div className="wrap-item flex">
                        {[...Array(6)].map((_, index) => (
                          <div key={index} className="box box-dream hv-one">
                            <Skeleton
                              variant="rectangular"
                              width={284}
                              height={210}
                            />
                            <div className="content">
                              <Skeleton width="80%" height={30} />
                              <Skeleton width="60%" height={20} />
                              <Skeleton width="40%" height={20} />
                              <Skeleton width="100%" height={15} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : hotels?.length > 0 ? (
                    <div className="content-inner tab-content">
                      <div className="wrap-item flex">
                        {hotels?.slice(0, 8).map((data, index) => (
                          <div key={index} className="box box-dream hv-one">
                            <div className="image-group relative">
                              <span className="featured fs-12 fw-6">
                                Company-Serviced
                              </span>
                              <div className="item active custom-slider">
                                <AwesomeSlider
                                  style={{
                                    "--slider-height-percentage": "210px",
                                    "--slider-width-percentage": "284px",
                                    "--organic-arrow-height": "17px",
                                    "--organic-arrow-color": "#fff",
                                    "--control-button-opacity": 1,
                                    "--animation-duration": "100ms",
                                  }}
                                  bullets={false}
                                  mobileTouch={true}
                                >
                                  {data?.images?.map((imageName, imgIndex) => (
                                    <div
                                      key={imgIndex}
                                      data-src={`${process.env.REACT_APP_BASE_URL}${imageName}`}
                                      style={{ width: "100%" }}
                                    />
                                  ))}
                                </AwesomeSlider>
                              </div>
                            </div>

                            <div className="content">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  localStorage.setItem("ListingId", data?._id);
                                  navigate(`/hotelsDetail/${data?._id}`);
                                }}
                              >
                                <h3 className="link-style-1">
                                  <Link to={`/hotelsDetail/${data?._id}`}>
                                    <span className="text-capitalize">
                                      {data?.name}
                                    </span>
                                  </Link>
                                </h3>
                                <div
                                  className="text-address"
                                  style={{ marginBottom: "5px" }}
                                >
                                  <p className="p-12">
                                    {data?.address}, {data?.city}, {data?.state}
                                  </p>
                                </div>
                                <div className="fs-16 fw-6 text-color-3">
                                  <Link>₹ {data?.pricePerNight}</Link>
                                </div>

                                <div className="fs-16 fw-6 text-color-3">
                                  <div className="rating">
                                    <span className="rating-stars">
                                      {[...Array(5)].map((_, i) => (
                                        <i
                                          key={i}
                                          className={`fas fa-star ${
                                            i < Math.floor(data.rating)
                                              ? "filled"
                                              : i < data.rating
                                              ? "half"
                                              : ""
                                          }`}
                                        />
                                      ))}
                                    </span>
                                    <span className="rating-value">
                                      {data.rating}
                                    </span>
                                  </div>
                                </div>

                                <div className="services">
                                  <ul className="service-list">
                                    {data?.amenities
                                      ?.slice(0, 4)
                                      .map((amenity, idx) => (
                                        <li key={idx}>
                                          <i className="fas fa-check"></i>{" "}
                                          {amenity}
                                        </li>
                                      ))}
                                    {data?.amenities?.length > 4 && (
                                      <li style={{ color: "red" }}>
                                        {" "}
                                        +{data?.amenities?.length - 4} more
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>

                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  localStorage.setItem(
                                    "UserdetailsID",
                                    data?.owner
                                  );
                                  navigate("/ProfileDetails");
                                }}
                                className="days-box flex justify-space align-center"
                              >
                                <div
                                  className="img-author hv-tool"
                                  data-tooltip={data?.name}
                                >
                                  <img
                                    style={{
                                      height: "40px",
                                      width: "40px",
                                      borderRadius: "50px",
                                    }}
                                    src={
                                      data?.user_image
                                        ? `http://157.66.191.24:3089/uploads/${data?.user_image}`
                                        : "assets/images/author/author-2.jpg"
                                    }
                                    alt="Owner"
                                  />
                                </div>
                                <div className="days">
                                  {data?.updatedAt?.slice(0, 10)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="content-inner tab-content">
                      <div style={{ textAlign: "center" }}>
                        <h2>
                          <img
                            width={150}
                            src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                            alt="No hotels Found"
                          />
                        </h2>
                        <h3 className="mt-3">No hotels Found</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Hotsellingprojecthome /> */}
      <Projecthomepage />
      <PopulerDestination />

      {/* <Toplocalty /> */}
      <BannerStrip1 />
      {/* <Topdeveloperhomepage /> */}

      <style jsx>{`
        .custom-slider .awssld__controls button {
          background-color: #ffffff00 !important;
          top: 45%;
          border-radius: none !important;
          height: 45px !important;
          width: 45px !important;
        }
      `}</style>
    </>
  );
};

export default Home;
