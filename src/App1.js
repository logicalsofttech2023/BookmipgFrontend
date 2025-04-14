import React from "react";
import Navbar from "./Components/NavFooter/Navbar";
import Home from "./Components/Pages/Home";
import Footer from "./Components/NavFooter/Footer";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import VeryfyOtp from "./Components/Auth/VeryfyOtp";
import About from "./Components/Pages/About";
import Agents from "./Components/Pages/Agents";
import ContactUs from "./Components/Pages/ContactUs";
import DashBoard from "./Components/Pages/DashBoard";
import DeshBoardPropertys from "./Components/Pages/DeshBoardPropertys";
import DeshBoardReview from "./Components/Pages/DeshBoardReview";
import DeshboardProfile from "./Components/Pages/DeshboardProfile";
import Navbar2 from "./Components/NavFooter/Navbar2";
import AgentListing from "./Components/Pages/AgentListing";
import AgentProfile from "./Components/Pages/AgentProfile";
import AgentProperty from "./Components/Pages/AgentProperty";
import MyFavorite from "./Components/Pages/MyFavorite";
import MyProperty from "./Components/Pages/MyProperty";
import Pricing from "./Components/Pages/Pricing";
import MyAgent from "./Components/Pages/MyAgent";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PropertyDetail from "./Components/Pages/PropertyDetail";
import PropertyListSidebar from "./Components/Pages/PropertyListSidebar";
import SignUp from "./Components/Auth/SignUp";
import Faq from "./Components/Pages/Faq";
import ReferEarn from "./Components/Pages/ReferEarn";
import Error from "./Components/Pages/Error";
import Agentsdetails from "./Components/Pages/Agentsdetails";
import AgentSubscriptions from "./Components/Pages/AgentSubscriptions";
import Protect from "./Components/Pages/Protect";
import Agentpropertydetails from "./Components/Pages/Agentpropertydetails";
import UserPropertyDetail from "./Components/Pages/UserPropertyDetail";
import DeveloperSubscriptions from "./Components/Pages/DeveloperSubscriptions";
import ProjectsList from "./Components/Pages/ProjectsList";
import AgentLeads from "./Components/Pages/AgentLeads";
import DeveloperLeads from "./Components/Pages/DeveloperLeads";
import Leads from "./Components/Pages/Leads";
import DeveloperProject from "./Components/Pages/DeveloperProject";
import DeveloperAllProject from "./Components/Pages/DeveloperAllProject";
import AgenciesDetails from "./Components/Pages/AgenciesDetails";
import ProfileDetails from "./Components/Pages/ProfileDetails";
import ProjectDetails from "./Components/Pages/ProjectDetails";
import DeveloperprojectDetails from "./Components/Pages/DeveloperprojectDetails";
import Agentcitylistinglead from "./Components/Pages/Agentcitylistinglead";
import UserSelfListingLead from "./Components/Pages/UserSelfListingLead";
import DeveloperProjectLeads from "./Components/Pages/DeveloperProjectLeads";

import Agentcontactus from "./Components/Pages/Agentcontactus";
import Developercontactus from "./Components/Pages/Developercontactus";
import Edituserproperty from "./Components/Pages/Edituserproperty";
import Developerprojectupdate from "./Components/Pages/Developerprojectupdate";
import FavoriteProperties from "./Components/Pages/FavoriteProperties";
import Test from "./Components/Pages/Test";
import AllCities from "./Components/Pages/AllCities";
import BookingHistory from "./Components/Pages/BookingHistory";
import CostomerProfile from "./Components/Pages/CostomerProfile";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'rsuite/dist/rsuite.min.css';



