import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import "./Dashboard.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

const HotelOwnerAboutUs = () => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [aboutUsData, setAboutUsData] = useState("");

  const fetchAboutUs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getPolicy`,
        {
          params: { type: "about" },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAboutUsData(response?.data?.policy?.content || "");
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
            <div className="page-header">About Us</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">About Us</h4>
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

export default HotelOwnerAboutUs;
