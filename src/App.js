import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/NavFooter/Navbar";
import Footer from "./Components/NavFooter/Footer";
import Home from "./Components/Pages/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import VeryfyOtp from "./Components/Auth/VeryfyOtp";
import About from "./Components/Pages/About";
import ContactUs from "./Components/Pages/ContactUs";
import PropertyDetail from "./Components/Pages/PropertyDetail";
import PropertyListSidebar from "./Components/Pages/PropertyListSidebar";
import SignUp from "./Components/Auth/SignUp";
import Faq from "./Components/Pages/Faq";
import Error from "./Components/Pages/Error";
import ProjectsList from "./Components/Pages/ProjectsList";
import ProfileDetails from "./Components/Pages/ProfileDetails";
import Test from "./Components/Pages/Test";
import AllCities from "./Components/Pages/AllCities";
import BookingHistory from "./Components/Pages/BookingHistory";
import CostomerProfile from "./Components/Pages/CostomerProfile";

// Hotel Owner dashboard
import BlanckPage from "./HotelOwner/BlanckPage";
import DashBoard from "./HotelOwner/Dashboard";
import AddHotel from "./HotelOwner/AddHotel";
import TotalHotel from "./HotelOwner/TotalHotel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rsuite/dist/rsuite.min.css";

const App = () => {
  const location = useLocation();

  // Routes jisme Navbar aur Footer hide karna hai
  const hideNavbarFooterRoutes = [
    "/dashboard",
    "/blanckpage",
    "/addhotel",
    "/totalhotel",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="body counter-scroll">
      {!shouldHideNavbarFooter && <Navbar />}{" "}
      {/* Navbar hide if condition matches */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PropertyListSidebar" element={<PropertyListSidebar />} />
        <Route path="/ProjectsList" element={<ProjectsList />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VeryfyOtp" element={<VeryfyOtp />} />
        <Route path="/About" element={<About />} />
        <Route path="/ProfileDetails" element={<ProfileDetails />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/PropertyDetail" element={<PropertyDetail />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/allCities" element={<AllCities />} />
        <Route path="/bookingHistory" element={<BookingHistory />} />
        <Route path="/costomerProfile" element={<CostomerProfile />} />
        <Route path="*" element={<Error />} />
        <Route path="/test" element={<Test />} />

        {/* hotel owner routes */}
        <Route path="/blanckPage" element={<BlanckPage />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="/addHotel" element={<AddHotel />} />
        <Route path="/totalHotel" element={<TotalHotel />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}{" "}
      {/* Footer hide if condition matches */}
    </div>
  );
};

export default App;
