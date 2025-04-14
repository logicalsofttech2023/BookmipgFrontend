import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BookingHistory = () => {
  let loginid = secureLocalStorage.getItem("loginuserid");
  const Navigate = useNavigate();
  const [Listingdata, setListingdata] = useState();

  const [count, setcount] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    GetProperty();
  }, [0]);

  const GetProperty = () => {
    const data = {
      userId: loginid,
    };
    axios
      .post(
        "  http://157.66.191.24:3089/website/get_favourite_property_list",
        data
      )
      .then((res) => {
        setListingdata(res?.data?.data?.reverse());
        setcount(res?.data?.data?.length);
      })
      .catch((error) => {});
  };

  const addFavorite = (item) => {
    const data = {
      userId: loginid,
      propertyId: item,
      lead_status: "1",
      favourite_status: "0",
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
      .then((res) => {
        GetProperty();

        toast.success("Favorite status updated");
      })
      .catch(() => {});
  };
  return (
    <>
      <Toaster />
      <div className="dashboard__content bg-23">
        <section className="flat-title2">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">
                  Booking History
                </div>
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
                      <div
                        className="wrap-listing table-responsive"
                        // style={{
                        //   overflow: "scroll",
                        //   height: "500px",
                        //   overflowX: "hidden",
                        //   scrollbarWidth: "none",
                        // }}
                      >
                        {Listingdata?.length > 0 ? (
                          <table className="listing-table">
                          <tbody>
                            <tr className="table-row">
                              {/* Property Info Column */}
                              <td className="property-info">
                                <div className="property-item flex">
                                  <div className="property-image">
                                    <img
                                      src="https://images.oyoroomscdn.com/uploads/hotel_image/76358/thumb/ubqlrlnmnmwa.jpg"
                                      alt="property"
                                      className="property-thumbnail"
                                    />
                                  </div>
                                  <div className="property-details">
                                    <h4 className="property-name text-capitalize">
                                      <a href="/PropertyDetail/1" className="link-style-1">
                                        Hotel O Easy Stay
                                      </a>
                                    </h4>
                                    <p className="property-dates text-color-2">
                                      Sep 8, 2019 - Sep 9, 2019
                                    </p>
                                    <div className="guest-info fs-16 fw-6 text-color-3">
                                      2 Guests, 1 Room
                                    </div>
                                  </div>
                                </div>
                              </td>
                        
                              {/* Property ID Column */}
                              <td className="property-id">
                                <h4 className="fs-16">KDLM6820</h4>
                              </td>
                        
                              {/* Status and Details Column */}
                              <td className="status-column">
                                <div className="status-wrap">
                                  {/* Checked Out Status */}
                                  <div className="status-info fs-12 fw-6 lh-18">
                                    <span className="status-text">Checked Out</span>
                                  </div>
                        
                                  {/* Pending Amount */}
                                  <div className="pending-amount fs-12 fw-6 lh-18">
                                    <span className="amount-text">Pending Amount: ₹0</span>
                                  </div>
                        
                                  {/* View Details */}
                                  <div
                                    onClick={() => {}}
                                    className="view-details fs-12 fw-6 lh-18"
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "600",
                                      color: "#007bff",
                                    }}
                                  >
                                    View Details
                                  </div>
                        
                                  {/* Need help section */}
                                  <div className="need-help fs-12 fw-6 lh-18">
                                    <span className="help-text">Need help?</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                        
                            <tr className="table-row">
                              {/* Property Info Column */}
                              <td className="property-info">
                                <div className="property-item flex">
                                  <div className="property-image">
                                    <img
                                      src="https://images.oyoroomscdn.com/uploads/hotel_image/76358/thumb/ubqlrlnmnmwa.jpg"
                                      alt="property"
                                      className="property-thumbnail"
                                    />
                                  </div>
                                  <div className="property-details">
                                    <h4 className="property-name text-capitalize">
                                      <a href="/PropertyDetail/2" className="link-style-1">
                                        Comfort Inn Stay
                                      </a>
                                    </h4>
                                    <p className="property-dates text-color-2">
                                      Oct 1, 2019 - Oct 2, 2019
                                    </p>
                                    <div className="guest-info fs-16 fw-6 text-color-3">
                                      1 Guest, 1 Room
                                    </div>
                                  </div>
                                </div>
                              </td>
                        
                              {/* Property ID Column */}
                              <td className="property-id">
                                <h4 className="fs-16">COMF2020</h4>
                              </td>
                        
                              {/* Status and Details Column */}
                              <td className="status-column">
                                <div className="status-wrap">
                                  {/* Checked Out Status */}
                                  <div className="status-info fs-12 fw-6 lh-18">
                                    <span className="status-text">Checked Out</span>
                                  </div>
                        
                                  {/* Pending Amount */}
                                  <div className="pending-amount fs-12 fw-6 lh-18">
                                    <span className="amount-text">Pending Amount: ₹500</span>
                                  </div>
                        
                                  {/* View Details */}
                                  <div
                                    onClick={() => {}}
                                    className="view-details fs-12 fw-6 lh-18"
                                    style={{
                                      cursor: "pointer",
                                      fontWeight: "600",
                                      color: "#007bff",
                                    }}
                                  >
                                    View Details
                                  </div>
                        
                                  {/* Need help section */}
                                  <div className="need-help fs-12 fw-6 lh-18">
                                    <span className="help-text">Need help?</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
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
                            <h3>No Booking History</h3>
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

export default BookingHistory;
