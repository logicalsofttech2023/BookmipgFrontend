import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react"; // useRef import karein

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

const AddRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [bedType, setBedType] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [pricePerNight, setPricePerNight] = useState("");
  const [availability, setAvailability] = useState("");
  const fileInputRef = useRef(null);

  const handleAmenityChange = (event) => {
    const {
      target: { value },
    } = event;
    setAmenities(typeof value === "string" ? value.split(",") : value);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      roomNumber,
      roomType,
      capacity,
      bedType,
      description,
      amenities,
      images,
      pricePerNight,
      availability,
    };

    console.log("Room Data Submitted:", formData);
    alert("Room added successfully!");
  };
  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper" style={{ marginTop: "50px" }}>
            <div className="page-header">Add Room</div>
            <div class="row" data-select2-id="11">
              <div class="col-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title mb-5">Add Room</h4>
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
                                label="Room Number"
                                variant="filled"
                                fullWidth
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-filled-label">
                                  Room Type
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={roomType}
                                  onChange={(e) => setRoomType(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={10}>Single room</MenuItem>
                                  <MenuItem value={20}>Suite</MenuItem>
                                  <MenuItem value={30}>Penthouse</MenuItem>
                                  <MenuItem value={30}>
                                    Connecting rooms
                                  </MenuItem>
                                  <MenuItem value={30}>Double room</MenuItem>
                                  <MenuItem value={30}>Standard room</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Capacity"
                                variant="filled"
                                fullWidth
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-filled-label">
                                  Bed Type
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  value={bedType}
                                  onChange={(e) => setBedType(e.target.value)}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={10}>Single bed</MenuItem>
                                  <MenuItem value={20}>Twin bed</MenuItem>
                                  <MenuItem value={30}>Double bed</MenuItem>
                                  <MenuItem value={30}>
                                    Triple bed rooms
                                  </MenuItem>
                                  <MenuItem value={30}>Queen size bed</MenuItem>
                                  <MenuItem value={30}>King size bed</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Description"
                                variant="filled"
                                fullWidth
                                multiline
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl sx={{ m: 1, width: 600 }}>
                                <InputLabel id="demo-multiple-checkbox-label">
                                  Amenities
                                </InputLabel>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  multiple
                                  value={amenities}
                                  onChange={handleAmenityChange}
                                  input={<OutlinedInput label="Amenities" />}
                                  renderValue={(selected) =>
                                    selected.join(", ")
                                  }
                                >
                                  {amenityOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      <Checkbox
                                        checked={amenities.includes(option)}
                                      />
                                      <ListItemText primary={option} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                component="label"
                                sx={{
                                  backgroundColor: "red",
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
                              backgroundColor: "red",
                              fontWeight: 700,
                            }}
                          >
                            Add Room
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

export default AddRoom;
