import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import TextField from "@mui/material/TextField";
import { Button, InputAdornment } from "@mui/material";
import { DateRangePicker } from "rsuite";
import { IoLocationSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Slider, Typography } from "@mui/material";

const HotelList = () => {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [hotel, setHotels] = useState([]);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [searchParams] = useSearchParams();
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const city = searchParams.get("city");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState([
    minPrice || 500,
    maxPrice || 11000,
  ]);
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };
  const location = useLocation();
  const selectedDatesLocation = location.state?.selectedDatesLocation || null;

  const [selectedDates, setSelectedDates] = useState(
    selectedDatesLocation || []
  );

  const handleAmenitySelect = (amenity) => {
    setSelectedAmenities((prevAmenities) => {
      const updatedAmenities = prevAmenities.includes(amenity)
        ? prevAmenities.filter((item) => item !== amenity)
        : [...prevAmenities, amenity];

      fetchHotel({
        searchTerm,
        minPrice,
        maxPrice,
        amenities: updatedAmenities,
      }); // Call fetchHotel immediately
      return updatedAmenities;
    });
  };

  const fetchHotel = async ({
    search = "",
    page = 1,
    limit = 10,
    hotelId,
    city,
    state,
    country,
    zipCode,
    minPrice,
    maxPrice,
    amenities = [],
    latitude,
    longitude,
    sortBy,
    checkInDate,
    checkOutDate,
  } = {}) => {
    console.log(latitude);

    try {
      setLoading(true);
      // Create query parameters and remove null/undefined values
      const queryParams = new URLSearchParams();

      if (search) queryParams.append("search", search);
      if (page) queryParams.append("page", page);
      if (limit) queryParams.append("limit", limit);
      if (hotelId) queryParams.append("hotelId", hotelId);
      if (city) queryParams.append("city", city);
      if (state) queryParams.append("state", state);
      if (country) queryParams.append("country", country);
      if (zipCode) queryParams.append("zipCode", zipCode);
      if (minPrice !== undefined && minPrice !== null)
        queryParams.append("minPrice", minPrice);
      if (maxPrice !== undefined && maxPrice !== null)
        queryParams.append("maxPrice", maxPrice);
      if (latitude !== undefined && latitude !== null)
        queryParams.append("latitude", latitude);
      if (longitude !== undefined && longitude !== null)
        queryParams.append("longitude", longitude);
      if (amenities.length > 0)
        queryParams.append("amenities", amenities.join(","));
      if (sortBy) queryParams.append("sortBy", sortBy);

      if (checkInDate) queryParams.append("checkInDate", checkInDate);
      if (checkOutDate) queryParams.append("checkOutDate", checkOutDate);

      // API Call
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getAllHotelsByFilter?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCount(response.data.hotels.length);
        let hotels = response.data.hotels || [];
        setLoading(false);
        setHotels(hotels);
        setTotalPage(response?.data?.pagination?.totalPages);
      }
    } catch (error) {
      setLoading(false);
      setHotels();
      setTotalPage();
      setCount();
      console.log("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    // setSelectedDates(selectedDatesLocation || []);
    fetchHotel({
      searchTerm,
      minPrice,
      maxPrice,
      amenities: selectedAmenities,
      latitude,
      longitude,
      sortBy,
      checkInDate: selectedDates[0] || checkInDate,
      checkOutDate: selectedDates[1] || checkOutDate,
      city,
    });
  }, [
    searchTerm,
    minPrice,
    maxPrice,
    selectedAmenities,
    latitude,
    longitude,
    sortBy,
    selectedDates,
    city,
  ]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchHotel({ search: value });
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedAmenities([]);
    setSortBy("");
    setSelectedDates([]);
    navigate("/hotelList");
    fetchHotel({});
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

      fetchHotel();
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
      fetchHotel();
    } catch (error) {
      console.error("Error removing favorite:", error.response?.data || error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value); // State update karega
    fetchHotel({ page: value }); // Naye page ke liye API call karega
  };

  const amenitiesList = [
    "Free WiFi",
    "Swimming Pool",
    "Parking",
    "Restaurant",
    "Gym",
    "Air Conditioning",
  ];

  return (
    <>
      <div>
        <Toaster />
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
                  <div className="content-tab mt-5 w-100">
                    <div className="content-inner tab-content">
                      <div className="">
                        <form method="post" onSubmit={""}>
                          <div
                            className="wd-find-select flex"
                            style={{ gap: 10 }}
                          >
                            {/* Search Input */}
                            <div style={{ flex: 1, width: "100%" }}>
                              <input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                style={{
                                  height: "100%",
                                  fontSize: 13,
                                  color: "#333",
                                  width: "100%",
                                }}
                                type="search"
                                className="search-field flex align-center"
                                placeholder="Search by Hotel name, Locality, City"
                                required
                              />
                            </div>

                            {/* Date Picker */}
                            <div style={{ flex: 1 }}>
                              <DateRangePicker
                                style={{ height: "100%", width: "100%" }}
                                showOneCalendar
                                onChange={(dates) =>
                                  setSelectedDates(dates || [])
                                } // Ensure empty array, not null
                                value={
                                  selectedDates.length > 0 ? selectedDates : []
                                }
                              />
                            </div>

                            {/* Search Button */}
                            <div
                              style={{ flex: 1, margin: "0px" }}
                              className="form-group-1 search-form form-style relative flex align-center"
                            >
                              <Button
                                type="button"
                                style={{
                                  color: "red",
                                  borderColor: "red",
                                  width: "100%",
                                  height: "100%",
                                }}
                                variant="outlined"
                                onClick={clearAllFilters}
                              >
                                Reset
                              </Button>
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
          style={{
            marginTop: "-20px",
            marginBottom: "-30px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <div className="container6">
            <div className="row">
              <div className="col-lg-12 ">
                <div className="title-inner style">
                  <div className="title-group fs-12">
                    <Link className="home fw-6 text-color-3" to="/">
                      Home
                    </Link>
                    <span>Hotel Listing</span>
                  </div>
                  <div className="heading-listing fs-20 lh-45 fw-7">
                    Hotel in {city || "India"} {count >= 0 ? count : "0"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" flat-property flat-property-list flat-properties-rent tf-section2 wg-dream style">
          <div className="container6">
            <div className="row flex">
              <div className="col-lg-8" style={{ backgroundColor: "#F7F7F7" }}>
                <div className="post">
                  <div
                    className="wrap-list"
                    style={{
                      overflow: "scroll",
                      height: "auto",
                      overflowX: "hidden",
                      scrollbarWidth: "none",
                    }}
                  >
                    {loading ? (
                      [...Array(2)].map((_, index) => (
                        <div key={index} className="box box-dream flex hv-one">
                          <div className="image-group relative">
                            <Skeleton
                              variant="rectangular"
                              width={284}
                              height={269}
                            />
                          </div>
                          <div className="content">
                            <Stack spacing={1}>
                              <Skeleton
                                variant="text"
                                width="80%"
                                height={30}
                              />
                              <Skeleton
                                variant="text"
                                width="50%"
                                height={20}
                              />
                              <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={40}
                              />
                            </Stack>
                          </div>
                        </div>
                      ))
                    ) : hotel?.length > 0 ? (
                      hotel?.map((data) => (
                        <div className="box box-dream flex hv-one">
                          <div className="image-group relative">
                            <span className="featured fs-12 fw-6">
                              Company-Serviced
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
                                      data-src={`${process.env.REACT_APP_BASE_URL}${imageName}`}
                                    />
                                  ))}
                                </AwesomeSlider>
                              </div>
                            </div>
                          </div>
                          <div className="content">
                            <div
                              style={{ cursor: "pointer" }}
                              to={`/hotelsDetail/${data?._id}`}
                            >
                              <h3
                                style={{
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                }}
                                className="flex justify-space"
                              >
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
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

                                {data?.isFavorite ? (
                                  <a
                                    onClick={() => {
                                      removeFavorite(data?._id);
                                    }}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "10px",
                                      border: "1px solid #E5E5EA",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginLeft: "28px",
                                    }}
                                    href="#"
                                  >
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 18 18"
                                      fill="#FFA920"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z"
                                        stroke="#FFA920"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                ) : (
                                  <a
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "10px",
                                      border: "1px solid #E5E5EA",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      marginLeft: "28px",
                                    }}
                                    onClick={() => {
                                      addFavorite(data?._id);
                                    }}
                                    href="#"
                                  >
                                    <svg
                                      width={18}
                                      height={18}
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z"
                                        stroke="#8E8E93"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                )}
                              </h3>
                              <div
                                className="icon-box"
                                onClick={() => {
                                  navigate(`/hotelsDetail/${data?._id}`);
                                }}
                              >
                                <div
                                  className="text-address"
                                  style={{
                                    marginBottom: "10px",
                                    color: "#555",
                                  }}
                                >
                                  <IoLocationSharp
                                    style={{ marginRight: "3px" }}
                                  />
                                  {`${data?.address}, ${data?.city}, ${data?.state}`
                                    .length > 40
                                    ? `${data?.address}, ${data?.city}, ${data?.state}`.slice(
                                        0,
                                        40
                                      ) + "..."
                                    : `${data?.address}, ${data?.city}, ${data?.state}`}
                                </div>
                                <div
                                  style={{ marginBottom: "5px" }}
                                  className="money fs-20 fw-8 font-2 text-color-3"
                                >
                                  <Link
                                    style={{
                                      textDecoration: "none",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                      }}
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

                                <div className="fs-16 fw-6 text-color-3">
                                  <Link>
                                    {/* Custom Rating Section */}
                                    <div className="rating">
                                      <span className="rating-stars">
                                        {[...Array(5)].map((_, i) => {
                                          if (i < Math.floor(data.rating)) {
                                            // Filled star
                                            return (
                                              <i
                                                key={i}
                                                className="fas fa-star filled"
                                              />
                                            );
                                          } else if (i < data.rating) {
                                            // Half star
                                            return (
                                              <i
                                                key={i}
                                                className="fas fa-star-half-alt half"
                                              />
                                            );
                                          } else {
                                            // Empty star
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
                                  </Link>
                                </div>
                                {/* Services Section */}
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
                            </div>

                            <div className="img-box flex align-center">
                              <div
                                className="flat-bt-top sc-btn-top"
                                style={{ margin: "auto", width: "48%" }}
                              >
                                <Link
                                  to={`/hotelsDetail/${data?._id}`}
                                  rel="noopener noreferrer"
                                  className="sc-buttonborder mycolor btn-icon"
                                  style={{
                                    color: "black",
                                    border: "1px solid red",
                                    textDecoration: "none",
                                    width: "100%",
                                    textAlign: "center",
                                  }}
                                >
                                  <span> View Details</span>
                                </Link>
                              </div>

                              <div
                                className="flat-bt-top sc-btn-top"
                                style={{ margin: "auto", width: "48%" }}
                              >
                                <Link
                                  to={`/hotelsDetail/${data?._id}`}
                                  style={{
                                    width: "100%",
                                    textAlign: "center",
                                    textDecoration: "none",
                                  }}
                                  className="sc-button btn-icon text-color-1 fw-6"
                                >
                                  Book Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <h2>
                          <img
                            width={100}
                            src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                            alt="No Hotels Found"
                          />
                        </h2>
                        <h3 className="mt-3">No Hotels Found</h3>
                      </div>
                    )}
                  </div>
                </div>

                <Stack
                  spacing={2}
                  style={{ margin: "20px", justifyContent: "center" }}
                >
                  <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>

              <div className="col-lg-4 p-0">
                <aside className="side-bar">
                  <div className="inner-side-bar">
                    <div style={{ border: "none" }} className="widget-rent">
                      <div className="flat-tabs style2">
                        <div className="content-tab">
                          <div className="content-inner tab-content" style={{}}>
                            <div className="form-s2">
                              <h3
                                className="widget-title title-list"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span>Filters</span>

                                <Link
                                  className="clear-all-link"
                                  onClick={clearAllFilters}
                                  style={{
                                    fontSize: "14px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  Clear All
                                </Link>
                              </h3>

                              <div className="wd-find-select ">
                                <div
                                  className="tf-amenities bg-white"
                                  style={{ padding: "0px", boxShadow: "none" }}
                                >
                                  <h4>Hotel Amenities</h4>
                                  <div className="wrap-amenities flex mt-3">
                                    <div
                                      className="box box-1 flex"
                                      style={{
                                        width: "100%",
                                        padding: "0px",
                                        paddingLeft: "20px",
                                      }}
                                    >
                                      <div
                                        className="inner-1"
                                        style={{ width: "100%" }}
                                      >
                                        {amenitiesList.map((amenity) => (
                                          <label key={amenity} className="flex">
                                            <input
                                              type="checkbox"
                                              value={amenity}
                                              checked={selectedAmenities.includes(
                                                amenity
                                              )}
                                              onChange={() =>
                                                handleAmenitySelect(amenity)
                                              }
                                            />
                                            <span className="btn-checkbox" />
                                            <span className="fs-13">
                                              {amenity}
                                            </span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="price-group style-group">
                                  <h4>Price</h4>
                                  <div className="inner flex flex-wrap">
                                    <div className="group-select">
                                      <select
                                        value={minPrice || ""}
                                        onChange={(e) =>
                                          setMinPrice(e.target.value)
                                        }
                                        className="nice-select"
                                      >
                                        <option value="">Min</option>
                                        <option value="500">₹500</option>
                                        <option value="600">₹600</option>
                                        <option value="700">₹700</option>
                                        <option value="800">₹800</option>
                                        <option value="900">₹900</option>
                                        <option value="1000">₹1000</option>
                                        <option value="1100">₹1100</option>
                                        <option value="1200">₹1200</option>
                                        <option value="1300">₹1300</option>
                                        <option value="1400">₹1400</option>
                                      </select>
                                    </div>

                                    <div className="group-select">
                                      <select
                                        value={maxPrice || ""}
                                        onChange={(e) =>
                                          setMaxPrice(e.target.value)
                                        }
                                        className="nice-select"
                                      >
                                        <option value="">Max</option>
                                        <option value="2000">₹2,000</option>
                                        <option value="3000">₹3,500</option>
                                        <option value="4000">₹4,000</option>
                                        <option value="5000">₹5,500</option>
                                        <option value="6000">₹6,000</option>
                                        <option value="7000">₹7,000</option>
                                        <option value="8000">₹8,000</option>
                                        <option value="9000">₹9,000</option>
                                        <option value="10000">₹10,000</option>
                                        <option value="11000">₹11,000</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="sort-group style-group">
                                  <h4>Sort By</h4>
                                  <div className="inner flex flex-wrap">
                                    <div
                                      className="group-select"
                                      style={{ width: "100%" }}
                                    >
                                      <select
                                        value={sortBy || ""}
                                        onChange={(e) =>
                                          setSortBy(e.target.value)
                                        }
                                        className="nice-select"
                                      >
                                        <option value="">
                                          Select Sort Option
                                        </option>
                                        <option value="lowToHigh">
                                          Price: Low to High
                                        </option>
                                        <option value="highToLow">
                                          Price: High to Low
                                        </option>
                                        <option value="popularity">
                                          Popularity
                                        </option>
                                        <option value="guestRatings">
                                          Guest Ratings
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* End Job  Search Form*/}
                            </div>
                          </div>
                        </div>
                      </div>
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

export default HotelList;
