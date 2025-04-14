import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyFavorites = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [favoritesData, setFavoritesData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites();
  }, [0]);
  const loginId = localStorage.getItem("token");

  const getFavorites = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/getFavorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFavoritesData(res?.data?.favorites?.reverse());
        }
      })
      .catch((error) => {
        console.log("Server error", error);
        setFavoritesData();
      });
  };

  const addFavorite = async (status, hotelId) => {
    if (!hotelId) return;
    try {
      const apiEndpoint =
        status === "1"
          ? `${process.env.REACT_APP_BASE_URL}api/user/addFavorite`
          : `${process.env.REACT_APP_BASE_URL}api/user/removeFavorite`;

      const res = await axios.post(
        apiEndpoint,
        { hotelId },
        {
          headers: {
            Authorization: `Bearer ${loginId}`,
          },
        }
      );

      if (status === "1") {
        toast.success("Added to Favorites");
      } else {
        toast.success("Removed from Favorites");
      }
      // Update local state after API call
      getFavorites();
    } catch (error) {
      console.error(
        "Error updating favorite status:",
        error.response?.data || error
      );
    }
  };
  return (
    <>
      <Toaster />
      <div className="dashboard__content bg-23">
        <section className="flat-title2">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">My Favorites</div>
              </div>
            </div>
          </div>
        </section>
        <section className="flat-dashboard">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12 flex post-col">
                <div
                  className="tf-new-listing"
                  style={{
                    width: "100%",
                    marginRight: 0,
                    overflow: "scroll",
                    height: "500px",
                    overflowX: "hidden",
                    scrollbarWidth: "none",
                  }}
                >
                  <div className="new-listing bg-white">
                    <div className="table-content">
                      <div className="wrap-listing table-responsive">
                        {favoritesData?.length > 0 ? (
                          <table className="listing-table">
                            <thead>
                              <tr>
                                <th>Hotel Info</th>
                                <th>City</th>
                                <th>Price Per Night</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {favoritesData.map((favorit) => (
                                <tr className="table-row" key={favorit._id}>
                                  {/* Property Info Column */}
                                  <td
                                    className="property-info"
                                    style={{ padding: "12px 20px" }}
                                    onClick={() => {
                                      navigate(
                                        `/hotelsDetail/${favorit.hotel._id}`
                                      );
                                    }}
                                  >
                                    <div className="property-item flex">
                                      <div className="property-image">
                                        <img
                                          src={`${process.env.REACT_APP_BASE_URL}${favorit.hotel.images?.[0]}`}
                                          alt={favorit.hotel.name}
                                          className="property-thumbnail"
                                        />
                                      </div>
                                      <div className="property-details">
                                        <h4 className="property-name text-capitalize">
                                          <Link
                                            to={`/hotelsDetail/${favorit.hotel._id}`}
                                            className="link-style-1"
                                          >
                                            {favorit.hotel.name.length > 30
                                              ? `${favorit.hotel.name.slice(
                                                  0,
                                                  30
                                                )}...`
                                              : favorit.hotel.name}
                                          </Link>
                                        </h4>
                                        <p className="property-address text-color-2">
                                          <span>
                                            {favorit.hotel.address.length > 30
                                              ? `${favorit.hotel.address.slice(
                                                  0,
                                                  30
                                                )}...`
                                              : favorit.hotel.address}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  {/* City Column */}
                                  <td
                                    className="property-city"
                                    style={{ padding: "12px 20px" }}
                                  >
                                    <h4 className="fs-16">
                                      {favorit.hotel.city}
                                    </h4>
                                  </td>

                                  {/* Price Per Night Column */}
                                  <td
                                    className="property-price"
                                    style={{ padding: "12px 20px" }}
                                  >
                                    <h4 className="fs-16">
                                      ₹{favorit.hotel.pricePerNight}
                                    </h4>
                                  </td>

                                  {/* Action Column */}
                                  <td
                                    className="action-column"
                                    style={{ padding: "12px 20px" }}
                                  >
                                    <button
                                      className="remove-favorite-btn"
                                      onClick={() =>
                                        addFavorite("0", favorit.hotel._id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        fontWeight: "600",
                                        color: "red",
                                        background: "none",
                                        border: "none",
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div
                            style={{ textAlign: "center", marginTop: "50px" }}
                          >
                            <img
                              width={100}
                              src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                              alt="No Property Found"
                            />
                            <h3>No Favorite Hotels</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyFavorites;
