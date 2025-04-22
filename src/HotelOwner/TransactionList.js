import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { DateRangePicker } from "rsuite";

const TransactionList = () => {
  const [page, setPage] = useState(1);
  const [bookingData, setBookingData] = useState([]);
  const rowsPerPage = 3;
  let token = localStorage.getItem("token");
  const [dateRange, setDateRange] = useState(null);
  const [totalEarning, setTotalEarning] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    fetchBookingData();
  }, [dateRange, selectedMonth, selectedYear]);

  const fetchBookingData = async () => {
    try {
      const params = {};

      // Priority: dateRange > month + year > year only > month only
      if (dateRange && dateRange[0] && dateRange[1]) {
        params.startDate = dateRange[0].toISOString();
        params.endDate = dateRange[1].toISOString();
      } else {
        if (selectedMonth) {
          params.month = selectedMonth;
        }

        if (selectedYear) {
          params.year = selectedYear;
        }
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getTransactionByOwnerId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );

      console.log(response.data, "response data");

      if (response.status === 200) {
        setBookingData(response?.data?.bookings || []);
        setTotalEarning(response.data.totalEarnings || 0);
        setTotalBookings(response.data.totalBookings || 0);
      } else {
        setBookingData([]);
        setTotalEarning(0);
        setTotalBookings(0);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setBookingData([]);
      setTotalEarning(0);
      setTotalBookings(0);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedBooking = bookingData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <Toaster />
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Transaction List</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div className="card shadow-lg p-3 bg-white rounded">
                    <div className="card-body">
                      <h4 className="card-title mb-4 font-weight-bold">
                        Booking List
                      </h4>
                      <div className="row mb-4">
                        <div className="col-md-4 d-flex align-items-center">
                          <h5 className="mb-0">
                            Total Earnings:{" "}
                            <span className="text-success">
                              ₹ {totalEarning}
                            </span>
                          </h5>
                        </div>
                        <div className="col-md-8 d-flex justify-content-end">
                          <DateRangePicker
                            placeholder="Select Date Range"
                            onChange={setDateRange}
                            value={dateRange}
                            format="dd-MM-yyyy"
                            showOneCalendar
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>

                      <div className="row align-items-end mb-4">
                        <div className="col-md-4 d-flex align-items-center">
                          <h5 className="mb-0">
                            Total Bookings:{" "}
                            <span className="text-primary">
                              {totalBookings}
                            </span>
                          </h5>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Month</label>
                          <select
                            className="form-select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                          >
                            <option value="">Select Month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString("default", {
                                  month: "long",
                                })}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Year</label>
                          <select
                            className="form-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                          >
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

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
                                    style={{ border: "1px solid #dee2e6" }}
                                  >
                                    {index + 1}
                                  </th>
                                  <td
                                    className="w-25"
                                    style={{ border: "1px solid #dee2e6" }}
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
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    {booking.hotel?.name}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    {booking?.room}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    {booking?.adults + booking?.children}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    {new Date(
                                      booking?.checkInDate
                                    ).toLocaleDateString("en-GB")}
                                  </td>

                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    {new Date(
                                      booking?.checkOutDate
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    ₹ {booking?.totalPrice}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
                                    {booking.room}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid #dee2e6",
                                      alignContent: "center",
                                    }}
                                  >
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
                              count={Math.ceil(
                                bookingData.length / rowsPerPage
                              )}
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
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
