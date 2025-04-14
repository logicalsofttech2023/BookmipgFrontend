import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Avatar,
  useMediaQuery,
  Box,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import PeopleIcon from "@mui/icons-material/People";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import face1 from "./assets/images/faces/face1.jpg";
import logo from "./assets/raw-logo-bookmipg-original.png";
import EventIcon from "@mui/icons-material/Event";


const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();


  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ height: 60 }} />
          </Box>

          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit">
            <Avatar src={face1} alt="User" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ "& .MuiDrawer-paper": { backgroundColor: "#ffffff", color: "#333" } }}>
        <List sx={{ width: 250 }}>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
            { text: "Hotel Management", icon: <HotelIcon />, submenu: "hotel" },
            { text: "Customer Management", icon: <PeopleIcon />, submenu: "customer" },
            { text: "Booking Management", icon: <EventIcon />, submenu: "booking" },
          ].map((item, index) => (
            <>
              <ListItem
                button
                key={item.text}
                component={item.path ? Link : "div"}
                to={item.path || "#"}
                onClick={item.submenu ? () => toggleSubmenu(item.submenu) : undefined}
                sx={{
                  backgroundColor: location.pathname === item.path ? "#e3f2fd" : "inherit",
                  color: "#333",
                  '&:hover': { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemIcon sx={{ color: "#555" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.submenu && (openSubmenu[item.submenu] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.submenu && (
                <Collapse in={openSubmenu[item.submenu]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu === "hotel" && (
                      <>
                        <ListItem button component={Link} to="/addHotel">
                          <ListItemText primary="Add Hotel" />
                        </ListItem>
                        <ListItem button component={Link} to="/totalHotel">
                          <ListItemText primary="Hotel List" />
                        </ListItem>
                      </>
                    )}
                    {item.submenu === "customer" && (
                      <>
                        <ListItem button component={Link} to="/addCustomer">
                          <ListItemText primary="Add Customer" />
                        </ListItem>
                        <ListItem button component={Link} to="/customerList">
                          <ListItemText primary="Customer List" />
                        </ListItem>
                      </>
                    )}
                    {item.submenu === "booking" && (
                      <>
                        <ListItem button component={Link} to="/bookingList">
                          <ListItemText primary="Booking List" />
                        </ListItem>
                        <ListItem button component={Link} to="/cancelledBooking">
                          <ListItemText primary="Cancelled Booking List" />
                        </ListItem>
                        <ListItem button component={Link} to="/upcomingBooking">
                          <ListItemText primary="Upcoming Booking List" />
                        </ListItem>
                        <ListItem button component={Link} to="/completedBooking">
                          <ListItemText primary="Completed Booking List" />
                        </ListItem>
                      </>
                    )}
                  </List>
                </Collapse>
              )}
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
