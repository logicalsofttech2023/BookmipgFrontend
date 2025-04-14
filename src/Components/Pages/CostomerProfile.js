import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";

import axios from "axios";
import cities from "../Auth/cities";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import { DatePicker } from "rsuite";

const CostomerProfile = () => {
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [maritalStatus, setMaritalStatus] = useState();
  const [userImage, setUserImage] = useState();
  const [mobile, setMobile] = useState();

  let token = localStorage.getItem("token");
  let loginMobileNumber = localStorage.getItem("loginMobileNumber");

  useEffect(() => {
    window.scrollTo(0, 0);
    GetUserData();
  }, []);
  
  const GetUserData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/auth/getUserById`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
  
        setName(response?.data?.data?.name);
        setEmail(response?.data?.data?.email);
        setMobile(response?.data?.data?.phone);
        setUserImage(response?.data?.data?.profileImage);
        
        // Ensure dob is converted to Date object
        const dobFromApi = response?.data?.data?.dob
          ? new Date(response?.data?.data?.dob)
          : null;
  
        setDob(dobFromApi);
        setGender(response?.data?.data?.gender);
        setMaritalStatus(response?.data?.data?.maritalStatus);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  

  const userSignUpdata = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", userImage);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("maritalStatus", maritalStatus); // ✅ Add this


    axios
      .post(`${process.env.REACT_APP_BASE_URL}api/auth/updateProfile`, formData,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          GetUserData();
          swal(response.data.message, {
            icon: "success",
          });
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.msg);
        } else {
        }
      });
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const [dobError, setDobError] = useState("");

  const handleDateChange = (date) => {
    if (!date) {
      setDobError("Please select your Date of Birth");
      setDob(null);
      return;
    }

    const today = new Date();
    const selectedDate = new Date(date);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const isFutureDate = selectedDate > today;

    if (isFutureDate) {
      setDobError("Date of Birth cannot be in the future.");
      setDob(null);
    } else if (age < 18) {
      setDobError("You must be at least 18 years old.");
      setDob(null);
    } else {
      setDobError("");
      setDob(date);
    }
  };

  return (
    <>
      <Toaster />
      <section class="flat-title ">
        <div class="container6">
          <div class="row">
            <div class="col-lg-12">
              <div class="title-inner ">
                <div class="title-group fs-12">
                  <a class="home fw-6 text-color-3" href="index.html">
                    Home
                  </a>
                  <span>Profile Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="dashboard__content bg-23">
        <section className="flat-profile flat-upload-photo">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12 p-0">
                <form onSubmit={userSignUpdata}>
                  <div className="tf-uploads bg-white">
                    <h3 className="titles">Profile-pic</h3>
                    <div className="wrap-upload ">
                      <div className="box-upload flex">
                        <div className="img-up relative">
                          {previewImage ? (
                            <img
                              className="avatar"
                              id="profileimg"
                              src={previewImage}
                              alt="Preview"
                            />
                          ) : userImage ? (
                            <img
                              className="avatar"
                              id="profileimg"
                              src={
                                `${process.env.REACT_APP_BASE_URL}` +
                                userImage
                              }
                              alt="Profile"
                            />
                          ) : (
                            <img
                              className="avatar"
                              id="profileimg"
                              src="assets/images/author/author-dashboard-profile2.jpg"
                              alt="Default Profile"
                            />
                          )}
                          <div className="content">
                            <div className="subtitle">Upload a new profile</div>
                            <div
                              className="button-box relative flex align-center"
                              id="upload-profile"
                            >
                              <label className="btn-upload sc-button">
                                <span className="fw-14 fw-6">Choose file</span>
                                <input
                                  onChange={handleImageChange}
                                  id="tf-upload-img"
                                  type="file"
                                  name="profile"
                                  className="d-none"
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tf-infomation bg-white">
                    <h3 className="titles">Infomation</h3>
                    <div className="info-box info-wg">
                      <div className="inner-1 inner form-wg flex ">
                        <div className="wg-box select-group">
                          <fieldset>
                            <label className="title-user fw-6">Full name</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              className="input-form"
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box select-group">
                          <label className="title-user fw-6">
                            Date of Birth
                          </label>

                          <fieldset>
                            <DatePicker
                              value={dob}
                              onChange={handleDateChange}
                              format="dd/MM/yyyy"
                              style={{ width: "100%" }}
                            />
                            {dobError && (
                              <small className="text-danger">{dobError}</small>
                            )}
                          </fieldset>
                        </div>
                      </div>

                      <div className="inner-3 inner form-wg flex ">
                        <div className="wg-box3 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Email address
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              className="input-form"
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box3 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Your phone Number
                            </label>
                            <input
                              type="tel"
                              disabled
                              value={mobile}
                              className="input-form"
                            />
                          </fieldset>
                        </div>

                        <div className="wg-box3 select-group">
                          <fieldset>
                            <label className="title-user fw-6">Gender</label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              style={{ padding: "12px 15px 12px 16px" }}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Undisclosed">Undisclosed</option>
                            </select>
                          </fieldset>
                        </div>
                      </div>

                      <div className="inner-3 inner form-wg flex ">
                        <div className="wg-box3 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Marital Status
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              value={maritalStatus}
                              onChange={(e) => setMaritalStatus(e.target.value)}
                              style={{ padding: "12px 15px 12px 16px" }}
                            >
                              <option value={""} selected>Select Marital</option>
                              <option value="Married">Married</option>
                              <option value="Unmarried">Unmarried</option>
                              <option value="Undisclosed">Undisclosed</option>
                            </select>
                          </fieldset>
                        </div>
                      </div>

                      <div className="wrap-button tf-save">
                        <button
                          className="sc-button"
                          name="submit"
                          type="submit"
                        >
                          <span>Save &amp; Update</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="tf-bottom"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CostomerProfile;
