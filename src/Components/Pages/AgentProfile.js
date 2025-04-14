import React, { useEffect, useState } from "react";
import AgentSidebar from "../NavFooter/AgentSidebar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const AgentProfile = () => {
  const [cpcode, setcpcode] = useState();

  const [name, setName] = useState();
  const [email, setemail] = useState();

  const [userimage, setuserimage] = useState();

  const [selectedCity, setSelectedCity] = useState("");

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const [mobile, setmobile] = useState();

  const [companyname, setcompanyname] = useState();
  const [employeeworking, setemployeeworking] = useState();
  const [rerano, setrerano] = useState();
  const [totalexperienceyear, settotalexperienceyear] = useState();
  const [localinterest, setlocalinterest] = useState();
  const [specialization, setspecialization] = useState();
  const [language, setlanguage] = useState();
  const [hobbies, sethobbies] = useState();
  const [officeaddress, setofficeaddress] = useState();
  const [url, seturl] = useState();
  const [about, setabout] = useState();
  const [transications, settransications] = useState();
  const Role = secureLocalStorage.getItem("roleType");

  let loginid = secureLocalStorage.getItem("loginuserid");
  let loginmobileNumber = secureLocalStorage.getItem("loginmobilenumber");

  useEffect(() => {
    window.scrollTo(0, 0);
    GetuserData();
  }, [0]);
  const GetuserData = () => {
    const userdata = {
      userId: loginid,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}website/user_profile`, userdata)
      .then((response) => {
        setName(response.data.data.name);
        setemail(response.data.data.email);
        setSelectedCity(response?.data?.data?.city_name);
        setmobile(response?.data?.data?.mobile_no);
        setuserimage(response.data.data.user_image);
        setcpcode(response.data.data.cp_code);
        setcompanyname(response.data.data.company_name);
        setemployeeworking(response.data.data.employee_working);
        setrerano(response.data.data.rera_no);
        settotalexperienceyear(response.data.data.total_experience_year);
        setlocalinterest(response.data.data.local_interest);
        setspecialization(response.data.data.specialization);
        setlanguage(response.data.data.language);
        sethobbies(response.data.data.hobbies);
        setofficeaddress(response.data.data.office_address);
        seturl(response.data.data.url);
        setabout(response.data.data.about);
      })
      .catch((error) => {});
  };

  const userSignupdata = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", loginid);
    formData.append("user_image", userimage);
    formData.append("role_type", Role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("city_name", selectedCity);
    formData.append("cp_code", cpcode ? cpcode : "");
    formData.append("company_name", companyname ? companyname : "");
    formData.append("employee_working", employeeworking ? employeeworking : "");
    formData.append("rera_no", rerano ? rerano : "");
    formData.append(
      "total_experience_year",
      totalexperienceyear ? totalexperienceyear : ""
    );
    formData.append("local_interest", localinterest ? localinterest : "");
    formData.append("specialization", specialization ? specialization : "");
    formData.append("language", language ? language : "");
    formData.append("hobbies", hobbies ? hobbies : "");
    formData.append("office_address", officeaddress ? officeaddress : "");
    formData.append("url", url ? url : "");
    formData.append("mobile_no", loginmobileNumber);
    formData.append("about", about);

    axios
      .post(`${process.env.REACT_APP_API_KEY}website/update_user`, formData)
      .then((response) => {
        GetuserData();

        swal(response.data.msg, {
          icon: "success",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.msg);
        } else {
        }
      });
  };

  useEffect(() => {
    GetTransication();
  }, [0]);
  const GetTransication = () => {
    const data = {
      userId: loginid,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}website/get_agent_subscriptions_details`,
        data
      )
      .then((res) => {
        settransications(res?.data?.data?.reverse());
      })
      .catch((error) => {});
  };

  return (
    <>
      <Toaster />
      {/* <Toaster /> */}
      <AgentSidebar />
      <div className="dashboard__content bg-23">
        <section className="flat-title2 ">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">My Profile</div>
              </div>
            </div>
          </div>
        </section>
        <section className="flat-profile flat-upload-photo">
          <div className="container7">
            <div className="row">
              <div className="col-lg-4">
              
              </div>
              <div className="col-lg-8">
                <form onSubmit={userSignupdata}>
                  <div
                    className="tf-uploads bg-white"
                    style={{
                      backgroundImage:
                        "url(assets/images/slider/bg-slider-4.jpg)",
                    }}
                  >
                    <h3 className="titles">Profile Pic</h3>
                    <div className="wrap-upload ">
                      <div className="box-upload flex">
                        <div className="img-up relative">
                          {userimage ? (
                            <img
                              className="avatar"
                              id="profileimg"
                              src={
                                `http://157.66.191.24:3089/uploads/` + userimage
                              }
                              alt
                            />
                          ) : (
                            <img
                              className="avatar"
                              id="profileimg"
                              src="assets/images/author/author-dashboard-profile2.jpg"
                              alt
                            />
                          )}
                        </div>
                        <div className="content">
                          <div className="subtitle">Upload a new picture”</div>
                          <div
                            className="button-box relative flex align-center"
                            id="upload-profile"
                          >
                            <a href="#" className="btn-upload sc-button">
                              <span className="fw-14 fw-6">Choose file</span>{" "}
                            </a>
                            <input
                              onChange={(e) => {
                                setuserimage(e.target.files[0]);
                              }}
                              id="tf-upload-img"
                              type="file"
                              name="profile"
                            />
                            <div className>No files selected</div>
                          </div>
                          {/* <p class="fs-12 lh-18">JPEG 100x100</p>  */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tf-infomation bg-white">
                    <h6 style={{ visibility: "hidden" }} className="titles">
                      Profile Details
                    </h6>
                    <h3 className="titles">Profile Details</h3>
                    <div className="info-box info-wg">
                      <div className="inner-2 inner form-wg flex ">
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">Name</label>
                            <input
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              type="text"
                              className="input-form"
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              disabled
                              value={mobile}
                              className="input-form"
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Email address
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setemail(e.target.value);
                              }}
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>
                      </div>

                      <div className="inner-2 inner form-wg flex ">
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">CP Code</label>
                            <input
                              value={cpcode}
                              onChange={(e) => {
                                setcpcode(e.target.value);
                              }}
                              type="number"
                              className="input-form"
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <div className="group-select">
                              <label
                                className="fw-6"
                                style={{ marginBottom: 5 }}
                              >
                                City
                              </label>
                              <div className="nice-select" tabIndex={0}>
                                <span className="current">
                                  {selectedCity || "Choose a city"}
                                </span>
                                
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Company Name
                            </label>
                            <input
                              value={companyname}
                              onChange={(e) => {
                                setcompanyname(e.target.value);
                              }}
                              type="text"
                              className="input-form"
                            />
                          </fieldset>
                        </div>
                      </div>

                      
                      <div className="wrap-button tf-save">
                        <button
                          className="sc-button"
                          name="submit"
                          type="submit"
                        >
                          <span>Update Profile</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade popup"
                    id="popup_bid26"
                    tabIndex={-1}
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body space-y-20 pd-40 style2">
                          <div className="wrap-modal flex">
                            <div className="content">
                              <div className="tf-price tf-infomation bg-white">
                                <h3 className="titles">
                                  Profile &amp; Details
                                </h3>
                                <div className="info-box info-wg">
                                  <div className="inner-1 form-wg flex">
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Name *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="Jarvis"
                                        />{" "}
                                      </div>
                                    </div>
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Email Address *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="Email"
                                          className="input-form "
                                          defaultValue="Jarvis@gmail.com"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inner-1 form-wg flex">
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        City *
                                      </label>
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current font-2 fw-7">
                                          Select city
                                        </span>
                                        <ul className="list style">
                                          <li
                                            data-value={500}
                                            className="option"
                                          >
                                            Indore
                                          </li>
                                          <li
                                            data-value={750}
                                            className="option selected focus"
                                          >
                                            Ujjain
                                          </li>
                                          <li
                                            data-value={1000}
                                            className="option"
                                          >
                                            Bhopal
                                          </li>
                                          <li
                                            data-value={2000}
                                            className="option"
                                          >
                                            Mandsor
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Company Name *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="Info Jarvis Tech"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inner-1 form-wg flex">
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Employees Working for you *
                                      </label>
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current font-2 fw-7">
                                          Select working Employees
                                        </span>
                                        <ul className="list style">
                                          <li
                                            data-value={500}
                                            className="option"
                                          >
                                            1-5
                                          </li>
                                          <li
                                            data-value={750}
                                            className="option selected focus"
                                          >
                                            6-10
                                          </li>
                                          <li
                                            data-value={1000}
                                            className="option"
                                          >
                                            11-20
                                          </li>
                                          <li
                                            data-value={2000}
                                            className="option"
                                          >
                                            21-200
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Rera Number *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="WEW74E"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inner-1 form-wg flex">
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Total year of Experience *
                                      </label>
                                      <div className="nice-select" tabIndex={0}>
                                        <span className="current font-2 fw-7">
                                          Select Experience year
                                        </span>
                                        <ul className="list style">
                                          <li
                                            data-value={500}
                                            className="option"
                                          >
                                            1
                                          </li>
                                          <li
                                            data-value={750}
                                            className="option selected focus"
                                          >
                                            2
                                          </li>
                                          <li
                                            data-value={1000}
                                            className="option"
                                          >
                                            3
                                          </li>
                                          <li
                                            data-value={2000}
                                            className="option"
                                          >
                                            4
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Specialization *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="Rent"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inner-1 form-wg flex">
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Interest / Hobbies *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="Hockey"
                                        />{" "}
                                      </div>
                                    </div>
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Office Addess *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="Near by malahar mall"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="inner-1 form-wg flex">
                                    <div className="wg-box">
                                      <label className="title-user fw-6">
                                        Languages *
                                      </label>
                                      <div>
                                        <input
                                          style={{ color: "black" }}
                                          type="text"
                                          className="input-form "
                                          defaultValue="Jarvis"
                                        />{" "}
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" text-center">
                                    <div className="wg-box">
                                      <div className="wrap-button tf-save">
                                        <button
                                          data-toggle="modal"
                                          data-target="#popup_bid26"
                                          className="sc-button"
                                          name="submit"
                                          type="submit"
                                        >
                                          <span>Save Details</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="tf-bottom">
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentProfile;
