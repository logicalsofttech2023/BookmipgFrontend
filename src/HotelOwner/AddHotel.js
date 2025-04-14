import React, { useEffect, useState } from "react";
import { useRef } from "react"; // useRef import karein
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  IconButton,
  FormGroup,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  ListItemText,
  Box,
} from "@mui/material";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import toast, { Toaster } from 'react-hot-toast';


const AddHotel = () => {
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [room, setRoom] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("22.7323");
  const [longitude, setLongitude] = useState("75.8265");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [images, setImages] = useState([]);
  const [pricePerNight, setPricePerNight] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const fileInputRef = useRef(null);
  let token = localStorage.getItem("token");


  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    // Input field reset
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);

      // Agar saari images delete ho gayi toh file input bhi reset karein
      if (newImages.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return newImages;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // FormData object create करें
    const formData = new FormData();
    formData.append("name", hotelName);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("zipCode", pincode);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("pricePerNight", pricePerNight);
    formData.append("room", room);
    formData.append("amenities",amenities);
    formData.append("facilities",facilities);
  
    images.forEach((image) => {
      formData.append("images", image);
    });
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/addHotel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );      
      if (response.status === 200) {
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error("Error adding hotel");
      console.error("Error adding hotel:", error.response?.data || error.message);
    }
  };
  

  const handleAmenitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setAmenities(typeof value === "string" ? value.split(",") : value);
  };

  const handleFacilitiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFacilities(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        
        <div className="main-panel">
        <Toaster />

          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Add Hotel</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Add Hotel</h4>
                    <Card
                      elevation={3}
                      style={{ boxShadow: "none" }}
                      sx={{ mt: 3, mb: 3 }}
                    >
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="Hotel Name"
                                variant="filled"
                                fullWidth
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="City"
                                variant="filled"
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="Address"
                                variant="filled"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="Rating"
                                variant="filled"
                                fullWidth
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                id="filled-basic"
                                label="State"
                                variant="filled"
                                fullWidth
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                id="filled-basic"
                                label="Country"
                                variant="filled"
                                fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                id="filled-basic"
                                label="Pincode"
                                variant="filled"
                                fullWidth
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="Price Per Night"
                                variant="filled"
                                fullWidth
                                value={pricePerNight}
                                onChange={(e) =>
                                  setPricePerNight(e.target.value)
                                }
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="Rooms"
                                variant="filled"
                                fullWidth
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth variant="filled">
                                <InputLabel>Amenities</InputLabel>
                                <Select
                                  multiple
                                  value={amenities}
                                  onChange={handleAmenitiesChange}
                                  renderValue={(selected) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                      }}
                                    >
                                      {selected.map((value) => (
                                        <Chip
                                          key={value}
                                          label={value}
                                          sx={{
                                            backgroundColor: "#ff7043", // Warm orange
                                            color: "white",
                                            fontWeight: "bold",
                                            "&:hover": {
                                              backgroundColor: "#ff5722",
                                            }, // Darker on hover
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  )}
                                >
                                  {[
                                    "Free WiFi",
                                    "Swimming Pool",
                                    "Parking",
                                    "Restaurant",
                                    "Gym",
                                    "Air Conditioning",
                                    "Breakfast Included",
                                  ].map((amenity) => (
                                    <MenuItem key={amenity} value={amenity}>
                                      <Checkbox
                                        checked={
                                          amenities.indexOf(amenity) > -1
                                        }
                                        color="primary"
                                      />
                                      <ListItemText primary={amenity} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth variant="filled">
                                <InputLabel>Facilities</InputLabel>
                                <Select
                                  multiple
                                  value={facilities}
                                  onChange={handleFacilitiesChange}
                                  renderValue={(selected1) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                      }}
                                    >
                                      {selected1.map((value) => (
                                        <Chip
                                          key={value}
                                          label={value}
                                          sx={{
                                            backgroundColor: "#ff7043", // Warm orange
                                            color: "white",
                                            fontWeight: "bold",
                                            "&:hover": {
                                              backgroundColor: "#ff5722",
                                            }, // Darker on hover
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  )}
                                >
                                  {[
                                    "Bed",
                                    "Bath",
                                    "Reception",
                                    "Parking",
                                  ].map((facility) => (
                                    <MenuItem key={facility} value={facility}>
                                      <Checkbox
                                        checked={
                                          facilities.indexOf(facility) > -1
                                        }
                                        color="primary"
                                      />
                                      <ListItemText primary={facility} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id="filled-basic"
                                label="Description"
                                variant="filled"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                component="label"
                                sx={{
                                  backgroundColor: "#fe5757",
                                  color: "white",
                                  padding: "10px 20px",
                                  borderRadius: "5px",
                                  fontWeight: 700,
                                  "&:hover": {
                                    backgroundColor: "black",
                                  },
                                }}
                              >
                                Upload Images
                                <input
                                  type="file"
                                  multiple
                                  hidden
                                  ref={fileInputRef}
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                              </Button>

                              {/* Image Preview with Delete Button */}
                              <Grid container spacing={2} sx={{ mt: 2 }}>
                                {images.map((image, index) => (
                                  <Grid item key={index}>
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                        height: "100%",
                                      }}
                                    >
                                      <img
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        width={100}
                                        style={{
                                          objectFit: "cover",
                                          borderRadius: 5,
                                          height: "100%",
                                        }}
                                      />
                                      <IconButton
                                        onClick={() => handleImageDelete(index)}
                                        sx={{
                                          position: "absolute",
                                          top: 0,
                                          right: 0,
                                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                                          color: "white",
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </div>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                              mt: 3,
                              backgroundColor: "#fe5757",
                              fontWeight: 700,
                            }}
                          >
                            Add Hotel
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
