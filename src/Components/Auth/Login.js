import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Login = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobile(value);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    const userdata = {
      phone: mobile,
      countryCode: "91",
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/auth/generateOtp`, userdata)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          
          if (response.data.data.role == "vendor") {
            localStorage.setItem("roleType", response.data.data.role);
            setTimeout(() => {
              Navigate("/vendorLogin");
            }, 3000);
          } else {
            toast.success(response.data.message);
            localStorage.setItem("loginOtp", response.data.data.otp);
            localStorage.setItem("loginMobileNumber", response.data.data.phone);
            setLoading(true);
            setTimeout(() => {
              Navigate("/VeryfyOtp");
            }, 3000);
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };
  return (
    <>
      <Toaster />
      <section className="flat-contact page-contact relative bg-1">
        <div className="container6">
          <div className="row">
            <Sidebar />
            <div className="col-lg-4 col-md-4 form-sl">
              <div id="comments" className="comments bg-white">
                <div className="heading-box center">
                  <div className="heading-title fs-30 fw-7 lh-45">
                    Login to Continue
                  </div>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio</p> */}
                </div>
                <div className="respond-comment">
                  <div
                    className="comment-form form-submit"
                    acceptCharset="utf-8"
                  >
                    <figure style={{ marginLeft: 100 }}>
                      <img
                        src="https://www.squareyards.com/assets/images/user-interface.svg"
                        className="img-responsive"
                        alt="user interface"
                      />
                    </figure>
                    <form onSubmit={handlesubmit}>
                      <div className="form-group-1 search-form form-style">
                        {/* <input maxLength={10} minLength={10}
                          value={mobile}
                          onChange={(e) => {
                            setmobile(e.target.value);
                          }}
                          type="number"
                          className="search-field"
                          placeholder="Enter Phone Number"
                          required
                        /> */}
                        <input
                          type="text"
                          maxLength={10}
                          minLength={10}
                          value={mobile}
                          onChange={handleChange}
                          className="search-field"
                          placeholder="Enter Phone Number"
                          required
                        />
                      </div>
                      <div
                        className="form-group-1 search-form form-style"
                        style={{
                          marginTop: 15,
                          marginBottom: 25,
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {loading === true ? (
                          <div
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              fontWeight: "600",
                            }}
                            type="submit"
                            className="search-field"
                            placeholder="Enter Phone Number"
                            value
                            name="s"
                            title="Search for"
                            required
                          >
                            Processing
                          </div>
                        ) : (
                          <button
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontWeight: "600",
                            }}
                            type="submit"
                            className="search-field"
                            placeholder="Enter Phone Number"
                            value
                            name="s"
                            title="Search for"
                            required
                          >
                            Processed to login
                          </button>
                        )}
                      </div>
                    </form>
                    <div className="text-box text-center fs-13">
                      Don’t you have an account?{" "}
                      <Link
                        to="/SignUp"
                        className="font-2 fw-7 fs-13 color-popup text-color-3"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
