import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import TextField from "@mui/material/TextField";
import { Button, InputAdornment } from "@mui/material";
import { DateRangePicker } from "rsuite";

const PropertyListSidebar = () => {
  const [count, setCount] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [hotel, setHotels] = useState([]);
  const navigate = useNavigate();

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
  } = {}) => {
    try {
      const queryParams = new URLSearchParams({
        search,
        page,
        limit,
        ...(hotelId && { hotelId }),
        ...(city && { city }),
        ...(state && { state }),
        ...(country && { country }),
        ...(zipCode && { zipCode }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      });

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getAllHotelsByFilter?${queryParams}`
      );

      if (response.status === 200) {
        setCount(response.data.hotels.length);
        let hotels = response.data.hotels;

        // If search is not empty, sort results to show matches first
        if (search.trim()) {
          hotels = hotels.sort((a, b) => {
            const aMatch = a.name.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
            const bMatch = b.name.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
            return bMatch - aMatch;
          });
        }

        setHotels(hotels);
      }
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Fetch filtered results if search term exists, otherwise fetch all hotels
    fetchHotel({ search: value });
  };

  return (
    <>
      <div>
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
                                placeholder="Search by Building name, Locality, City"
                                required
                              />
                            </div>

                            {/* Date Picker */}
                            <div style={{ flex: 1 }}>
                              <DateRangePicker
                                style={{ height: "100%", width: "100%" }}
                                showOneCalendar
                              />
                            </div>

                            {/* Search Button */}
                            <div
                              style={{ flex: 1, margin: "0px" }}
                              className="form-group-1 search-form form-style relative flex align-center"
                            >
                              <Button
                                type="submit"
                                style={{
                                  color: "red",
                                  borderColor: "red",
                                  width: "100%",
                                  height: "100%",
                                }}
                                variant="outlined"
                              >
                                Search
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
                    Hotel in india ({count})
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
                      height: "1150px",
                      overflowX: "hidden",
                      scrollbarWidth: "none",
                    }}
                  >
                    {hotel?.length > 0 ? (
                      hotel?.map((data) => {
                        return (
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
                                <h3 className="link-style-1">
                                  <Link
                                    className="text-capitalize"
                                    to={`/hotelsDetail/${data?._id}`}
                                  >
                                    {data?.name}
                                  </Link>
                                </h3>
                                <div className="icon-box">
                                  <div className="icons icon-1 flex">
                                    <span>
                                      {data?.address} in {data?.city}
                                    </span>
                                  </div>
                                  <div className="money fs-20 fw-8 font-2 text-color-3">
                                    <Link to={`/hotelsDetail/${data?._id}`}>
                                      ₹{data?.pricePerNight}
                                    </Link>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        color: "#6d787d",
                                        textDecoration: "line-through",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      ₹6389
                                    </span>
                                  </div>

                                  <div className="fs-16 fw-6 text-color-3">
                                    <Link>
                                      {/* Custom Rating Section */}
                                      <div className="rating">
                                        <span className="rating-stars">
                                          {/* Display stars for 4.9 */}
                                          {[...Array(5)].map((_, i) => (
                                            <i
                                              key={i}
                                              className={`fas fa-star ${
                                                i < 4
                                                  ? "filled"
                                                  : i < 4.9
                                                  ? "half"
                                                  : ""
                                              }`}
                                            />
                                          ))}
                                        </span>
                                        <span className="rating-value">
                                          {data?.rating}
                                        </span>
                                      </div>
                                    </Link>
                                  </div>
                                  {/* Services Section */}
                                  <div className="services">
                                    <ul className="service-list">
                                      {data?.amenities?.map(
                                        (amenity, index) => (
                                          <li key={index}>
                                            <i
                                              className="fas fa-check"
                                              style={{
                                                color: "green",
                                                marginRight: "5px",
                                              }}
                                            ></i>
                                            {amenity}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div className="text-address mt-3">
                                    <p className="p-12">
                                      {data?.description?.slice(0, 100)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="img-box flex align-center">
                                <div className="flat-bt-top sc-btn-top">
                                  <Link
                                    to={`/hotelsDetail/${data?._id}`}
                                    rel="noopener noreferrer"
                                    className="sc-buttonborder mycolor btn-icon"
                                  >
                                    <span> View Details</span>
                                  </Link>
                                </div>

                                <div
                                  className="flat-bt-top sc-btn-top"
                                  style={{ marginLeft: "5%" }}
                                >
                                  <a className="sc-button btn-icon">
                                    <span>Book Now</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
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
                                <a
                                  href="#"
                                  className="clear-all-link"
                                  onClick={""} // Define the function to clear all filters
                                  style={{
                                    fontSize: "14px",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  Clear All
                                </a>
                              </h3>

                              <form method="post">
                                <div className="wd-find-select ">
                                  <div className="form-group-2 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Collections
                                        </span>
                                        <ul className="list style">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Choose
                                          </li>
                                          <li
                                            data-value="apartment"
                                            className="option"
                                          >
                                            Standard Room
                                          </li>
                                          <li
                                            data-value="house"
                                            className="option"
                                          >
                                            Suite
                                          </li>
                                          <li
                                            data-value="rent"
                                            className="option"
                                          >
                                            Luxury Suite
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group-3 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Categories
                                        </span>
                                        <ul className="list">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Categories
                                          </li>
                                          <li
                                            data-value="Japan"
                                            className="option"
                                          >
                                            New York
                                          </li>
                                          <li
                                            data-value="America"
                                            className="option"
                                          >
                                            Los Angeles
                                          </li>
                                          <li
                                            data-value="England"
                                            className="option"
                                          >
                                            London
                                          </li>
                                          <li
                                            data-value="Japan"
                                            className="option"
                                          >
                                            Paris
                                          </li>
                                          <li
                                            data-value="England"
                                            className="option"
                                          >
                                            Berlin
                                          </li>
                                          <li
                                            data-value="VietNam"
                                            className="option"
                                          >
                                            Sydney
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group-4 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Accommodation Type
                                        </span>
                                        <ul className="list">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Baths
                                          </li>
                                          <li
                                            data-value="floating"
                                            className="option"
                                          >
                                            Floating baths
                                          </li>
                                          <li
                                            data-value="massage"
                                            className="option"
                                          >
                                            Massage baths
                                          </li>
                                          <li
                                            data-value="floor-standing"
                                            className="option"
                                          >
                                            Floor-standing bath
                                          </li>
                                          <li
                                            data-value="built-in"
                                            className="option"
                                          >
                                            Built-in baths
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group-5 form-style2">
                                    <div className="group-select">
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current">
                                          Hotel Facilities
                                        </span>
                                        <ul className="list">
                                          <li
                                            data-value
                                            className="option selected"
                                          >
                                            Beds
                                          </li>
                                          <li
                                            data-value="twin"
                                            className="option"
                                          >
                                            Twin beds
                                          </li>
                                          <li
                                            data-value="bunk"
                                            className="option"
                                          >
                                            Bunk beds
                                          </li>
                                          <li
                                            data-value="kids"
                                            className="option"
                                          >
                                            Kids beds
                                          </li>
                                          <li
                                            data-value="single"
                                            className="option"
                                          >
                                            Single bed
                                          </li>
                                          <li
                                            data-value="queen"
                                            className="option"
                                          >
                                            Queen size bed
                                          </li>
                                          <li
                                            data-value="king"
                                            className="option"
                                          >
                                            King size bed
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="price-group style-group">
                                    <h4>Price</h4>
                                    <div className="inner flex flex-wrap">
                                      <div className="group-select">
                                        <div
                                          className="nice-select"
                                          tabIndex={0}
                                        >
                                          <span className="current">Min</span>
                                          <ul className="list">
                                            <li
                                              data-value
                                              className="option selected"
                                            >
                                              Min
                                            </li>
                                            <li
                                              data-value={0}
                                              className="option"
                                            >
                                              $0
                                            </li>
                                            <li
                                              data-value={50}
                                              className="option"
                                            >
                                              $50
                                            </li>
                                            <li
                                              data-value={100}
                                              className="option"
                                            >
                                              $100
                                            </li>
                                            <li
                                              data-value={200}
                                              className="option"
                                            >
                                              $200
                                            </li>
                                            <li
                                              data-value={300}
                                              className="option"
                                            >
                                              $300
                                            </li>
                                            <li
                                              data-value={500}
                                              className="option"
                                            >
                                              $500
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="group-select">
                                        <div
                                          className="nice-select"
                                          tabIndex={0}
                                        >
                                          <span className="current">Max</span>
                                          <ul className="list">
                                            <li
                                              data-value
                                              className="option selected"
                                            >
                                              Max
                                            </li>
                                            <li
                                              data-value={1000}
                                              className="option"
                                            >
                                              $1,000
                                            </li>
                                            <li
                                              data-value={1500}
                                              className="option"
                                            >
                                              $1,500
                                            </li>
                                            <li
                                              data-value={2000}
                                              className="option"
                                            >
                                              $2,000
                                            </li>
                                            <li
                                              data-value={2500}
                                              className="option"
                                            >
                                              $2,500
                                            </li>
                                            <li
                                              data-value={3000}
                                              className="option"
                                            >
                                              $3,000
                                            </li>
                                            <li
                                              data-value={5000}
                                              className="option"
                                            >
                                              $5,000
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="button-search sc-btn-top center">
                                    <a className="sc-button" href="#">
                                      <span>Search Now</span>
                                      <i className="far fa-search text-color-1" />
                                    </a>
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
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PropertyListSidebar;
