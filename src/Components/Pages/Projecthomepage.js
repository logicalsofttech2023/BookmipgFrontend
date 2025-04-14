import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

const Projecthomepage = () => {
  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [nearByHotelData, setNearByHotelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearByHotels();
  }, []);

  const fetchNearByHotels = async () => {
    const data = {
      latitude: "22.748008854901506",
      longitude: "75.89517523281924",
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/user/getNearbyHotels`,
        data
      );
      if (response?.status === 200) {
        setNearByHotelData(response?.data?.hotels);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white mt-4 mb-3 wg-search-area home5-two">
      <div className="container6">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="heading-section mb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "#333", fontSize: "26px" }}>Nearby Hotels</h2>
            </div>
          </div>

          <div className="img-style">
            {loading ? (
              <Slider {...settings}>
                {Array.from(new Array(3)).map((_, index) => (
                  <div key={index} style={{ padding: "5px" }}>
                    <Skeleton
                      variant="rectangular"
                      width={256}
                      height={180} // Increased height
                      style={{ borderRadius: "10px" }}
                    />
                    <Skeleton
                      width="80%"
                      height={20}
                      style={{ marginTop: "10px" }}
                    />
                    <Skeleton width="50%" height={18} />
                  </div>
                ))}
              </Slider>
            ) : nearByHotelData && nearByHotelData.length > 0 ? (
              <Slider {...settings}>
                {nearByHotelData.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="swiper-slide"
                    style={{ width: "256px", marginRight: "27px" }}
                  >
                    <div className="box hover-img" style={{ padding: "5px" }}>
                      <div className="images relative img-style">
                        <Link to="#">
                          <img
                            style={{
                              borderRadius: "10px",
                              height: "200px",
                              objectFit: "cover",
                              width: "100%",
                            }}
                            src={`${process.env.REACT_APP_BASE_URL}${hotel.images[0]}`}
                            alt={hotel.name}
                          />
                        </Link>
                      </div>
                      <div className="content">
                        <div className="money fw-6 text-color-1 mb-0 mt-2">
                          <Link
                            style={{
                              color: "#fff",
                              fontSize: "16px",
                              fontWeight: "bold",
                              display: "block",
                            }}
                            to={`/hotel/${hotel._id}`}
                          >
                            {hotel.name}
                          </Link>
                          <p
                            style={{
                              fontSize: "14px",
                              margin: "2px 0 0",
                              color: "rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            {hotel.address.length > 30
                              ? hotel.address.slice(0, 30) + "..."
                              : hotel.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="content-inner tab-content">
                <div style={{ textAlign: "center" }}>
                  <h2>
                    <img
                      width={150}
                      src="https://themesflat.co/html/dreamhomehtml/assets/images/icon/footer-icon-2.png"
                      alt="No hotels Found"
                    />
                  </h2>
                  <h3 className="mt-3">No hotels Found</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projecthomepage;
