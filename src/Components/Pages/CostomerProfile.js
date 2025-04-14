import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import cities from "../Auth/cities";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";


const CostomerProfile = () => {
    const [about, setAbout] = useState();
    const [cpcode, setcpcode] = useState();
    const [language, setlanguage] = useState();
    const [name, setName] = useState();
    const [email, setemail] = useState();
    const [role, setRole] = useState();
    const [userimage, setuserimage] = useState();
  
  
  
    const [selectedCity, setSelectedCity] = useState('');
  
    const handleCitySelect = (city) => {
      setSelectedCity(city);
    };
  
    const [mobile, setmobile] = useState();
  
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
          setuserimage(response.data.data.user_image)
          setcpcode(response.data.data.cp_code)
          setAbout(response.data.data.about)
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
      formData.append("cp_code", cpcode);
      // formData.append("company_name",companyname)
      // formData.append("employee_working",employeeworking)
      // formData.append("rera_no",rerano)
      // formData.append("total_experience_year",totalexperienceyear)
      // formData.append("local_interest",localinterest)
      // formData.append("specialization",specialization);
      formData.append("language", language);
      // formData.append("hobbies",hobbies)
      // formData.append("office_address",officeaddress)
      // formData.append("url",url)
      formData.append("mobile_no", loginmobileNumber);
      formData.append("about", about);
  
      axios
        .post(`${process.env.REACT_APP_API_KEY}website/update_user`, formData)
        .then((response) => {
          GetuserData();
          swal(response.data.msg, {
            icon: "success",
          });
         // toast.success(response.data.msg);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.msg);
          } else {
          }
        });
    };
  
    return (
      <>
        <Toaster/>
        <section class="flat-title ">
                <div class="container">
                    <div class="row">                      
                        <div class="col-lg-12">
                            <div class="title-inner ">
                                <div class="title-group fs-12"><a class="home fw-6 text-color-3" href="index.html">Home</a><span>Profile Details</span></div>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        <div className="dashboard__content bg-23">
          {/* <section class="flat-title2 ">
            <div class="container7">
              <div class="row">
                <div class="col-lg-12">
                  <div class="title-group fs-30 lh-45 fw-7">
                    Profile Details
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <section className="flat-profile flat-upload-photo">
            <div className="container7">
              <div className="row">
                <div className="col-lg-12 p-0">
                
  <form onSubmit={userSignupdata}>
    
                  <div className="tf-uploads bg-white">
                    
                    <h3 className="titles">Profile-pic</h3>
                    <div className="wrap-upload ">
                      <div className="box-upload flex">
                        <div className="img-up relative">
                         {userimage ? <img
                            className="avatar"
                            id="profileimg"
                            src={`http://157.66.191.24:3089/uploads/`+ userimage}
                            alt=""
                          /> :  <img
                            className="avatar"
                            id="profileimg"
                            src="assets/images/author/author-dashboard-profile2.jpg"
                            alt=""
                          />}
                        </div>
                        <div className="content">
                          <div className="subtitle">Upload a new profile</div>
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
                          {/* <p className="fs-12 lh-18">JPEG 100x100</p>  */}
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
                        <fieldset>
                          <label className="title-user fw-6">About</label>
                          <input
                            type="text"
                            value={about}
                            onChange={(e) => {
                              setAbout(e.target.value);
                            }}
                            className="input-form"
                          />
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
                                setemail(e.target.value);
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
                          <div className="group-select">
        <label className="fw-6" style={{ marginBottom: 5 }}>
          City
        </label>
        <div className="nice-select" tabIndex={0}>
          <span className="current">{selectedCity || 'Choose a city'}</span>
        </div>
        </div>
        </fieldset>
                        </div>
                        <div className="wg-box3 select-group">
                          <fieldset>
                            <label className="title-user fw-6">Pin Code</label>
                            <input value={cpcode} onChange={((e)=>{
                              setcpcode(e.target.value)
                            })}
                              type="number"
                              
                              className="input-form"
                              
                            />
                          </fieldset>
                        </div>
                      </div>
                    
                    
                   
                      <div className="wrap-button tf-save">
                        <button className="sc-button" name="submit" type="submit">
                          <span>Save &amp; Update</span>
                        </button>
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
}

export default CostomerProfile