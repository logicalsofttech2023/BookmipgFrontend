import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import { Skeleton } from "@mui/material";
import { IoLocationSharp } from "react-icons/io5";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

const LatestHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllHotels();
  }, []);

  const getAllHotels = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/getAllHotelsForWeb`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  const addFavorite = async (hotelId) => {
    if (!hotelId) return;
    if (!token) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
      return;
    }
    try {
      const apiEndpoint = `${process.env.REACT_APP_BASE_URL}api/user/addFavorite`;

      await axios.post(
        apiEndpoint,
        { hotelId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Added to Favorites");

      getAllHotels();
    } catch (error) {
      console.error("Error adding favorite:", error.response?.data || error);
    }
  };

  const removeFavorite = async (hotelId) => {
    if (!token) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
      return;
    }
    if (!hotelId) return;
    try {
      const apiEndpoint = `${process.env.REACT_APP_BASE_URL}api/user/removeFavorite`;

      await axios.post(
        apiEndpoint,
        { hotelId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Removed from Favorites");

      // Update local state
      getAllHotels();
    } catch (error) {
      console.error("Error removing favorite:", error.response?.data || error);
    }
  };
  return (
    <section
      className="flat-featured wg-dream home mb-0"
      style={{ background: "#faf8ff", paddingBottom: "0px" }}
    >
      <Toaster />
      <div className="container6">
        <div className="row">
          <div className="col-lg-12 pt-5">
            {(loading || (hotels && hotels?.length > 0)) && (
              <div className="heading-section center mb-0">
                <h2
                  style={{ fontSize: 26, lineHeight: "normal", color: "#333" }}
                >
                  Latest Hotels
                </h2>
              </div>
            )}
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
                            <motion.span
                              className="favorite-icon"
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                fontSize: "30px",
                                color: data?.isFavorite ? "red" : "#fff",
                                cursor: "pointer",
                                zIndex: 2,
                              }}
                              onClick={() =>
                                data?.isFavorite
                                  ? removeFavorite(data._id)
                                  : addFavorite(data._id)
                              }
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              {data?.isFavorite ? (
                                <IoHeart />
                              ) : (
                                <IoHeartOutline />
                              )}
                            </motion.span>

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
                            <h3
                              className="link-style-1"
                              style={{ fontSize: "20px", lineHeight: "30px" }}
                            >
                              <Link
                                to={`/hotelsDetail/${data?._id}`}
                                onMouseOver={(e) =>
                                  (e.target.style.color = "red")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.color = "black")
                                }
                              >
                                <span className="text-capitalize">
                                  {data?.name.length > 20
                                    ? `${data?.name.slice(0, 20)}...`
                                    : data?.name}
                                </span>
                              </Link>
                            </h3>
                            <div
                              className="text-address"
                              style={{ marginBottom: "5px", color: "#555" }}
                            >
                              <IoLocationSharp style={{ marginRight: "3px" }} />
                              {`${data?.address}, ${data?.city}, ${data?.state}`
                                .length > 40
                                ? `${data?.address}, ${data?.city}, ${data?.state}`.slice(
                                    0,
                                    40
                                  ) + "..."
                                : `${data?.address}, ${data?.city}, ${data?.state}`}
                            </div>

                            <div className="fs-16 fw-6 text-color-3">
                              <Link
                                style={{
                                  textDecoration: "none",
                                  marginTop: "10px",
                                }}
                              >
                                <span
                                  style={{ color: "red", fontWeight: "bold" }}
                                >
                                  ₹{data?.pricePerNight}
                                </span>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                    marginLeft: "8px",
                                  }}
                                >
                                  ₹{data?.originalPricePerNight}
                                </span>

                                <span
                                  style={{
                                    color: "green",
                                    fontSize: "14px",
                                    marginLeft: "8px",
                                  }}
                                >
                                  (
                                  {Math.round(
                                    ((data?.originalPricePerNight -
                                      data?.pricePerNight) /
                                      data?.originalPricePerNight) *
                                      100
                                  )}
                                  % OFF)
                                </span>
                              </Link>
                            </div>

                            <div className="fs-16 fw-6 text-color-3 mt-2">
                              <div className="rating">
                                <span className="rating-stars">
                                  {[...Array(5)].map((_, i) => {
                                    if (i < Math.floor(data.rating)) {
                                      return (
                                        <i
                                          key={i}
                                          className="fas fa-star filled"
                                        />
                                      );
                                    } else if (i < data.rating) {
                                      return (
                                        <i
                                          key={i}
                                          className="fas fa-star-half-alt half"
                                        />
                                      );
                                    } else {
                                      return (
                                        <i
                                          key={i}
                                          className="far fa-star empty"
                                        />
                                      );
                                    }
                                  })}
                                </span>
                                <span className="rating-value">
                                  {data.rating.toFixed(1)}
                                </span>
                              </div>
                            </div>

                            <div className="services">
                              <ul className="service-list">
                                {data?.amenities
                                  ?.slice(0, 4)
                                  .map((amenity, idx) => (
                                    <li key={idx}>
                                      <i className="fas fa-check"></i> {amenity}
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

                          <div className="days-box flex justify-space align-center">
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
                      ))}
                    </div>
                  </div>
                ) : null}

<div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h2></h2>
                  <Link
                    to="/hotelList"
                    style={{
                      textDecoration: "none",
                      color: "red",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "black")}
                    onMouseOut={(e) => (e.target.style.color = "red")}
                  >
                    View All Hotels →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestHotels;
