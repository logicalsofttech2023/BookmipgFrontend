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
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateHotel = () => {
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
  const [originalPricePerNight, setOriginalPricePerNight] = useState("");
  const [taxesAmount, setTaxesAmount] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const fileInputRef = useRef(null);
  let token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState(null);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetchHotelData();
  }, []);

  const fetchHotelData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/user/getHotelById?hotelId=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        const data = response.data.hotel;
        setHotelData(data);
        setHotelName(data.name);
        setCity(data.city);
        setAddress(data.address);
        setState(data.state);
        setCountry(data.country);
        setPincode(data.zipCode);
        //   setLatitude(data.latitude);
        //   setLongitude(data.longitude);
        setDescription(data.description);
        setRating(data.rating);
        setPricePerNight(data.pricePerNight);
        setOriginalPricePerNight(data.originalPricePerNight);
        setTaxesAmount(data.taxesAmount);
        setRoom(data.room);
        setAmenities(data.amenities || []);
        setFacilities(data.facilities || []);
        setImages(data.images || []);
      }
    } catch (error) {
      toast.error("Error fetching hotel data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Naye images ke liye URL create karna
    const newImageUrls = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImageUrls]);

    // Input reset karne ke liye
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageDelete = async (index) => {
    const imageToDelete = images[index];

    if (!imageToDelete.preview) {
      try {
        console.log("Deleting image:", imageToDelete); // 🔍 Debugging log

        // API call hone tak button disable karo
        setLoading(true);

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}api/admin/deleteHotelImage`,
          {
            hotelId: id,
            imageUrl: imageToDelete,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Image deleted successfully");
          fetchHotelData();

          // ✅ Backend confirm hone ke baad hi remove karo
          setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
          toast.error("Failed to delete image from server");
        }
      } catch (error) {
        toast.error("Error deleting image");
        console.error("Delete error:", error.response?.data || error.message);
      } finally {
        setLoading(false); // API response ke baad button enable karo
      }
    } else {
      // Locally uploaded image hai toh sirf frontend se hatao
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    // Agar koi bhi image nahi bachi toh file input reset karo
    if (images.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    formData.append("originalPricePerNight", originalPricePerNight);
    formData.append("taxesAmount", taxesAmount);
    formData.append("room", room);
    formData.append("amenities", amenities);
    formData.append("facilities", facilities);
    formData.append("hotelId", id);

    images.forEach((image) => {
      formData.append("images", image.file); // 🔥 Corrected
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/updateHotel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        fetchHotelData();
        navigate("/totalHotel");
      }
    } catch (error) {
      toast.error("Error adding hotel");
      console.error(
        "Error adding hotel:",
        error.response?.data || error.message
      );
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
            <div className="page-header">Update Hotel</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Update Hotel</h4>
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
                              <TextField
                                id="filled-basic"
                                label="Tex Amount"
                                variant="filled"
                                fullWidth
                                value={taxesAmount}
                                onChange={(e) => setTaxesAmount(e.target.value)}
                                required
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="filled-basic"
                                label="Original Price Per Night"
                                variant="filled"
                                fullWidth
                                value={originalPricePerNight}
                                onChange={(e) =>
                                  setOriginalPricePerNight(e.target.value)
                                }
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
                                  {["Bed", "Bath", "Reception", "Parking"].map(
                                    (facility) => (
                                      <MenuItem key={facility} value={facility}>
                                        <Checkbox
                                          checked={
                                            facilities.indexOf(facility) > -1
                                          }
                                          color="primary"
                                        />
                                        <ListItemText primary={facility} />
                                      </MenuItem>
                                    )
                                  )}
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
                              <Grid container spacing={2} sx={{ mt: 2 }}>
                                {images.map((image, index) => {
                                  const imageSrc = image.preview
                                    ? image.preview // Locally uploaded image
                                    : `${process.env.REACT_APP_BASE_URL}${image}`; // Server image

                                  return (
                                    <Grid item key={index}>
                                      <div
                                        style={{
                                          position: "relative",
                                          display: "inline-block",
                                          height: "100%",
                                        }}
                                      >
                                        <img
                                          src={imageSrc}
                                          alt="Preview"
                                          width={100}
                                          style={{
                                            objectFit: "cover",
                                            borderRadius: 5,
                                            height: "100%",
                                          }}
                                        />
                                        <IconButton
                                          onClick={() =>
                                            handleImageDelete(index)
                                          }
                                          sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            backgroundColor:
                                              "rgba(0, 0, 0, 0.5)",
                                            color: "white",
                                          }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </div>
                                    </Grid>
                                  );
                                })}
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
                            Update Hotel
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

export default UpdateHotel;
