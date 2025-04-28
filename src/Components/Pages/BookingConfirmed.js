import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";

const BookingConfirmed = () => {
  let token = localStorage.getItem("token");
  const [bookingData, setBookingData] = useState("");
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState([]);
  const navigate = useNavigate();
  const componentRef = useRef(null);

  const reactToPrintContent = () => componentRef.current;

  const handlePrint = useReactToPrint({
    documentTitle: "Booking Confirmation",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedReason([]);
    setOpen(false);
  };

  const reasons = [
    "Change in travel plans",
    "Found a better deal",
    "Emergency situation",
    "Flight or train cancellation",
    "Bad hotel reviews",
    "Work-related reasons",
    "Personal reasons",
    "Other",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    getBookingData();
  }, []);

  const getBookingData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/getBookingById`, {
        params: { bookingId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response?.status === 200) {
          setBookingData(response?.data?.booking);
        }
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  };

  const handleCancelBooking = async () => {
    if (!selectedReason) {
      toast.error("Please select a cancellation reason.");
      return;
    }

    const data = {
      bookingId: id,
      reason: selectedReason,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/user/cancelBooking`, // Ensure proper API URL formation
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Booking cancelled successfully!");
        handleClose();
        setTimeout(() => {
          navigate("/bookingHistory");
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error cancelling booking. Please try again."
      );
    }
  };

  return (
    <div style={{ width: "80%", margin: "24px auto" }}>
      <Toaster />
      <div className="center">
        <button
          onClick={() => handlePrint(reactToPrintContent)}
          style={{
            backgroundColor: "#d32f2f",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Print
        </button>
      </div>

      <div ref={componentRef}>
        {/* Confirmation Message */}
        <div
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "800",
              lineHeight: "1.5",
              color: "#1ab64f",
              marginBottom: "8px",
            }}
          >
            Great! Your stay is confirmed.
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#222",
              fontWeight: "600",
            }}
          >
            You will soon receive an email confirmation on{" "}
            <span style={{ fontWeight: "700", color: "#1a73e8" }}>
              {bookingData?.user?.userEmail}
            </span>
          </div>
        </div>

        {/* Booking Details Card */}
        <div
          style={{
            padding: "26px 16px",
            backgroundColor: "#fff",
            boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #d6d6d6",
            borderRadius: "8px",
            marginTop: "24px",
          }}
        >
          <div>
            <p>
              <strong>Booking ID:</strong>{" "}
              <span style={{ color: "#1a73e8" }}>{bookingData?.bookingId}</span>
            </p>
            <p>
              Booked by {bookingData?.user?.name} on{" "}
              {new Date(bookingData?.checkInDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div
            style={{ border: "1px solid #d6d6d6", margin: "24px 0px" }}
          ></div>

          {/* Hotel Details Section */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "24px",
              padding: "20px",
              backgroundColor: "#fff",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flex: "2",
                paddingRight: "20px",
                minWidth: "250px",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "black", // Updated color to black
                  lineHeight: "30px",
                }}
              >
                {bookingData?.hotel?.name}
              </h2>

              <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
                {bookingData?.hotel?.address}
              </p>
              <p style={{ fontSize: "14px", color: "#444", marginTop: "10px" }}>
                <strong style={{ color: "red" }}>City:</strong>{" "}
                <span style={{ color: "black" }}>
                  {bookingData?.hotel?.city}
                </span>
              </p>
            </div>
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                minWidth: "250px",
              }}
            >
              <img
                src="https://images.oyoroomscdn.com/uploads/hotel_image/47524/medium/wuaxijxwmbxe.jpg"
                alt="Hotel"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div
            style={{
              border: "1px solid #d6d6d6",
              margin: "24px 0px",
            }}
          ></div>

          <div
            style={{ border: "1px solid #d6d6d6", margin: "24px 0px" }}
          ></div>

          {/* Guest Booking Details */}
          <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
            <h4 style={{ color: "red" }} className="mb-4 border-bottom pb-2">
              Guest & Booking Details
            </h4>

            <div className="row g-4">
              {/* Primary Guest Details */}
              <div className="col-md-4 col-6">
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Primary Guest
                  </small>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {bookingData?.user?.name}
                  </span>
                </div>
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Mobile Number
                  </small>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {bookingData?.user?.phone}
                  </span>
                </div>
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Email Address
                  </small>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {bookingData?.user?.userEmail}
                  </span>
                </div>
              </div>

              {/* Check-in & Stay Details */}
              <div className="col-md-4 col-6">
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Check In
                  </small>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {new Date(bookingData?.checkInDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Check Out
                  </small>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {new Date(bookingData?.checkOutDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Stay Duration
                  </small>
                  <span className="badge bg-danger text-white fw-semibold">
                    1 Night
                  </span>
                </div>
              </div>

              {/* Guest & Room Details */}
              <div className="col-md-4 col-6">
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Guests
                  </small>
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    {bookingData?.adults + bookingData?.children} Guest
                  </span>
                </div>
                <div className="mb-4">
                  <small style={{ color: "red" }} className="d-block">
                    Room
                  </small>
                  <span className="badge bg-dark text-danger fw-semibold">
                    {bookingData?.room}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Room Type Container */}
          {bookingData?.matchedRoomType && (
            <div className="container mt-4 p-4 bg-white rounded-3 shadow-sm">
              <h4 style={{ color: "red" }} className="mb-4 border-bottom pb-2">
                Room Details
              </h4>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <small style={{ color: "red" }} className="d-block">
                      Type
                    </small>
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {bookingData.matchedRoomType.type}
                    </span>
                  </div>
                  <div className="mb-3">
                    <small style={{ color: "red" }} className="d-block">
                      Size
                    </small>
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {bookingData.matchedRoomType.size} m²
                    </span>
                  </div>

                  <div className="mb-3">
                    <small style={{ color: "red" }} className="d-block">
                      Smoking Allowed
                    </small>
                    <span
                      className={`badge ${
                        bookingData.matchedRoomType.smokingAllowed
                          ? "bg-success"
                          : "bg-dark text-danger"
                      } fw-semibold`}
                    >
                      {bookingData.matchedRoomType.smokingAllowed
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <small style={{ color: "red" }} className="d-block">
                      Bed Type
                    </small>
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {bookingData.matchedRoomType.bedType}
                    </span>
                  </div>
                  <div className="mb-3">
                    <small style={{ color: "red" }} className="d-block">
                      Capacity
                    </small>
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      {bookingData.matchedRoomType.capacity} Person
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {bookingData.matchedRoomType.description && (
                <div className="mt-4">
                  <h6 style={{ color: "red" }} className="mb-2">
                    Description
                  </h6>
                  <p style={{ color: "black" }}>
                    {bookingData.matchedRoomType.description}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {bookingData.matchedRoomType.typeAmenities?.length > 0 && (
                <div className="mt-4">
                  <h6 style={{ color: "red" }} className="mb-2">
                    Amenities
                  </h6>
                  <ul className="list-unstyled d-flex flex-wrap gap-2">
                    {bookingData.matchedRoomType.typeAmenities.map(
                      (amenity, index) => (
                        <li
                          key={index}
                          className="badge bg-light fw-normal p-2 border"
                          style={{ color: "black", borderColor: "red" }}
                        >
                          {amenity}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div
            style={{ border: "1px solid #d6d6d6", margin: "24px 0px" }}
          ></div>

          {/* Payment Details Section */}
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              backgroundColor: "#fff",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              Payment Details
            </h2>

            {/* Pending Amount */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
                borderBottom: "1px solid #d6d6d6",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontSize: "16px", fontWeight: "600", color: "#444" }}
              >
                Pending amount to be paid
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#d32f2f",
                }}
              >
                ₹{bookingData?.totalPrice}
              </span>
            </div>

            {/* Payment Method Details in Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#777",
                  margin: "0",
                  flex: "1",
                  minWidth: "250px",
                }}
              >
                Your payment option is <strong>"Pay At Hotel"</strong>. You will
                receive a call from us closer to the check-in date to confirm
                your arrival. In case of no response, the booking may be
                cancelled.
              </p>

              {/* Pay Now Button */}
              {bookingData?.status === "cancelled" ? (
                <span
                  style={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "800",
                    display: "inline-flex",
                    alignItems: "center",
                    minWidth: "120px",
                    justifyContent: "center",
                  }}
                >
                  Already Cancelled
                </span>
              ) : (
                <button
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    minWidth: "120px",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  Pay Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="chevron"
                    viewBox="0 0 8 14"
                    width="12"
                    height="12"
                    style={{ marginLeft: "5px" }}
                  >
                    <path
                      d="M.68-.04c.173 0 .346.066.48.2L8 7l-6.84 6.84a.677.677 0 01-.96 0 .677.677 0 010-.96L6.08 7 .2 1.12a.675.675 0 010-.96c.13-.134.305-.2.48-.2z"
                      fill="#fff"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div
            style={{ border: "1px solid #d6d6d6", margin: "24px 0px" }}
          ></div>

         
        </div>
      </div>

       <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "24px",
              padding: "20px",
              backgroundColor: "#fff",
              gap: "20px",
            }}
          >
            {/* Things to Know */}
            <div style={{ flex: "1", minWidth: "250px" }}>
              <h3>Things to Know</h3>
              <ul>{/* Add list items here */}</ul>
            </div>

            {/* Support & Cancellation */}
            <div
              style={{
                flex: "1",
                textAlign: "right",
                minWidth: "250px",
              }}
            >
              <p>
                <strong>Something not right?</strong>{" "}
                <a
                  target="_blank"
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(
                    "Hello, I want to book a room for 2024-02-24 with ID AT669537"
                  )}`}
                  style={{ color: "#1a73e8", textDecoration: "none" }}
                >
                  Chat with us
                </a>{" "}
                for help.
              </p>
              <p
                style={{
                  color: "#d32f2f",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              >
                Cancel Booking
              </p>
              <p>
                <Link
                  to="/termsAndCondition"
                  style={{ color: "#1a73e8", textDecoration: "none" }}
                >
                  Read Bookmipg Terms and Conditions
                </Link>
              </p>
            </div>
          </div>
      <Dialog
        style={{ height: "80%", top: "100px" }}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          style={{ fontWeight: "700" }}
          className="text-xl font-semibold text-gray-800"
        >
          Cancel Booking
        </DialogTitle>
        <DialogContent className="p-6 overflow-y-auto custom-scrollbar">
          <FormControl component="fieldset" className="w-full">
            <RadioGroup
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="space-y-3"
            >
              {reasons.map((reason) => (
                <motion.div
                  key={reason}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg bg-gray-100 p-3 transition-all"
                >
                  <FormControlLabel
                    value={reason}
                    control={<Radio color="primary" />}
                    label={<span className="text-gray-700">{reason}</span>}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions className="p-4 border-t">
          <Button
            onClick={handleClose}
            color="secondary"
            className="text-gray-600 hover:text-gray-900 transition-all"
          >
            Close
          </Button>
          <Button
            onClick={handleCancelBooking}
            style={{ backgroundColor: "red", fontWeight: "700" }}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookingConfirmed;
