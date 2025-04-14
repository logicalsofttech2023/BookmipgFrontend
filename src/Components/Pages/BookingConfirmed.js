import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BookingConfirmed = () => {
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("booking_confirmation.pdf");
    });
  };
  return (
    <div style={{ paddingTop: "70px", width: "80%", margin: "24px auto" }}>
        <div className="center" >
        <button
        onClick={handleDownloadPDF}
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
        
      <div ref={pdfRef}>
      
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
              rodawar2019@gmail.com
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
              <span style={{ color: "#1a73e8" }}>AT669537</span>
            </p>
            <p>Booked by Roopsingh on Mon, 24 Feb 2025</p>
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
            }}
          >
            <div style={{ flex: "2", paddingRight: "20px" }}>
              <h2
                style={{ fontSize: "22px", fontWeight: "bold", color: "#333", lineHeight: "30px" }}
              >
                Hotel O New Delhi Railway Station formerly Le Alfanso
              </h2>
              <p style={{ fontSize: "16px", color: "#555", marginTop: "10px" }}>Le Alfanso</p>
              <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
                4/4, DB Gupta Road, Near Boi Arya Nagar, Paharganj, Near Railway
                Station, Delhi
              </p>
              <p style={{ fontSize: "14px", color: "#444", marginTop: "10px" }}>
                <strong>Landmark:</strong> New Delhi Railway
              </p>
            </div>
            <div
              style={{ flex: "1", display: "flex", justifyContent: "center" }}
            >
              <img
                src="https://images.oyoroomscdn.com/uploads/hotel_image/47524/medium/wuaxijxwmbxe.jpg"
                alt="Hotel"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div
            style={{ border: "1px solid #d6d6d6", margin: "24px 0px" }}
          ></div>

          {/* Guest & Stay Details Section */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "24px",
              padding: "20px",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ flex: "2", paddingRight: "20px" }}>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Primary Guest:
                </strong>
                Roopsingh
              </p>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Mobile Number:
                </strong>
                7224959699
              </p>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Email Address:
                </strong>
                rodawar2019@gmail.com
              </p>
            </div>

            <div style={{ flex: "2" }}>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Check In:
                </strong>
                24 Feb 2025, 12:00 PM
              </p>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Check Out:
                </strong>
                25 Feb 2025, 11:00 AM
              </p>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Stay Duration:
                </strong>
                1 Night
              </p>
            </div>

            <div style={{ flex: "1" }}>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Guests:
                </strong>
                1 Guest
              </p>
              <p style={{ lineHeight: "30px" }}>
                <strong style={{ color: "rgb(51, 51, 51)", display: "block" }}>
                  Room Type:
                </strong>
                Deluxe
              </p>
            </div>
          </div>

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
                padding: "10px",
                borderBottom: "1px solid #d6d6d6",
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
                ₹1078
              </span>
            </div>

            {/* Payment Method Details in Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#777",
                  margin: "0",
                  flex: "1",
                }}
              >
                Your payment option is <strong>"Pay At Hotel"</strong>. You will
                receive a call from us closer to the check-in date to confirm
                your arrival. In case of no response, the booking may be
                cancelled.
              </p>

              {/* Pay Now Button */}
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
                  marginLeft: "15px",
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
            </div>
          </div>

          <div
            style={{ border: "1px solid #d6d6d6", margin: "24px 0px" }}
          ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
              padding: "20px",
              backgroundColor: "#fff",
            }}
          >
            {/* Things to Know */}
            <div style={{ flex: "1" }}>
              <h3>Things to Know</h3>
              <ul>{/* Add list items here */}</ul>
            </div>

            {/* Support & Cancellation */}
            <div style={{ flex: "1", textAlign: "right" }}>
              <p>
                <strong>Something not right?</strong>{" "}
                <a
                  href="/yo/?checkIn=2025-02-24&id=AT669537&phone=7224959699"
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
              >
                Cancel Booking
              </p>
              <p>
                <a
                  href="/terms/"
                  style={{ color: "#1a73e8", textDecoration: "none" }}
                >
                  Read OYO's Terms and Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
