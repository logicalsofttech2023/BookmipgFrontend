import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import cities from "./cities";
import Sidebar  from "./Sidebar";

const Register = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [roleType, setRoleType] = useState("user");

  const handleRoleChange = (role) => {
    setRoleType(role);
  };

  let loginMobileNumber = localStorage.getItem("loginMobileNumber");
  const handleRegister = (e) => {
    e.preventDefault();

    if (!roleType) {
      toast.error("Please select a role.");
      return;
    }
    const userdata = {
      phone: loginMobileNumber,
      countryCode: "91",
      name: name,
      email: email,
      role: roleType,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/auth/completeRegistration`,
        userdata
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response?.data?.data?.role);
          if (response.data.data.role === "user") {
            setTimeout(() => {
              Navigate("/");
            }, 3000);
          } else {
            setTimeout(() => {
              Navigate("/dashboard");
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
      <section className="flat-contact page-contact relative bg-23">
        <div className="container6">
          <div className="row">
            <Sidebar />
            <div className="col-lg-4 col-md-4 form-sl">
              <div id="comments" className="comments bg-white">
                <div className="heading-box start" style={{ marginBottom: 10 }}>
                  <div className="heading-title fs-30 fw-7 lh-45">Register</div>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio</p> */}
                </div>
                <div className="respond-comment">
                  <form
                    onSubmit={handleRegister}
                    className="comment-form form-submit"
                  >
                    <div className="heading-box start">
                      <h4 className="heading-title fs-20 lh-45">I am an</h4>
                    </div>
                    <div className="flat-tabs style2 flex">
                      <div className="box-tab center ">
                        <ul className="menu-tab tab-title flex flex-wrap center">
                          <li
                            style={{
                              width: "45%",
                              color: "white",
                              border: "none",
                              height: "40px",
                            }}
                            className={`sc-buttonborder item-title flex align-center ${
                              roleType === "user" ? "active" : ""
                            }`}
                            onClick={() => handleRoleChange("user")}
                          >
                            <i className="far fa-check-circle" />
                            <h6 style={{ marginTop: "2px" }} className="inner">
                              <Link style={{ fontSize: 12, color: "white", textDecoration: "none", fontWeight: "700" }}>Costomer</Link>
                            </h6>
                          </li>
                          <li
                            style={{
                              width: "50%",
                              border: "none",
                              height: "40px",
                            }}
                            className={`sc-buttonborder item-title flex align-center ${
                              roleType === "vendor" ? "active" : ""
                            }`}
                            onClick={() => handleRoleChange("vendor")}
                          >
                            <i className="far fa-check-circle" />
                            <h6 style={{ marginTop: "2px" }} className="inner">
                              <Link style={{ fontSize: 12, color: "white", textDecoration: "none", fontWeight: "700" }}>Hotel Owner</Link>
                            </h6>
                          </li>
                          &nbsp;
                        </ul>
                      </div>
                    </div>
                    <div
                      className="form-group-1 search-form form-style"
                      style={{ marginBottom: 15, marginTop: 15 }}
                    >
                      <label style={{ marginBottom: 5 }} className="fw-6">
                        Name
                      </label>
                      <input
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        type="text"
                        className="search-field"
                        placeholder="Enter Your Name"
                        value={name}
                        required
                      />
                    </div>
                    <div
                      className="form-group-1 search-form form-style"
                      style={{ marginBottom: 15 }}
                    >
                      <label style={{ marginBottom: 5 }} className="fw-6">
                        Mobile Number
                      </label>
                      <input
                        value={loginMobileNumber}
                        type="search"
                        className="search-field"
                        placeholder="Enter Phone Number"
                        disabled
                      />
                    </div>
                    <div
                      className="form-group-1 search-form form-style"
                      style={{ marginBottom: 15 }}
                    >
                      <label style={{ marginBottom: 5 }} className="fw-6">
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        className="search-field"
                        placeholder="Enter Email"
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
                      <button
                        style={{ backgroundColor: "red", color: "white", fontWeight: "600" }}
                        className="search-field"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
