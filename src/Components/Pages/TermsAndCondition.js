import axios from "axios";
import React, { useEffect, useState } from "react";

const TermsAndCondition = () => {
  const [termsData, setTermsData] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    window.scrollTo(0, 0);
    getTermsData();
  }, []);

  const getTermsData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/user/getAllPolicy?type=terms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res?.data?.policy);
        setTermsData(res?.data?.policy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                  <span>Terms And Condition</span>
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
            BookMIPG Rooms Terms And Condition
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
                Terms And Condition:
              </h1>
              <span
                style={{ fontSize: "14px", fontWeight: "600", color: "#555" }}
              >
                Last updated:{" "}
                {new Date(termsData?.updatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="policy__section">
              <div
                className="text-1 text-color-2"
                style={{
                  fontSize: "16px",
                  color: "#444",
                  textAlign: "justify",
                  marginBottom: "15px",
                  fontFamily: `"Poppins", sans-serif`,
                }}
                dangerouslySetInnerHTML={{ __html: termsData.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
