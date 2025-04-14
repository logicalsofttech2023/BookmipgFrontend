import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

const ProjectDetails = () => {
  const [ratings, setratings] = useState();
  const [Listingdata, setListingdata] = useState();
  const [messgae, setmessgae] = useState();
  const [Reviews, setReviews] = useState();
  const [count, setcount] = useState();
  const [favdata, setfavdata] = useState();
  const navigate = useNavigate();
  let listingID = localStorage.getItem("ListingId");
  const loginid = localStorage.getItem("loginuserid");
  useEffect(() => {
    window.scrollTo(0, 0);
    GetProperty();
  }, [0]);

  const GetProperty = () => {
    const data = {
      projectId: listingID,
    };

    axios
      .post("http://157.66.191.24:3089/website/get_project_details", data)
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

    if (images?.length > 0) {
      formData = new FormData();
      formData.append("userId", loginid);
      formData.append("projectId", listingID);
      formData.append("message", messgae);
      formData.append("review", ratings);

      images.forEach((image) => {
        formData.append("images", image);
      });
    } else {
      formData = {
        userId: loginid,
        projectId: listingID,
        message: messgae,
        review: ratings,
      };
    }

    axios
      .post("http://157.66.191.24:3089/website/add_project_review", formData)
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
      projectId: listingID,
    };

    axios
      .post("http://157.66.191.24:3089/website/get_project_review", data)
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
      projectId: listingID,
      lead_status: "1",
      favourite_status: item,
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_project`, data)
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
      projectId: listingID,
      lead_status: "1",
      favourite_status: item,
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_project`, data)
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
      projectId: listingID,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_favourite_project", data)
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
      projectId: listingID,
      name: fullname,
      email: email,
      mobile_no: phonenumber,
      message: text,
    };

    axios
      .post(
        "http://157.66.191.24:3089/website/add_project_seller_contact_us",
        data
      )
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
  const maskMobileNumber = number => 
    number ? `XXXXXX${number.replace(/\D/g, '').slice(-4)}` : number;
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
                  <span>Project Listing</span>
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
                    {Listingdata?.project_name}
                  </div>
                  <div className="inner flex">
                    <div className="sales fs-12 fw-7 font-2 text-color-1">
                      {Listingdata?.bedrooms}
                    </div>
                    <div className="text-address">
                      <p>Project ID : {Listingdata?.project_no}</p>
                    </div>
                    <div className="icons icon-1 flex">
                      <span>Project Status : </span>
                      <span className="fw-6">
                        {Listingdata?.project_status}
                      </span>
                    </div>
                    <div className="icons icon-1 flex">
                      <span>Possession Status : </span>
                      <span className="fw-6">
                        {Listingdata?.possession_status}
                      </span>
                    </div>
                    <div className="icons icon-1 flex">
                      <span>City : </span>
                      <span className="fw-6">{Listingdata?.city_name}</span>
                    </div>
                  </div>

                  <div className="inner flex">
                    <div className="icons icon-1 flex">
                      <span>Locality : </span>
                      <span className="fw-6">{Listingdata?.locality}</span>
                    </div>
                    <div className="icons icon-1 flex">
                      <span>Publish: </span>
                      <span className="fw-6">
                        {Listingdata?.updatedAt?.slice(0, 10)}
                      </span>
                    </div>
                    <div className=" icon-1 flex">
                      <span>
                        <i class="far fa-eye"></i>
                      </span>{" "}
                      <span className="fw-6">&nbsp;: 0 Views</span>
                    </div>
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

                    <a href="#">
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
                  </div>
                  <div className="moneys fs-20 fw-6 lh-45 text-color-3">
                    ₹{(Listingdata?.start_price / 100000)?.toFixed(2)}-
                    {(Listingdata?.end_price / 100000)?.toFixed(2)} L
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
                    <div  class="text-box text-center">
                    <video
                      style={{borderRadius:'5px', objectFit: "cover",height: "262px", width: "100%" }}
                      src={`http://157.66.191.24:3089/uploads/${
                        Listingdata?.video || "default-video.mp4"
                      }`}
                      
                      
                      controls
                      muted
                    />
                  </div>
                  ) :
                  Listingdata?.images[1] ? (
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
                  <h3 className="titles">Property description</h3>
                  <p className="text-1 text-color-2">
                    {Listingdata?.project_description}
                  </p>
                  {/* <p className="text-2 text-color-2">
               
              </p> */}
                </div>

                <div className="wrap-overview wrap-style">
                  <h3 className="titles">Project Information</h3>
                  <div className="icon-wrap flex row">
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">ID</div>
                            <div className="font-2 fw-7">
                              {Listingdata?.project_no}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Project Status :</div>
                            <div className="font-2 fw-7">
                              {Listingdata?.project_status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Property Type :</div>
                            <div className="font-2 fw-7">
                              {Listingdata?.project_type}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Building Type :</div>
                            <div className="font-2 fw-7">
                              {Listingdata?.bedrooms}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">City :</div>
                            <div className="font-2 fw-7">
                              {Listingdata?.city_name}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Locality :</div>
                            <div className="font-2 fw-7">
                              {Listingdata?.locality}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Area : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.minimum_project_size} -{" "}
                              {Listingdata?.maximum_project_size}{" "}
                              {Listingdata?.project_size}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Available For : </div>
                            <div className="font-2 fw-7">Family</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Suited For : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.suitable_for?.map((data) => {
                                return <> {data}</>;
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Furnishing Status : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.furnishing_status
                                ? Listingdata?.furnishing_status
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Price : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.start_price} -{" "}
                              {Listingdata?.end_price}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Possession Status : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.possession_status
                                ? Listingdata?.possession_status
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Number of Rooms : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.rooms ? Listingdata?.rooms : "No"}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Number of Bathroom : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.no_of_bathroom
                                ? Listingdata?.no_of_bathroom
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Covered Parking : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.covered_parking
                                ? Listingdata?.covered_parking
                                : "No"}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">View : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.view ? Listingdata?.view : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">
                              Age of Property (Years)
                            </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.age_of_property
                                ? Listingdata?.age_of_property
                                : "No"}
                            </div>
                          </div>
                        </div>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Total Floor Count : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.total_floor_count
                                ? Listingdata?.total_floor_count
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.691 16.465H15.2848V1.22595C15.2848 1.14998 15.2568 1.07669 15.2062 1.02006C15.1556 0.963431 15.0859 0.927444 15.0104 0.918975L6.88567 0.00194478C6.84244 -0.00292852 6.79866 0.00138197 6.7572 0.0145944C6.71574 0.0278068 6.67754 0.0496235 6.6451 0.0786168C6.61265 0.10761 6.5867 0.143127 6.56892 0.182844C6.55115 0.22256 6.54197 0.265582 6.54197 0.309093V0.916856H3.02433C2.94235 0.916856 2.86373 0.94942 2.80577 1.00739C2.7478 1.06535 2.71524 1.14397 2.71524 1.22595V16.465H0.309091C0.227115 16.465 0.148497 16.4976 0.0905309 16.5556C0.032565 16.6135 0 16.6922 0 16.7741C0 16.8561 0.032565 16.9347 0.0905309 16.9927C0.148497 17.0507 0.227115 17.0832 0.309091 17.0832H6.54197V17.691C6.54197 17.773 6.57453 17.8516 6.6325 17.9095C6.69046 17.9675 6.76908 18.0001 6.85106 18.0001C6.86286 18.0002 6.87466 17.9995 6.88638 17.9981L14.9934 17.0832H17.6915C17.7735 17.0832 17.8521 17.0507 17.9101 16.9927C17.968 16.9347 18.0006 16.8561 18.0006 16.7741C18.0006 16.6922 17.968 16.6135 17.9101 16.5556C17.8521 16.4976 17.7735 16.465 17.6915 16.465H17.691ZM3.33342 1.53504H6.54197V2.32985H4.43714C4.35517 2.32985 4.27655 2.36241 4.21858 2.42038C4.16061 2.47834 4.12805 2.55696 4.12805 2.63894V16.465H3.33324L3.33342 1.53504ZM4.74641 16.465V2.94803H6.54197V16.465H4.74641ZM7.16015 0.654923L14.6667 1.50272V16.4981L7.16015 17.3459V0.654923Z"
                                fill="black"
                              />
                              <path
                                d="M8.49017 8.0802C8.30824 8.0802 8.13039 8.13415 7.97912 8.23522C7.82785 8.3363 7.70995 8.47996 7.64033 8.64804C7.57071 8.81612 7.55249 9.00108 7.58799 9.17951C7.62348 9.35795 7.71109 9.52185 7.83973 9.65049C7.96838 9.77914 8.13228 9.86675 8.31071 9.90224C8.48915 9.93773 8.6741 9.91951 8.84218 9.84989C9.01026 9.78027 9.15393 9.66237 9.255 9.5111C9.35608 9.35983 9.41003 9.18199 9.41003 9.00006C9.40974 8.75618 9.31274 8.52238 9.1403 8.34993C8.96785 8.17748 8.73404 8.08048 8.49017 8.0802ZM8.49017 9.30173C8.4305 9.30173 8.37218 9.28404 8.32257 9.25089C8.27296 9.21774 8.23429 9.17063 8.21146 9.1155C8.18863 9.06038 8.18265 8.99972 8.19429 8.9412C8.20593 8.88268 8.23466 8.82893 8.27685 8.78674C8.31904 8.74455 8.3728 8.71582 8.43132 8.70418C8.48983 8.69254 8.55049 8.69851 8.60561 8.72135C8.66074 8.74418 8.70785 8.78285 8.741 8.83246C8.77415 8.88207 8.79184 8.94039 8.79184 9.00006C8.79175 9.08004 8.75994 9.15671 8.70338 9.21327C8.64683 9.26982 8.57015 9.30164 8.49017 9.30173Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Balcony : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.balcony
                                ? Listingdata?.balcony
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">Power Back-up : </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.power_backup
                                ? Listingdata?.power_backup
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <div className>
                        <div className="inner flex">
                          <div className="icon">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.125 2.25H14.375V1H13.125V2.25H4.875V1H3.625V2.25H2.875C1.84113 2.25 1 3.09113 1 4.125V15.125C1 16.1589 1.84113 17 2.875 17H15.125C16.1589 17 17 16.1589 17 15.125V4.125C17 3.09113 16.1589 2.25 15.125 2.25ZM15.75 15.125C15.75 15.4696 15.4696 15.75 15.125 15.75H2.875C2.53038 15.75 2.25 15.4696 2.25 15.125V6.875H15.75V15.125ZM15.75 5.625H2.25V4.125C2.25 3.78038 2.53038 3.5 2.875 3.5H3.625V4.75H4.875V3.5H13.125V4.75H14.375V3.5H15.125C15.4696 3.5 15.75 3.78038 15.75 4.125V5.625Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                              <path
                                d="M3.375 8.1875H4.625V9.4375H3.375V8.1875ZM5.875 8.1875H7.125V9.4375H5.875V8.1875ZM8.375 8.1875H9.625V9.4375H8.375V8.1875ZM10.875 8.1875H12.125V9.4375H10.875V8.1875ZM13.375 8.1875H14.625V9.4375H13.375V8.1875ZM3.375 10.6875H4.625V11.9375H3.375V10.6875ZM5.875 10.6875H7.125V11.9375H5.875V10.6875ZM8.375 10.6875H9.625V11.9375H8.375V10.6875ZM10.875 10.6875H12.125V11.9375H10.875V10.6875ZM3.375 13.1875H4.625V14.4375H3.375V13.1875ZM5.875 13.1875H7.125V14.4375H5.875V13.1875ZM8.375 13.1875H9.625V14.4375H8.375V13.1875ZM10.875 13.1875H12.125V14.4375H10.875V13.1875ZM13.375 10.6875H14.625V11.9375H13.375V10.6875Z"
                                fill="#8E8E93"
                                stroke="white"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </div>
                          <div className="content">
                            <div className="font-2">
                              Open/Uncovered Parking :
                            </div>
                            <div className="font-2 fw-7">
                              {Listingdata?.uncovered_parking
                                ? Listingdata?.uncovered_parking
                                : "No"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wrap-featured wrap-style tf-amenities">
                  <h3 className="titles">Amenities</h3>
                  <div className="box-featured flex">
                    <div className="inner-1">
                      {Listingdata?.amenities?.slice(0, 10)?.map((data) => {
                        return (
                          <label className="flex">
                            <input
                              disabled
                              name="newsletter"
                              type="checkbox"
                              defaultChecked
                            />
                            <span className="btn-checkbox" />
                            <span className="fs-13">{data}</span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.amenities?.slice(10, 20)?.map((data) => {
                        return (
                          <label className="flex">
                            <input
                              disabled
                              name="newsletter"
                              type="checkbox"
                              defaultChecked
                            />
                            <span className="btn-checkbox" />
                            <span className="fs-13">{data}</span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.amenities?.slice(20, 30)?.map((data) => {
                        return (
                          <label className="flex">
                            <input
                              disabled
                              name="newsletter"
                              type="checkbox"
                              defaultChecked
                            />
                            <span className="btn-checkbox" />
                            <span className="fs-13">{data}</span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.amenities?.slice(30, 40)?.map((data) => {
                        return (
                          <label className="flex">
                            <input
                              disabled
                              name="newsletter"
                              type="checkbox"
                              defaultChecked
                            />
                            <span className="btn-checkbox" />
                            <span className="fs-13">{data}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="wrap-featured wrap-style tf-amenities">
                  <h3 className="titles">Defining Location</h3>
                  <div className="box-featured flex">
                    <div className="inner-1">
                      {Listingdata?.defining_location
                        ?.slice(0, 2)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.defining_location
                        ?.slice(2, 4)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.defining_location
                        ?.slice(4, 6)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.defining_location
                        ?.slice(6, 12)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="wrap-featured wrap-style tf-amenities">
                  <h3 className="titles">Explaining Price</h3>
                  <div className="box-featured flex">
                    <div className="inner-1">
                      {Listingdata?.explaining_price
                        ?.slice(0, 2)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.explaining_price
                        ?.slice(2, 4)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.explaining_price
                        ?.slice(4, 6)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="wrap-featured wrap-style tf-amenities">
                  <h3 className="titles">Explaining The Property</h3>
                  <div className="box-featured flex">
                    <div className="inner-1">
                      {Listingdata?.explaining_the_project
                        ?.slice(0, 2)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.explaining_the_project
                        ?.slice(2, 4)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.explaining_the_project
                        ?.slice(4, 8)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="wrap-featured wrap-style tf-amenities">
                  <h3 className="titles">Defining size & structure</h3>
                  <div className="box-featured flex">
                    <div className="inner-1">
                      {Listingdata?.defining_size_structure
                        ?.slice(0, 2)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.defining_size_structure
                        ?.slice(2, 4)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                    <div className="inner-1">
                      {Listingdata?.defining_size_structure
                        ?.slice(4, 8)
                        ?.map((data) => {
                          return (
                            <label className="flex">
                              <input
                                disabled
                                name="newsletter"
                                type="checkbox"
                                defaultChecked
                              />
                              <span className="btn-checkbox" />
                              <span className="fs-13">{data}</span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="wrap-featured wrap-style tf-amenities">
                  <h3 className="titles">Suitable For</h3>
                  <div className="box-featured flex">
                    <div className="inner-1">
                      {Listingdata?.suitable_for?.map((data) => {
                        return (
                          <label className="flex">
                            <input
                              disabled
                              name="newsletter"
                              type="checkbox"
                              defaultChecked
                            />
                            <span className="btn-checkbox" />
                            <span className="fs-13">{data}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="wrap-review wrap-style mb-3">
                  <div className="box-title titles flex align-center justify-space">
                    <div className="inner flex align-center">
                      <div className="star flex">
                        <svg
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
                      </div>
                      <h3>Review</h3>
                      <p className="fw-6">({count} review)</p>
                    </div>
                  </div>
                  <div className="comment-list">
                    <ol style={{overflow:'scroll',height:'550px', overflowX:'hidden',scrollbarWidth:'none'}} className>
                      {Reviews?.length > 0 ? (
                        Reviews?.map((data) => {
                          return (
                            <li className="flex">
                              <div className="images flex-none">
                                {data?.user_image ? (
                                  <img
                                    style={{
                                      width: "70px",
                                      height: "70px",
                                      borderRadius: "5px",
                                    }}
                                    src={
                                      `http://157.66.191.24:3089/uploads/` +
                                      data?.user_image
                                    }
                                    alt="images"
                                  />
                                ) : (
                                  <img
                                    src="assets/images/author/author-review-1.jpg"
                                    alt="images"
                                  />
                                )}
                              </div>
                              <div className="content">
                                <div className="title-item flex justify-space align-center">
                                  <h4 className="text-capitalize">
                                    {data?.name ? data?.name : "Justthing"}
                                  </h4>
                                  <p className="fs-12 lh-18">{data?.updatedAt}</p>
                                </div>
                                <div className="star flex">
                                  
                                  <div className="star flex">
                                    {[...Array(data?.review)]?.map(
                                      (_, index) => (
                                        <svg
                                          key={index}
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlnsXlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          viewBox="0 0 512 512"
                                          style={{
                                            enableBackground: "new 0 0 512 512",
                                          }}
                                          xmlSpace="preserve"
                                          fill="gold"
                                        >
                                          <g>
                                            <g>
                                              <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842" />
                                            </g>
                                          </g>
                                        </svg>
                                      )
                                    )}
                                  </div>
                                </div>
                                <p className="texts text-color-2">
                                  {data?.message}
                                </p>
                                <div className="img-box">
                                  {data?.images?.map((img) => {
                                    return (
                                      <img
                                        className="mb-1"
                                        style={{
                                          width: "141px",
                                          height: "79px",
                                        }}
                                        src={
                                          `http://157.66.191.24:3089/uploads/` +
                                          img
                                        }
                                        alt="images"
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </li>
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
                          <h3 className="mt-3">No Review Found</h3>
                        </div>
                      )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="side-bar side-bar-1">
                <div className="inner-side-bar">
                  <div className="widget-tour widget-rent">
                    <h3 className="title-tour">Contact Us for info</h3>
                    <div className="flat-tabs style2">
                      {loginid ? (
                        <div className="img-box flex align-center">
                          <div className="flat-bt-top sc-btn-top">
                            <a
                              onClick={(event) => {
                                event.preventDefault(); // Prevent default navigation
                                addleads(); // Call the addleads function first
                                window.open(
                                  `https://wa.me/${Listingdata?.mobile_no}`,
                                  "_blank"
                                ); // Open WhatsApp link manually
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
                                event.preventDefault(); // Prevent default navigation
                                addleads(); // Call the addleads function first
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
                        //                         <div className="img-box flex align-center">

                        // <div className="flat-bt-top sc-btn-top">
                        //   <a onClick={(()=>addleads())}
                        //     href={`https://wa.me/${Listingdata?.mobile_no}`}
                        //     target="_blank"
                        //     rel="noopener noreferrer"
                        //     className="sc-buttonborder btn-icon "
                        //   >
                        //     <img
                        //       width={20}
                        //       height={20}
                        //       src="assets/images/icon/whatsappicon.svg"
                        //     />
                        //     <span>Whatsapp</span>
                        //   </a>
                        // </div>
                        // <div
                        //   className="flat-bt-top sc-btn-top"
                        //   style={{ marginLeft: "5%" }}
                        // >
                        //   <a onClick={(()=> addleads())}
                        //     className="sc-button btn-icon "
                        //     href={`tel:${Listingdata?.mobile_no}`}
                        //   >
                        //     <img
                        //       width={20}
                        //       height={20}
                        //       src="assets/images/icon/calls.svg"
                        //     />
                        //     <span>Contact Us</span>
                        //   </a>
                        // </div>
                        // </div>) :
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
                        <div className="content-inner tab-content">
                          {/* <div class="comments">
                        <div class="comment-form">
                          <form method="post">
                            <div class="wd-find-select">
                              <div class="group-select">
                                <div class="nice-select" tabindex="0">
                                  <span class="current">Choose time</span>
                                  <ul class="list">
                                    <li
                                      data-value
                                      class="option selected"
                                    >
                                      Choose time
                                    </li>
                                    <li data-value="6" class="option">
                                      6h
                                    </li>
                                    <li data-value="8" class="option">
                                      8h
                                    </li>
                                    <li data-value="10" class="option">
                                      10h
                                    </li>
                                    <li data-value="14" class="option">
                                      14h
                                    </li>
                                    <li data-value="16" class="option">
                                      16h
                                    </li>
                                    <li data-value="18" class="option">
                                      18h
                                    </li>
                                    <li data-value="20" class="option">
                                      20h
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <fieldset class="">
                                <input
                                  type="text"
                                  class=""
                                  name="text"
                                  placeholder="Your name"
                                  required=""
                                />
                              </fieldset>
                              <fieldset class="">
                                <input
                                  type="tel"
                                  class=""
                                  name="tel"
                                  placeholder="Phone number"
                                  required=""
                                />
                              </fieldset>
                              <fieldset class="">
                                <input
                                  type="email"
                                  class=""
                                  name="email"
                                  placeholder="Email address"
                                  required=""
                                />
                              </fieldset>
                              <fieldset class="message-wrap">
                                <textarea
                                  name="message"
                                  rows="4"
                                  tabindex="4"
                                  placeholder="Your mesage"
                                ></textarea>
                              </fieldset>
                              <div class="widget-form flex">
                                <label class="widget-form">
                                  <input type="checkbox" />
                                  <span
                                    class="btn-checkbox flex-two"
                                  ></span>
                                </label>
                                <div class="flex fs-13 lh-18">
                                  <span class="sub-title"
                                    >I agree to the</span
                                  >
                                  <a
                                    href="#"
                                    class="font-2 text-color-3 text-line"
                                  >
                                    Terms and Conditions.</a
                                  >
                                </div>
                              </div>
                              <div class="button-box center">
                                <button
                                  class="sc-button btn-icon2 one btn-svg center"
                                >
                                  <span class=""
                                    >Submit a Tour Request</span
                                  >
                                  <svg
                                    width="18"
                                    height="10"
                                    viewBox="0 0 14 7"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.5 1L13 3.5M13 3.5L10.5 6M13 3.5H1"
                                      stroke="#fff"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-rent style">
                    <h3 className="widget-title title-contact">
                      Contact seller
                    </h3>
                    <div className="author-box flex align-center">
                      <div className="image-author flex-none">
                        {Listingdata?.user_image ? (
                          <img
                            src={
                              `http://157.66.191.24:3089/uploads/` +
                              Listingdata?.user_image
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
                        <p className="text-color-2">
                          {Listingdata?.name ? Listingdata?.name : "Justhing"}
                        </p>
                        <h5 className="link-style-1">
                          <a href={`tel:${Listingdata?.mobile_no}`}>
                          {maskMobileNumber(Listingdata?.mobile_no)}
                          </a>
                        </h5>
                        <a
                          className="fs-12 lh-18"
                          href={`mailto:${Listingdata?.email}`}
                        >
                          {Listingdata?.email
                            ? Listingdata?.email
                            : "justthing@gmail.com"}
                        </a>
                      </div>
                    </div>
                    <div className="comments">
                      <div className="comment-form">
                        <form onSubmit={contactseller}>
                          <div className="wd-find-select">
                            <fieldset className>
                              <input
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
                                className
                                name="text"
                                placeholder="Full name *"
                                required
                              />
                            </fieldset>
                            <fieldset className>
                              <input
                                value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="tel"
                                className
                                maxLength={10}
                                minLength={10}
                                name="tel"
                                placeholder="Phone number *"
                                required
                              />
                            </fieldset>
                            <fieldset className>
                              <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                name="message"
                                rows={4}
                                tabIndex={4}
                                placeholder="Your mesage *"
                                defaultValue={""}
                              />
                            </fieldset>
                            <div className="button-box sc-btn-top center flex justify-space">
                              <button
                                type="sumbit"
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
                  </div>

                  <div className="widget widget-ads">
                    <div
                      className="box-ads"
                      style={{
                        backgroundImage: `url(http://157.66.191.24:3089/uploads/${Listingdata?.images[0]})`,
                      }}
                    >
                      <div className="content relative z-2">
                        <h3 className="link-style-3">
                          <Link to="#">{Listingdata?.project_name}</Link>
                        </h3>
                        <div className="text-addres">
                          <p className="p-12 text-color-1 icon-p">
                            {Listingdata?.locality} {Listingdata?.city_name}
                          </p>
                        </div>
                        <div className="star flex">
                        {[...Array(Listingdata?.rating)]?.map(
                                      (_, index) => (
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
                                      )
                                    )}
                          
                        </div>
                      </div>
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
                  <div className="wrap-map wrap-property wrap-style">
                    <h3 className="titles">Map location</h3>

                    <iframe
                      className="map-content"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d90.47477022812872!3d23.77494577893369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1627293157601!5m2!1svi!2s"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="wrap-video wrap-style">
                    <h3 className="titles">Video</h3>
                    <div className="video-box center">
                      <div className="post-video flex align-center justify-center relative">
                        <img
                          className="img-2"
                          height={176}
                          width={308}
                          src={`http://157.66.191.24:3089/uploads/${
                            Listingdata?.images[0] ||
                            "assets/images/img-box/property-video.jpg"
                          }`}
                          alt="images"
                        />

                        <a
                          data-toggle="modal"
                          data-target={
                            Listingdata?.video ? "#popup_bid" : undefined
                          }
                          href=""
                          className="lightbox-image"
                        >
                          <svg
                            width={11}
                            height={14}
                            viewBox="0 0 11 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11 7L3.41715e-07 14L9.53674e-07 -4.80825e-07L11 7Z"
                              fill="#FFA920"
                            />
                          </svg>
                          <i className="ripple" />
                        </a>
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
        <div style={{width:'70%'}} class=" modal-dialog modal-dialog-centered" role="document">
          <div  class=" modal-content">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <div  class="modal-body space-y-20 pd-40">
              <div  class="wrap-modal flex">
               
                <div  class="content">
                  <div class="title-login fs-20 fw-7 lh-45 mb-3">
                    Video</div>

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
    </>
  );
};

export default ProjectDetails;
