import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Dashboard.css";
import { TextField, Pagination, Switch } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TotalHotel = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  let token = localStorage.getItem("token");
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchHotel();
  }, [search, page]);

  const fetchHotel = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getHotelsByOwnerId`,
        {
          params: { search, page, limit },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setHotels(response?.data?.data);
        setTotalPages(response?.data?.totalPages || 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyToggle = async (hotelId, currentStatus) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/verifyHotelByOwner`,
        { adminVerify: !currentStatus, hotelId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setHotels((prevHotels) =>
          prevHotels.map((hotel) =>
            hotel._id === hotelId
              ? { ...hotel, adminVerify: !currentStatus }
              : hotel
          )
        );
      }
    } catch (error) {
      console.error("Error updating hotel verification status:", error);
    }
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Hotel List</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Hotel List</h4>
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
                              City
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              State
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Country
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Price/Night
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Rating
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
                            {/* <th
                              scope="col"
                              style={{
                                fontWeight: "500",
                                fontSize: "16px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              Policy
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {hotels?.length === 0 ? (
                            <tr>
                              <td
                                colSpan="11"
                                style={{ textAlign: "center", padding: "20px" }}
                              >
                                <strong>No hotels found</strong>
                              </td>
                            </tr>
                          ) : (
                            hotels?.map((hotel, index) => (
                              <tr key={hotel._id}>
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
                                    src={`${process.env.REACT_APP_BASE_URL}${hotel.images[0]}`}
                                    className="img-thumbnail"
                                    alt={hotel.name}
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
                                  {hotel.name}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  {hotel.city}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  {hotel.state}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  {hotel.country}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  ₹{hotel.pricePerNight}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  {hotel.rating}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  {hotel.room}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  <Switch
                                    checked={hotel.adminVerify}
                                    onChange={() =>
                                      handleVerifyToggle(
                                        hotel._id,
                                        hotel.adminVerify
                                      )
                                    }
                                    color="success"
                                  />
                                  <span
                                    className={`badge ${
                                      hotel.adminVerify
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {hotel.adminVerify
                                      ? "Available"
                                      : "Not Available"}
                                  </span>
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    alignContent: "center",
                                  }}
                                >
                                  <button
                                    onClick={() =>
                                      navigate(`/updateHotel/${hotel._id}`)
                                    }
                                    className="btn btn-primary btn-sm"
                                  >
                                    Edit
                                  </button>
                                </td>

                                {/* <td
                                  style={{
                                    border: "1px solid #dee2e6",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                    }}
                                  >
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/rulesAndRestrictions/${hotel._id}`
                                        )
                                      }
                                      className="btn btn-primary btn-sm"
                                    >
                                      Rules & Restriction
                                    </button>

                                    <button
                                      onClick={() =>
                                        navigate(`/housePolicy/${hotel._id}`)
                                      }
                                      className="btn btn-primary btn-sm"
                                    >
                                      House Policy
                                    </button>

                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/cancellationPolicy/${hotel._id}`
                                        )
                                      }
                                      className="btn btn-primary btn-sm"
                                    >
                                      Cancellation Policy
                                    </button>
                                  </div>
                                </td> */}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="card-footer d-flex justify-content-center">
                      <Stack spacing={2}>
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={handleChange}
                          color="primary"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                          }}
                        />
                      </Stack>
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

export default TotalHotel;
