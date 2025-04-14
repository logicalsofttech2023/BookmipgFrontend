import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const hotels = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  hotelname: `The Grand Hotel ${index + 1}`,
  roomnumber: 100,
  roomtype: "Single room",
  capacity: 2,
  bedtype: "Single bed",
  status: "Active",
  image:
    "https://images.oyoroomscdn.com/uploads/hotel_image/92094/medium/xttqmtbllawt.jpg",
  description: "Luxury hotel with sea view and all.",
}));

const TotalRoom = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedHotels = hotels.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Room List</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Room List</h4>

                    <div className="table-responsive">
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              #
                            </th>
                            <th className="text-left" style={{ color: "red" }}>
                              Hotel Name
                            </th>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              Room Number
                            </th>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              Room Type
                            </th>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              Capacity
                            </th>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              Bed Type
                            </th>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              Status
                            </th>
                            <th
                              className="text-center"
                              style={{ color: "red" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedHotels.map((hotel) => (
                            <tr key={hotel.id}>
                              <td
                                style={{ color: "black" }}
                                className="text-center text-muted"
                              >
                                #{hotel.id}
                              </td>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div
                                      style={{ width: "60px", height: "60px" }}
                                      className="widget-content-left mr-3"
                                    >
                                      <div className="widget-content-left">
                                        <img
                                          style={{
                                            height: "60px",
                                            width: "60px",
                                          }}
                                          className="rounded-circle"
                                          src={hotel.image}
                                          alt="Hotel"
                                        />
                                      </div>
                                    </div>
                                    <div className="widget-content-left flex2">
                                      <div
                                        style={{ color: "black" }}
                                        className="widget-heading"
                                      >
                                        {hotel.hotelname}
                                      </div>
                                      <div
                                        style={{ color: "black" }}
                                        className="widget-subheading opacity-7"
                                      >
                                        {hotel.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                style={{ color: "black" }}
                                className="text-center"
                              >
                                {hotel.roomnumber}
                              </td>
                              <td
                                style={{ color: "black" }}
                                className="text-center"
                              >
                                {hotel.roomtype}
                              </td>
                              <td
                                style={{ color: "black" }}
                                className="text-center"
                              >
                                {hotel.capacity}
                              </td>
                              <td
                                style={{ color: "black" }}
                                className="text-center"
                              >
                                {hotel.bedtype}
                              </td>
                              <td className="text-center">
                                <div className="badge badge-success">
                                  {hotel.status}
                                </div>
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                      <Stack spacing={2}>
                        <Pagination
                          count={Math.ceil(hotels.length / rowsPerPage)}
                          page={page}
                          onChange={handleChange}
                          color="primary"
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

export default TotalRoom;
