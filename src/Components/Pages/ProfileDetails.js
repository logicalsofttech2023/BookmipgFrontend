import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AwesomeSlider from "react-awesome-slider";
import swal from "sweetalert";
const ProfileDetails = () => {
  let userID = localStorage.getItem("UserdetailsID");
  const [Buy, setBuy] = useState();
  const [AgentData, setAgentData] = useState();
  const [AgentPropertyData, setAgentPropertyData] = useState();
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Phone,setPhone] = useState();
  const [Message, setMessage]= useState();
  const Navigate = useNavigate();
  const loginid = localStorage.getItem("loginuserid");
  useEffect(() => {
    window.scrollTo(0, 0);
    GetAgentDetails();
  }, [0]);
  const GetAgentDetails = () => {
    const data = {
      userId: userID,
    };
    axios
      .post("http://157.66.191.24:3089/website/user_profile", data)
      .then((res) => {
        setAgentData(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetAgentPropties();
  }, [Buy]);
  const GetAgentPropties = () => {
    const data = {
      userId: userID,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_user_property", data)
      .then((response) => {
     
        let filteredData = [];

        if (Buy == "1") {
          filteredData = response.data.data.filter(
            (item) => item?.property_listing_type == "Sale"
          );
        } else if (Buy == "2") {
          filteredData = response.data.data.filter(
            (item) => item?.property_listing_type == "Rent"
          );
        } else {
          filteredData = response.data.data;
        }

        setAgentPropertyData(filteredData);
        //setAgentPropertyData(res.data.data);
      })
      .catch((error) => {});
  };

  const ContactusDta = (e) =>{
    e.preventDefault();
    
    const data = {
      agentId:userID,
      name:Name,
      email:Email,
      mobile_no:Phone,
      
      message:Message,
    
    }

    axios.post("http://157.66.191.24:3089/website/add_agent_contact_us",data).then((res)=>{
      swal(res.data.msg, {
        icon: "success",
      });
    }).catch((error)=>{
    swal(error.response.data.msg, {
        icon: "error",
      });
    })
   
    }

    const addleads = (item) => {
      if (!loginid) {
        swal({
          title: "Please Login First!",
          icon: "error",
        }).then(() => {
          setTimeout(() => {
            Navigate("/login");
          }, 2000);
        });
        return;
      }
      const data = {
        userId: loginid,
        propertyId: item,
        lead_status: "1",
        favourite_status: "1",
      };
  
      axios
        .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
        .then((res) => {
          swal({
            title: "Your Details Share With Our Expert",
            icon: "success",
          });
        })
        .catch(() => {});
    };
    const maskMobileNumber = number => 
      number ? `XXXXXX${number.replace(/\D/g, '').slice(-4)}` : number;
  
  return (
    <>
      <section className="flat-title flat-title52">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" to="/">
                    Home
                  </Link>
                  <span>User Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-agent-detail wg-tabs flat-agent flat-agent-sidebar ">
        <div className="container7">
          <div className="row flex">
            <div className="col-lg-8">
              <div className="post">
                <div className="box flex ">
                  <div className="images relative flex-none ">
                    {AgentData?.user_image ? (
                      <img
                        style={{
                          height: "210px",
                          width: "350px",
                          borderRadius: "5px",
                        }}
                        src={
                          `http://157.66.191.24:3089/uploads/` +
                          AgentData?.user_image
                        }
                        alt="images"
                      />
                    ) : (
                      <img
                        src="assets/images/img-box/agents-detail.jpg"
                        alt="images"
                      />
                    )}
                  </div>
                  <div className="content ">
                    <div className="titles fs-22 fw-7 lh-33 text-capitalize">
                      {AgentData?.name}
                    </div>

                    <div className="sub-text flex">
                      <p className>Company at </p>
                      <span className="fw-7 font-2 text-color-2">
                        {AgentData?.company_name
                          ? AgentData?.company_name
                          : "JustThing"}
                      </span>
                    </div>

                    <div className="icon-group">
                      <div className="icon-phone link-style-1">
                        <a
                          href={`tel:${AgentData?.mobile_no}`}
                          className=" fw-7 font-2 text-color-3"
                        >
                          
                          {maskMobileNumber(AgentData?.mobile_no)}
                        </a>
                      </div>
                      {AgentData?.total_experience_year ? (
                        <div className="icon-map">
                          <a className="font-2 ">
                            {AgentData?.total_experience_year} Years Experience{" "}
                            {AgentData?.language
                              ? `, Languages- ` + AgentData?.language
                              : null}
                          </a>
                        </div>
                      ) : null}

                      {AgentData?.hobbies ? (
                        <div className="icon-map">
                          <a className="font-2 ">
                            {AgentData?.hobbies
                              ? `Hobbies- ` + AgentData?.hobbies
                              : null}{" "}
                            {AgentData?.employee_working
                              ? `, Employee Working- ` +
                                AgentData?.employee_working
                              : null}
                          </a>
                        </div>
                      ) : null}

                      {AgentData?.specialization ? (
                        <div className="icon-map">
                          <a className="font-2 ">
                            Specialization- {AgentData?.specialization}
                          </a>
                        </div>
                      ) : null}

                      <div className="icon-email">
                        <a
                          href={`mailto:${AgentData?.email}`}
                          className="font-2 "
                        >
                          {AgentData?.email
                            ? AgentData?.email
                            : "justthing@gmail.com"}
                        </a>
                      </div>

                      <div className="icon-map">
                        {AgentData?.office_address} {AgentData?.city_name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-text">
                  <h3 className="title-">About {AgentData?.name}</h3>
                  <p className="text-1 text-color-2">
                    {AgentData?.about}
                  </p>
                  {/* <p className="text-color-2">
                    Aliquam non lorem consequat, luctus dui et, auctor nisi.
                    Aenean placerat sapien at augue lacinia, non semper urna
                    tempor. Mauris sit amet elit orci.
                  </p> */}
                </div>
                 <div className="flat-tabs">
                  <div className="box-tab">
                    <ul className="menu-tab tab-title flex ">
                    <li
                        onClick={() => {
                          setBuy(3);
                        }}
                        
                        className={Buy === 3 ? "item-title style" : "item-title active" }
                      >
                        <h3 className="inner">All</h3>
                      </li>
                    <li
                        onClick={() => {
                          setBuy(1);
                        }}
                        
                        className={Buy === 1 ? "item-title active" : "item-title style" }
                      >
                        <h3 className="inner">For buy </h3>
                      </li>
                      <li
                        onClick={() => {
                          setBuy(2);
                        }}
                        className={Buy === 2 ? "item-title active" :  "item-title style"}
                      >
                        <h3 className="inner">For rent</h3>
                      </li>
                     
                    </ul>
                  </div>

                  <div className="" style={{overflow:'scroll',height:'600px', overflowX:'hidden',scrollbarWidth:'none'}}>
                    {AgentPropertyData?.length > 0 ? (
                      AgentPropertyData?.map((data) => {
                        return (
                          <div className="content-inner">
                            <div className="wrap-item wg-dream flat-properties-rent">
                              <div className="box box-dream flex hv-one">
                                <div className="image-group relative">
                                  {/* <span className="featured fs-12 fw-6">
                                    For {data?.property_listing_type}
                                  </span> */}
 <span className="featured fs-12 fw-6">
                                For {data?.property_listing_type}
                              </span>
                           <span className="featured style fs-12 fw-6">
                                {data?.building_type_one}
                              </span> 
                                  <span className="icon-bookmark">
                                    <i className="far fa-bookmark" />
                                  </span>
                                  <div
                                    id="carousel5"
                                    className="carousel slide swiper-z propertylistslider"
                                    data-ride="carousel"
                                  >
                                    <div className="item active">
                                      <AwesomeSlider
                                        style={{
                                          "--slider-height-percentage": "269px",
                                          "--slider-width-percentage": "284px",
                                          "--organic-arrow-height": "17px",
                                          "--organic-arrow-color": "#fff",
                                          "--animation-duration": "100ms",

                                          "--control-button-opacity": 1,
                                          "--animation-duration": "100ms",
                                        }}
                                        bullets={false}
                                        mobileTouch={true}
                                        // animation="cubeAnimation"
                                      >
                                        {data?.images?.map(
                                          (imageName, index) => (
                                            <div
                                              key={index}
                                              data-src={`http://157.66.191.24:3089/uploads/${imageName}`}
                                            />
                                          )
                                        )}
                                      </AwesomeSlider>
                                    </div>
                                  </div>
                                </div>
                                <div className="content">
                                

                                  <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  localStorage.setItem(
                                    "ListingId",
                                    data?.propertyId
                                  );
                                  Navigate("/PropertyDetail");
                                }}
                              >
                                <h3 className="link-style-1">
                                  <Link
                                    className="text-capitalize"
                                    onClick={() => {
                                      localStorage.setItem(
                                        "ListingId",
                                        data?.propertyId
                                      );
                                    }}
                                    to="/PropertyDetail"
                                  >
                                    {data?.building_name}
                                  </Link>
                                </h3>
                                <div className="icon-box">
                                  <div className="icons icon-1 flex">
                                    <span>
                                      {data?.building_type_two} in{" "}
                                      {data?.locality}
                                      
                                    </span>
                                  </div>
                                  <div className="money fs-20 fw-8 font-2 text-color-3">
                                    <Link
                                      onClick={() => {
                                        localStorage.setItem(
                                          "ListingId",
                                          data?.propertyId
                                        );
                                      }}
                                      to="/PropertyDetail"
                                    >
                                      ₹
                                     
                                      {data?.price
                                        ? `${(data?.price / 100000)?.toFixed(
                                            2
                                          )} L`
                                        : `${(
                                            data?.rent_amount / 100000
                                          )?.toFixed(2)} L`}
                                    </Link>
                                  </div>
                                  <div className="box flex" style={{boxShadow:'none'}}>
                                    <ul
                                      style={{
                                        width: "50%",
                                        float: "left",
                                        marginTop: "-20px",
                                        marginLeft: "-16px",
                                      }}
                                    >
                                      <li className="flex" >
                                        <span className="one fw-6">
                                          {data?.area
                                            ? data?.area
                                            : data?.plotType}{" "}
                                          {data?.area_type
                                            ? data?.area_type
                                            : data?.plotArea}{" "}
                                        </span>
                                      </li>
                                      <li className="flex p-12">
                                        <span className="two">
                                          Built-up Area
                                        </span>
                                      </li>
                                    </ul>
                                    <ul
                                      style={{
                                        width: "50%",
                                        float: "left",
                                        marginTop: "-20px",
                                        marginLeft: "-16px",
                                      }}
                                    >
                                      <li className="flex">
                                        <span className="one fw-6">
                                          {data?.possession_status
                                            ? data?.possession_status
                                            : "Not Available"}
                                        </span>
                                      </li>
                                      <li className="flex p-12">
                                        <span className="two">
                                          Possession Status
                                        </span>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="text-address mt-3">
                                    <p className="p-12">
                                      {data?.property_description?.slice(
                                        0,
                                        100
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                                  {loginid ? (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a
                              onClick={(event) => {
                                event.preventDefault(); 
                                addleads(data?._id); 
                                window.open(
                                  `https://wa.me/${data?.mobile_no}`,
                                  "_blank"
                                ); 
                              }}
                              href={`https://wa.me/${data?.mobile_no}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sc-buttonborder btn-icon mycolor"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/whatsappicon.svg"
                                alt="WhatsApp Icon"
                              />
                              <span> Whatsapp</span>
                            </a>
                          </div>

                          <div
                            className="flat-bt-top sc-btn-top"
                            style={{ marginLeft: "5%" }}
                          >
                            <a
                              onClick={(event) => {
                                event.preventDefault(); 
                                addleads(data?._id); 
                                window.location.href = `tel:${data?.mobile_no}`; 
                              }}
                              href={`tel:${data?.mobile_no}`}
                              className="sc-button btn-icon"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/calls.svg"
                                alt="Call Icon"
                              />
                              <span>Contact Us</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a href="#"
                              onClick={() => addleads()}
                              className="sc-buttonborder btn-icon mycolor"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/whatsappicon.svg"
                              />
                              <span> Whatsapp</span>
                            </a>
                          </div>
                          <div
                            className="flat-bt-top sc-btn-top"
                            style={{ marginLeft: "5%" }}
                          >
                            <a
                              onClick={() => addleads()}
                              className="sc-button btn-icon "
                              href="#"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/calls.svg"
                              />
                              <span>Contact Us</span>
                            </a>
                          </div>
                        </div>
                      )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <h2>
                        <img
                       width={100}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                        </h2>
                        <h3 className="mt-3">No Property Found</h3>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="group-button-view ">
                  <Link
                    className="sc-button btn-icon2 btn-1 one btn-svg center"
                    to="/PropertyListSidebar"
                  >
                    <span>View all my listing</span>
                    <svg
                      width={18}
                      height={10}
                      viewBox="0 0 14 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 1L13 3.5M13 3.5L10.5 6M13 3.5H1"
                        stroke="#FFA920"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="side-bar side-bar-1">
                <div className="inner-side-bar">
                  <div className="widget-tour widget-rent bg-23">
                    <h3 className="title-tour">Contact Us for info</h3>
                    <div className="flat-tabs style2">
                    {loginid ? (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a
                              onClick={(event) => {
                                event.preventDefault(); 
                                addleads(AgentData?._id); 
                                window.open(
                                  `https://wa.me/${AgentData?.mobile_no}`,
                                  "_blank"
                                ); 
                              }}
                              href={`https://wa.me/${AgentData?.mobile_no}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sc-buttonborder btn-icon mycolor"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/whatsappicon.svg"
                                alt="WhatsApp Icon"
                              />
                              <span> Whatsapp</span>
                            </a>
                          </div>

                          <div
                            className="flat-bt-top sc-btn-top"
                            style={{ marginLeft: "5%" }}
                          >
                            <a
                              onClick={(event) => {
                                event.preventDefault(); 
                                addleads(AgentData?._id); 
                                window.location.href = `tel:${AgentData?.mobile_no}`; 
                              }}
                              href={`tel:${AgentData?.mobile_no}`}
                              className="sc-button btn-icon"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/calls.svg"
                                alt="Call Icon"
                              />
                              <span>Contact Us</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a href="#"
                              onClick={() => addleads()}
                              className="sc-buttonborder btn-icon mycolor"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/whatsappicon.svg"
                              />
                              <span> Whatsapp</span>
                            </a>
                          </div>
                          <div
                            className="flat-bt-top sc-btn-top"
                            style={{ marginLeft: "5%" }}
                          >
                            <a
                              onClick={() => addleads()}
                              className="sc-button btn-icon "
                              href="#"
                            >
                              <img
                                width={20}
                                height={20}
                                src="assets/images/icon/calls.svg"
                              />
                              <span>Contact Us</span>
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="content-tab">
                        <div className="content-inner tab-content"></div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-rent style bg-23">
                    <h3 className="widget-title title-contact">
                      Contact seller
                    </h3>
                    <div className="author-box flex align-center">
                      <div className="image-author flex-none">
                        {AgentData?.user_image ? (
                          <img
                            src={
                              `http://157.66.191.24:3089/uploads/` +
                              AgentData?.user_image
                            }
                            alt="images"
                          />
                        ) : (
                          <img
                            src="assets/images/author/author-footer.jpg"
                            alt="images"
                          />
                        )}
                      </div>
                      <div className="content">
                        <p className="text-color-2">{AgentData?.name}</p>
                        <h5 className="link-style-1">
                          <a href={`tel:${AgentData?.mobile_no}`}>
                            
                            {maskMobileNumber(AgentData?.mobile_no)}
                          </a>
                        </h5>
                        <a
                          className="fs-12 lh-18"
                          href={`mailto:${AgentData?.email}`}
                        >
                          {AgentData?.email
                            ? AgentData?.email
                            : "justthing@gmail.com"}
                        </a>
                      </div>
                    </div>
                    <div className="comments">
                    <div className="comment-form">
                        <form onSubmit={ContactusDta}>
                          <div className="wd-find-select">
                            <fieldset className>
                              <input onChange={((e)=>{setName(e.target.value)})}
                            type="text" value={Name} 
                               
                                className
                                name="text"
                                placeholder="Full name *"
                                required
                              />
                            </fieldset>
                            <fieldset className>
                              <input
                               value={Phone} onChange={((e)=>{setPhone(e.target.value)})}
                               type="tel" maxLength={10} minLength={10} 
                                className
                                name="tel"
                                placeholder="Phone number *"
                                required
                              />
                            </fieldset>
                            <fieldset className>
                              <input
                                value={Email} onChange={((e)=>{setEmail(e.target.value)})}
                              type="email"
                                className
                                name="email"
                                placeholder="Email address"
                                required
                              />
                            </fieldset>
                            <fieldset className="message-wrap">
                              <textarea
                              required value={Message} onChange={((e)=>{setMessage(e.target.value)})}
                                name="message"
                                rows={4}
                                tabIndex={4}
                                placeholder="Your mesage *"
                                defaultValue={""}
                              />
                            </fieldset>
                            <div className="button-box sc-btn-top center flex justify-space">
                              <button type="submit" className="sc-button btn-svg">
                                <span>Send message</span>
                                <svg
                                  width={18}
                                  height={18}
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1.125 6.5025V12.9375C1.125 13.5342 1.36205 14.1065 1.78401 14.5285C2.20597 14.9504 2.77826 15.1875 3.375 15.1875H14.625C15.2217 15.1875 15.794 14.9504 16.216 14.5285C16.6379 14.1065 16.875 13.5342 16.875 12.9375V6.5025L10.179 10.6223C9.82443 10.8404 9.4163 10.9559 9 10.9559C8.5837 10.9559 8.17557 10.8404 7.821 10.6223L1.125 6.5025Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.875 5.181V5.0625C16.875 4.46576 16.6379 3.89347 16.216 3.47151C15.794 3.04955 15.2217 2.8125 14.625 2.8125H3.375C2.77826 2.8125 2.20597 3.04955 1.78401 3.47151C1.36205 3.89347 1.125 4.46576 1.125 5.0625V5.181L8.4105 9.6645C8.58778 9.77357 8.79185 9.83132 9 9.83132C9.20815 9.83132 9.41222 9.77357 9.5895 9.6645L16.875 5.181Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-contact2 relative">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section">
                <h2>
                  Find for your dream home and increase your investment
                  opportunities
                </h2>
                <p className="text-color-2 font-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  sed tristique metus proin id lorem odio
                </p>
                <div className="button-footer">
                  <Link className="sc-button center btn-icon" to="/ContactUs">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 6.75C2.25 15.034 8.966 21.75 17.25 21.75H19.5C20.0967 21.75 20.669 21.5129 21.091 21.091C21.5129 20.669 21.75 20.0967 21.75 19.5V18.128C21.75 17.612 21.399 17.162 20.898 17.037L16.475 15.931C16.035 15.821 15.573 15.986 15.302 16.348L14.332 17.641C14.05 18.017 13.563 18.183 13.122 18.021C11.4849 17.4191 9.99815 16.4686 8.76478 15.2352C7.53141 14.0018 6.58087 12.5151 5.979 10.878C5.817 10.437 5.983 9.95 6.359 9.668L7.652 8.698C8.015 8.427 8.179 7.964 8.069 7.525L6.963 3.102C6.90214 2.85869 6.76172 2.6427 6.56405 2.48834C6.36638 2.33397 6.1228 2.25008 5.872 2.25H4.5C3.90326 2.25 3.33097 2.48705 2.90901 2.90901C2.48705 3.33097 2.25 3.90326 2.25 4.5V6.75Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Contact Seller</span>
                  </Link>
                </div>
              </div>
              <div className="mark-img">
                <img src="assets/images/mark/mark-contact2.png" alt="images" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileDetails;
