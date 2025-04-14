import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

// List of amenities
const amenityOptions = [
  "Free WiFi",
  "Swimming Pool",
  "Gym",
  "Spa",
  "Parking",
  "Restaurant",
  "Room Service",
  "Bar",
  "Airport Shuttle",
];

const AddHotel = () => {
  // State for form fields
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = "ak_m70aywkkQRnwqoYUd3czG0BXrehYc";

  // Handle Checkbox Selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  // Handle Image Removal
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare form data
    const formData = {
      hotelName,
      city,
      description,
      rating,
      amenities,
      images,
    };

    console.log("Hotel Data Submitted:", formData);
    alert("Hotel added successfully!");

    // Reset Form
    setHotelName("");
    setCity("");
    setDescription("");
    setRating("");
    setAmenities([]);
    setImages([]);
  };

  useEffect(() => {
    if (city.length > 2) {
      console.log(city);

      fetchAddressSuggestions(city);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const fetchAddressSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.ideal-postcodes.co.uk/v1/places?api_key=${API_KEY}`,
        {
          params: { query },
        }
      );
      console.log(response);

      setSuggestions(response.data.result.hits || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Container maxWidth="md">
              <Card elevation={3} sx={{ mt: 3, mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                    sx={{ marginBottom: "30px" }}
                  >
                    Add New Hotel
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Hotel Name */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Hotel Name"
                          fullWidth
                          value={hotelName}
                          onChange={(e) => setHotelName(e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      {/* city */}
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        style={{ position: "relative" }}
                      >
                        <TextField
                          label="Select City"
                          fullWidth
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          variant="outlined"
                          autoComplete="off"
                        />

                        {suggestions.length > 0 && (
                          <Paper
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              width: "100%",
                              zIndex: 10,
                              background: "#fff",
                              border: "1px solid #ccc",
                              borderRadius: 4,
                              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                              maxHeight: "200px",
                              overflowY: "auto",
                            }}
                          >
                            {suggestions.map((suggestion, index) => (
                              <MenuItem
                                key={index}
                                onClick={() => {
                                  setCity(suggestion.descriptive_name);
                                  setSuggestions([]); // Suggestions list ko empty karne ka code
                                }}
                              >
                                {suggestion.descriptive_name}
                              </MenuItem>
                            ))}
                          </Paper>
                        )}
                      </Grid>

                      {/* Description */}
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          fullWidth
                          multiline
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      {/* Rating */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Rating (1-5 Stars)"
                          type="number"
                          fullWidth
                          inputProps={{ min: 0, max: 5 }}
                          value={rating}
                          onChange={(e) => {
                            const value = Math.min(
                              5,
                              Math.max(0, Number(e.target.value))
                            );
                            setRating(value);
                          }}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      {/* Amenities (Multi-Select Checkboxes) */}
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Select Amenities:
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <FormGroup row>
                            {amenityOptions.map((option) => (
                              <FormControlLabel
                                key={option}
                                control={
                                  <Checkbox
                                    value={option}
                                    checked={amenities.includes(option)}
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label={option}
                              />
                            ))}
                          </FormGroup>
                        </Paper>
                      </Grid>

                      {/* Image Upload */}
                      <Grid item xs={12}>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                          id="image-upload"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                          <Button
                            variant="contained"
                            component="span"
                            startIcon={<AddPhotoAlternate />}
                            fullWidth
                          >
                            Upload Images
                          </Button>
                        </label>

                        {/* Image Previews */}
                        <Grid container spacing={2} mt={2}>
                          {images.map((image, index) => (
                            <Grid item key={index} xs={4}>
                              <Paper
                                elevation={3}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  padding: 1,
                                  position: "relative",
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="Preview"
                                  style={{
                                    width: "100%",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                                <IconButton
                                  onClick={() => handleRemoveImage(index)}
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                  }}
                                  color="error"
                                >
                                  <Delete />
                                </IconButton>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>

                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ py: 1.5, fontSize: "1rem" }}
                        >
                          Add Hotel
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
