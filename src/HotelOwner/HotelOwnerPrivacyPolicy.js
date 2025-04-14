import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import "./Dashboard.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

const HotelOwnerPrivacyPolicy = () => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [aboutUsData, setAboutUsData] = useState("");

  const fetchAboutUs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getPolicy`,
        {
          params: { type: "privacy" },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAboutUsData(response?.data?.policy?.content || ""); // Ensure a default value
      }
    } catch (error) {
      console.error("Error fetching About Us content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Privacy Policy</div>
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-5">Privacy Policy</h4>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: aboutUsData }} />
                    )}
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

export default HotelOwnerPrivacyPolicy;
