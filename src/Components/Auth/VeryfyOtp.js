import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const VeryfyOtp = () => {
  const [counter, setCounter] = useState(60);
  const [trues, settrues] = useState(false);
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  let loginOtp = localStorage.getItem("loginOtp");
  let loginMobileNumber = localStorage.getItem("loginMobileNumber");
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const Navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }

    if (!element.value && element.previousSibling && element.keyCode === 8) {
      element.previousSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8 && !otp[index]) {
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const Verifyotp = (e) => {
    e.preventDefault();

    const userdata = {
      phone: loginMobileNumber,
      countryCode: "91",
      otp: otp?.join(""),
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/auth/verifyOtp`, userdata)
      .then((response) => {
        if (response.data.token == "") {
          toast.success(response.data.message);
          setTimeout(() => {
            Navigate("/register");
          }, 3000);
        } else {
          if (response.data.data.role == "user") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.data.role);

            toast.success(response.data.message);
            setTimeout(() => {
              Navigate("/");
            }, 3000);
          } else {
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
            setTimeout(() => {
              Navigate("/dashboard");
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };
  const resendOtp = () => {
    if (counter === 0) {
      const userdata = {
        phone: loginMobileNumber,
      };

      axios
        .post(`${process.env.REACT_APP_BASE_URL}api/auth/resendOtp`, userdata)
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("loginOtp", response.data.data.otp);
          setOtp(new Array(4).fill(""));
          setCounter(60);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred while resending OTP.");
          }
        });
    }
  };

  const [Cointactusdata, setCointactusdata] = useState();

  useEffect(() => {
    GetContactUs();
  }, [0]);
  const GetContactUs = () => {
    axios
      .get("http://157.66.191.24:3089/website/get_admin_contact_us")
      .then((res) => {
        setCointactusdata(res?.data?.data[0]);
      })
      .catch((error) => {});
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
                  <div className="heading-title fs-20 fw-7 lh-45 ">
                    <font className="color-popup text-color-3">{loginOtp}</font>{" "}
                    Confirm OTP to Continue
                  </div>
                  We have sent you message with 4 digit verification <br />
                  code (OTP) on <br /> +91 {loginMobileNumber}{" "}
                  <Link
                    className="font-2 fw-7 fs-13 color-popup text-color-3"
                    to="/Login"
                  >
                    Change
                  </Link>{" "}
                  <p />
                </div>
                <div className="respond-comment">
                  <form
                    enctype="multipart/form-data"
                    onSubmit={Verifyotp}
                    className="comment-form form-submit"
                  >
                    <div className="form-group-1 search-form form-style">
                      <div className="otp-input-container">
                        <div id="inputs" className="inputs">
                          {otp?.map((data, index) => (
                            <input
                              required
                              className="input"
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              key={index}
                              value={data}
                              onChange={(e) => handleChange(e.target, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              onFocus={(e) => e.target.select()}
                            />
                          ))}
                        </div>
                      </div>
                      <div
                        className="form-group-1 search-form form-style"
                        style={{
                          marginTop: 15,
                          marginBottom: 25,
                          textAlign: "center",
                        }}
                      >
                        {trues === true ? (
                          <div
                            type="submit"
                            style={{
                              backgroundColor: "#58BF93",
                              color: "white",
                            }}
                            className="search-field"
                          >
                            Processing
                          </div>
                        ) : (
                          <button
                            type="submit"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontWeight: "600"
                            }}
                            className="search-field"
                          >
                            Confirm to Otp
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                  {/* <div className="text-box text-center fs-13">
                    Did not receive the code? 
                    <Link
                      to="/VeryfyOtp"
                      onClick={() => resendOtp()}
                      className="font-2 fw-7 fs-13 color-popup text-color-3"
                    >
                      Resend OTP {counter}
                    </Link>
                  </div> */}
                  <div className="text-box text-center fs-13">
                    Did not receive the code?{" "}
                    <Link
                      to={counter === 0 ? "/VeryfyOtp" : "#"}
                      onClick={counter === 0 ? resendOtp : null}
                      className={`font-2 fw-7 fs-13 color-popup text-color-3 ${
                        counter > 0 ? "disabled" : ""
                      }`}
                      style={{
                        pointerEvents: counter > 0 ? "none" : "auto",
                        color: counter > 0 ? "grey" : "inherit",
                      }}
                    >
                      Resend OTP {counter > 0 ? `in ${counter}s` : ""}
                    </Link>
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

export default VeryfyOtp;