const App1 = () => {
  const location = useLocation();

  const showNavbar = [
    "/",
    "/PropertyListSidebar",
    "/ProjectsList",
    "/About",
    "/Agents",
    "/contactus",
    "/PropertyDetail",
    "/ProjectDetails",
    "/Faq",
    "/Error",
    "/agentsdetails",
    "/AgenciesDetails",
    "/ProfileDetails",
    "/allCities",
    "/bookingHistory",
    "/costomerProfile",
  ];

  const showNavbar2 = [
    "/DashBoard",
    "/AgentListing",
    "/Agentcitylistinglead",
    "/AgentLeads",
    "/AgentProfile",
    "/AgentProperty",
    "/Agentpropertydetails",
    "/AgentSubscriptions",
    "/DeveloperSubscriptions",
    "/DeveloperLeads",
    "/DeveloperProject",
    "/DeveloperAllProject",
    "/DeshBoardPropertys",
    "/DeshBoardReview",
    "/DeshboardProfile",
    "/MyFavorite",
    "/MyProperty",
    "/UserPropertyDetail",
    "/Pricing",
    "/MyAgent",
    "/UserSelfListingLead",
    "/ReferEarn",
    "/Leads",
    "/DeveloperprojectDetails",
    "/DeveloperProjectLeads",
    "/Agentcontactus",
    "/Developercontactus",
    "/Edituserproperty",
    "/Developerprojectupdate",
    "/FavoriteProperties",
  ];

  const showFooter = [
    "/PropertyListSidebar",
    "/ProjectsList",
    "/About",
    "/Agents",
    "/contactus",
    "/PropertyDetail",
    "/ProjectDetails",
    "/DashBoard",
    "/AgentListing",
    "/AgentProfile",
    "/AgentSubscriptions",
    "/DeveloperSubscriptions",
    "/DeveloperProject",
    "/DeveloperAllProject",
    "/Agentpropertydetails",
    "/DeveloperprojectDetails",

    "/AgentProperty",
    "/Agentcitylistinglead",
    "/DeshBoardPropertys",
    "/DeshBoardReview",
    "/DeshboardProfile",
    "/UserPropertyDetail",
    "/MyFavorite",
    "/MyProperty",
    "/Pricing",
    "/MyAgent",
    "/Faq",
    "/",
    "/ReferEarn",
    "/Error",
    "/AgenciesDetails",
    "/ProfileDetails",
    "/UserSelfListingLead",
    "/DeveloperLeads",
    "/DeveloperProjectLeads",
    "/AgentLeads",
    "/agentsdetails",
    "/Agentcontactus",
    "/Developercontactus",
    "/Edituserproperty",
    "/Developerprojectupdate",
    "/FavoriteProperties",
    "/allCities",
    "/bookingHistory",
    "/costomerProfile",
  ];

  const Navigate = useNavigate();
  let role = localStorage.getItem("roleType");

  return (
    <div className="body counter-scroll">
      <div className="preload preload-container">
        <div className="boxes">
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="box">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div id="wrapper">
        <div id="pagee" className="clearfix">
          {showNavbar.includes(location.pathname) && <Navbar />}
          {showNavbar2.includes(location.pathname) && <Navbar2 />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/PropertyListSidebar"
              element={<PropertyListSidebar />}
            />
            <Route path="/ProjectsList" element={<ProjectsList />} />

            {!role ? (
              <>
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Register" element={<Register />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/" />} />
            )}
            {/* <Route path="/Login" element={<Login />} />
            <Route path="SignUp" element={<SignUp />}></Route>
            <Route path="/Register" element={<Register />}></Route> */}

            <Route path="/VeryfyOtp" element={<VeryfyOtp />}></Route>

            <Route path="/About" element={<About />} />
            <Route path="/Agents" element={<Agents />} />
            <Route path="/agentsdetails" element={<Agentsdetails />} />
            <Route path="/AgenciesDetails" element={<AgenciesDetails />} />

            <Route path="/ProfileDetails" element={<ProfileDetails />}></Route>

            <Route path="/contactus" element={<ContactUs />} />

            <Route path="/PropertyDetail" element={<PropertyDetail />} />
            <Route path="/ProjectDetails" element={<ProjectDetails />}></Route>

            <Route path="/Faq" element={<Faq />} />
            <Route path="/allCities" element={<AllCities />}></Route>

            <Route path="/bookingHistory" element={<BookingHistory />}></Route>
            <Route path="/costomerProfile" element={<CostomerProfile />}></Route>

            <Route
              path="/DashBoard"
              element={<Protect ComponentName={DashBoard} />}
            ></Route>

            <Route
              path="/AgentListing"
              element={<Protect ComponentName={AgentListing} />}
            ></Route>
            <Route
              path="/AgentLeads"
              element={<Protect ComponentName={AgentLeads} />}
            ></Route>

            <Route
              path="/Agentcitylistinglead"
              element={<Protect ComponentName={Agentcitylistinglead} />}
            ></Route>

            <Route
              path="/DeveloperLeads"
              element={<Protect ComponentName={DeveloperLeads} />}
            ></Route>
            <Route
              path="/Leads"
              element={<Protect ComponentName={Leads} />}
            ></Route>
            <Route
              path="/DeveloperProject"
              element={<Protect ComponentName={DeveloperProject} />}
            ></Route>
            <Route
              path="/DeveloperAllProject"
              element={<Protect ComponentName={DeveloperAllProject} />}
            ></Route>

            <Route
              path="/FavoriteProperties"
              element={<Protect ComponentName={FavoriteProperties} />}
            ></Route>

            <Route
              path="/Developerprojectupdate"
              element={<Protect ComponentName={Developerprojectupdate} />}
            ></Route>
            <Route
              path="/DeveloperProjectLeads"
              element={<Protect ComponentName={DeveloperProjectLeads} />}
            ></Route>

            <Route
              path="/AgentProfile"
              element={<Protect ComponentName={AgentProfile} />}
            ></Route>

            <Route
              path="/AgentProperty"
              element={<Protect ComponentName={AgentProperty} />}
            ></Route>

            <Route
              path="/Agentpropertydetails"
              element={<Protect ComponentName={Agentpropertydetails} />}
            ></Route>

            <Route
              path="/AgentSubscriptions"
              element={<Protect ComponentName={AgentSubscriptions} />}
            ></Route>
            <Route
              path="/DeveloperSubscriptions"
              element={<Protect ComponentName={DeveloperSubscriptions} />}
            ></Route>
            <Route
              path="/DeveloperprojectDetails"
              element={<Protect ComponentName={DeveloperprojectDetails} />}
            ></Route>

            <Route
              path="/DeshBoardPropertys"
              element={<Protect ComponentName={DeshBoardPropertys} />}
            ></Route>

            <Route
              path="/Edituserproperty"
              element={<Protect ComponentName={Edituserproperty} />}
            ></Route>

            <Route
              path="/DeshBoardReview"
              element={<Protect ComponentName={DeshBoardReview} />}
            ></Route>

            <Route
              path="/DeshboardProfile"
              element={<Protect ComponentName={DeshboardProfile} />}
            ></Route>

            <Route
              path="/MyFavorite"
              element={<Protect ComponentName={MyFavorite} />}
            ></Route>

            <Route
              path="/MyProperty"
              element={<Protect ComponentName={MyProperty} />}
            ></Route>
            <Route
              path="/UserSelfListingLead"
              element={<Protect ComponentName={UserSelfListingLead} />}
            ></Route>

            <Route
              path="/UserPropertyDetail"
              element={<Protect ComponentName={UserPropertyDetail} />}
            ></Route>

            <Route
              path="/Pricing"
              element={<Protect ComponentName={Pricing} />}
            ></Route>

            <Route
              path="/MyAgent"
              element={<Protect ComponentName={MyAgent} />}
            ></Route>

            <Route
              path="/ReferEarn"
              element={<Protect ComponentName={ReferEarn} />}
            ></Route>

            <Route
              path="/Developercontactus"
              element={<Protect ComponentName={Developercontactus} />}
            ></Route>
            <Route
              path="/Agentcontactus"
              element={<Protect ComponentName={Agentcontactus} />}
            ></Route>

            <Route path="*" element={<Error />}></Route>
            <Route path="/test" element={<Test />}></Route>
          </Routes>
          {showFooter.includes(location.pathname) && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default App1;
