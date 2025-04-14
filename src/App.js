import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/NavFooter/Navbar";
import Footer from "./Components/NavFooter/Footer";
import Home from "./Components/Pages/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import VeryfyOtp from "./Components/Auth/VeryfyOtp";
import About from "./Components/Pages/About";
import ContactUs from "./Components/Pages/ContactUs";
import HotelDetail from "./Components/Pages/HotelDetail";
import HotelList from "./Components/Pages/HotelList";
import SignUp from "./Components/Auth/SignUp";
import Faq from "./Components/Pages/Faq";
import Error from "./Components/Pages/Error";
import AllCities from "./Components/Pages/AllCities";
import BookingHistory from "./Components/Pages/BookingHistory";
import CostomerProfile from "./Components/Pages/CostomerProfile";
import BookingSummary from "./Components/Pages/BookingSummary";
import BookingConfirmed from "./Components/Pages/BookingConfirmed";

// Hotel Owner dashboard
import BlanckPage from "./HotelOwner/BlanckPage";
import DashBoard from "./HotelOwner/Dashboard";
import AddHotel from "./HotelOwner/AddHotel";
import TotalHotel from "./HotelOwner/TotalHotel";
import AddRoom from "./HotelOwner/AddRoom";
import TotalRoom from "./HotelOwner/TotalRoom";
import BookingList from "./HotelOwner/BookingList";
import CompletedBooking from "./HotelOwner/CompletedBooking";
import CancelledBooking from "./HotelOwner/CancelledBooking";
import CostomerList from "./HotelOwner/CostomerList";
import HotelOwnerContactUs from "./HotelOwner/ContactUs";
import HotelOwnerAboutUs from "./HotelOwner/HotelOwnerAboutUs";
import AddCostomer from "./HotelOwner/AddCostomer";
import UpdateHotel from "./HotelOwner/UpdateHotel";
import UpcomingBooking from "./HotelOwner/UpcomingBooking";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rsuite/dist/rsuite.min.css";
import TermsAndCondition from "./Components/Pages/TermsAndCondition";
import GuestPolicy from "./Components/Pages/GuestPolicy";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import MyFavorites from "./Components/Pages/MyFavorites";
// import Loader from "./SvgPathLoader";
// import HousePolicy from "./HotelOwner/HousePolicy";
// import RulesAndRestrictions from "./HotelOwner/RulesAndRestrictions";
// import CancellationPolicy from "./HotelOwner/CancellationPolicy";
import HotelOwnerPrivacyPolicy from "./HotelOwner/HotelOwnerPrivacyPolicy";
import HotelOwnerTermsAndCondition from "./HotelOwner/HotelOwnerTermsAndCondition";

const App = () => {
  const location = useLocation();
  const [showNavbarFooter, setShowNavbarFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // State for Loader

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const hiddenRoutes = [
      "/dashboard",
      "/blanckpage",
      "/addhotel",
      "/totalhotel",
      "/addroom",
      "/totalroom",
      "/bookinglist",
      "/completedbooking",
      "/cancelledbooking",
      "/costomerlist",
      "/hotelownercontactus",
      "/hotelowneraboutus",
      "/addcostomer",
      "/login",
      "/signup",
      "/veryfyotp",
      "/upcomingbooking",
      "/bookingconfirmed/",
      "/hotelownerprivacypolicy",
      "/hotelownertermsandcondition",
    ];

    const shouldHide =
      hiddenRoutes.includes(location.pathname.toLowerCase()) ||
      location.pathname.toLowerCase().startsWith("/updatehotel/") ||
      location.pathname.toLowerCase().startsWith("/housepolicy/") ||
      location.pathname.toLowerCase().startsWith("/rulesandrestrictions/") ||
      location.pathname.toLowerCase().startsWith("/cancellationpolicy/");

    setShowNavbarFooter(!shouldHide);
  }, [location.pathname]);

  return (
    <div className="body counter-scroll">
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          loder
          {/* <Loader /> */}
        </div>
      ) : (
        <>
          {showNavbarFooter && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotelList/*" element={<HotelList />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/VeryfyOtp" element={<VeryfyOtp />} />
            <Route path="/About" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/hotelsDetail/:hotelId" element={<HotelDetail />} />
            <Route path="/Faq" element={<Faq />} />
            <Route path="/allCities" element={<AllCities />} />
            <Route path="/bookingHistory" element={<BookingHistory />} />
            <Route path="/costomerProfile" element={<CostomerProfile />} />
            <Route path="/bookingSummary/:id" element={<BookingSummary />} />
            <Route
              path="/bookingConfirmed/:id"
              element={<BookingConfirmed />}
            />
            <Route path="/termsAndCondition" element={<TermsAndCondition />} />
            <Route path="/guestPolicy" element={<GuestPolicy />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/myFavorites" element={<MyFavorites />} />
            <Route path="*" element={<Error />} />

            {/* hotel owner routes */}
            <Route path="/blanckPage" element={<BlanckPage />} />
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/addHotel" element={<AddHotel />} />
            <Route path="/totalHotel" element={<TotalHotel />} />
            <Route path="/addRoom" element={<AddRoom />} />
            <Route path="/totalRoom" element={<TotalRoom />} />
            <Route path="/bookingList" element={<BookingList />} />
            <Route path="/completedBooking" element={<CompletedBooking />} />
            <Route path="/cancelledBooking" element={<CancelledBooking />} />
            <Route path="/costomerList" element={<CostomerList />} />
            <Route
              path="/hotelOwnerContactUs"
              element={<HotelOwnerContactUs />}
            />
            <Route path="/hotelOwnerAboutUs" element={<HotelOwnerAboutUs />} />
            <Route path="/addCostomer" element={<AddCostomer />} />
            <Route path="/updateHotel/:id" element={<UpdateHotel />} />
            <Route path="/upcomingBooking" element={<UpcomingBooking />} />
            {/* <Route path="/housePolicy/:id" element={<HousePolicy />} /> */}
            {/* <Route
              path="/rulesAndRestrictions/:id"
              element={<RulesAndRestrictions />}
            /> */}
            {/* <Route
              path="/cancellationPolicy/:id"
              element={<CancellationPolicy />}
            /> */}
            <Route
              path="/hotelOwnerPrivacyPolicy"
              element={<HotelOwnerPrivacyPolicy />}
            />
            <Route
              path="/hotelOwnerTermsAndCondition"
              element={<HotelOwnerTermsAndCondition />}
            />
          </Routes>
          {showNavbarFooter && <Footer />}
        </>
      )}
    </div>
  );
};

export default App;
