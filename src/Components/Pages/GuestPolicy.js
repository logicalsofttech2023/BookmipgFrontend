import React, { useEffect } from "react";

const GuestPolicy = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <section class="flat-title ">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="title-inner style">
                <div class="title-group fs-12">
                  <a class="home fw-6 text-color-3" href="index.html">
                    Home
                  </a>
                  <span>Guest Policies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="policy__container">
        <div className="policy__termtabswrap">
          <h5
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Guest Policies for BookMIPG Hotels and Homes in India.
          </h5>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "1180px",
            minWidth: "310px",
            margin: "20px auto",
            borderRadius: "8px",
            
            padding: "30px",
            backgroundColor: "#fff",
            lineHeight: "1.6",
          }}
        >
          <div>
            <div
              className="policy__hero"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h1
                style={{
                  margin: "0",
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                General Booking Policy:
              </h1>
              <span
                style={{ fontSize: "14px", fontWeight: "600", color: "#555" }}
              >
                Last updated: 27/02/2025
              </span>
            </div>

            <div className="policy__section">
              <p
                className="text-1 text-color-2"
                style={{
                  fontSize: "16px",
                  color: "#444",
                  textAlign: "justify",
                  marginBottom: "15px",
                  fontFamily: `"Poppins", sans-serif`
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>

            <div className="policy__section">
              <p
                className="text-1 text-color-2"
                style={{
                  fontSize: "16px",
                  color: "#444",
                  textAlign: "justify",
                  marginBottom: "15px",
                  fontFamily: `"Poppins", sans-serif`
                }}
              >
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>

            <div className="policy__section">
              <p
                className="text-1 text-color-2"
                style={{
                  fontSize: "16px",
                  color: "#444",
                  textAlign: "justify",
                  marginBottom: "15px",
                  fontFamily: `"Poppins", sans-serif`
                }}
              >
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPolicy;
