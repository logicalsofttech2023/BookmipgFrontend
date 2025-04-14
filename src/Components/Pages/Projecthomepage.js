import React from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  return (
    <section className=" bg-white mt-4  mb-3  wg-search-area home5-two">
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
              <h2 style={{ color: "rgb(51, 51, 51)", fontSize: "26px", lineHeight: "normal"}} >Populer Hotels
              </h2>
              
              <Link className="arrow-slider" to="#">
                {" "}
              </Link>
            </div>
          </div>

          <div className="img-style swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
            <div
              aria-live="polite"
              style={{
                width: "100%",
                "-webkit-transform": "translate3d(0px, 0px, 0px)",
                "-ms-transform": "translate3d(0px, 0px, 0px)",
                transform: "translate3d(0px, 0px, 0px)",
              }}
            >
              <Slider {...settings}>
                <div
                  className="swiper-slides swiper-slide swiper-slide-active"
                  role="group"
                  aria-label="1 / 6"
                  style={{ width: "256px", "margin-right": "27px" }}
                >
                  <div
                    className="box hover-img"
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="images relative img-style">
                      <a href="#">
                        <img
                          style={{ borderRadius: "10px" }}
                          src="https://lid.zoocdn.com/u/1024/768/533fd4eb0450f9aa9797470c9546bbaeacefdd6d.jpg:p"
                          alt="images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <div className="money fs-18 fw-6 text-color-1 mb-0 mt-2">
                        <Link to="/Furniture">Hotel O Sudipti Resort</Link>
                        <p className="text-color-1">Vijay Nagar, Indore</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slides swiper-slide swiper-slide-next"
                  role="group"
                  aria-label="2 / 6"
                  style={{ width: "256px", "margin-right": "27px" }}
                >
                  <div
                    className="box hover-img"
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="images relative img-style">
                      <img
                        style={{ borderRadius: "10px" }}
                        src="https://lid.zoocdn.com/u/480/360/15cb57a44905a7fb1c10a1ae2174b993ec4ccea6.jpg:p"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <div className="money fs-18 fw-6 text-color-1 mb-0 mt-2">
                        <Link to="/Furniture">Hotel O Sudipti Resort</Link>
                        <p className="text-color-1">Vijay Nagar, Indore</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slides swiper-slide"
                  role="group"
                  aria-label="3 / 6"
                  style={{ width: "256px", "margin-right": "27px" }}
                >
                  <div
                    className="box hover-img"
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="images relative img-style">
                      <img
                        style={{ borderRadius: "10px" }}
                        src="https://lid.zoocdn.com/u/1024/768/5b4e6b736561ff2c26b03390a13f815d87b20cf4.jpg:p"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <div className="money fs-18 fw-6 text-color-1 mb-0 mt-2">
                        <Link to="/Furniture">Hotel O Sudipti Resort</Link>
                        <p className="text-color-1">Vijay Nagar, Indore</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="swiper-slides swiper-slide swiper-slide-next"
                  role="group"
                  aria-label="2 / 6"
                  style={{ width: "256px", "margin-right": "27px" }}
                >
                  <div
                    className="box hover-img"
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="images relative img-style">
                      <img
                        style={{ borderRadius: "10px" }}
                        src="https://lid.zoocdn.com/u/1024/768/6ba88baf2162239285e7c21883048bb95bdaf093.jpg:p"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <div className="money fs-18 fw-6 text-color-1 mb-0 mt-2">
                        <Link to="/Furniture">Hotel O Sudipti Resort</Link>
                        <p className="text-color-1">Vijay Nagar, Indore</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slides swiper-slide swiper-slide-next"
                  role="group"
                  aria-label="2 / 6"
                  style={{ width: "256px", "margin-right": "27px" }}
                >
                  <div
                    className="box hover-img"
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="images relative img-style">
                      <img
                        style={{ borderRadius: "10px" }}
                        src="https://lid.zoocdn.com/u/1024/768/5b4e6b736561ff2c26b03390a13f815d87b20cf4.jpg:p"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <div className="money fs-18 fw-6 text-color-1 mb-0 mt-2">
                        <Link to="/Furniture">Hotel O Sudipti Resort</Link>
                        <p className="text-color-1">Vijay Nagar, Indore</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="swiper-slides swiper-slide swiper-slide-next"
                  role="group"
                  aria-label="2 / 6"
                  style={{ width: "256px", "margin-right": "27px" }}
                >
                  <div
                    className="box hover-img"
                    style={{ paddingLeft: "5px", paddingRight: "5px" }}
                  >
                    <div className="images relative img-style">
                      <img
                        style={{ borderRadius: "10px" }}
                        src="https://lid.zoocdn.com/u/480/360/15cb57a44905a7fb1c10a1ae2174b993ec4ccea6.jpg:p"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <div className="money fs-18 fw-6 text-color-1 mb-0 mt-2">
                        <Link to="/Furniture">Hotel O Sudipti Resort</Link>
                        <p className="text-color-1">Vijay Nagar, Indore</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projecthomepage;
