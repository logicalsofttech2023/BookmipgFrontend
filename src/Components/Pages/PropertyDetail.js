import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
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
import { DateRangePicker } from "rsuite";

const PropertyDetail = () => {
  const [ratings, setratings] = useState();
  const [listingData, setlistingData] = useState();
  const [messgae, setmessgae] = useState();
  const [Reviews, setReviews] = useState();
  const [count, setCount] = useState();
  const [favdata, setfavdata] = useState();
  const navigate = useNavigate();
  let listingID = localStorage.getItem("ListingId");
  const loginId = localStorage.getItem("token");
  let { hotelId } = useParams();
  const [amenities, setAmenities] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [selectedGuests, setSelectedGuests] = useState({
    adults: 1,
    children: 0,
  });
  const [selectedRooms, setSelectedRooms] = useState(1);

  const handleGuestChange = (type, value) => {
    setSelectedGuests((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleRoomChange = (value) => {
    setSelectedRooms(value);
  };

  useEffect(() => {
    fetchHotel();
    getReview();
    fetchCoupons();
  }, [hotelId]);

  const fetchHotel = async () => {
    if (!hotelId) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getHotelById`,
        {
          params: { hotelId: hotelId },
        }
      );
      console.log("Hotel Data:", res);
      setlistingData(res.data.hotel);
    } catch (error) {
      console.error("Error fetching hotel:", error.response?.data || error);
    }
  };

  const getReview = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/user/getReviewsByHotelId`, {
        params: { hotelId: hotelId },
      })
      .then((res) => {
        if (res.status === 200) {
          setReviews(res.data.reviews);
          setCount(res?.data?.reviews.length);
        }
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
    if (!loginId) {
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
      formData.append("userId", loginId);
      formData.append("propertyId", listingID);
      formData.append("message", messgae);
      formData.append("review", ratings);

      images.forEach((image) => {
        formData.append("images", image);
      });
    } else {
      formData = {
        userId: loginId,
        propertyId: listingID,
        message: messgae,
        review: ratings,
      };
    }

    axios
      .post("http://157.66.191.24:3089/website/add_review", formData)
      .then((res) => {
        getReview();
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

  const addFavorite = (item) => {
    if (!loginId) {
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
      userId: loginId,
      propertyId: listingID,
      lead_status: "1",
      favourite_status: item,
    };

    axios
      .post(`http://157.66.191.24:3089/website/add_lead_property`, data)
      .then((res) => {
        fetchHotel();
        Getuserfavorite();
        toast.success("Favorite status updated");
      })
      .catch(() => {});
  };

  useEffect(() => {
    Getuserfavorite();
  }, [0]);
  const Getuserfavorite = () => {
    const data = {
      userId: loginId,
      propertyId: listingID,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_favourite_property", data)
      .then((res) => {
        setfavdata(res?.data?.data[0]);
      })
      .catch((error) => {});
  };

  const shareUrl = window.location.href;
  const title = listingData?.name;

  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (listingData && listingData.amenities) {
      setAmenities(listingData.amenities);
    }
  }, [listingData]);
  const hasMoreThanFive = amenities?.length > 6;

  const amenitiesToShow = showAll ? amenities : amenities.slice(0, 6);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getUserCoupons`,
        {
          headers: {
            Authorization: `Bearer ${loginId}`,
          },
        }
      );

      setCoupons(response?.data?.coupons || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const originalPricePerNight = listingData?.originalPricePerNight || 6389;
  const discountedPricePerNight = listingData?.pricePerNight || 0;
  const discountPercentage = discountedPricePerNight
    ? Math.round((1 - discountedPricePerNight / originalPricePerNight) * 100)
    : 0;

  // Calculate total nights
  const checkInDate = selectedDates[0];
  const checkOutDate = selectedDates[1];
  let totalNights = 1;
  if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
    totalNights = Math.round(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
  }

  const subtotal = discountedPricePerNight * totalNights;
  const taxesAmount = listingData?.taxesAmount || 680;
  const totalBeforeDiscount = subtotal + taxesAmount;
  const originalTotalPrice = originalPricePerNight * totalNights;
  const totalSavings = originalTotalPrice - subtotal;

  // Apply Coupon
  const applyCoupon = async () => {
    try {
      setErrorMessage("");
      setDiscountAmount(0);

      if (!couponCode) {
        setErrorMessage("Please enter a coupon code");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/user/applyUserCoupon`,
        {
          code: couponCode,
          originalPrice: subtotal,
        },
        {
          headers: {
            Authorization: `Bearer ${loginId}`,
          },
        }
      );

      if (!response?.data?.status) {
        setErrorMessage(
          response?.data?.message || "Coupon could not be applied"
        );
        return;
      }

      setDiscountAmount(response?.data?.discountAmount);
      setIsCouponApplied(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong, please try again"
      );
      console.error("Apply Coupon Error:", error);
    }
  };

  const finalPrice = totalBeforeDiscount - discountAmount;

  const handleBooking = (id) => {
    if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
      toast.error("Please select check-in and check-out dates.");
      
      return;
    }

    if (!originalPricePerNight || !discountedPricePerNight || !taxesAmount) {
      toast.error("Price details are missing. Please try again.");
      return;
    }

    if (!finalPrice || finalPrice <= 0) {
      toast.error("Invalid total price. Please check your selections.");
      return;
    }

    if (!totalSavings && totalSavings !== 0) {
      toast.error("Savings calculation error. Please refresh and try again.");
      return;
    }

    if (!selectedGuests || selectedGuests.adults < 1) {
      toast.error("Please select at least 1 adult guest.");
      return;
    }

    if (!selectedRooms || selectedRooms < 1) {
      toast.error("Please select at least 1 room.");
      return;
    }

    navigate(`/bookingSummary/${id}`, {
      state: {
        selectedDates,
        totalSavings,
        finalPrice,
        discountAmount,
        originalPricePerNight,
        discountedPricePerNight,
        taxesAmount,
        selectedGuests,
        selectedRooms,
        couponCode,
        couponId: coupons?._id,
      },
    });
  };

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
                  <span>Hotel Details</span>
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
                    {listingData?.name}
                  </div>

                  <div className="inner flex">
                    <p>{listingData?.address}</p>
                  </div>

                  {/* Rating Section */}
                  <div
                    className="rating-section"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {/* Star Icons */}
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          style={{
                            color: index < 5 ? "#f5a623" : "#ccc", // Fill stars up to 4.9
                            fontSize: "18px",
                            marginRight: "2px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {/* Rating Value */}
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#0c0a15",
                      }}
                    >
                      {listingData?.rating}
                    </span>
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
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "#0c0a15",
                      }}
                    >
                      ₹{listingData?.pricePerNight}
                    </span>

                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#6d787d",
                        textDecoration: "line-through",
                        marginLeft: "10px",
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
                  {listingData?.images[0] ? (
                    <img
                      style={{ height: "540px", borderRadius: "5px" }}
                      className="img-1"
                      src={
                        `${process.env.REACT_APP_BASE_URL}` +
                        listingData?.images[0]
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
                  {listingData?.video ? (
                    <div class="text-box text-center">
                      <video
                        style={{
                          borderRadius: "5px",
                          objectFit: "cover",
                          height: "262px",
                          width: "100%",
                        }}
                        src={`http://157.66.191.24:3089/uploads/${
                          listingData?.video || "default-video.mp4"
                        }`}
                        controls
                        muted
                      />
                    </div>
                  ) : listingData?.images[1] ? (
                    <img
                      style={{ height: "262px", borderRadius: "5px" }}
                      className="img-2"
                      src={
                        `${process.env.REACT_APP_BASE_URL}` +
                        listingData?.images[1]
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
                    {listingData?.images[2] ? (
                      <img
                        style={{ height: "262px", borderRadius: "5px" }}
                        className="img-3"
                        src={
                          `${process.env.REACT_APP_BASE_URL}` +
                          listingData?.images[2]
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
                      {listingData?.images[3] ? (
                        <img
                          className="img-4"
                          src={
                            `${process.env.REACT_APP_BASE_URL}` +
                            listingData?.images[3]
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
                          {listingData?.images?.length} Photos
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
                    {listingData?.description}
                  </p>
                  {/* <p className="text-2 text-color-2">
               
              </p> */}
                </div>

                <div className="wrap-overview wrap-style">
                  <h3 className="titles">Amenities</h3>
                  <div className="icon-wrap flex row">
                    {/* Visible Amenities */}
                    {amenitiesToShow.map((amenity, index) => (
                      <div
                        className="col-md-4"
                        style={{ marginBottom: 10 }}
                        key={index}
                      >
                        <div>
                          <div className="inner flex">
                            <div className="icon">
                              <FaRegCheckCircle />
                            </div>
                            <div className="content Amenities_content">
                              <div className="font-2 fw-7">{amenity}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show More / Show Less Button */}
                  {hasMoreThanFive && (
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
                  )}
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
                      <p className="fw-6">({count} review)</p>
                    </div>
                    <div className="sort-inner flex">
                      <span className="text-color-4">Sort by </span>
                      <a className="newest">Newest</a>
                    </div>
                  </div>
                  <div className="comment-list">
                    <ol>
                      {Reviews?.map((review) => (
                        <li key={review._id} className="flex">
                          <div
                            className="images flex-none"
                            style={{ height: "70px", width: "70px" }}
                          >
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}${review.user.profileImage}`}
                              alt="author"
                              style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div className="content">
                            <div className="title-item flex justify-space align-center">
                              <h4>{review.user.name}</h4>
                              <p className="fs-12 lh-18">
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="star flex">
                              {/* Add star icons based on review.rating */}
                              {Array.from({
                                length: Math.round(review.rating),
                              }).map((_, index) => (
                                <svg
                                  key={index}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842" />
                                </svg>
                              ))}
                            </div>
                            <p className="texts text-color-2">
                              {review.review}
                            </p>
                            <div className="img-box">
                              {review.images?.map((image, index) => (
                                <img
                                  key={index}
                                  src={`${process.env.REACT_APP_BASE_URL}${image}`}
                                  style={{ height: "100px" }}
                                  alt="review"
                                />
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div class="wrap-map wrap-property wrap-style">
                  <h3 class="titles">Map location</h3>
                  <div class="box flex">
                    <ul>
                      <li class="flex">
                        <span class="one fw-6">City</span>
                        <span class="two">{listingData?.city}</span>
                      </li>
                      <li class="flex">
                        <span class="one fw-6">State</span>
                        <span class="two">{listingData?.state}</span>
                      </li>
                    </ul>
                    <ul>
                      <li class="flex">
                        <span class="one fw-6">Postal code</span>
                        <span class="two">{listingData?.zipCode}</span>
                      </li>
                      <li class="flex">
                        <span class="one fw-6">Country</span>
                        <span class="two">{listingData?.country}</span>
                      </li>
                    </ul>
                  </div>
                  <iframe
                    className="map-content"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7302.453092836291!2d${listingData?.longitude}!3d${listingData?.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0`}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="side-bar side-bar-1">
                <div className="inner-side-bar">
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
                          ₹{discountedPricePerNight}
                        </h4>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#6d787d",
                            marginRight: "8px",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{originalPricePerNight}
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#f5a623",
                            lineHeight: "25px",
                          }}
                        >
                          {discountPercentage}% off
                        </span>
                      </div>
                      <div style={{ fontSize: "10px", color: "#6d787d" }}>
                        + taxes & fees: ₹{taxesAmount}
                      </div>

                      {/* Date Picker for Check-in & Check-out */}
                      <div style={{ marginTop: "15px" }}>
                        <h4
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Select Dates
                        </h4>
                        <DateRangePicker
                          style={{ height: "100%", width: "100%" }}
                          showOneCalendar
                          // value={selectedDates}
                          onChange={(range) =>
                            setSelectedDates(range || [null, null])
                          }
                          placeholder="Check-in - Check-out"
                        />
                      </div>

                      {/* guest select Section */}

                      <div className="price-group style-group mt-2">
                        <h4
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Guests
                        </h4>
                        <div className="inner block">
                          {/* Adults Selection */}
                          <div style={{ width: "calc(100% - 20px)", marginLeft: "20px", marginTop: "20px" }} className="group-select">
                            <select
                              className="nice-select"
                              value={selectedGuests.adults}
                              onChange={(e) =>
                                handleGuestChange(
                                  "adults",
                                  Number(e.target.value)
                                )
                              }
                            >
                              {[...Array(11).keys()].map((num) => (
                                <option key={num} value={num}>
                                  {num} Adult{num !== 1 ? "s" : ""}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Children Selection */}
                          <div style={{ width: "calc(100% - 20px)", marginLeft: "20px", marginTop: "20px" }} className="group-select">
                            <select
                              className="nice-select"
                              value={selectedGuests.children}
                              onChange={(e) =>
                                handleGuestChange(
                                  "children",
                                  Number(e.target.value)
                                )
                              }
                            >
                              {[...Array(11).keys()].map((num) => (
                                <option key={num} value={num}>
                                  {num} Child{num !== 1 ? "ren" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-group-4 form-style2">
                        <h4
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Room
                        </h4>
                        <div className="group-select">
                          <select
                            className="nice-select"
                            value={selectedRooms}
                            onChange={(e) =>
                              handleRoomChange(Number(e.target.value))
                            }
                          >
                            {[...Array(11).keys()].slice(1).map((num) => (
                              <option key={num} value={num}>
                                {num} Room{num !== 1 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Coupon Code Section */}
                      <div style={{ marginTop: "20px" }}>
                        <h4
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "34px",
                          }}
                        >
                          Apply Coupon
                        </h4>

                        {/* Show available coupons */}
                        {coupons.length > 0 && (
                          <div style={{ marginBottom: "8px" }}>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#333",
                              }}
                            >
                              Available Coupons:
                            </p>
                            <ul
                              style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {coupons.map((coupon) => (
                                <li
                                  key={coupon._id}
                                  style={{
                                    display: "inline-block",
                                    backgroundColor: "#f5f5f5",
                                    padding: "5px 10px",
                                    marginRight: "5px",
                                    marginTop: "10px",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    color: "black",
                                    fontWeight: "600",
                                  }}
                                  onClick={() => setCouponCode(coupon.code)}
                                >
                                  {coupon.code}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <input
                          type="text"
                          placeholder="Enter Coupon Code"
                          value={
                            isCouponApplied
                              ? `${couponCode} (Applied)`
                              : couponCode
                          }
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setIsCouponApplied(false);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "8px",
                            fontSize: "14px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            color: isCouponApplied ? "green" : "black",
                            fontWeight: isCouponApplied ? "bold" : "normal",
                          }}
                        />
                        <button
                          onClick={applyCoupon}
                          style={{
                            marginTop: "10px",
                            backgroundColor: isCouponApplied ? "gray" : "red",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            fontWeight: "600",
                            borderRadius: "4px",
                            cursor: isCouponApplied ? "not-allowed" : "pointer",
                          }}
                          disabled={isCouponApplied}
                        >
                          {isCouponApplied ? "Applied" : "Apply Coupon"}
                        </button>

                        {errorMessage && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {errorMessage}
                          </p>
                        )}
                      </div>

                      {/* Savings & Total Price Section */}
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
                            ₹
                            {isNaN(totalSavings + discountAmount)
                              ? 0
                              : totalSavings + discountAmount}
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
                            ₹{isNaN(finalPrice) ? 0 : finalPrice}
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
                        onClick={() => handleBooking(listingData?._id)}
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
                            {listingData?.images?.map((data) => {
                              return (
                                <div className="col-md-4 mb-3">
                                  <div className="img-box flex">
                                    <img
                                      className="img-3"
                                      src={
                                        `${process.env.REACT_APP_BASE_URL}` +
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
                        listingData?.video || "default-video.mp4"
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
