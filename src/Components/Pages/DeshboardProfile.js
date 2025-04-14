import React, { useEffect, useState } from "react";
import UserSidebar from "../NavFooter/UserSidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import cities from "../Auth/cities";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
const DeshboardProfile = () => {
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
      {/* <Toaster /> */}
      <Toaster
 
/>
      <UserSidebar />
      <div className="dashboard__content bg-23">
        <section class="flat-title2 ">
          <div class="container7">
            <div class="row">
              <div class="col-lg-12">
                <div class="title-group fs-30 lh-45 fw-7">
                  Add Profile Details
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flat-profile flat-upload-photo">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
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
        {/* <ul className="list">
          <li data-value="" className="option selected focus">
            Location
          </li>
          <li
            data-value="Mumbai"
            className="option"
            onClick={() => handleCitySelect('Mumbai')}
          >
            Mumbai
          </li>
          <li
            data-value="Delhi"
            className="option"
            onClick={() => handleCitySelect('Delhi')}
          >
            Delhi
          </li>
          <li
            data-value="Bengaluru"
            className="option"
            onClick={() => handleCitySelect('Bengaluru')}
          >
            Bengaluru
          </li>
          <li
            data-value="Kolkata"
            className="option"
            onClick={() => handleCitySelect('Kolkata')}
          >
            Kolkata
          </li>
          <li
            data-value="Chennai"
            className="option"
            onClick={() => handleCitySelect('Chennai')}
          >
            Chennai
          </li>
          <li
            data-value="Hyderabad"
            className="option"
            onClick={() => handleCitySelect('Hyderabad')}
          >
            Hyderabad
          </li>
          <li
            data-value="Ahmedabad"
            className="option"
            onClick={() => handleCitySelect('Ahmedabad')}
          >
            Ahmedabad
          </li>
          <li
            data-value="Pune"
            className="option"
            onClick={() => handleCitySelect('Pune')}
          >
            Pune
          </li>
          <li
            data-value="Jaipur"
            className="option"
            onClick={() => handleCitySelect('Jaipur')}
          >
            Jaipur
          </li>
          <li
            data-value="Lucknow"
            className="option"
            onClick={() => handleCitySelect('Lucknow')}
          >
            Lucknow
          </li>
          <li
            data-value="Kanpur"
            className="option"
            onClick={() => handleCitySelect('Kanpur')}
          >
            Kanpur
          </li>
          <li
            data-value="Nagpur"
            className="option"
            onClick={() => handleCitySelect('Nagpur')}
          >
            Nagpur
          </li>
          <li
            data-value="Indore"
            className="option"
            onClick={() => handleCitySelect('Indore')}
          >
            Indore
          </li>
          <li
            data-value="Thane"
            className="option"
            onClick={() => handleCitySelect('Thane')}
          >
            Thane
          </li>
          <li
            data-value="Bhopal"
            className="option"
            onClick={() => handleCitySelect('Bhopal')}
          >
            Bhopal
          </li>
          <li
            data-value="Visakhapatnam"
            className="option"
            onClick={() => handleCitySelect('Visakhapatnam')}
          >
            Visakhapatnam
          </li>
          <li
            data-value="Pimpri-Chinchwad"
            className="option"
            onClick={() => handleCitySelect('Pimpri-Chinchwad')}
          >
            Pimpri-Chinchwad
          </li>
          <li
            data-value="Patna"
            className="option"
            onClick={() => handleCitySelect('Patna')}
          >
            Patna
          </li>
          <li
            data-value="Vadodara"
            className="option"
            onClick={() => handleCitySelect('Vadodara')}
          >
            Vadodara
          </li>
          <li
            data-value="Ghaziabad"
            className="option"
            onClick={() => handleCitySelect('Ghaziabad')}
          >
            Ghaziabad
          </li>
          <li
            data-value="Ludhiana"
            className="option"
            onClick={() => handleCitySelect('Ludhiana')}
          >
            Ludhiana
          </li>
          <li
            data-value="Agra"
            className="option"
            onClick={() => handleCitySelect('Agra')}
          >
            Agra
          </li>
          <li
            data-value="Nashik"
            className="option"
            onClick={() => handleCitySelect('Nashik')}
          >
            Nashik
          </li>
          <li
            data-value="Faridabad"
            className="option"
            onClick={() => handleCitySelect('Faridabad')}
          >
            Faridabad
          </li>
          <li
            data-value="Meerut"
            className="option"
            onClick={() => handleCitySelect('Meerut')}
          >
            Meerut
          </li>
          <li
            data-value="Rajkot"
            className="option"
            onClick={() => handleCitySelect('Rajkot')}
          >
            Rajkot
          </li>
          <li
            data-value="Kalyan-Dombivli"
            className="option"
            onClick={() => handleCitySelect('Kalyan-Dombivli')}
          >
            Kalyan-Dombivli
          </li>
          <li
            data-value="Vijayawada"
            className="option"
            onClick={() => handleCitySelect('Vijayawada')}
          >
            Vijayawada
          </li>
          <li
            data-value="Jabalpur"
            className="option"
            onClick={() => handleCitySelect('Jabalpur')}
          >
            Jabalpur
          </li>
          <li
            data-value="Srinagar"
            className="option"
            onClick={() => handleCitySelect('Srinagar')}
          >
            Srinagar
          </li>
          <li
            data-value="Aurangabad"
            className="option"
            onClick={() => handleCitySelect('Aurangabad')}
          >
            Aurangabad
          </li>
          <li
            data-value="Amritsar"
            className="option"
            onClick={() => handleCitySelect('Amritsar')}
          >
            Amritsar
          </li>
          <li
            data-value="Howrah"
            className="option"
            onClick={() => handleCitySelect('Howrah')}
          >
            Howrah
          </li>
          <li
            data-value="Ranchi"
            className="option"
            onClick={() => handleCitySelect('Ranchi')}
          >
            Ranchi
          </li>
          <li
            data-value="Dhanbad"
            className="option"
            onClick={() => handleCitySelect('Dhanbad')}
          >
            Dhanbad
          </li>
          <li
            data-value="Jodhpur"
            className="option"
            onClick={() => handleCitySelect('Jodhpur')}
          >
            Jodhpur
          </li>
          <li
            data-value="Coimbatore"
            className="option"
            onClick={() => handleCitySelect('Coimbatore')}
          >
            Coimbatore
          </li>
          <li
            data-value="Bhubaneswar"
            className="option"
            onClick={() => handleCitySelect('Bhubaneswar')}
          >
            Bhubaneswar
          </li>
          <li
            data-value="Mohali"
            className="option"
            onClick={() => handleCitySelect('Mohali')}
          >
            Mohali
          </li>
          <li
            data-value="Jammu"
            className="option"
            onClick={() => handleCitySelect('Jammu')}
          >
            Jammu
          </li>
          <li
            data-value="Gwalior"
            className="option"
            onClick={() => handleCitySelect('Gwalior')}
          >
            Gwalior
          </li>
          <li
            data-value="Kota"
            className="option"
            onClick={() => handleCitySelect('Kota')}
          >
            Kota
          </li>
          <li
            data-value="Bikaner"
            className="option"
            onClick={() => handleCitySelect('Bikaner')}
          >
            Bikaner
          </li>
          <li
            data-value="Chandigarh"
            className="option"
            onClick={() => handleCitySelect('Chandigarh')}
          >
            Chandigarh
          </li>
          <li
            data-value="Mysuru"
            className="option"
            onClick={() => handleCitySelect('Mysuru')}
          >
            Mysuru
          </li>
          <li
            data-value="Tiruchirappalli"
            className="option"
            onClick={() => handleCitySelect('Tiruchirappalli')}
          >
            Tiruchirappalli
          </li>
          <li
            data-value="Udaipur"
            className="option"
            onClick={() => handleCitySelect('Udaipur')}
          >
            Udaipur
          </li>
          <li
            data-value="Solapur"
            className="option"
            onClick={() => handleCitySelect('Solapur')}
          >
            Solapur
          </li>
          <li
            data-value="Dehradun"
            className="option"
            onClick={() => handleCitySelect('Dehradun')}
          >
            Dehradun
          </li>
          <li
            data-value="Aligarh"
            className="option"
            onClick={() => handleCitySelect('Aligarh')}
          >
            Aligarh
          </li>
          <li
            data-value="Shimla"
            className="option"
            onClick={() => handleCitySelect('Shimla')}
          >
            Shimla
          </li>
          <li
            data-value="Guntur"
            className="option"
            onClick={() => handleCitySelect('Guntur')}
          >
            Guntur
          </li>
          <li
            data-value="Warangal"
            className="option"
            onClick={() => handleCitySelect('Warangal')}
          >
            Warangal
          </li>
          <li
            data-value="Raipur"
            className="option"
            onClick={() => handleCitySelect('Raipur')}
          >
            Raipur
          </li>
          <li
            data-value="Rourkela"
            className="option"
            onClick={() => handleCitySelect('Rourkela')}
          >
            Rourkela
          </li>
          <li
            data-value="Mangalore"
            className="option"
            onClick={() => handleCitySelect('Mangalore')}
          >
            Mangalore
          </li>
          <li
            data-value="Siliguri"
            className="option"
            onClick={() => handleCitySelect('Siliguri')}
          >
            Siliguri
          </li>
          <li
            data-value="Vellore"
            className="option"
            onClick={() => handleCitySelect('Vellore')}
          >
            Vellore
          </li>
          <li
            data-value="Kakinada"
            className="option"
            onClick={() => handleCitySelect('Kakinada')}
          >
            Kakinada
          </li>
          <li
            data-value="Durgapur"
            className="option"
            onClick={() => handleCitySelect('Durgapur')}
          >
            Durgapur
          </li>
          <li
            data-value="Asansol"
            className="option"
            onClick={() => handleCitySelect('Asansol')}
          >
            Asansol
          </li>
          <li
            data-value="Kolhapur"
            className="option"
            onClick={() => handleCitySelect('Kolhapur')}
          >
            Kolhapur
          </li>
          <li
            data-value="Nanded"
            className="option"
            onClick={() => handleCitySelect('Nanded')}
          >
            Nanded
          </li>
          <li
            data-value="Bathinda"
            className="option"
            onClick={() => handleCitySelect('Bathinda')}
          >
            Bathinda
          </li>
          <li
            data-value="Jalandhar"
            className="option"
            onClick={() => handleCitySelect('Jalandhar')}
          >
            Jalandhar
          </li>
          <li
            data-value="Rishikesh"
            className="option"
            onClick={() => handleCitySelect('Rishikesh')}
          >
            Rishikesh
          </li>
          <li
            data-value="Haridwar"
            className="option"
            onClick={() => handleCitySelect('Haridwar')}
          >
            Haridwar
          </li>
          <li
            data-value="Ujjain"
            className="option"
            onClick={() => handleCitySelect('Ujjain')}
          >
            Ujjain
          </li>
          <li
            data-value="Sangli"
            className="option"
            onClick={() => handleCitySelect('Sangli')}
          >
            Sangli
          </li>
          <li
            data-value="Bhilai"
            className="option"
            onClick={() => handleCitySelect('Bhilai')}
          >
            Bhilai
          </li>
          <li
            data-value="Davanagere"
            className="option"
            onClick={() => handleCitySelect('Davanagere')}
          >
            Davanagere
          </li>
          <li
            data-value="Chandrapur"
            className="option"
            onClick={() => handleCitySelect('Chandrapur')}
          >
            Chandrapur
          </li>
          <li
            data-value="Haldia"
            className="option"
            onClick={() => handleCitySelect('Haldia')}
          >
            Haldia
          </li>
          <li
            data-value="Hosur"
            className="option"
            onClick={() => handleCitySelect('Hosur')}
          >
            Hosur
          </li>
          <li
            data-value="Gaya"
            className="option"
            onClick={() => handleCitySelect('Gaya')}
          >
            Gaya
          </li>
          <li
            data-value="Kozhikode"
            className="option"
            onClick={() => handleCitySelect('Kozhikode')}
          >
            Kozhikode
          </li>
          <li
            data-value="Cuttack"
            className="option"
            onClick={() => handleCitySelect('Cuttack')}
          >
            Cuttack
          </li>
          <li
            data-value="Jamshedpur"
            className="option"
            onClick={() => handleCitySelect('Jamshedpur')}
          >
            Jamshedpur
          </li>
          <li
            data-value="Yavatmal"
            className="option"
            onClick={() => handleCitySelect('Yavatmal')}
          >
            Yavatmal
          </li>
          <li
            data-value="Puducherry"
            className="option"
            onClick={() => handleCitySelect('Puducherry')}
          >
            Puducherry
          </li>
          <li
            data-value="Kannur"
            className="option"
            onClick={() => handleCitySelect('Kannur')}
          >
            Kannur
          </li>
          <li
            data-value="Tirunelveli"
            className="option"
            onClick={() => handleCitySelect('Tirunelveli')}
          >
            Tirunelveli
          </li>
          <li
            data-value="Rajahmundry"
            className="option"
            onClick={() => handleCitySelect('Rajahmundry')}
          >
            Rajahmundry
          </li>
          <li
            data-value="Karaikal"
            className="option"
            onClick={() => handleCitySelect('Karaikal')}
          >
            Karaikal
          </li>
          <li
            data-value="Palakkad"
            className="option"
            onClick={() => handleCitySelect('Palakkad')}
          >
            Palakkad
          </li>
          <li
            data-value="Kottayam"
            className="option"
            onClick={() => handleCitySelect('Kottayam')}
          >
            Kottayam
          </li>
          <li
            data-value="Tiruppur"
            className="option"
            onClick={() => handleCitySelect('Tiruppur')}
          >
            Tiruppur
          </li>
          <li
            data-value="Rajasthan"
            className="option"
            onClick={() => handleCitySelect('Rajasthan')}
          >
            Rajasthan
          </li>
          <li
            data-value="Bilaspur"
            className="option"
            onClick={() => handleCitySelect('Bilaspur')}
          >
            Bilaspur
          </li>
          <li
            data-value="Sagar"
            className="option"
            onClick={() => handleCitySelect('Sagar')}
          >
            Sagar
          </li>
          <li
            data-value="Madhubani"
            className="option"
            onClick={() => handleCitySelect('Madhubani')}
          >
            Madhubani
          </li>
          <li
            data-value="Sivakasi"
            className="option"
            onClick={() => handleCitySelect('Sivakasi')}
          >
            Sivakasi
          </li>
          <li
            data-value="Sambalpur"
            className="option"
            onClick={() => handleCitySelect('Sambalpur')}
          >
            Sambalpur
          </li>
          <li
            data-value="Muzaffarpur"
            className="option"
            onClick={() => handleCitySelect('Muzaffarpur')}
          >
            Muzaffarpur
          </li>
          <li
            data-value="Shillong"
            className="option"
            onClick={() => handleCitySelect('Shillong')}
          >
            Shillong
          </li>
          <li
            data-value="Guwahati"
            className="option"
            onClick={() => handleCitySelect('Guwahati')}
          >
            Guwahati
          </li>
          <li
            data-value="Imphal"
            className="option"
            onClick={() => handleCitySelect('Imphal')}
          >
            Imphal
          </li>
        </ul> */}
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
                  {/* <div className="title-bottom center text-color-4">
                    {" "}
                    Copyright © 2023{" "}
                    <a href="#" className="text-color-4 fw-6">
                      Justthing.
                    </a>{" "}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DeshboardProfile;
