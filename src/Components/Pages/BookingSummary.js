import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const BookingSummary = () => {
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("payOnline");
  let token = localStorage.getItem("token");
  let { id } = useParams();
  const location = useLocation();
  const {
    selectedDates,
    totalSavings,
    finalPrice,
    discountAmount,
    originalPricePerNight,
    discountedPricePerNight,
    taxesAmount,
    couponCode,
    selectedGuests,
    selectedRooms,
    couponId,
  } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserData();
    fetchHotel();
  }, []);

  const getUserData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/auth/getUserById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response?.status === 200) {
          setPhoneNumber(response?.data?.data?.phone);
          setCountryCode(response?.data?.data?.countryCode);
          setName(response?.data?.data?.name);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const fetchHotel = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getHotelById`,
        {
          params: { hotelId: id },
        }
      );
      console.log("Hotel Data:", res);
      setHotelData(res?.data?.hotel);
    } catch (error) {
      console.error("Error fetching hotel:", error.response?.data || error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const handleBooking = async () => {
    if (!name || !phoneNumber || !countryCode) {
      alert("Please fill all details!");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      const formattedCheckInDate = new Date(selectedDates[0])
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(selectedDates[1])
        .toISOString()
        .split("T")[0];

      const bookingData = {
        hotelId: id,
        couponId,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        room: selectedRooms.toString(),
        adults: selectedGuests.adults,
        children: selectedGuests.children,
        totalPrice: finalPrice,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}api/user/bookHotel`,
          bookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("Booking Successful!");
          navigate(`/bookingConfirmed/${response?.data?.booking?._id}`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <>
      <div>
        <Toaster />
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
                    <span>Booking Summary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" flat-property flat-property-list flat-properties-rent tf-section2 wg-dream style">
          <div className="container6">
            <div className="row flex">
              <div className="col-lg-7" style={{ backgroundColor: "#F7F7F7" }}>
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
                    <div className="box box-dream hv-one">
                      <div
                        style={{
                          borderRadius: "4px",
                          border: "1px solid rgba(245, 166, 35, 0.19)",
                          backgroundColor: "rgb(254, 246, 233)",
                          padding: "16px",
                          color: "rgb(211, 140, 23)",
                          fontSize: "16px",
                          textAlign: "center",
                          marginBottom: "16px",
                          width: "100%",
                        }}
                      >
                        <span>
                          <span role="img" aria-label="discount">
                            🎉
                          </span>{" "}
                          <span>
                            Yay! You just saved ₹1789 on this booking!
                          </span>
                        </span>
                      </div>

                      <div
                        style={{
                          border: "1px solid rgba(122, 122, 122, 0.17)",
                          borderRadius: "4px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "14px 24px",
                              color: "rgb(0, 0, 0)",
                              background: "rgb(249, 249, 251)",
                              fontSize: "20px",
                              fontWeight: "bold",
                              lineHeight: "1.6",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "rgb(255, 255, 255)",
                                padding: "0px 7px",
                                borderRadius: "4px",
                                marginRight: "12px",
                                background: "rgb(0, 0, 0)",
                              }}
                            >
                              1
                            </div>
                            <div>
                              <span>Enter your details</span>
                            </div>
                          </div>
                          <div
                            style={{
                              textAlign: "left",
                              padding: "0px 24px 24px",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  textAlign: "center",
                                  fontSize: "14px",
                                  lineHeight: "1.7",
                                  margin: "24px 0px",
                                }}
                              >
                                <span>
                                  We will use these details to share your
                                  booking information
                                </span>
                              </div>

                              {/* Full Name Field */}
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  margin: "14px 0",
                                }}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      margin: "0 0 9px",
                                      fontWeight: "600",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span>Full Name</span>
                                  </div>
                                  <input
                                    className="textInput__input"
                                    id="name"
                                    required
                                    type="text"
                                    placeholder="Enter Name"
                                    maxLength="50"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    style={{
                                      width: "100%",
                                      padding: "10px",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Mobile Number Field */}
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  margin: "14px 0",
                                }}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      margin: "0 0 9px",
                                      fontWeight: "600",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span>Mobile Number</span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <select
                                      value={countryCode}
                                      onChange={(e) =>
                                        setCountryCode(e.target.value)
                                      }
                                      style={{
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        background: "#fff",
                                        marginRight: "8px",
                                      }}
                                    >
                                      <option value="+91">+91 (India)</option>
                                      <option value="+1">+1 (USA)</option>
                                      <option value="+44">+44 (UK)</option>
                                      <option value="+61">
                                        +61 (Australia)
                                      </option>
                                      <option value="+971">+971 (UAE)</option>
                                    </select>
                                    <input
                                      className="textInput__input"
                                      id="phone"
                                      required
                                      type="tel"
                                      placeholder="Enter phone number"
                                      maxLength="10"
                                      value={phoneNumber}
                                      onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Payment Options */}
                              <div style={{ margin: "20px 0" }}>
                                <h3
                                  style={{
                                    marginBottom: "10px",
                                    fontSize: "18px",
                                  }}
                                >
                                  Select Payment Method:
                                </h3>
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="payOnline"
                                    checked={paymentMethod === "payOnline"}
                                    onChange={() =>
                                      setPaymentMethod("payOnline")
                                    }
                                    style={{ marginRight: "8px" }}
                                  />
                                  Pay Online
                                </label>
                                <label
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="payAtHotel"
                                    checked={paymentMethod === "payAtHotel"}
                                    onChange={() =>
                                      setPaymentMethod("payAtHotel")
                                    }
                                    style={{ marginRight: "8px" }}
                                  />
                                  Pay at Hotel
                                </label>
                              </div>

                              {/* Pay Button */}
                              <div
                                style={{
                                  position: "relative",
                                  textAlign: "center",
                                }}
                              >
                                {loading && (
                                  <div
                                    style={{
                                      position: "fixed",
                                      top: 0,
                                      left: 0,
                                      width: "100vw",
                                      height: "100vh",
                                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      zIndex: 9999,
                                      color: "#ffffff",
                                      fontSize: "20px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <ClipLoader color="#ffffff" size={80} />
                                    <p style={{ marginTop: "20px" }}>
                                      Your Room booking is in progress...
                                    </p>
                                  </div>
                                )}
                                <button
                                  type="button"
                                  style={{
                                    display: "block",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "10px auto",
                                    fontFamily: "Inter",
                                    borderRadius: "4px",
                                    backgroundColor: "rgb(26, 182, 79)",
                                    border: "0px",
                                    color: "rgb(255, 255, 255)",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    lineHeight: "1.2",
                                    padding: "14px",
                                    width: "auto",
                                    height: "auto",
                                    flex: "1 1 50%",
                                    cursor: "pointer",
                                    outline: "0px",
                                    position: "relative",
                                  }}
                                  onClick={handleBooking}
                                  disabled={loading}
                                >
                                  {loading
                                    ? "Processing..."
                                    : "Confirm Booking"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 p-0">
                <aside className="side-bar">
                  <div className="inner-side-bar">
                    <div style={{ border: "none" }} className="widget-rent">
                      <div className="flat-tabs style2">
                        <div className="content-tab">
                          <div className="content-inner tab-content" style={{}}>
                            <div className="form-s2">
                              <div
                                style={{
                                  border: "1px solid #ddd",
                                  borderRadius: "10px",
                                  padding: "15px",
                                  maxWidth: "400px",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                <div>
                                  <h2
                                    style={{
                                      margin: "0",
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    {hotelData?.name}
                                  </h2>
                                  <p style={{ margin: "5px 0", color: "gray" }}>
                                    {hotelData?.address}
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: "#28a745",
                                      }}
                                    >
                                      4.1
                                    </span>
                                    <span
                                      style={{
                                        marginLeft: "5px",
                                        fontSize: "14px",
                                        color: "gray",
                                      }}
                                    >
                                      ({hotelData?.rating} Ratings) · Very Good
                                    </span>
                                  </div>
                                </div>
                                <div style={{ margin: "10px 0" }}>
                                  {hotelData?.images?.length > 0 ? (
                                    <img
                                      src={`${process.env.REACT_APP_BASE_URL}${hotelData.images[0]}`}
                                      alt="Hotel"
                                      style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                      }}
                                      onError={(e) => {
                                        e.target.src =
                                          "https://images.oyoroomscdn.com/uploads/hotel_image/270267/large/nxouyscyyqrv.jpg"; // Provide a fallback image path here
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src="https://images.oyoroomscdn.com/uploads/hotel_image/270267/large/nxouyscyyqrv.jpg" // Provide a default image here
                                      alt="Fallback"
                                      style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                      }}
                                    />
                                  )}
                                </div>

                                <div
                                  style={{
                                    padding: "20px",
                                    maxWidth: "400px",
                                    margin: "auto",
                                  }}
                                >
                                  {/* Check-in - Check-out Details */}
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontSize: "14px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <span>
                                      {selectedDates &&
                                      selectedDates[0] &&
                                      selectedDates[1]
                                        ? `${formatDate(
                                            selectedDates[0]
                                          )} – ${formatDate(selectedDates[1])}`
                                        : "Check-in - Check-out"}
                                    </span>
                                    <span>
                                      {selectedRooms || 1} Room
                                      {selectedRooms > 1 ? "s" : ""},
                                      {selectedGuests?.adults || 1} Adult
                                      {selectedGuests?.adults > 1 ? "s" : ""}
                                      {selectedGuests?.children
                                        ? `, ${selectedGuests.children} Child${
                                            selectedGuests.children > 1
                                              ? "ren"
                                              : ""
                                          }`
                                        : ""}
                                    </span>
                                  </div>

                                  {/* Room Details */}

                                  {/* Pricing Details */}
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <div>
                                      <h5
                                        style={{
                                          margin: "10px 0",
                                          color: "#d32f2f",
                                        }}
                                      >
                                        Payable Amount:
                                      </h5>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                      <h3
                                        style={{
                                          color: "rgb(211, 47, 47)",
                                          fontWeight: "600",
                                        }}
                                      >
                                        ₹{finalPrice}
                                      </h3>
                                      <div
                                        style={{
                                          fontSize: "12px",
                                          color: "#666",
                                          marginTop: "-5px",
                                        }}
                                      >
                                        Includes all taxes and fees
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
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

export default BookingSummary;
