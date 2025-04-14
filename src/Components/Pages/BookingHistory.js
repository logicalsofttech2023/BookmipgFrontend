import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BookingHistory = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState();
  const [count, setCount] = useState();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [cancelBookingId, setCancelBookingId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookingList();
  }, [0]);

  const getBookingList = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/getBookingByUserId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookingData(res?.data?.bookings);
        setCount(res?.data?.data?.length);
        console.log(res?.data?.bookings);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const handleCancelBooking = async () => {
    if (!selectedReason) {
      toast.error("Please select a cancellation reason.");
      return;
    }

    const data = {
      bookingId: cancelBookingId,
      reason: selectedReason,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/user/cancelBooking`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Booking cancelled successfully!");
        setOpenCancelModal(false);
        setSelectedReason("");
        getBookingList();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error cancelling booking. Please try again."
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
                      <div className="wrap-listing table-responsive">
                        {bookingData?.length > 0 ? (
                          <table className="listing-table">
                            <thead>
                              <tr>
                                <th>Hotel Name</th>
                                <th>Booking ID</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {bookingData.map((booking, index) => {
                                const hotel = booking.hotel;
                                const checkIn = new Date(
                                  booking.checkInDate
                                ).toLocaleDateString();
                                const checkOut = new Date(
                                  booking.checkOutDate
                                ).toLocaleDateString();
                                const status = booking.status;
                                const guests = `${
                                  booking.adults + booking.children
                                } Guest${
                                  booking.adults + booking.children > 1
                                    ? "s"
                                    : ""
                                }`;
                                const room = `${booking.room} Room${
                                  booking.room > 1 ? "s" : ""
                                }`;
                                const image = hotel?.images?.[0]
                                  ? `${process.env.REACT_APP_BASE_URL}${hotel.images[0]}`
                                  : "https://via.placeholder.com/100";

                                return (
                                  <tr className="table-row" key={index}>
                                    {/* Property Info Column */}
                                    <td className="property-info">
                                      <div className="property-item flex">
                                        <div className="property-image">
                                          <img
                                            src={image}
                                            alt="property"
                                            className="property-thumbnail"
                                          />
                                        </div>
                                        <div className="property-details">
                                          <h4 className="property-name text-capitalize">
                                            <a
                                              href={`/hotelsDetail/${hotel._id}`}
                                              className="link-style-1"
                                            >
                                              {hotel.name}
                                            </a>
                                          </h4>
                                          <p className="property-dates text-color-2">
                                            {checkIn} - {checkOut}
                                          </p>
                                          <div className="guest-info fs-16 fw-6 text-color-3">
                                            {guests}, {room}
                                          </div>
                                        </div>
                                      </div>
                                    </td>

                                    {/* Booking ID Column */}
                                    <td className="property-id">
                                      <h4 className="fs-16">
                                        {booking.bookingId}
                                      </h4>
                                    </td>

                                    {/* Status Column */}
                                    <td className="status-column">
                                      <div className="status-wrap">
                                        <div className="status-info fs-12 fw-6 lh-18">
                                          <span
                                            className="status-text"
                                            style={{
                                              color:
                                                status === "cancelled"
                                                  ? "red"
                                                  : "#28a745",
                                            }}
                                          >
                                            {status.charAt(0).toUpperCase() +
                                              status.slice(1)}
                                          </span>
                                        </div>
                                        {status === "cancelled" &&
                                          booking.cancellationReason && (
                                            <div className="fs-12 lh-18 text-color-3">
                                              <i>
                                                Reason:{" "}
                                                {booking.cancellationReason}
                                              </i>
                                            </div>
                                          )}
                                      </div>
                                    </td>

                                    {/* Action Column */}
                                    <td className="action-column">
                                      {status !== "cancelled" ? (
                                        <button
                                          className="btn btn-danger btn-sm"
                                          onClick={() => {
                                            setCancelBookingId(booking._id);
                                            setOpenCancelModal(true);
                                          }}
                                        >
                                          Cancel Booking
                                        </button>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#999",
                                          }}
                                        >
                                          Already Cancelled
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
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
        {openCancelModal && (
          <div className="cancel-modal">
            <div className="modal-content" >
              <h4>Cancel Booking</h4>
              <p>Please select a reason for cancellation:</p>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="form-control"
              >
                <option value="">-- Select Reason --</option>
                <option value="Change in travel plans">
                  Change in travel plans
                </option>
                <option value="Found a better deal">Found a better deal</option>
                <option value="Booking by mistake">Booking by mistake</option>
                <option value="Other">Other</option>
              </select>

              <div className="modal-actions mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setOpenCancelModal(false);
                    setSelectedReason("");
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancelBooking}
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingHistory;
