import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';


const CancelledBooking = () => {
  const [page, setPage] = useState(1);
  const [bookingData, setBookingData] = useState([]);
  const rowsPerPage = 5;
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getBookingByOwnerId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const cancelledBookings = response?.data?.bookings?.filter(
          (booking) => booking.status === "cancelled"
        );
        setBookingData(cancelledBookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedBooking = bookingData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleStatusChange = async (bookingId, newStatus) => {
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/user/updateBookingStatus`,
        {
          bookingId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setBookingData((prevData) =>
          prevData.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        toast.success(response?.data?.message)
      } else {
        toast.success("Failed to update booking status.")
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.success("Server error! Please try again.")
    }
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <Toaster />
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Cancelled Booking List</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Cancelled Booking List</h4>
                    <div className="table-responsive">
                      <table
                        className="table table-image table-bordered"
                        style={{ border: "1px solid #dee2e6" }}
                      >
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Hotel Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Total Room
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Total Guest
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              checkInDate
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              checkOutDate
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              totalPrice
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Rooms
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedBooking?.length === 0 ? (
                            <tr>
                              <td
                                colSpan="11"
                                style={{
                                  textAlign: "center",
                                  padding: "20px",
                                }}
                              >
                                <strong>No bookings found</strong>
                              </td>
                            </tr>
                          ) : (
                            paginatedBooking?.map((booking, index) => (
                              <tr key={booking?._id}>
                                <th
                                  scope="row"
                                  style={{ border: "1px solid #dee2e6", alignContent: "center" }}
                                >
                                  {index + 1}
                                </th>
                                <td
                                  className="w-25"
                                  style={{ border: "1px solid #dee2e6", alignContent: "center" }}
                                >
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}${booking.hotel?.images[0]}`}
                                    className="img-thumbnail"
                                    alt={booking.hotel?.name}
                                    style={{
                                      height: "150px",
                                      width: "200px",
                                      objectFit: "cover",
                                      minWidth: "200px",
                                      display: "block",
                                      borderRadius: "unset",
                                    }}
                                  />
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  {booking.hotel?.name}
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  {booking?.room}
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  {booking?.adults + booking?.children}
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  {new Date(
                                    booking?.checkInDate
                                  ).toLocaleDateString("en-GB")}
                                </td>

                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  {new Date(
                                    booking?.checkOutDate
                                  ).toLocaleDateString("en-GB")}
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  ₹ {booking?.totalPrice}
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  {booking.room}
                                </td>
                                <td style={{ border: "1px solid #dee2e6", alignContent: "center" }}>
                                  <span
                                    className={`badge ${
                                      booking?.status
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {booking?.status}
                                  </span>
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  <Select
                                    value={booking.status}
                                    onChange={(event) =>
                                      handleStatusChange(
                                        booking._id,
                                        event.target.value
                                      )
                                    }
                                    size="small"
                                    style={{ width: "120px" }}
                                  >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="completed">
                                      Completed
                                    </MenuItem>
                                    <MenuItem value="cancelled">
                                      Cancelled
                                    </MenuItem>
                                    <MenuItem value="upcoming">
                                      Upcoming
                                    </MenuItem>
                                  </Select>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {bookingData.length > rowsPerPage && (
                      <div className="card-footer d-flex justify-content-center">
                        <Stack spacing={2}>
                          <Pagination
                            count={Math.ceil(bookingData.length / rowsPerPage)}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                          />
                        </Stack>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CancelledBooking;
