import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopulerDestination = () => {
  const [cityData, setCityData] = useState([]);
  const fetchBestCity = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getBestCities`
      );
      if (response.status === 200) {
        setCityData(response?.data?.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchBestCity();
  }, []);

  return (
    <section
      style={{ marginBottom: "40px" }}
      class="flat-find-neighborhood wg-search-area home5"
    >
      <div class="container6">
        <div class="row">
          <div class="col-lg-12">
            <div class="mb-3">
              <h2
                className="center"
                style={{
                  color: "rgb(51, 51, 51)",
                  fontSize: "26px",
                  lineHeight: "normal",
                }}
              >
                Trending destinations
              </h2>
            </div>
            {/* Static Section for first 2 cities (find-1) */}
            <div className="wrap-find find-1 flex">
              {cityData.slice(0, 2).map((city) => (
                <div className="box" key={city._id}>
                  <div
                    className="images"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${city.image}`}
                      alt={city.cityName}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <Link
                      to={`hotelList?latitude=${city.latitude}&longitude=${city.longitude}`}
                      className="icon-plus"
                    >
                      <img src="assets/images/icon/plus.svg" alt="images" />
                    </Link>
                  </div>
                  <div className="content link-style-3">
                    <Link to={`hotelList?latitude=${city.latitude}&longitude=${city.longitude}`}>
                      <h3>{city.cityName}</h3>
                    </Link>
                    <p className="text-color-1">{city.hotelCount} listings</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Section for the remaining cities (find-2) */}
            <div className="wrap-find find-2 flex">
              {cityData.slice(2).map((city) => (
                <div className="box" key={city._id}>
                  <div className="images" style={{ height: "100%" }}>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${city.image}`}
                      alt={city.cityName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Link
                      to={`hotelList?latitude=${city.latitude}&longitude=${city.longitude}`}
                      className="icon-plus"
                    >
                      <img src="assets/images/icon/plus.svg" alt="images" />
                    </Link>
                  </div>
                  <div className="content link-style-3">
                    <Link to={`hotelList?latitude=${city.latitude}&longitude=${city.longitude}`}>
                      <h4>{city.cityName}</h4>
                    </Link>
                    <p className="text-color-1">{city.hotelCount} listings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopulerDestination;
