import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role === "vendor") {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      {/* Footer */}
      <footer
        id="footer"
        className="clearfix home"
        style={{ padding: "40px 0 15px" }}
      >
        <div className="container6">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="widget widget-info">
                <h3 style={{ color: "red" }}>BookMIPG</h3>
                <p className="sub-title">
                  Download OYO app for exciting offers.
                </p>
                <div>
                  <a
                    // href="https://apps.apple.com/app/oyo/id988141624"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      style={{ height: "40px", marginRight: "10px" }}
                    />
                  </a>
                  <a
                    // href="https://play.google.com/store/apps/details?id=com.oyo.consumer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      style={{ height: "40px" }}
                    />
                  </a>
                </div>

                <div
                  style={{ marginTop: "15px", display: "flex", gap: "15px" }}
                >
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CiFacebook size={30} color="#fff" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={30} color="#fff" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter size={30} color="#fff" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="widget widget-menu style-3">
                <h3 style={{ color: "red" }}>Our Company</h3>
                <ul className="box-menu">
                  <li>
                    <Link to="/About">About Us</Link>
                  </li>
                  {/* <li><a href="careers.html">Careers</a></li> */}
                  {/* <li><a href="services.html">Services</a></li> */}
                  <li>
                    <Link to="/ContactUs">Contact Us</Link>
                  </li>
                  
                  <li>
                    <Link to="Faq">F &amp; Q</Link>
                  </li>
                  {/* <li><a href="blog.html">Blog</a></li> */}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="widget widget-menu style-3">
                <h3 style={{ color: "red" }}>SOLUTIONS</h3>
                <ul className="box-menu">
                  <li>
                    <Link to="/termsAndCondition">Terms and conditions</Link>
                  </li>
                  <li>
                    <Link to="/guestPolicy">Guest Policies</Link>
                  </li>
                  <li>
                    <Link to="/privacyPolicy">Privacy Policy</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* /#footer */}
      <div className="widget-bottom-footer">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-bottom center">
                Copyright © 2024. Designed &amp; Developed by{" "}
                <a
                  target="_blank"
                  href="https://logicalsofttech.com/"
                  style={{ color: "red" }}
                >
                  Logical Softech.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
