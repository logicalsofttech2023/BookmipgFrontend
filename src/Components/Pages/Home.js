import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Toplocalty from "./Toplocalty";
import swal from "sweetalert";
import cities from "../Auth/cities";
import Projecthomepage from "./Projecthomepage";
import Topdeveloperhomepage from "./Topdeveloperhomepage";
import Hotsellingprojecthome from "./Hotsellingprojecthome";
import BannerStrip1 from "./BannerStrip1";
import PopulerDestination from "./PopulerDestination";
import { DateRangePicker } from 'rsuite';

const Home = () => {
  const placeholders = [
    'Search by City "Flats by Lodha in Mumbai"',
    'Search by City "Andheri East Overview"',
    'Search by City "Prestige Kingfisher Towers"',
    'Search by City "DLF in Gurgaon"',
    'Search by City "Powai, Mumbai Overview"',
    'Search by City "Godrej Platinum"',
    'Search by City "Sobha in Bangalore"',
    'Search by City "Whitefield Overview"',
    'Search by City "Brigade Exotica"',
    'Search by City "Oberoi Realty in Mumbai"',
    'Search by City "Juhu Overview"',
    'Search by City "Raheja Atlantis"',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [Property, setProperty] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Message, setMessage] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  //const [cities, setcities] = useState();
  const [selectedBajat, setselectedBajat] = useState();
  const [types, setTypes] = useState();
  const Navigate = useNavigate();
  const [Cointactusdata, setCointactusdata] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
  

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = cities?.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowDropdown(value.length > 0 && filtered.length > 0);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);

    setShowDropdown(false);
  };

  useEffect(() => {
    if (searchTerm) {
      GetCityProperty();
    }
  }, [searchTerm]);
  const GetCityProperty = () => {
    const data = {
      city_name: searchTerm,
    };
    axios
      .post("http://157.66.191.24:3089/website/get_city_property", data)
      .then((response) => {
        const typess =
          response?.data?.data?.flatMap((item) => item?.building_type_two) ||
          [];

        setTypes(typess);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [placeholders.length]);

  const [Buy, setBuy] = useState(null);

  let cityes = secureLocalStorage.getItem("cityname");
  const [lengthh, setlengthh] = useState();
  const [lengthh1, setlengthh1] = useState();
  useEffect(() => {
    GetallProperty();
  }, [Buy, cityes]);

  const GetallProperty = () => {
    const data = {
      city_name: cityes ? cityes : "",
    };
    axios
      .post("http://157.66.191.24:3089/website/all_get_Property", data)

      .then((response) => {
        let filteredData = [];

        if (Buy == "1") {
          filteredData = response.data.data.filter(
            (item) => item?.property_listing_type == "Sale"
          );
          setlengthh(filteredData?.length);
        } else if (Buy == "2") {
          filteredData = response.data.data.filter(
            (item) => item?.property_listing_type == "Rent"
          );
          setlengthh1(filteredData?.length);
        } else {
          filteredData = response.data.data;
        }

        setProperty(filteredData?.reverse());
      })
      .catch((error) => {});
  };

  const ContactusDta = (e) => {
    e.preventDefault();

    const data = {
      name: Name,
      email: Email,
      mobile_no: Phone,
      property_type: selectedOption,
      message: Message,
    };

    axios
      .post("http://157.66.191.24:3089/website/add_contact_us", data)
      .then((res) => {
        swal(res.data.msg, {
          icon: "success",
        });
      })
      .catch((error) => {});
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSelectedOption("");
  };

  const handlerHeaderdata = (e) => {
    e.preventDefault();
    if (searchTerm) {
      secureLocalStorage.setItem("cityname", searchTerm);
    } else {
    }
    secureLocalStorage.setItem("properttype");
    secureLocalStorage.setItem("rooms");
    secureLocalStorage.setItem("properttype2", selectedOption);
    secureLocalStorage.setItem("selectedBajat", selectedBajat);
    const data = Math?.random()?.toFixed(2);

    secureLocalStorage.setItem("random", data);
    Navigate("/PropertyListSidebar");
  };
  useEffect(() => {
    GetContactUs();
  }, [0]);
  const GetContactUs = () => {
    axios
      .get("http://157.66.191.24:3089/website/get_admin_contact_us")
      .then((res) => {
        setCointactusdata(res?.data?.data[0]);
      })
      .catch((error) => {});
  };

  //   useEffect(()=>{
  //     GetHeaderApi()
  //   },[0])
  //   const GetHeaderApi = () =>{
  // const data = {
  //   locality:secureLocalStorage.getItem("location"),
  //   property_type:secureLocalStorage.getItem("propertiestype"),
  //   budget:secureLocalStorage.getItem("selectedBajat")
  // }

  // axios.post("http://157.66.191.24:3089/website/search_property",data).then((res)=>{
  //   setProperty(res.data.data);

  // }).catch((error)=>{})
  //   }
  return (
    <>
      {/* slider */}
      <section className="slider home2 bg-1">
        <div className="slider-item">
          <div className="container6 relative">
            <div className="row">
              <div className="col-lg-12">
                <div className="content po-content-two mt-4">
                  <div
                    style={{ marginBottom: 10 }}
                    className="heading center mt-3"
                  >
                    <h2
                      className="text-color- fw-7 "
                      style={{
                        fontSize: "30px",
                        lineHeight: "38px",
                        color: "#fff",
                        marginBottom: 10,
                      }}
                    >
                      BookmiPG
                    </h2>
                    <h2
                      className="text-color- fw-7"
                      style={{
                        fontSize: "38px",
                        lineHeight: "38px",
                        color: "#fff",
                        marginBottom: 24,
                      }}
                    >
                      Over 174,000+ hotels and homes across 35+ countries
                    </h2>
                  </div>

                  <div
                    className=" content-inner tab-content flex-center"
                    style={{}}
                  >
                    <div
                      className="form-sl"
                      style={{
                        background: "#00000080",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        className=" content-inner tab-content flex-center home-slider-box"
                        style={{ top: "-67px" }}
                      ></div>
                      <form onSubmit={handlerHeaderdata}>
                        <div className="wd-find-select flex">
                          <div className="wrap-icon flex align-center justify-center link-style-3">
                            <div
                              className="skude form-group-1 gap-2  search-form form-style"
                              style={{ marginRight: "0px" }}
                            >
                              <input
                                type="search"
                                className="search-field skude"
                                placeholder={placeholders[placeholderIndex]}
                                value={searchTerm}
                                onChange={handleChange}
                                style={{
                                  width: "410px",
                                  padding: "10px",
                                  //  borderRadius: '0px',
                                  // border: '1px solid #ccc',
                                  borderRadius: "0px",
                                  borderTopLeftRadius: "5px",
                                  borderBottomLeftRadius: "5px",
                                  boxSizing: "border-box",
                                  lineHeight: "27px",
                                }}
                              />

                              {showDropdown && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    border: "1px solid #ccc",
                                    borderTop: "none",
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    margin: 0,
                                    padding: 0,
                                    zIndex: 1000,
                                    background: "#fff",
                                  }}
                                >
                                  {filteredSuggestions?.map(
                                    (suggestion, index) => (
                                      <div
                                        className="option-select skude"
                                        key={index}
                                        onClick={() => {
                                          handleSelectSuggestion(suggestion);
                                        }}
                                        style={{
                                          padding: "10px",
                                          cursor: "pointer",
                                          borderBottom: "1px solid #eee",
                                          background: "#fff",
                                          color: "black",
                                        }}
                                      >
                                        {suggestion}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>

                            <div
                              
                              style={{ width: "100%" }}
                            >
                              <DateRangePicker showOneCalendar />
                            </div>
                            <button
                              type="submit"
                              className="sc-button skude"
                              style={{ borderStyle: "none", height: "52px" }}
                            >
                              <div
                                type="submit"
                                class="button-search sc-btn-top"
                              >
                                <i className="far fa-search text-color-1" />
                                &nbsp; Search Now
                              </div>
                            </button>
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
      </section>

      <section
        className="flat-featured wg-dream home mb-0"
        style={{ background: "#faf8ff", paddingBottom: "0px" }}
      >
        <div className="container6">
          <div className="row">
            <div className="col-lg-12 pt-5">
              <div className="heading-section center mb-0">
                <h2
                  style={{ fontSize: 26, lineHeight: "normal", color: "#333" }}
                >
                  Latest Hotels
                </h2>
              </div>
              <div className="flat-tabs themesflat-tabs">
                <div className="content-tab">
                  {Property?.length > 0 ? (
                    <div className="content-inner tab-content">
                      <div className="wrap-item flex">
                        {/* all_get_Property */}
                        {Property?.slice(0, 8)?.map((data) => {
                          return (
                            <div className="box box-dream hv-one">
                              <div className="image-group relative">
                                <span className="featured fs-12 fw-6">
                                  Company-Serviced
                                </span>

                                <div className="item active custom-slider">
                                  <AwesomeSlider
                                    style={{
                                      "--slider-height-percentage": "210px",
                                      "--slider-width-percentage": "284px",
                                      "--organic-arrow-height": "17px",
                                      "--organic-arrow-color": "#fff",
                                      "--control-button-opacity": 1,
                                      "--animation-duration": "100ms",
                                    }}
                                    bullets={false}
                                    mobileTouch={true}
                                  >
                                    {data?.images?.map((imageName, index) => (
                                      <div
                                        style={{ width: "100%" }}
                                        key={index}
                                        data-src={`http://157.66.191.24:3089/uploads/${imageName}`}
                                      />
                                    ))}
                                  </AwesomeSlider>
                                </div>
                              </div>

                              <div className="content">
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    secureLocalStorage.setItem(
                                      "ListingId",
                                      data?._id
                                    );
                                    Navigate("/PropertyDetail");
                                  }}
                                >
                                  <h3 className="link-style-1">
                                    <Link to="/PropertyDetail">
                                      <Link className="text-capitalize">
                                        {data?.building_name}
                                      </Link>
                                    </Link>
                                  </h3>
                                  <Link>
                                    <div
                                      className="text-address"
                                      style={{ marginBottom: "5px" }}
                                    >
                                      <p className="p-12">
                                        {data?.locality} {data?.city_name}
                                      </p>
                                    </div>
                                  </Link>

                                  <div className="fs-16 fw-6 text-color-3">
                                    <Link>
                                      ₹
                                      {data?.price
                                        ? `${(data?.price / 100000)?.toFixed(
                                            2
                                          )}`
                                        : `${(
                                            data?.rent_amount / 100000
                                          )?.toFixed(2)}`}
                                    </Link>
                                  </div>

                                  <div className="fs-16 fw-6 text-color-3">
                                    <Link>
                                      {/* Custom Rating Section */}
                                      <div className="rating">
                                        <span className="rating-stars">
                                          {/* Display stars for 4.9 */}
                                          {[...Array(5)].map((_, i) => (
                                            <i
                                              key={i}
                                              className={`fas fa-star ${
                                                i < 4
                                                  ? "filled"
                                                  : i < 4.9
                                                  ? "half"
                                                  : ""
                                              }`}
                                            />
                                          ))}
                                        </span>
                                        <span className="rating-value">
                                          4.9
                                        </span>
                                      </div>
                                    </Link>
                                  </div>

                                  {/* Services Section */}
                                  <div className="services">
                                    <ul className="service-list">
                                      <li>
                                        <i className="fas fa-wifi"></i> Free
                                        Wifi
                                      </li>
                                      <li>
                                        <i className="fas fa-tv"></i> AV TV
                                      </li>
                                      <li>
                                        <i className="fas fa-sun"></i> Geyser
                                      </li>
                                      <li>
                                        <i className="fas fa-plug"></i> Power
                                        Backup
                                      </li>
                                      
                                    </ul>
                                  </div>

                                  <div
                                    className="icon-box flex"
                                    style={{
                                      paddingBottom: "8px",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    {/* Any additional icons can go here */}
                                  </div>
                                </div>

                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    secureLocalStorage.setItem(
                                      "UserdetailsID",
                                      data?.userId
                                    );
                                    Navigate("/ProfileDetails");
                                  }}
                                  className="days-box flex justify-space align-center"
                                >
                                  <div
                                    className="img-author hv-tool"
                                    data-tooltip={data?.name}
                                  >
                                    {data?.user_image ? (
                                      <img
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                          borderRadius: "50px",
                                        }}
                                        src={
                                          `http://157.66.191.24:3089/uploads/` +
                                          data?.user_image
                                        }
                                        alt="images"
                                      />
                                    ) : (
                                      <img
                                        src="assets/images/author/author-2.jpg"
                                        alt="images"
                                      />
                                    )}
                                  </div>

                                  <div className="days">
                                    {data?.updatedAt?.slice(0, 10)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="content-inner tab-content">
                      {" "}
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Hotsellingprojecthome /> */}
      <Projecthomepage />
      <PopulerDestination />

      <Toplocalty />
      <BannerStrip1 />
      {/* <Topdeveloperhomepage /> */}

      <style jsx>{`
        .custom-slider .awssld__controls button {
          background-color: #ffffff00 !important;
          top: 45%;
          border-radius: none !important;
          height: 45px !important;
          width: 45px !important;
        }
      `}</style>
    </>
  );
};

export default Home;
