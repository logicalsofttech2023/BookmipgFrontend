import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import AwesomeSlider from "react-awesome-slider";
import swal from "sweetalert";
function AgenciesDetails() {
  const Navigate = useNavigate();
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Message, setMessage] = useState();
  const [agenciesdata, setagenciesdata] = useState();
  const [developerdata, setdeveloperdata] = useState();
  let agencisesId = secureLocalStorage.getItem("agencisesId");
  const loginid = secureLocalStorage.getItem("loginuserid");
  useEffect(() => {
    window.scrollTo(0, 0);
    GetAgenciesData();
  }, [0]);
  const GetAgenciesData = () => {
    const userdata = {
      userId: agencisesId,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}website/user_profile`, userdata)
      .then((response) => {
        setagenciesdata(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    GetDeveloperData();
  }, [0]);
  const GetDeveloperData = () => {
    const userdata = {
      userId: agencisesId,
    };
    axios
      .post(`${process.env.REACT_APP_API_KEY}website/get_developer_project`, userdata)
      .then((response) => {
        setdeveloperdata(response.data.data);
      })
      .catch((error) => {});
  };

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
      .post(`${process.env.REACT_APP_API_KEY}website/add_lead_property`, data)
      .then((res) => {
        swal({
          title: "Your Details Share With Our Expert",
          icon: "success",
        });
      })
      .catch(() => {});
  };

  const ContactusDta = (e) => {
    e.preventDefault();

    const data = {
      agentId: agencisesId,
      name: Name,
      email: Email,
      mobile_no: Phone,

      message: Message,
    };

    axios
      .post(`${process.env.REACT_APP_API_KEY}website/add_agent_contact_us`, data)
      .then((res) => {
        swal(res.data.msg, {
          icon: "success",
        });
      })
      .catch((error) => {
        swal(error.response.data.msg, {
          icon: "error",
        });
      });
  };
  const maskMobileNumber = number => 
    number ? `XXXXXX${number.replace(/\D/g, '').slice(-4)}` : number;
  return (
    <>
      <section className="flat-title flat-title52">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" to="/">
                    Home
                  </Link>
                  <span>Agencie Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-agencies-detail wg-tabs ">
        <div className="container6">
          <div className="row flex">
            <div className="col-lg-8">
              <div className="post">
                <div className="images relative flex-none ">
                  {agenciesdata?.user_image ? (
                    <img
                      style={{
                        height: "299px",
                        width: "100%",
                        borderRadius: "5px",
                      }}
                      src={
                        `http://157.66.191.24:3089/uploads/` +
                        agenciesdata?.user_image
                      }
                      alt="images"
                    />
                  ) : (
                    <img
                      src="assets/images/img-box/agencies-detail-1.jpg"
                      alt="images"
                    />
                  )}
                </div>
                <div className="box-avatar flex">
                  <div className="avatar flex-none">
                    {agenciesdata?.user_image ? (
                      <img
                        className="img-border"
                        style={{ height: "190px", width: "190px" }}
                        src={
                          `http://157.66.191.24:3089/uploads/` +
                          agenciesdata?.user_image
                        }
                        alt="images"
                      />
                    ) : (
                      <img
                        className="img-border"
                        src="assets/images/img-box/agencies-detail-avatar.jpg"
                        alt="images"
                      />
                    )}
                  </div>
                  <div className="content ">
                    <div className="title-avatar fs-30 fw-7 lh-45">
                      {agenciesdata?.name}
                    </div>
                    <p className="icon-p text-color-4">
                      2118 Thornridge Cir. Syracuse, Connecticut 35624
                    </p>
                  </div>
                </div>
                <div className="wrap-description">
                  <h3 className="titles title-1">Contact Infomation</h3>
                  <ul className="inner flex">
                    <li className="one fw-6">Company :</li>
                    <li className="two">
                      {agenciesdata?.company_name
                        ? agenciesdata?.company_name
                        : "Na"}
                    </li>

                    <li className="one fw-6">City :</li>
                    <li className="two">{agenciesdata?.city_name}</li>
                    <li className="one fw-6">Project :</li>
                    <li className="two">{agenciesdata?.project_count}</li>
                    {/* <li className="one fw-6">Hotline:</li>
                  <li className="two"><a href="tel:0123456789">+7-445-556-8337</a></li> */}
                    <li className="one fw-6">Phone :</li>
                    <li className="two">
                      <a href="tel:0123456789">
                      {maskMobileNumber(agenciesdata?.mobile_no)}
                        
                        </a>
                    </li>
                    {/* <li className="one fw-6">Fax:</li>
                  <li className="two">+7-445-556-8337</li> */}
                    <li className="one fw-6">Email :</li>
                    <li className="two">
                      <a href="mailto:${}">
                        {agenciesdata?.email
                          ? agenciesdata?.email
                          : "Justthing@gmail.com"}
                      </a>
                    </li>
                  </ul>
                  <div className="box-text">
                    <h3 className="titles title-2">
                      About {agenciesdata?.name}
                    </h3>
                    <p className="text-1 text-color-2">
                      {agenciesdata?.about}
                    </p>
                    {/* <p className="text-color-2">
                      Aliquam non lorem consequat, luctus dui et, auctor nisi.
                      Aenean placerat sapien at augue lacinia, non semper urna
                      tempor. Mauris sit amet elit orci.
                    </p> */}
                  </div>
                  <div className="box-map">
                    <h3 className="titles title-2">Location</h3>
                    <iframe
                      className="map-content"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d90.47477022812872!3d23.77494577893369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flat-tabs">
                  <div className="box-tab">
                    <ul className="menu-tab tab-title flex ">
                      <li className="item-title active">
                        <h3 className="inner">For Sale</h3>
                      </li>
                      {/* <li className="item-title style">
                      <h3 className="inner">For sale </h3>
                    </li> */}
                    </ul>
                  </div>
                  <div className="content-tab">
                    <div
                      className="content-inner tab-content wg-dream "
                      style={{
                        overflow: "scroll",
                        height: "600px",
                        overflowX: "hidden",
                        scrollbarWidth: "none",
                      }}
                    >
                      {developerdata?.length > 0 ? (
                        <div className=" wrap-item form-wg flex flex-wrap">
                          {developerdata?.map((data) => {
                            return (
                              <div className="box box-dream hv-one wg-box">
                                <div className="image-group relative ">
                                  <span className="featured fs-12 fw-6">
                                    For {data?.possession_status}
                                  </span>
                                  <span className="featured style fs-12 fw-6">
                                    {data?.bedrooms}
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
                                      secureLocalStorage.setItem(
                                        "ListingId",
                                        data?.projectId
                                      );
                                      Navigate("/ProjectDetails");
                                    }}
                                  >
                                    <h3 className="link-style-1">
                                      <Link to="#">{data?.project_name}</Link>{" "}
                                    </h3>
                                    <div className="text-address mb-1">
                                      <p className="p-12">
                                        {data?.bedrooms} {data?.project_type} in{" "}
                                        {data?.locality}
                                      </p>
                                    </div>
                                    <div className="money fs-18 fw-6 text-color-3 mb-1">
                                      <Link to="#">
                                        ₹{" "}
                                        {(data?.start_price / 100000)?.toFixed(
                                          2
                                        )}{" "}
                                        -{" "}
                                        {(data?.end_price / 100000)?.toFixed(2)}{" "}
                                        Lac
                                      </Link>
                                    </div>

                                    <div className="mt-1 mb-2 fw-6 ">
                                      <Link className="link-style-1" to="#">
                                        Project Size{" "}
                                        {data?.minimum_project_size} -{" "}
                                        {data?.maximum_project_size}{" "}
                                        {data?.project_size}{" "}
                                      </Link>
                                    </div>
                                    <div className="mt-1 mb-3 fw-6 ">
                                      <Link className="link-style-1" to="#">
                                        Configurations{" "}
                                        {data?.minimum_configurations} -{" "}
                                        {data?.maximum_configurations}{" "}
                                        {data?.configurations}
                                      </Link>
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
                                          className="sc-buttonborder mycolor btn-icon"
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
                                        <a
                                          href="#"
                                          onClick={() => addleads()}
                                          className="sc-buttonborder mycolor btn-icon "
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
                                  {/* </div> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div
                          className="box box-dream hv-one wg-box"
                          style={{ textAlign: "center", marginBottom: "20px" }}
                        >
                          <h2>
                          <img
                       width={150}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                          </h2>
                          <h3 className="mt-3">No Data Found</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="group-button-view ">
                <a className="sc-button btn-icon2 btn-1 one btn-svg center" href="properties-grid.html">
                  <span>View all properties</span>
                  <svg width={18} height={10} viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 1L13 3.5M13 3.5L10.5 6M13 3.5H1" stroke="#FFA920" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>  */}
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="side-bar side-bar-1">
                <div className="inner-side-bar">
                  <div className="widget-rent">
                    <div className="flat-tabs style2">
                      <div className="form-s2">
                        <div className="comments">
                          <div className="comment-form">
                            <form onSubmit={ContactusDta}>
                              <div className="wd-find-select">
                                <h3 class="widget-title title-search">
                                  Connect with justthing experts
                                </h3>
                                <fieldset className>
                                  <input
                                    onChange={(e) => {
                                      setName(e.target.value);
                                    }}
                                    type="text"
                                    value={Name}
                                    className
                                    name="text"
                                    placeholder="Full name *"
                                    required
                                  />
                                </fieldset>
                                <fieldset className>
                                  <input
                                    value={Phone}
                                    onChange={(e) => {
                                      setPhone(e.target.value);
                                    }}
                                    type="tel"
                                    maxLength={10}
                                    minLength={10}
                                    className
                                    name="tel"
                                    placeholder="Phone number *"
                                    required
                                  />
                                </fieldset>
                                <fieldset className>
                                  <input
                                    value={Email}
                                    onChange={(e) => {
                                      setEmail(e.target.value);
                                    }}
                                    type="email"
                                    className
                                    name="email"
                                    placeholder="Email address"
                                    required
                                  />
                                </fieldset>
                                <fieldset className="message-wrap">
                                  <textarea
                                    required
                                    value={Message}
                                    onChange={(e) => {
                                      setMessage(e.target.value);
                                    }}
                                    name="message"
                                    rows={4}
                                    tabIndex={4}
                                    placeholder="Your mesage *"
                                    defaultValue={""}
                                  />
                                </fieldset>
                                <div className="button-box sc-btn-top center flex justify-space">
                                  <button
                                    type="submit"
                                    className="sc-button btn-svg"
                                  >
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
                        {/* End Job  Search Form*/}
                      </div>
                    </div>
                  </div>

                  <div className="widget widget-ads">
                    {developerdata?.length > 0 ? (
                      developerdata?.slice(0, 1)?.map((data) => {
                        return (
                          <div
                            className="box-ads"
                            style={{
                              cursor: "pointer",
                              backgroundImage: `url(http://157.66.191.24:3089/uploads/${data?.images[0]})`,
                            }}
                            onClick={() => {
                              secureLocalStorage.setItem(
                                "ListingId",
                                data?.projectId
                              );
                              Navigate("/ProjectDetails");
                            }}
                          >
                            <div className="content relative z-2">
                              <h3 className="link-style-3">
                                <a href="#">
                                  {data?.project_name} {data?.project_type}
                                </a>{" "}
                              </h3>
                              <div className="text-addres ">
                                <p className="p-12 text-color-1 icon-p">
                                  {data?.locality} {data?.city_name}
                                </p>
                              </div>
                              <div className="star flex">
  {[...Array(data?.rating)]?.map((_, index) => (
      <svg key={index} 
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ enableBackground: "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                <g>
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />
                                </g>
                              </g>
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                              <g />
                            </svg>
  ))}
</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <h2>
                        <img
                       width={150}
                       src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                       alt="No Property Found"
                     />
                        </h2>
                        <h3 className="mt-3">No Property Found</h3>
                      </div>
                    )}
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
                  <a className="sc-button center btn-icon" href="contact.html">
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
                  </a>
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
}

export default AgenciesDetails;
