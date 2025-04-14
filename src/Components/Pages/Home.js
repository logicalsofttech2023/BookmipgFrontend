import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
// import NearByHotels from "./NearByHotels";
import BannerStrip1 from "./BannerStrip1";
import PopularDestination from "./PopulerDestination";
import LatestHotels from "./LatestHotels";
import Banner from "./Banner";

const Home = () => {
  return (
    <>
      <Banner />
      <LatestHotels />
      {/* <NearByHotels /> */}
      <PopularDestination />
      <BannerStrip1 />
    </>
  );
};

export default Home;
