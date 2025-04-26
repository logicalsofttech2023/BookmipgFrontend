import React from "react";
import { useState } from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import { DateRangePicker } from "rsuite";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [latLong, setLatLong] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selectedDates, setSelectedDates] = useState([]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatLong({ lat, lon });
        setSearchTerm(`📍 ${lat}, ${lon}`);

        navigate(`/hotelList?latitude=${lat}&longitude=${lon}`);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.error("Error getting location:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out. Try again.");
            break;
          default:
            alert("An unknown error occurred.");
        }
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/hotelList?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}`,
      {
        state: {
          selectedDatesLocation: selectedDates,
        },
      }
    );
  };
  return (
    <section className="slider home2 bg-1">
      <div className="slider-item">
        <div className="container6 relative">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="content po-content-two mt-4"
                style={{ padding: "10px 0px 100px 0px" }}
              >
                <div
                  style={{ marginBottom: 10 }}
                  className="heading center mt-3"
                >
                  <h2
                    className="text-color- fw-7 "
                    style={{
                      fontSize: "30px",
                      lineHeight: "38px",
                      color: "#fff",
                      marginBottom: 10,
                    }}
                  >
                    BookmiPG
                  </h2>
                  <h2
                    className="text-color- fw-7"
                    style={{
                      fontSize: "38px",
                      lineHeight: "38px",
                      color: "#fff",
                      marginBottom: 24,
                    }}
                  >
                    Over 174,000+ hotels and homes across 35+ countries
                  </h2>
                </div>

                <div
                  className=" content-inner tab-content flex-center"
                  style={{}}
                >
                  <div
                    className="form-sl"
                    style={{
                      background: "#00000080",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      className=" content-inner tab-content flex-center home-slider-box"
                      style={{ top: "-67px" }}
                    ></div>
                    <form onSubmit={handleSearch}>
                      <div className="wd-find-select flex">
                        <div className="wrap-icon flex align-center justify-center link-style-3">
                          <div
                            className="skude form-group-1 search-form form-style"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                              margin: "0px",
                            }}
                          >
                            {/* Search Input Field */}
                            <input
                              type="search"
                              className="search-field skude"
                              placeholder="Search location..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.valu)}
                              style={{
                                width: "380px",
                                padding: "10px",
                                borderRadius: "0px",
                                borderTopLeftRadius: "5px",
                                borderBottomLeftRadius: "5px",
                                boxSizing: "border-box",
                                lineHeight: "27px",
                                border: "1px solid #ccc",
                                outline: "none",
                              }}
                            />

                            {/* Location Icon */}
                            <button
                              onClick={getCurrentLocation}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderLeft: "none",
                                background: "#f8f8f8",
                                cursor: "pointer",
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                                height: "49px",
                                color: "black",
                                width: "120px",
                                fontSize: "12px",
                              }}
                              disabled={loading}
                            >
                              <FaMapMarkerAlt color="red" />
                              <span style={{ width: "50px" }}>
                                {loading ? "Locating..." : "Near me"}
                              </span>
                            </button>
                          </div>

                          <div style={{ width: "100%" }}>
                            <DateRangePicker
                              showOneCalendar
                              onChange={setSelectedDates}
                              value={selectedDates}
                            />
                          </div>
                          <button
                            type="submit"
                            className="sc-button skude"
                            style={{ borderStyle: "none", height: "52px", width: "50%" }}
                          >
                            <div type="submit" class="button-search sc-btn-top">
                              <CiSearch style={{ margin: "0px" }} /> Search Now
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
