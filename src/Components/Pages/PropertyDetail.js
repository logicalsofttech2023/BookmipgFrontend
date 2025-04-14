import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import swal from "sweetalert";
import ShareProperty from "./ShareProperty";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  FaTemperatureHigh,
  FaTv,
  FaShower,
  FaWifi,
  FaBatteryFull,
  FaCreditCard,
} from "react-icons/fa"; // Importing icons for each amenity

const PropertyDetail = () => {
  const [ratings, setratings] = useState();
  const [Listingdata, setListingdata] = useState();
  const [messgae, setmessgae] = useState();
  const [Reviews, setReviews] = useState();
  const [count, setcount] = useState();
  const [favdata, setfavdata] = useState();
  const navigate = useNavigate();
  let listingID = secureLocalStorage.getItem("ListingId");
  const loginid = secureLocalStorage.getItem("loginuserid");
  useEffect(() => {
    GetProperty();
    window.scrollTo(0, 0);
  }, [0]);

  const GetProperty = () => {
    const data = {
      propertyId: listingID,
    };

    axios
      .post("http://157.66.191.24:3089/website/get_Property_details", data)
      .then((res) => {
        setListingdata(res?.data?.data[0]);
      })
      .catch((error) => {});
  };

  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const selectedFileNames = selectedFiles.map((file) => file.name);

    setImages([...images, ...selectedFiles]);
    setImageNames([...imageNames, ...selectedFileNames]);
  };

  const handleRatingClick = (rating) => {
    setratings(rating);
  };

  const ReviewDetails = (e) => {
    e.preventDefault();
    if (!loginid) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
      return;
    }
    if (ratings === undefined) {
      toast.error("Please select a rating");
      return;
    }

    let formData;

    if (images.length > 0) {
      formData = new FormData();
      formData.append("userId", loginid);
      formData.append("propertyId", listingID);
      formData.append("message", messgae);
      formData.append("review", ratings);

      images.forEach((image) => {
        formData.append("images", image);
      });
    } else {
      formData = {
        userId: loginid,
        propertyId: listingID,
        message: messgae,
        review: ratings,
      };
    }

    axios
      .post("http://157.66.191.24:3089/website/add_review", formData)
      .then((res) => {
        GetReview();
        swal(res.data.msg, {
          icon: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.msg);
        }
      });
  };

  useEffect(() => {
    GetReview();
  }, [0]);
  const GetReview = () => {
    const data = {
      propertyId: listingID,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_review", data)
      .then((res) => {
        setReviews(res.data.data);
        setcount(res?.data?.data?.length);
      })
      .catch((error) => {});
  };

  const addFavorite = (item) => {
    if (!loginid) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
      return;
    }
    const data = {
      userId: loginid,
      propertyId: listingID,
      lead_status: "1",
      favourite_status: item,
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
      .then((res) => {
        GetProperty();
        Getuserfavorite();
        toast.success("Favorite status updated");
      })
      .catch(() => {});
  };

  const addleads = (item) => {
    if (!loginid) {
      swal({
        title: "Please Login First!",
        icon: "error",
      }).then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
      return;
    }
    const data = {
      userId: loginid,
      propertyId: listingID,
      lead_status: "1",
      favourite_status: item,
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
      .then((res) => {
        swal({
          title: "Your Details Share With Our Expert",
          icon: "success",
        });
      })
      .catch((error) => {
        swal({
          title: error.response.data.msg,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    Getuserfavorite();
  }, [0]);
  const Getuserfavorite = () => {
    const data = {
      userId: loginid,
      propertyId: listingID,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_favourite_property", data)
      .then((res) => {
        setfavdata(res?.data?.data[0]);
      })
      .catch((error) => {});
  };

  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [text, setText] = useState();
  const contactseller = (e) => {
    e.preventDefault();
    const data = {
      propertyId: listingID,
      name: fullname,
      email: email,
      mobile_no: phonenumber,
      message: text,
    };

    axios
      .post("http://157.66.191.24:3089/website/add_seller_contact_us", data)
      .then((res) => {
        swal({
          title: `${res.data.msg}`,
          icon: "success",
        });
      })
      .catch((error) => {
        swal({
          title: `${error.response.data.msg}`,
          icon: "error",
        });
      });
  };

  const maskMobileNumber = (number) =>
    number ? `XXXXXX${number.replace(/\D/g, "").slice(-4)}` : number;

  const shareUrl = window.location.href;
  const title = Listingdata?.building_name;

  const [showAll, setShowAll] = useState(false);

  const amenities = [
    { icon: <FaTemperatureHigh />, label: "AC" },
    { icon: <FaWifi />, label: "Free Wifi" },
    { icon: <FaTv />, label: "TV" },
    { icon: <FaBatteryFull />, label: "Power backup" },
    { icon: <FaShower />, label: "Geyser" },
    { icon: <FaCreditCard />, label: "Card payment" },
    { icon: <FaRegCheckCircle />, label: "CCTV cameras" },
    { icon: <FaRegCheckCircle />, label: "Ticket tour assistance" },
    { icon: <FaRegCheckCircle />, label: "Reception" },
    { icon: <FaRegCheckCircle />, label: "Designated smoking area" },
    { icon: <FaRegCheckCircle />, label: "24/7 check-in" },
    { icon: <FaRegCheckCircle />, label: "Free parking" },
    { icon: <FaRegCheckCircle />, label: "Shuttle service" },
    { icon: <FaRegCheckCircle />, label: "Express check-in/check-out" },
    { icon: <FaRegCheckCircle />, label: "Private Check-in/Check-out" },
    { icon: <FaRegCheckCircle />, label: "Luggage assistance" },
    { icon: <FaRegCheckCircle />, label: "Taxi service" },
    { icon: <FaRegCheckCircle />, label: "Daily housekeeping" },
    { icon: <FaRegCheckCircle />, label: "Fire extinguisher" },
    { icon: <FaRegCheckCircle />, label: "First-aid kit" },
  ];

  const visibleAmenities = amenities.slice(0, 6); // Show the first 6 amenities by default
  const hiddenAmenities = amenities.slice(6);

  return (
    <>
      <Toaster />
      <section className="flat-title flat-title52">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" to="/">
                    Home
                  </Link>
                  <span>Room Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-property-detail pt-0">
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrap-house wg-dream flex">
              <div className="box-1">
  <div className="title-heading fs-30 fw-7 lh-45 text-capitalize">
    {Listingdata?.building_name}
  </div>

  <div className="inner flex">
    <p>
      Plot Number 77, 1st street, CLV Nagar, Kanathur, ECR, Chennai
    </p>
  </div>

  {/* Rating Section */}
  <div className="rating-section" style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
    {/* Star Icons */}
    <div style={{ display: 'flex', marginRight: '10px' }}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{
            color: index < 5 ? '#f5a623' : '#ccc', // Fill stars up to 4.9
            fontSize: '18px',
            marginRight: '2px',
          }}
        >
          ★
        </span>
      ))}
    </div>
    {/* Rating Value */}
    <span style={{ fontSize: '16px', fontWeight: '600', color: '#0c0a15' }}>4.9</span>
  </div>
</div>

                <div className="box-2 text-end">
                  <div className="icon-boxs flex">
                    {favdata?.favourite_status == "1" ? (
                      <a onClick={() => addFavorite("0")} href="#">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 18 18"
                          fill="#FFA920"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z"
                            stroke="#FFA920"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <a onClick={() => addFavorite("1")} href="#">
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z"
                            stroke="#8E8E93"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}

                    <a data-toggle="modal" data-target="#popup_bid231" href="#">
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.41251 8.18025C5.23091 7.85348 4.94594 7.59627 4.60234 7.44899C4.25874 7.3017 3.87596 7.27268 3.51408 7.36648C3.1522 7.46029 2.83171 7.6716 2.60293 7.96725C2.37414 8.2629 2.25 8.62616 2.25 9C2.25 9.37384 2.37414 9.73709 2.60293 10.0327C2.83171 10.3284 3.1522 10.5397 3.51408 10.6335C3.87596 10.7273 4.25874 10.6983 4.60234 10.551C4.94594 10.4037 5.23091 10.1465 5.41251 9.81975M5.41251 8.18025C5.54751 8.42325 5.62476 8.70225 5.62476 9C5.62476 9.29775 5.54751 9.5775 5.41251 9.81975M5.41251 8.18025L12.587 4.19475M5.41251 9.81975L12.587 13.8052M12.587 4.19475C12.6922 4.39285 12.8358 4.568 13.0095 4.70995C13.1832 4.85189 13.3834 4.95779 13.5985 5.02146C13.8135 5.08512 14.0392 5.10527 14.2621 5.08072C14.4851 5.05617 14.7009 4.98742 14.897 4.87849C15.093 4.76957 15.2654 4.62264 15.404 4.44631C15.5427 4.26998 15.6448 4.06778 15.7043 3.85154C15.7639 3.63529 15.7798 3.40934 15.751 3.18689C15.7222 2.96445 15.6494 2.74997 15.5368 2.556C15.3148 2.17375 14.9518 1.89385 14.5256 1.77646C14.0995 1.65907 13.6443 1.71356 13.2579 1.92821C12.8715 2.14287 12.5848 2.50056 12.4593 2.92439C12.3339 3.34823 12.3797 3.80436 12.587 4.19475ZM12.587 13.8052C12.4794 13.999 12.4109 14.2121 12.3856 14.4323C12.3603 14.6526 12.3787 14.8756 12.4396 15.0888C12.5005 15.3019 12.6028 15.501 12.7406 15.6746C12.8784 15.8482 13.0491 15.993 13.2429 16.1006C13.4367 16.2083 13.6498 16.2767 13.87 16.302C14.0902 16.3273 14.3133 16.309 14.5264 16.2481C14.7396 16.1872 14.9386 16.0849 15.1122 15.947C15.2858 15.8092 15.4306 15.6385 15.5383 15.4447C15.7557 15.0534 15.8087 14.5917 15.6857 14.1612C15.5627 13.7308 15.2737 13.3668 14.8824 13.1494C14.491 12.932 14.0293 12.8789 13.5989 13.0019C13.1684 13.1249 12.8044 13.4139 12.587 13.8052Z"
                          stroke="#8E8E93"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    {/* <ShareProperty propertyId={listingID} /> */}
                  </div>
                  <div className="moneys fs-30 fw-7 lh-45 text-color-3">
  <span style={{ fontSize: '30px', fontWeight: '700', color: '#0c0a15' }}>
    ₹3739
  </span>
  
  <span
    style={{
      fontSize: '20px',
      fontWeight: '600',
      color: '#6d787d',
      textDecoration: 'line-through',
      marginLeft: '10px',
    }}
  >
    ₹6389
  </span>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container6">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrap-img flex">
                <div className="box-img box-1">
                  {Listingdata?.images[0] ? (
                    <img
                      style={{ height: "540px", borderRadius: "5px" }}
                      className="img-1"
                      src={
                        `http://157.66.191.24:3089/uploads/` +
                        Listingdata?.images[0]
                      }
                      alt="images"
                    />
                  ) : (
                    <img
                      className="img-1"
                      src="http://157.66.191.24:91/assets/images/img-box/property-1.jpg"
                      alt="images"
                    />
                  )}
                </div>
                <div className="box-img box-2">
                  {Listingdata?.video ? (
                    <div class="text-box text-center">
                      <video
                        style={{
                          borderRadius: "5px",
                          objectFit: "cover",
                          height: "262px",
                          width: "100%",
                        }}
                        src={`http://157.66.191.24:3089/uploads/${
                          Listingdata?.video || "default-video.mp4"
                        }`}
                        controls
                        muted
                      />
                    </div>
                  ) : Listingdata?.images[1] ? (
                    <img
                      style={{ height: "262px", borderRadius: "5px" }}
                      className="img-2"
                      src={
                        `http://157.66.191.24:3089/uploads/` +
                        Listingdata?.images[1]
                      }
                      alt="images"
                    />
                  ) : (
                    <img
                      className="img-2"
                      src="http://157.66.191.24:91/assets/images/img-box/property-2.jpg"
                      alt="images"
                    />
                  )}

                  <div className="img-box flex">
                    {Listingdata?.images[2] ? (
                      <img
                        style={{ height: "262px", borderRadius: "5px" }}
                        className="img-3"
                        src={
                          `http://157.66.191.24:3089/uploads/` +
                          Listingdata?.images[2]
                        }
                        alt="images"
                      />
                    ) : (
                      <img
                        className="img-3"
                        src="http://157.66.191.24:91/assets/images/img-box/property-3.jpg"
                        alt="images"
                      />
                    )}
                    <div className="image">
                      {Listingdata?.images[3] ? (
                        <img
                          className="img-4"
                          src={
                            `http://157.66.191.24:3089/uploads/` +
                            Listingdata?.images[3]
                          }
                          alt="images"
                        />
                      ) : (
                        <img
                          className="img-4"
                          src="http://157.66.191.24:91/assets/images/img-box/property-4.jpg"
                          alt="images"
                        />
                      )}
                      <div
                        data-toggle="modal"
                        data-target="#popup_bid23"
                        className="contents z-2 center text-color-1 cursor-pointer"
                      >
                        <svg
                          className="cursor-pointer"
                          width={31}
                          height={24}
                          viewBox="0 0 31 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.6875 17.3125L8.99608 10.0039C9.29207 9.70792 9.64346 9.47313 10.0302 9.31294C10.4169 9.15275 10.8314 9.0703 11.25 9.0703C11.6686 9.0703 12.0831 9.15275 12.4698 9.31294C12.8565 9.47313 13.2079 9.70792 13.5039 10.0039L20.8125 17.3125M18.6875 15.1875L20.6836 13.1914C20.9796 12.8954 21.331 12.6606 21.7177 12.5004C22.1044 12.3403 22.5189 12.2578 22.9375 12.2578C23.3561 12.2578 23.7706 12.3403 24.1573 12.5004C24.544 12.6606 24.8954 12.8954 25.1914 13.1914L29.3125 17.3125M3.8125 22.625H27.1875C27.7511 22.625 28.2916 22.4011 28.6901 22.0026C29.0886 21.6041 29.3125 21.0636 29.3125 20.5V3.5C29.3125 2.93641 29.0886 2.39591 28.6901 1.9974C28.2916 1.59888 27.7511 1.375 27.1875 1.375H3.8125C3.24891 1.375 2.70841 1.59888 2.3099 1.9974C1.91138 2.39591 1.6875 2.93641 1.6875 3.5V20.5C1.6875 21.0636 1.91138 21.6041 2.3099 22.0026C2.70841 22.4011 3.24891 22.625 3.8125 22.625ZM18.6875 6.6875H18.6988V6.69883H18.6875V6.6875ZM19.2187 6.6875C19.2187 6.8284 19.1628 6.96352 19.0632 7.06315C18.9635 7.16278 18.8284 7.21875 18.6875 7.21875C18.5466 7.21875 18.4115 7.16278 18.3118 7.06315C18.2122 6.96352 18.1562 6.8284 18.1562 6.6875C18.1562 6.5466 18.2122 6.41148 18.3118 6.31185C18.4115 6.21222 18.5466 6.15625 18.6875 6.15625C18.8284 6.15625 18.9635 6.21222 19.0632 6.31185C19.1628 6.41148 19.2187 6.5466 19.2187 6.6875Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h3 className="cursor-pointer">Show all</h3>
                        <h3 className="cursor-pointer">
                          {Listingdata?.images?.length} Photos
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container6">
          <div className="row">
            <div className="col-lg-8">
              <div className="post">
                <div className="wrap-text wrap-style">
                  <h3 className="titles">About this room</h3>
                  <p className="text-1 text-color-2">
                    {Listingdata?.property_description}
                  </p>
                  {/* <p className="text-2 text-color-2">
               
              </p> */}
                </div>

                <div className="wrap-overview wrap-style">
                  <h3 className="titles">Amenities</h3>
                  <div className="icon-wrap flex row">
                    {/* Visible Amenities */}
                    {visibleAmenities.map((amenity, index) => (
                      <div
                        className="col-md-4"
                        style={{ marginBottom: 10 }}
                        key={index}
                      >
                        <div>
                          <div className="inner flex">
                            <div className="icon">{amenity.icon}</div>
                            <div className="content Amenities_content">
                              <div className="font-2 fw-7">{amenity.label}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Show More / Less Button */}
                    {showAll && (
                      // Hidden Amenities (show when "Show More" is clicked)
                      <>
                        {hiddenAmenities.map((amenity, index) => (
                          <div
                            className="col-md-4"
                            style={{ marginBottom: 10 }}
                            key={index + visibleAmenities.length}
                          >
                            <div>
                              <div className="inner flex">
                                <div className="icon">{amenity.icon}</div>
                                <div className="content Amenities_content">
                                  <div className="font-2 fw-7">
                                    {amenity.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Show More / Show Less Button */}
                  <div
                    style={{
                      color: "#ee2e24",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "1.5",
                      cursor: "pointer",
                      display: "inline-block",
                      marginBottom: "20px",
                    }}
                    className="text-center"
                    onClick={() => setShowAll(!showAll)}
                  >
                    <span>{showAll ? "Show Less" : "Show More"}</span>
                  </div>
                </div>
                <div
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: "700px",
                  }}
                  className="wrap-review wrap-style"
                >
                  <div className="box-title titles flex align-center justify-space">
                    <div className="inner flex align-center ">
                      <div className="star flex">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          style={{ "enable-background": "new 0 0 512 512" }}
                          xmlSpace="preserve"
                        >
                          <g>
                            {" "}
                            <g>
                              {" "}
                              <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                      </div>
                      <h3>Review</h3>
                      <p className="fw-6">(27 review)</p>
                    </div>
                    <div className="sort-inner flex">
                      <span className="text-color-4">Sort by </span>
                      <a className="newest">Newest</a>
                    </div>
                  </div>
                  <div className="comment-list">
                    <ol className>
                      <li className="flex">
                        <div className="images flex-none">
                          <img
                            src="assets/images/author/author-review-1.jpg"
                            alt="images"
                          />
                        </div>
                        <div className="content">
                          <div className="title-item flex justify-space align-center">
                            <h4>Leslie Alexander</h4>
                            <p className="fs-12 lh-18">April 5, 2023</p>
                          </div>
                          <div className="star flex">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                          </div>
                          <p className="texts text-color-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque at velit eu libero laoreet mattis
                            ac a ipsum. Vivamus efficitur volutpat ante, sed
                            consequat ligula ultricies in.
                          </p>
                          <div className="img-box">
                            <img
                              src="assets/images/img-box/review-3.jpg"
                              alt="images"
                            />
                            <img
                              src="assets/images/img-box/review-2.jpg"
                              alt="images"
                            />
                            <img
                              src="assets/images/img-box/review-3.jpg"
                              alt="images"
                            />
                          </div>
                          <div className="icon-box flex">
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 5.75H9.68749M3.66949 13.0625C3.66124 13.025 3.64849 12.9875 3.63049 12.9515C3.18724 12.0515 2.93749 11.039 2.93749 9.96875C2.93587 8.89238 3.19282 7.83136 3.68674 6.875M3.66949 13.0625C3.72649 13.3362 3.53224 13.625 3.23824 13.625H2.55724C1.89049 13.625 1.27249 13.2365 1.07824 12.599C0.82399 11.7665 0.68749 10.8837 0.68749 9.96875C0.68749 8.804 0.90874 7.69175 1.31074 6.67025C1.54024 6.08975 2.12524 5.75 2.74999 5.75H3.53974C3.89374 5.75 4.09849 6.167 3.91474 6.47C3.83434 6.60234 3.7578 6.73742 3.68674 6.875M3.66949 13.0625H4.63999C5.0027 13.0623 5.36307 13.1205 5.70724 13.235L8.04274 14.015C8.38691 14.1295 8.74728 14.1877 9.10999 14.1875H12.122C12.5855 14.1875 13.0347 14.0022 13.3257 13.6407C14.6143 12.0434 15.3156 10.0523 15.3125 8C15.3125 7.6745 15.2952 7.35275 15.2615 7.03625C15.1797 6.2705 14.4905 5.75 13.721 5.75H11.3765C10.913 5.75 10.6332 5.207 10.8327 4.7885C11.191 4.03444 11.3763 3.20985 11.375 2.375C11.375 1.92745 11.1972 1.49823 10.8807 1.18176C10.5643 0.86529 10.135 0.6875 9.68749 0.6875C9.53831 0.6875 9.39523 0.746763 9.28974 0.852252C9.18425 0.957741 9.12499 1.10082 9.12499 1.25V1.72475C9.12499 2.1545 9.04249 2.57975 8.88349 2.97875C8.65549 3.54875 8.18599 3.97625 7.64374 4.265C6.81128 4.7092 6.0807 5.32228 5.49874 6.065C5.12524 6.5405 4.57924 6.875 3.97474 6.875H3.68674"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Useful</p>
                            </a>
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.62501 9.25H6.31251M12.3305 1.9375C12.3388 1.975 12.3515 2.0125 12.3695 2.0485C12.8128 2.9485 13.0625 3.961 13.0625 5.03125C13.0641 6.10762 12.8072 7.16864 12.3133 8.125M12.3305 1.9375C12.2735 1.66375 12.4678 1.375 12.7618 1.375H13.4428C14.1095 1.375 14.7275 1.7635 14.9218 2.401C15.176 3.2335 15.3125 4.11625 15.3125 5.03125C15.3125 6.196 15.0913 7.30825 14.6893 8.32975C14.4598 8.91025 13.8748 9.25 13.25 9.25H12.4603C12.1063 9.25 11.9015 8.833 12.0853 8.53C12.1657 8.39766 12.2422 8.26258 12.3133 8.125M12.3305 1.9375H11.36C10.9973 1.93772 10.6369 1.87948 10.2928 1.765L7.95726 0.985001C7.61309 0.870526 7.25272 0.812279 6.89001 0.812501H3.87801C3.41451 0.812501 2.96526 0.997751 2.67426 1.35925C1.38572 2.95658 0.684409 4.94774 0.68751 7C0.68751 7.3255 0.70476 7.64725 0.73851 7.96375C0.82026 8.7295 1.50951 9.25 2.27901 9.25H4.62351C5.08701 9.25 5.36676 9.793 5.16726 10.2115C4.80897 10.9656 4.6237 11.7902 4.62501 12.625C4.62501 13.0726 4.8028 13.5018 5.11927 13.8182C5.43574 14.1347 5.86496 14.3125 6.31251 14.3125C6.46169 14.3125 6.60477 14.2532 6.71026 14.1477C6.81575 14.0423 6.87501 13.8992 6.87501 13.75V13.2753C6.87501 12.8455 6.95751 12.4203 7.11651 12.0213C7.34451 11.4513 7.81401 11.0238 8.35626 10.735C9.18872 10.2908 9.9193 9.67772 10.5013 8.935C10.8748 8.4595 11.4208 8.125 12.0253 8.125H12.3133"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Not helpful</p>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="images flex-none">
                          <img
                            src="assets/images/author/author-review-1.jpg"
                            alt="images"
                          />
                        </div>
                        <div className="content">
                          <div className="title-item flex justify-space align-center">
                            <h4>Jenny Wilson</h4>
                            <p className="fs-12 lh-18">April 5, 2023</p>
                          </div>
                          <div className="star flex">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                          </div>
                          <p className="texts text-color-2">
                            Proin sed tellus porttitor, varius mauris vitae,
                            tincidunt augue. Sed consectetur magna elit, sit
                            amet faucibus tortor sodales vitae. Maecenas quis
                            arcu est. Nam sit amet neque vestibulum, fringilla
                            elit sit amet, volutpat nunc.
                          </p>
                          <div className="icon-box flex">
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 5.75H9.68749M3.66949 13.0625C3.66124 13.025 3.64849 12.9875 3.63049 12.9515C3.18724 12.0515 2.93749 11.039 2.93749 9.96875C2.93587 8.89238 3.19282 7.83136 3.68674 6.875M3.66949 13.0625C3.72649 13.3362 3.53224 13.625 3.23824 13.625H2.55724C1.89049 13.625 1.27249 13.2365 1.07824 12.599C0.82399 11.7665 0.68749 10.8837 0.68749 9.96875C0.68749 8.804 0.90874 7.69175 1.31074 6.67025C1.54024 6.08975 2.12524 5.75 2.74999 5.75H3.53974C3.89374 5.75 4.09849 6.167 3.91474 6.47C3.83434 6.60234 3.7578 6.73742 3.68674 6.875M3.66949 13.0625H4.63999C5.0027 13.0623 5.36307 13.1205 5.70724 13.235L8.04274 14.015C8.38691 14.1295 8.74728 14.1877 9.10999 14.1875H12.122C12.5855 14.1875 13.0347 14.0022 13.3257 13.6407C14.6143 12.0434 15.3156 10.0523 15.3125 8C15.3125 7.6745 15.2952 7.35275 15.2615 7.03625C15.1797 6.2705 14.4905 5.75 13.721 5.75H11.3765C10.913 5.75 10.6332 5.207 10.8327 4.7885C11.191 4.03444 11.3763 3.20985 11.375 2.375C11.375 1.92745 11.1972 1.49823 10.8807 1.18176C10.5643 0.86529 10.135 0.6875 9.68749 0.6875C9.53831 0.6875 9.39523 0.746763 9.28974 0.852252C9.18425 0.957741 9.12499 1.10082 9.12499 1.25V1.72475C9.12499 2.1545 9.04249 2.57975 8.88349 2.97875C8.65549 3.54875 8.18599 3.97625 7.64374 4.265C6.81128 4.7092 6.0807 5.32228 5.49874 6.065C5.12524 6.5405 4.57924 6.875 3.97474 6.875H3.68674"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Useful</p>
                            </a>
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.62501 9.25H6.31251M12.3305 1.9375C12.3388 1.975 12.3515 2.0125 12.3695 2.0485C12.8128 2.9485 13.0625 3.961 13.0625 5.03125C13.0641 6.10762 12.8072 7.16864 12.3133 8.125M12.3305 1.9375C12.2735 1.66375 12.4678 1.375 12.7618 1.375H13.4428C14.1095 1.375 14.7275 1.7635 14.9218 2.401C15.176 3.2335 15.3125 4.11625 15.3125 5.03125C15.3125 6.196 15.0913 7.30825 14.6893 8.32975C14.4598 8.91025 13.8748 9.25 13.25 9.25H12.4603C12.1063 9.25 11.9015 8.833 12.0853 8.53C12.1657 8.39766 12.2422 8.26258 12.3133 8.125M12.3305 1.9375H11.36C10.9973 1.93772 10.6369 1.87948 10.2928 1.765L7.95726 0.985001C7.61309 0.870526 7.25272 0.812279 6.89001 0.812501H3.87801C3.41451 0.812501 2.96526 0.997751 2.67426 1.35925C1.38572 2.95658 0.684409 4.94774 0.68751 7C0.68751 7.3255 0.70476 7.64725 0.73851 7.96375C0.82026 8.7295 1.50951 9.25 2.27901 9.25H4.62351C5.08701 9.25 5.36676 9.793 5.16726 10.2115C4.80897 10.9656 4.6237 11.7902 4.62501 12.625C4.62501 13.0726 4.8028 13.5018 5.11927 13.8182C5.43574 14.1347 5.86496 14.3125 6.31251 14.3125C6.46169 14.3125 6.60477 14.2532 6.71026 14.1477C6.81575 14.0423 6.87501 13.8992 6.87501 13.75V13.2753C6.87501 12.8455 6.95751 12.4203 7.11651 12.0213C7.34451 11.4513 7.81401 11.0238 8.35626 10.735C9.18872 10.2908 9.9193 9.67772 10.5013 8.935C10.8748 8.4595 11.4208 8.125 12.0253 8.125H12.3133"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Not helpful</p>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="images flex-none">
                          <img
                            src="assets/images/author/author-review-1.jpg"
                            alt="images"
                          />
                        </div>
                        <div className="content">
                          <div className="title-item flex justify-space align-center">
                            <h4>Bessie Cooper</h4>
                            <p className="fs-12 lh-18">April 5, 2023</p>
                          </div>
                          <div className="star flex">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                          </div>
                          <p className="texts text-color-2">
                            Donec iaculis id nibh vitae consequat. Curabitur a
                            molestie odio, id varius odio. Suspendisse
                            sollicitudin egestas sodales. Nam semper lorem
                            euismod molestie tempus.
                          </p>
                          <div className="icon-box flex">
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 5.75H9.68749M3.66949 13.0625C3.66124 13.025 3.64849 12.9875 3.63049 12.9515C3.18724 12.0515 2.93749 11.039 2.93749 9.96875C2.93587 8.89238 3.19282 7.83136 3.68674 6.875M3.66949 13.0625C3.72649 13.3362 3.53224 13.625 3.23824 13.625H2.55724C1.89049 13.625 1.27249 13.2365 1.07824 12.599C0.82399 11.7665 0.68749 10.8837 0.68749 9.96875C0.68749 8.804 0.90874 7.69175 1.31074 6.67025C1.54024 6.08975 2.12524 5.75 2.74999 5.75H3.53974C3.89374 5.75 4.09849 6.167 3.91474 6.47C3.83434 6.60234 3.7578 6.73742 3.68674 6.875M3.66949 13.0625H4.63999C5.0027 13.0623 5.36307 13.1205 5.70724 13.235L8.04274 14.015C8.38691 14.1295 8.74728 14.1877 9.10999 14.1875H12.122C12.5855 14.1875 13.0347 14.0022 13.3257 13.6407C14.6143 12.0434 15.3156 10.0523 15.3125 8C15.3125 7.6745 15.2952 7.35275 15.2615 7.03625C15.1797 6.2705 14.4905 5.75 13.721 5.75H11.3765C10.913 5.75 10.6332 5.207 10.8327 4.7885C11.191 4.03444 11.3763 3.20985 11.375 2.375C11.375 1.92745 11.1972 1.49823 10.8807 1.18176C10.5643 0.86529 10.135 0.6875 9.68749 0.6875C9.53831 0.6875 9.39523 0.746763 9.28974 0.852252C9.18425 0.957741 9.12499 1.10082 9.12499 1.25V1.72475C9.12499 2.1545 9.04249 2.57975 8.88349 2.97875C8.65549 3.54875 8.18599 3.97625 7.64374 4.265C6.81128 4.7092 6.0807 5.32228 5.49874 6.065C5.12524 6.5405 4.57924 6.875 3.97474 6.875H3.68674"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Useful</p>
                            </a>
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.62501 9.25H6.31251M12.3305 1.9375C12.3388 1.975 12.3515 2.0125 12.3695 2.0485C12.8128 2.9485 13.0625 3.961 13.0625 5.03125C13.0641 6.10762 12.8072 7.16864 12.3133 8.125M12.3305 1.9375C12.2735 1.66375 12.4678 1.375 12.7618 1.375H13.4428C14.1095 1.375 14.7275 1.7635 14.9218 2.401C15.176 3.2335 15.3125 4.11625 15.3125 5.03125C15.3125 6.196 15.0913 7.30825 14.6893 8.32975C14.4598 8.91025 13.8748 9.25 13.25 9.25H12.4603C12.1063 9.25 11.9015 8.833 12.0853 8.53C12.1657 8.39766 12.2422 8.26258 12.3133 8.125M12.3305 1.9375H11.36C10.9973 1.93772 10.6369 1.87948 10.2928 1.765L7.95726 0.985001C7.61309 0.870526 7.25272 0.812279 6.89001 0.812501H3.87801C3.41451 0.812501 2.96526 0.997751 2.67426 1.35925C1.38572 2.95658 0.684409 4.94774 0.68751 7C0.68751 7.3255 0.70476 7.64725 0.73851 7.96375C0.82026 8.7295 1.50951 9.25 2.27901 9.25H4.62351C5.08701 9.25 5.36676 9.793 5.16726 10.2115C4.80897 10.9656 4.6237 11.7902 4.62501 12.625C4.62501 13.0726 4.8028 13.5018 5.11927 13.8182C5.43574 14.1347 5.86496 14.3125 6.31251 14.3125C6.46169 14.3125 6.60477 14.2532 6.71026 14.1477C6.81575 14.0423 6.87501 13.8992 6.87501 13.75V13.2753C6.87501 12.8455 6.95751 12.4203 7.11651 12.0213C7.34451 11.4513 7.81401 11.0238 8.35626 10.735C9.18872 10.2908 9.9193 9.67772 10.5013 8.935C10.8748 8.4595 11.4208 8.125 12.0253 8.125H12.3133"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Not helpful</p>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="images flex-none">
                          <img
                            src="assets/images/author/author-review-1.jpg"
                            alt="images"
                          />
                        </div>
                        <div className="content">
                          <div className="title-item flex justify-space align-center">
                            <h4>Leslie Alexander</h4>
                            <p className="fs-12 lh-18">April 5, 2023</p>
                          </div>
                          <div className="star flex">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                          </div>
                          <p className="texts text-color-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque at velit eu libero laoreet mattis
                            ac a ipsum. Vivamus efficitur volutpat ante, sed
                            consequat ligula ultricies in.
                          </p>
                          <div className="img-box">
                            <img
                              src="assets/images/img-box/review-3.jpg"
                              alt="images"
                            />
                            <img
                              src="assets/images/img-box/review-2.jpg"
                              alt="images"
                            />
                            <img
                              src="assets/images/img-box/review-3.jpg"
                              alt="images"
                            />
                          </div>
                          <div className="icon-box flex">
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 5.75H9.68749M3.66949 13.0625C3.66124 13.025 3.64849 12.9875 3.63049 12.9515C3.18724 12.0515 2.93749 11.039 2.93749 9.96875C2.93587 8.89238 3.19282 7.83136 3.68674 6.875M3.66949 13.0625C3.72649 13.3362 3.53224 13.625 3.23824 13.625H2.55724C1.89049 13.625 1.27249 13.2365 1.07824 12.599C0.82399 11.7665 0.68749 10.8837 0.68749 9.96875C0.68749 8.804 0.90874 7.69175 1.31074 6.67025C1.54024 6.08975 2.12524 5.75 2.74999 5.75H3.53974C3.89374 5.75 4.09849 6.167 3.91474 6.47C3.83434 6.60234 3.7578 6.73742 3.68674 6.875M3.66949 13.0625H4.63999C5.0027 13.0623 5.36307 13.1205 5.70724 13.235L8.04274 14.015C8.38691 14.1295 8.74728 14.1877 9.10999 14.1875H12.122C12.5855 14.1875 13.0347 14.0022 13.3257 13.6407C14.6143 12.0434 15.3156 10.0523 15.3125 8C15.3125 7.6745 15.2952 7.35275 15.2615 7.03625C15.1797 6.2705 14.4905 5.75 13.721 5.75H11.3765C10.913 5.75 10.6332 5.207 10.8327 4.7885C11.191 4.03444 11.3763 3.20985 11.375 2.375C11.375 1.92745 11.1972 1.49823 10.8807 1.18176C10.5643 0.86529 10.135 0.6875 9.68749 0.6875C9.53831 0.6875 9.39523 0.746763 9.28974 0.852252C9.18425 0.957741 9.12499 1.10082 9.12499 1.25V1.72475C9.12499 2.1545 9.04249 2.57975 8.88349 2.97875C8.65549 3.54875 8.18599 3.97625 7.64374 4.265C6.81128 4.7092 6.0807 5.32228 5.49874 6.065C5.12524 6.5405 4.57924 6.875 3.97474 6.875H3.68674"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Useful</p>
                            </a>
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.62501 9.25H6.31251M12.3305 1.9375C12.3388 1.975 12.3515 2.0125 12.3695 2.0485C12.8128 2.9485 13.0625 3.961 13.0625 5.03125C13.0641 6.10762 12.8072 7.16864 12.3133 8.125M12.3305 1.9375C12.2735 1.66375 12.4678 1.375 12.7618 1.375H13.4428C14.1095 1.375 14.7275 1.7635 14.9218 2.401C15.176 3.2335 15.3125 4.11625 15.3125 5.03125C15.3125 6.196 15.0913 7.30825 14.6893 8.32975C14.4598 8.91025 13.8748 9.25 13.25 9.25H12.4603C12.1063 9.25 11.9015 8.833 12.0853 8.53C12.1657 8.39766 12.2422 8.26258 12.3133 8.125M12.3305 1.9375H11.36C10.9973 1.93772 10.6369 1.87948 10.2928 1.765L7.95726 0.985001C7.61309 0.870526 7.25272 0.812279 6.89001 0.812501H3.87801C3.41451 0.812501 2.96526 0.997751 2.67426 1.35925C1.38572 2.95658 0.684409 4.94774 0.68751 7C0.68751 7.3255 0.70476 7.64725 0.73851 7.96375C0.82026 8.7295 1.50951 9.25 2.27901 9.25H4.62351C5.08701 9.25 5.36676 9.793 5.16726 10.2115C4.80897 10.9656 4.6237 11.7902 4.62501 12.625C4.62501 13.0726 4.8028 13.5018 5.11927 13.8182C5.43574 14.1347 5.86496 14.3125 6.31251 14.3125C6.46169 14.3125 6.60477 14.2532 6.71026 14.1477C6.81575 14.0423 6.87501 13.8992 6.87501 13.75V13.2753C6.87501 12.8455 6.95751 12.4203 7.11651 12.0213C7.34451 11.4513 7.81401 11.0238 8.35626 10.735C9.18872 10.2908 9.9193 9.67772 10.5013 8.935C10.8748 8.4595 11.4208 8.125 12.0253 8.125H12.3133"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Not helpful</p>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="images flex-none">
                          <img
                            src="assets/images/author/author-review-1.jpg"
                            alt="images"
                          />
                        </div>
                        <div className="content">
                          <div className="title-item flex justify-space align-center">
                            <h4>Jenny Wilson</h4>
                            <p className="fs-12 lh-18">April 5, 2023</p>
                          </div>
                          <div className="star flex">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                          </div>
                          <p className="texts text-color-2">
                            Proin sed tellus porttitor, varius mauris vitae,
                            tincidunt augue. Sed consectetur magna elit, sit
                            amet faucibus tortor sodales vitae. Maecenas quis
                            arcu est. Nam sit amet neque vestibulum, fringilla
                            elit sit amet, volutpat nunc.
                          </p>
                          <div className="icon-box flex">
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 5.75H9.68749M3.66949 13.0625C3.66124 13.025 3.64849 12.9875 3.63049 12.9515C3.18724 12.0515 2.93749 11.039 2.93749 9.96875C2.93587 8.89238 3.19282 7.83136 3.68674 6.875M3.66949 13.0625C3.72649 13.3362 3.53224 13.625 3.23824 13.625H2.55724C1.89049 13.625 1.27249 13.2365 1.07824 12.599C0.82399 11.7665 0.68749 10.8837 0.68749 9.96875C0.68749 8.804 0.90874 7.69175 1.31074 6.67025C1.54024 6.08975 2.12524 5.75 2.74999 5.75H3.53974C3.89374 5.75 4.09849 6.167 3.91474 6.47C3.83434 6.60234 3.7578 6.73742 3.68674 6.875M3.66949 13.0625H4.63999C5.0027 13.0623 5.36307 13.1205 5.70724 13.235L8.04274 14.015C8.38691 14.1295 8.74728 14.1877 9.10999 14.1875H12.122C12.5855 14.1875 13.0347 14.0022 13.3257 13.6407C14.6143 12.0434 15.3156 10.0523 15.3125 8C15.3125 7.6745 15.2952 7.35275 15.2615 7.03625C15.1797 6.2705 14.4905 5.75 13.721 5.75H11.3765C10.913 5.75 10.6332 5.207 10.8327 4.7885C11.191 4.03444 11.3763 3.20985 11.375 2.375C11.375 1.92745 11.1972 1.49823 10.8807 1.18176C10.5643 0.86529 10.135 0.6875 9.68749 0.6875C9.53831 0.6875 9.39523 0.746763 9.28974 0.852252C9.18425 0.957741 9.12499 1.10082 9.12499 1.25V1.72475C9.12499 2.1545 9.04249 2.57975 8.88349 2.97875C8.65549 3.54875 8.18599 3.97625 7.64374 4.265C6.81128 4.7092 6.0807 5.32228 5.49874 6.065C5.12524 6.5405 4.57924 6.875 3.97474 6.875H3.68674"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Useful</p>
                            </a>
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.62501 9.25H6.31251M12.3305 1.9375C12.3388 1.975 12.3515 2.0125 12.3695 2.0485C12.8128 2.9485 13.0625 3.961 13.0625 5.03125C13.0641 6.10762 12.8072 7.16864 12.3133 8.125M12.3305 1.9375C12.2735 1.66375 12.4678 1.375 12.7618 1.375H13.4428C14.1095 1.375 14.7275 1.7635 14.9218 2.401C15.176 3.2335 15.3125 4.11625 15.3125 5.03125C15.3125 6.196 15.0913 7.30825 14.6893 8.32975C14.4598 8.91025 13.8748 9.25 13.25 9.25H12.4603C12.1063 9.25 11.9015 8.833 12.0853 8.53C12.1657 8.39766 12.2422 8.26258 12.3133 8.125M12.3305 1.9375H11.36C10.9973 1.93772 10.6369 1.87948 10.2928 1.765L7.95726 0.985001C7.61309 0.870526 7.25272 0.812279 6.89001 0.812501H3.87801C3.41451 0.812501 2.96526 0.997751 2.67426 1.35925C1.38572 2.95658 0.684409 4.94774 0.68751 7C0.68751 7.3255 0.70476 7.64725 0.73851 7.96375C0.82026 8.7295 1.50951 9.25 2.27901 9.25H4.62351C5.08701 9.25 5.36676 9.793 5.16726 10.2115C4.80897 10.9656 4.6237 11.7902 4.62501 12.625C4.62501 13.0726 4.8028 13.5018 5.11927 13.8182C5.43574 14.1347 5.86496 14.3125 6.31251 14.3125C6.46169 14.3125 6.60477 14.2532 6.71026 14.1477C6.81575 14.0423 6.87501 13.8992 6.87501 13.75V13.2753C6.87501 12.8455 6.95751 12.4203 7.11651 12.0213C7.34451 11.4513 7.81401 11.0238 8.35626 10.735C9.18872 10.2908 9.9193 9.67772 10.5013 8.935C10.8748 8.4595 11.4208 8.125 12.0253 8.125H12.3133"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Not helpful</p>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="images flex-none">
                          <img
                            src="assets/images/author/author-review-1.jpg"
                            alt="images"
                          />
                        </div>
                        <div className="content">
                          <div className="title-item flex justify-space align-center">
                            <h4>Bessie Cooper</h4>
                            <p className="fs-12 lh-18">April 5, 2023</p>
                          </div>
                          <div className="star flex">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ "enable-background": "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                {" "}
                                <g>
                                  {" "}
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 			255.898,401.21 416.035,502.431 369.263,318.842 		" />{" "}
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
                          </div>
                          <p className="texts text-color-2">
                            Donec iaculis id nibh vitae consequat. Curabitur a
                            molestie odio, id varius odio. Suspendisse
                            sollicitudin egestas sodales. Nam semper lorem
                            euismod molestie tempus.
                          </p>
                          <div className="icon-box flex">
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.375 5.75H9.68749M3.66949 13.0625C3.66124 13.025 3.64849 12.9875 3.63049 12.9515C3.18724 12.0515 2.93749 11.039 2.93749 9.96875C2.93587 8.89238 3.19282 7.83136 3.68674 6.875M3.66949 13.0625C3.72649 13.3362 3.53224 13.625 3.23824 13.625H2.55724C1.89049 13.625 1.27249 13.2365 1.07824 12.599C0.82399 11.7665 0.68749 10.8837 0.68749 9.96875C0.68749 8.804 0.90874 7.69175 1.31074 6.67025C1.54024 6.08975 2.12524 5.75 2.74999 5.75H3.53974C3.89374 5.75 4.09849 6.167 3.91474 6.47C3.83434 6.60234 3.7578 6.73742 3.68674 6.875M3.66949 13.0625H4.63999C5.0027 13.0623 5.36307 13.1205 5.70724 13.235L8.04274 14.015C8.38691 14.1295 8.74728 14.1877 9.10999 14.1875H12.122C12.5855 14.1875 13.0347 14.0022 13.3257 13.6407C14.6143 12.0434 15.3156 10.0523 15.3125 8C15.3125 7.6745 15.2952 7.35275 15.2615 7.03625C15.1797 6.2705 14.4905 5.75 13.721 5.75H11.3765C10.913 5.75 10.6332 5.207 10.8327 4.7885C11.191 4.03444 11.3763 3.20985 11.375 2.375C11.375 1.92745 11.1972 1.49823 10.8807 1.18176C10.5643 0.86529 10.135 0.6875 9.68749 0.6875C9.53831 0.6875 9.39523 0.746763 9.28974 0.852252C9.18425 0.957741 9.12499 1.10082 9.12499 1.25V1.72475C9.12499 2.1545 9.04249 2.57975 8.88349 2.97875C8.65549 3.54875 8.18599 3.97625 7.64374 4.265C6.81128 4.7092 6.0807 5.32228 5.49874 6.065C5.12524 6.5405 4.57924 6.875 3.97474 6.875H3.68674"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Useful</p>
                            </a>
                            <a className="icon flex align-center">
                              <svg
                                width={16}
                                height={15}
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.62501 9.25H6.31251M12.3305 1.9375C12.3388 1.975 12.3515 2.0125 12.3695 2.0485C12.8128 2.9485 13.0625 3.961 13.0625 5.03125C13.0641 6.10762 12.8072 7.16864 12.3133 8.125M12.3305 1.9375C12.2735 1.66375 12.4678 1.375 12.7618 1.375H13.4428C14.1095 1.375 14.7275 1.7635 14.9218 2.401C15.176 3.2335 15.3125 4.11625 15.3125 5.03125C15.3125 6.196 15.0913 7.30825 14.6893 8.32975C14.4598 8.91025 13.8748 9.25 13.25 9.25H12.4603C12.1063 9.25 11.9015 8.833 12.0853 8.53C12.1657 8.39766 12.2422 8.26258 12.3133 8.125M12.3305 1.9375H11.36C10.9973 1.93772 10.6369 1.87948 10.2928 1.765L7.95726 0.985001C7.61309 0.870526 7.25272 0.812279 6.89001 0.812501H3.87801C3.41451 0.812501 2.96526 0.997751 2.67426 1.35925C1.38572 2.95658 0.684409 4.94774 0.68751 7C0.68751 7.3255 0.70476 7.64725 0.73851 7.96375C0.82026 8.7295 1.50951 9.25 2.27901 9.25H4.62351C5.08701 9.25 5.36676 9.793 5.16726 10.2115C4.80897 10.9656 4.6237 11.7902 4.62501 12.625C4.62501 13.0726 4.8028 13.5018 5.11927 13.8182C5.43574 14.1347 5.86496 14.3125 6.31251 14.3125C6.46169 14.3125 6.60477 14.2532 6.71026 14.1477C6.81575 14.0423 6.87501 13.8992 6.87501 13.75V13.2753C6.87501 12.8455 6.95751 12.4203 7.11651 12.0213C7.34451 11.4513 7.81401 11.0238 8.35626 10.735C9.18872 10.2908 9.9193 9.67772 10.5013 8.935C10.8748 8.4595 11.4208 8.125 12.0253 8.125H12.3133"
                                  stroke="#8E8E93"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <p className="fs-12 font-2">Not helpful</p>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>

                <div class="wrap-map wrap-property wrap-style">
                  <h3 class="titles">Map location</h3>
                  <div class="box flex">
                    <ul>
                      <li class="flex">
                        <span class="one fw-6">Address</span>
                        <span class="two">150 sqft</span>
                      </li>
                      <li class="flex">
                        <span class="one fw-6">City</span>
                        <span class="two">#1234</span>
                      </li>
                      <li class="flex">
                        <span class="one fw-6">State/county</span>
                        <span class="two">$7,500</span>
                      </li>
                    </ul>
                    <ul>
                      <li class="flex">
                        <span class="one fw-6">Postal code</span>
                        <span class="two">7.328</span>
                      </li>
                      <li class="flex">
                        <span class="one fw-6">Area</span>
                        <span class="two">7.328</span>
                      </li>
                      <li class="flex">
                        <span class="one fw-6">Country</span>
                        <span class="two">2022</span>
                      </li>
                    </ul>
                  </div>
                  <iframe
                    class="map-content"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d90.47477022812872!3d23.77494577893369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s"
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="side-bar side-bar-1">
                <div className="inner-side-bar">
                  {/* <div className="widget-tour widget-rent">
                    <h3 className="title-tour">Contact Us for info</h3>
                    <div className="flat-tabs style2">
                      {loginid ? (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a
                              onClick={(event) => {
                                event.preventDefault();
                                addleads();
                                window.open(
                                  `https://wa.me/${Listingdata?.mobile_no}`,
                                  "_blank"
                                );
                              }}
                              href={`https://wa.me/${Listingdata?.mobile_no}`} // WhatsApp link
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
                                addleads();
                                window.location.href = `tel:${Listingdata?.mobile_no}`; // Open call link manually
                              }}
                              href={`tel:${Listingdata?.mobile_no}`} // Phone number link
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
                  </div> */}
                  <div className="widget-rent style">
                    <h3 className="widget-title title-contact">Booking Now</h3>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "20px",
                            color: "black",
                            marginRight: "8px",
                            fontWeight: 600,
                          }}
                        >
                          ₹3793
                        </h4>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#6d787d",
                            marginRight: "8px",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹6389
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#f5a623",
                            lineHeight: "25px",
                          }}
                        >
                          40% off
                        </span>
                      </div>
                      <div style={{ fontSize: "10px", color: "#6d787d" }}>
                        + taxes & fees: ₹680
                      </div>
                    </div>

                    {/* Coupon Code Section */}
                    <div style={{ marginTop: "20px" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                        Apply Coupon
                      </h4>
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginTop: "8px",
                          fontSize: "14px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          color: "black"
                        }}
                      />
                      <button
                        style={{
                          marginTop: "10px",
                          backgroundColor: "red",
                          color: "#fff",
                          border: "none",
                          padding: "10px 20px",
                          fontWeight: "600",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Apply Coupon
                      </button>
                    </div>

                    {/* Your Savings & Total Price Section */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#0c0a15",
                            fontWeight: "600",
                            marginBottom: "5px",
                          }}
                        >
                          Your Savings
                        </p>
                        <h4
                          style={{
                            fontSize: "16px",
                            color: "#f5a623",
                            fontWeight: "600",
                          }}
                        >
                          ₹1595
                        </h4>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#0c0a15",
                            fontWeight: "600",
                            marginBottom: "5px",
                          }}
                        >
                          Total Price
                        </p>
                        <h4
                          style={{
                            fontSize: "16px",
                            color: "#0c0a15",
                            fontWeight: "600",
                          }}
                        >
                          ₹978
                        </h4>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#6d787d",
                            marginTop: "5px",
                          }}
                        >
                          Including taxes & fees
                        </p>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <div style={{ marginTop: "20px" }}>
                      <button
                        style={{
                          width: "100%",
                          padding: "12px 0",
                          backgroundColor: "#0c0a15",
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: "600",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Book Now
                      </button>
                    </div>

                    {/* Additional Information Below Book Now */}
                    <div
                      style={{
                        marginTop: "20px",
                        fontSize: "12px",
                        color: "#6d787d",
                        textAlign: "center",
                      }}
                    >
                      <p>
                        <strong>Cancellation Policy:</strong> Free cancellation
                        before 24 hours.
                      </p>
                      <p>
                        <strong>
                          Follow safety measures advised at the hotel
                        </strong>
                      </p>
                      <p>
                        By proceeding, you agree to our{" "}
                        <strong>Guest Policies</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="wrap-contact wrap-form wrap-style">
                    <div className="titles">
                      <h3>Leave a review</h3>
                    </div>
                    <div id="comments" className="comments">
                      <div className="respond-comment">
                        <form
                          onSubmit={ReviewDetails}
                          className="comment-form form-submit"
                        >
                          <fieldset className="mb-1">
                            <label className="fw-6">
                              Select Multipile Images *
                            </label>

                            <input
                              className="my-input"
                              accept=".png, .jpg, image/*"
                              maxLength={10}
                              onChange={handleFileChange}
                              multiple
                              type="file"
                            />
                          </fieldset>
                          <fieldset className>
                            <div className="box-photo">
                              {images.length > 0 ? (
                                <ul className="flex ">
                                  {images?.map((image, index) => (
                                    <li key={index} className="file-delete">
                                      <img
                                        style={{
                                          height: "80px",
                                          borderRadius: "5px",
                                          width: "80px",
                                          paddingRight: "5px",
                                        }}
                                        src={URL.createObjectURL(image)}
                                        alt={`Selected ${index}`}
                                      />
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          </fieldset>
                          <fieldset className="message-wrap">
                            <label className="fw-6">Your review</label>
                            <textarea
                              required
                              value={messgae}
                              onChange={(e) => {
                                setmessgae(e.target.value);
                              }}
                              id="comment-message"
                              name="message"
                              rows={4}
                              tabIndex={4}
                              placeholder="Your message"
                              aria-required="true"
                            />
                          </fieldset>
                          <div className="inner-2 align-center flex">
                            <div className="title-rating font-2 fs-16 fw-8">
                              Rating
                            </div>

                            <div className="star flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                  key={rating}
                                  onClick={() => handleRatingClick(rating)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {rating <= ratings ? (
                                    <svg
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      x="0px"
                                      y="0px"
                                      viewBox="0 0 512 512"
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
                                  ) : (
                                    <svg
                                      height="20pt"
                                      viewBox="0 -10 511.98685 511"
                                      width="20pt"
                                      xmlns="http://www.w3.org/2000/svg"
                                      aria-hidden="true"
                                      style={{ color: "gold" }}
                                    >
                                      <path d="m114.59375 491.140625c-5.609375 0-11.179688-1.75-15.933594-5.1875-8.855468-6.417969-12.992187-17.449219-10.582031-28.09375l32.9375-145.089844-111.703125-97.960937c-8.210938-7.167969-11.347656-18.519532-7.976562-28.90625 3.371093-10.367188 12.542968-17.707032 23.402343-18.710938l147.796875-13.417968 58.433594-136.746094c4.308594-10.046875 14.121094-16.535156 25.023438-16.535156 10.902343 0 20.714843 6.488281 25.023437 16.511718l58.433594 136.769532 147.773437 13.417968c10.882813.980469 20.054688 8.34375 23.425782 18.710938 3.371093 10.367187.253906 21.738281-7.957032 28.90625l-111.703125 97.941406 32.9375 145.085938c2.414063 10.667968-1.726562 21.699218-10.578125 28.097656-8.832031 6.398437-20.609375 6.890625-29.910156 1.300781l-127.445312-76.160156-127.445313 76.203125c-4.308594 2.558594-9.109375 3.863281-13.953125 3.863281zm141.398438-112.875c4.84375 0 9.640624 1.300781 13.953124 3.859375l120.277344 71.9375-31.085937-136.941406c-2.21875-9.746094 1.089843-19.921875 8.621093-26.515625l105.472657-92.5-139.542969-12.671875c-10.046875-.917969-18.6875-7.234375-22.613281-16.492188l-55.082031-129.046875-55.148438 129.066407c-3.882812 9.195312-12.523438 15.511718-22.546875 16.429687l-139.5625 12.671875 105.46875 92.5c7.554687 6.613281 10.859375 16.769531 8.621094 26.539062l-31.0625 136.9375 120.277343-71.914062c4.308594-2.558594 9.109376-3.859375 13.953126-3.859375zm-84.585938-221.847656s0 .023437-.023438.042969zm169.128906-.0625.023438.042969c0-.023438 0-.023438-.023438-.042969zm0 0" />
                                    </svg>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            className="sc-button"
                            name="submit"
                            type="submit"
                          >
                            <span>Send review</span>
                          </button>
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
      <div
        className="modal fade popup"
        id="popup_bid23"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                <div
                  className="content"
                  style={{ height: "700px", overflow: "scroll" }}
                >
                  <div className="title-login fs-30 fw-7 lh-45">Views</div>
                  <div className="comments">
                    <div className="respond-comment">
                      <form
                        method="post"
                        className="comment-form form-submit"
                        action="#"
                        acceptCharset="utf-8"
                        noValidate="novalidate"
                      >
                        <div className="container6">
                          <div className="row">
                            {}
                            {Listingdata?.images?.map((data) => {
                              return (
                                <div className="col-md-4 mb-3">
                                  <div className="img-box flex">
                                    <img
                                      className="img-3"
                                      src={
                                        `http://157.66.191.24:3089/uploads/` +
                                        data
                                      }
                                      alt="images"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade popup "
        id="popup_bid"
        tabindex="-1"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div
          style={{ width: "70%" }}
          class=" modal-dialog modal-dialog-centered"
          role="document"
        >
          <div class=" modal-content">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div class="modal-body space-y-20 pd-40">
              <div class="wrap-modal flex">
                <div class="content">
                  <div class="title-login fs-20 fw-7 lh-45 mb-3">Video</div>

                  <div class="text-box text-center">
                    <video
                      style={{ objectFit: "cover", width: "100%" }}
                      src={`http://157.66.191.24:3089/uploads/${
                        Listingdata?.video || "default-video.mp4"
                      }`}
                      height="300"
                      autoPlay
                      controls
                      muted
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade popup "
        id="popup_bid231"
        tabindex="-1"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div
          style={{ width: "70%" }}
          class=" modal-dialog modal-dialog-centered"
          role="document"
        >
          <div class=" modal-content">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div class="modal-body">
              <div class="wrap-modal flex">
                <div class="content" style={{ height: "100%" }}>
                  <div>
                    <div className="icon-boxs flex" style={{ gap: "15px" }}>
                      {/* Social Media Share Buttons */}
                      <FacebookShareButton url={shareUrl} quote={title}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={shareUrl} title={title}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <LinkedinShareButton url={shareUrl} title={title}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                      <WhatsappShareButton url={shareUrl} title={title}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
