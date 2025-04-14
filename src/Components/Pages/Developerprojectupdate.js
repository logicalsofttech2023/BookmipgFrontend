import React, { useEffect, useState } from "react";
import AgentSidebar from "../NavFooter/AgentSidebar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import cities from "../Auth/cities";
import swal from "sweetalert";

const Developerprojectupdate = () => {
  const Navigate = useNavigate();

  const [startprice, setstartprice] = useState();
  const [endprice, setendprice] = useState();
  const [minsize, setminsize] = useState();
  const [maxsize, setmaxsize] = useState();
  const [projectminsize, setprojectminsize] = useState();
  const [projectmaxsize, setprojectmaxsize] = useState();
  const [projectareatype, setprojectareatype] = useState();
  const [Video, SetVideo] = useState();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState("");

  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const [projectbuildingname, setprojectbuildingname] = useState();

  const [Locality, setLocality] = useState();

  const [areaType, setAreaType] = useState("");

  const [additionalRooms, setAdditionalRooms] = useState("");

  const [possessionStatus, setPossessionStatus] = useState("");

  const [furnishingStatus, setFurnishingStatus] = useState("");

  const [propertyAge, setPropertyAge] = useState("");

  const [numberOfBathrooms, setNumberOfBathrooms] = useState("");

  const [roomCount, setRoomCount] = useState("");

  const [coveredParking, setCoveredParking] = useState("");

  const [openParking, setOpenParking] = useState("");

  const [balconyType, setBalconyType] = useState("");

  const [powerBackup, setPowerBackup] = useState("");

  const [facing, setFacing] = useState("");

  const [view, setView] = useState("");

  const [flooring, setFlooring] = useState("");

  const [flooringNumber, setFlooringNumber] = useState("");

  const [towerBlock, setTowerBlock] = useState("");

  const [totalFloorCount, setTotalFloorCount] = useState("");

  const [unitNumber, setUnitNumber] = useState("");

  const [propertyDescription, setpropertyDescription] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedLocation, setselectedLocation] = useState([]);
  const [ExplainingPrice, setExplainingPrice] = useState([]);
  const [explaintheproperty, setexplaintheproperty] = useState([]);
  const [definingsizes, setdefiningsizes] = useState([]);
  const [suitables, setsuitables] = useState([]);
  const amenitiesList = [
    { label: "Gymnasium", value: "Gymnasium" },
    { label: "Swimming Pool", value: "Swimming Pool" },
    { label: "Badminton Court(s)", value: "Badminton Court(s)" },
    { label: "Tennis Court(s)", value: "Tennis Court(s)" },
    { label: "Squash Court", value: "Squash Court" },
    { label: "Kids Play Areas", value: "Kids Play Areas" },
    { label: "Jogging / Cycle Track", value: "Jogging / Cycle Track" },
    { label: "Power Backup", value: "Power Backup" },
    { label: "Central AC", value: "Central AC" },
    { label: "Central Wi-Fi", value: "Central Wi-Fi" },
    { label: "Attached Market", value: "Attached Market" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Home Automation", value: "Home Automation" },
    { label: "24 x 7 Security", value: "24 x 7 Security" },
    { label: "Clubhouse", value: "Clubhouse" },
    { label: "Balcony", value: "Balcony" },
    { label: "High Speed Elevators", value: "High Speed Elevators" },
    { label: "Pre-School", value: "Pre-School" },
    { label: "Medical Facility", value: "Medical Facility" },
    { label: "Day Care Center", value: "Day Care Center" },
    { label: "Pet Area", value: "Pet Area" },
    { label: "Indoor Games", value: "Indoor Games" },
    { label: "Conference Room", value: "Conference Room" },
    { label: "Large Green Area", value: "Large Green Area" },
    { label: "Concierge Desk", value: "Concierge Desk" },
    { label: "Helipad", value: "Helipad" },
    { label: "Golf Course", value: "Golf Course" },
    { label: "Multiplex", value: "Multiplex" },
    { label: "Visitors Parking", value: "Visitors Parking" },
    { label: "Serviced Apartments", value: "Serviced Apartments" },
    { label: "Service Elevators", value: "Service Elevators" },
    { label: "High Street Retail", value: "High Street Retail" },
    { label: "Hypermarket", value: "Hypermarket" },
    { label: "ATMs", value: "ATMs" },
    { label: "Food Court", value: "Food Court" },
    { label: "Servant Quarter", value: "Servant Quarter" },
    { label: "Study Room", value: "Study Room" },
    { label: "Private Pool", value: "Private Pool" },
    { label: "Private Gym", value: "Private Gym" },
    { label: "Private Jacuzzi", value: "Private Jacuzzi" },
    { label: "View of Water", value: "View of Water" },
    { label: "View of Landmark", value: "View of Landmark" },
    { label: "Built in Wardrobes", value: "Built in Wardrobes" },
    { label: "Walk-in Closet", value: "Walk-in Closet" },
    { label: "Lobby in Building", value: "Lobby in Building" },
    { label: "Barbeque Area", value: "Barbeque Area" },
    { label: "Double Glazed Windows", value: "Double Glazed Windows" },
    { label: "Centrally Air-Conditioned", value: "Centrally Air-Conditioned" },
    { label: "Central Heating", value: "Central Heating" },

    { label: "Electricity Backup", value: "Electricity Backup" },
    { label: "Waste Disposal", value: "Waste Disposal" },
    { label: "First Aid Medical Center", value: "First Aid Medical Center" },
    { label: "Tiles", value: "Tiles" },
    { label: "Broadband Internet", value: "Broadband Internet" },
    { label: "Satellite/Cable TV", value: "Satellite/Cable TV" },
    { label: "Intercom", value: "Intercom" },
    { label: "Jacuzzi", value: "Jacuzzi" },
    { label: "Kids Play Area", value: "Kids Play Area" },
    { label: "Reception/Waiting Room", value: "Reception/Waiting Room" },
    { label: "Maintenance Staff", value: "Maintenance Staff" },
    { label: "Sauna", value: "Sauna" },
    { label: "Security Staff", value: "Security Staff" },
    { label: "CCTV Security", value: "CCTV Security" },
    { label: "Laundry Facility", value: "Laundry Facility" },
    { label: "Cleaning Services", value: "Cleaning Services" },
    { label: "Facilities for Disabled", value: "Facilities for Disabled" },
    { label: "24 Hours Concierge", value: "24 Hours Concierge" },
    { label: "Balcony or Terrace", value: "Balcony or Terrace" },
  ];

  const location = [
    { label: "Schools in vicinity", value: "Schools in vicinity" },
    { label: "Adjoining Metro Station", value: "Adjoining Metro Station" },
    { label: "Peaceful Vicinity", value: "Peaceful Vicinity" },
    { label: "Wide Road", value: "Wide Road" },
    { label: "Near City Center", value: "Near City Center" },
    { label: "Safe & Secure Locality", value: "Safe & Secure Locality" },
  ];
  const explainprices = [
    { label: "Desperate Sale", value: "Desperate Sale" },
    { label: "Breakthrough Price", value: "Breakthrough Price" },
    { label: "Quick Deal", value: "Quick Deal" },
    { label: "investment Opportunity", value: "investment Opportunity" },
    { label: "High Rental Yield", value: "High Rental Yield" },
    { label: "Affordable", value: "Affordable" },
  ];

  const explainthepropertys = [
    { label: "Outdoor spa", value: "Outdoor spa" },
    { label: "Reputed Builder", value: "Reputed Builder" },
    { label: "Well ventilated", value: "Well ventilated" },
    { label: "Fully Renovated", value: "Fully Renovated" },
    { label: "vastu compliant", value: "vastu compliant" },
    { label: "Spacious", value: "Spacious" },
    { label: "Ample Parking", value: "Ample Parking" },
    { label: "Free Hold", value: "Free Hold" },
    { label: "Gated Society", value: "Gated Society" },
  ];

  const definingsize = [
    { label: "Vasteful Interiors", value: "Vasteful Interiors" },
    { label: "Prime Location", value: "Prime Location" },
    { label: "Luxury lifestyle ", value: "Luxury lifestyle " },
    { label: "Well Maintained ", value: "Well Maintained " },
    { label: "Plenty of Sunlight", value: "Plenty of Sunlight" },
    { label: "Newly Built", value: "Newly Built" },
  ];

  const suitable = [
    { label: "Family", value: "Family" },
    { label: "Bachelors", value: "Bachelors" },
    { label: "Females Only ", value: "Females Only" },
  ];
  const citiesByState = {
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Aurangabad",
      "Nashik",
      "Thane",
      "Kolhapur",
      "Solapur",
      "Pimpri-Chinchwad",
      "Chandrapur",
      "Amravati",
      "Jalgaon",
      "Latur",
      "Satara",
      "Parbhani",
    ],
    Delhi: ["Delhi"],
    Karnataka: [
      "Bengaluru",
      "Mangalore",
      "Hubli",
      "Dharwad",
      "Belagavi",
      "Mysuru",
      "Shimoga",
      "Ballari",
      "Tumkur",
      "Chikmagalur",
      "Hospet",
      "Gulbarga",
      "Bijapur",
    ],
    "West Bengal": [
      "Kolkata",
      "Howrah",
      "Siliguri",
      "Durgapur",
      "Asansol",
      "Haldia",
      "Burdwan",
      "Kharagpur",
      "Malda",
      "Jalpaiguri",
      "Cooch Behar",
      "Purulia",
    ],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tirunelveli",
      "Vellore",
      "Hosur",
      "Tiruppur",
      "Nagercoil",
      "Erode",
      "Dindigul",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Nizamabad",
      "Khammam",
      "Karimnagar",
      "Mahbubnagar",
      "Ramagundam",
      "Jagtial",
      "Mancherial",
    ],
    Gujarat: [
      "Ahmedabad",
      "Vadodara",
      "Surat",
      "Rajkot",
      "Gandhinagar",
      "Bhavnagar",
      "Jamnagar",
      "Junagadh",
      "Anand",
      "Mehsana",
      "Navsari",
      "Vapi",
    ],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Bikaner",
      "Ajmer",
      "Alwar",
      "Bhilwara",
      "Sikar",
      "Sri Ganganagar",
      "Pali",
      "Nagaur",
    ],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Agra",
      "Varanasi",
      "Meerut",
      "Allahabad",
      "Ghaziabad",
      "Aligarh",
      "Mathura",
      "Bareilly",
      "Jhansi",
      "Moradabad",
    ],
    "Madhya Pradesh": [
      "Bhopal",
      "Indore",
      "Jabalpur",
      "Gwalior",
      "Ujjain",
      "Sagar",
      "Satna",
      "Rewa",
      "Khandwa",
      "Burhanpur",
      "Dewas",
      "Shivpuri",
    ],
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Tirupati",
      "Kakinada",
      "Nellore",
      "Kadapa",
      "Anantapur",
      "Chittoor",
      "Rajahmundry",
      "Eluru",
      "Ongole",
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Bhagalpur",
      "Muzaffarpur",
      "Arrah",
      "Purnia",
      "Darbhanga",
      "Sasaram",
      "Chapra",
      "Sitamarhi",
      "Kishanganj",
    ],
    Haryana: [
      "Chandigarh",
      "Faridabad",
      "Gurgaon",
      "Panipat",
      "Ambala",
      "Karnal",
      "Hisar",
      "Sirsa",
      "Yamunanagar",
      "Jhajjar",
    ],
    Punjab: [
      "Chandigarh",
      "Ludhiana",
      "Amritsar",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Mohali",
      "Ropar",
      "Hoshiarpur",
      "Mansa",
    ],
    Uttarakhand: [
      "Dehradun",
      "Haridwar",
      "Rishikesh",
      "Roorkee",
      "Haldwani",
      "Nainital",
      "Udhamsingh Nagar",
      "Pauri",
      "Tehri",
    ],
    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Hazaribagh",
      "Giridih",
      "Dumka",
      "Chatra",
      "Koderma",
      "Ramgarh",
    ],
    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Sambalpur",
      "Berhampur",
      "Balasore",
      "Angul",
      "Jeypore",
      "Khurda",
      "Puri",
    ],
    Chhattisgarh: [
      "Raipur",
      "Bilaspur",
      "Durg",
      "Korba",
      "Rajnandgaon",
      "Jagdalpur",
      "Ambikapur",
      "Raigarh",
      "Janjgir-Champa",
    ],
    Assam: [
      "Guwahati",
      "Dibrugarh",
      "Silchar",
      "Jorhat",
      "Nagaon",
      "Karimganj",
      "Tinsukia",
      "Tezpur",
      "Hailakandi",
      "Bongaigaon",
    ],
    "Jammu & Kashmir": [
      "Srinagar",
      "Jammu",
      "Samba",
      "Udhampur",
      "Kathua",
      "Rajouri",
      "Poonch",
      "Anantnag",
      "Baramulla",
      "Pulwama",
    ],
    Chandigarh: ["Chandigarh"],
    "Himachal Pradesh": [
      "Shimla",
      "Manali",
      "Dharamshala",
      "Kullu",
      "Solan",
      "Mandi",
      "Hamirpur",
      "Bilaspur",
      "Kangra",
      "Palampur",
    ],
    Goa: ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda", "Cortalim"],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Kottayam",
      "Palakkad",
      "Muvattupuzha",
      "Thrissur",
      "Alappuzha",
      "Kannur",
      "Malappuram",
    ],
    Manipur: [
      "Imphal",
      "Thoubal",
      "Bishnupur",
      "Churachandpur",
      "Ukhrul",
      "Senapati",
    ],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Mamit"],
    Tripura: [
      "Agartala",
      "Ambassa",
      "Udaipur",
      "Kailasahar",
      "Belonia",
      "Sepahijala",
    ],
    Sikkim: ["Gangtok", "Namchi", "Mangan", "Gyalshing"],
    "Arunachal Pradesh": [
      "Itanagar",
      "Tawang",
      "Ziro",
      "Pasighat",
      "Bomdila",
      "Naharlagun",
    ],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Mon"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Williamnagar", "Bandar"],
    Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Andaman & Nicobar Islands": [
      "Port Blair",
      "Havelock Island",
      "Neil Island",
    ],
  };

  let listingID = secureLocalStorage.getItem("ListingId");
  const loginid = secureLocalStorage.getItem("loginuserid");
  const handleCheckboxChang = (event) => {
    const { value, checked } = event.target;
    setsuitables((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const handleCheckboxChangesesed = (event) => {
    const { value, checked } = event.target;
    setdefiningsizes((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const handleCheckboxChangeses = (event) => {
    const { value, checked } = event.target;
    setexplaintheproperty((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const handleCheckboxChanges = (event) => {
    const { value, checked } = event.target;
    setExplainingPrice((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const handleCheckboxChanged = (event) => {
    const { value, checked } = event.target;
    setselectedLocation((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAmenities((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const [images, setImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const selectedFileNames = selectedFiles.map((file) => file.name);

    setImages([...images, ...selectedFiles]);
    setImageNames([...imageNames, ...selectedFileNames]);
  };

  const handleFileDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedImageNames = imageNames.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImageNames(updatedImageNames);
  };

  const handleStateChange = (e) => {
    const state = e.target.getAttribute("data-value");
    setSelectedState(state);
    setCities(citiesByState[state] || []);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.getAttribute("data-value"));
  };

  const states = Object?.keys(citiesByState);

  const [statese, setstatese] = useState(false);
  let loginuserId = secureLocalStorage.getItem("loginuserid");

  const Propertiesdata = (e) => {
    e.preventDefault();
    setstatese(false);
    if (!selectedCity) {
      toast.error("Please select a city.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", loginuserId);
    formData.append("projectId", listingID);

    formData.append("state_name", selectedState);
    formData.append("city_name", selectedCity);
    formData.append("project_status", selectedProperty);
    formData.append("project_type", selectedPropertyType);
    formData.append("bedrooms", selectedOption);
    formData.append("locality", Locality);
    formData.append("project_name", projectbuildingname);
    formData.append("start_price", startprice ? startprice : "");
    formData.append("end_price", endprice ? endprice : "");

    formData.append("additional_rooms", additionalRooms ? additionalRooms : "");
    formData.append(
      "possession_status",
      possessionStatus ? possessionStatus : ""
    );
    formData.append(
      "furnishing_status",
      furnishingStatus ? furnishingStatus : ""
    );
    formData.append("age_of_project", propertyAge ? propertyAge : "");
    formData.append(
      "no_of_bathroom",
      numberOfBathrooms ? numberOfBathrooms : ""
    );
    formData.append("flooring", flooring ? flooring : "");
    formData.append("covered_parking", coveredParking ? coveredParking : "");
    formData.append("uncovered_parking", openParking ? openParking : "");
    formData.append("balcony", balconyType ? balconyType : "");
    formData.append("power_backup", powerBackup ? powerBackup : "");
    formData.append("rooms", roomCount ? roomCount : "");
    formData.append("facing", facing ? facing : "");
    formData.append("view", view ? view : "");
    formData.append("flooring_no", flooringNumber ? flooringNumber : "");
    formData.append(
      "total_floor_count",
      totalFloorCount ? totalFloorCount : ""
    );
    formData.append("tower", towerBlock ? towerBlock : "");
    formData.append("unit_no", unitNumber ? unitNumber : "");
    formData.append("amenities", selectedAmenities);
    formData.append("defining_location", selectedLocation);
    formData.append("explaining_price", ExplainingPrice);
    formData.append("explaining_the_project", explaintheproperty);
    formData.append("defining_size_structure", definingsizes);
    formData.append("suitable_for", suitables);
    formData.append(
      "project_description",
      propertyDescription ? propertyDescription : ""
    );
    formData.append("video", Video ? Video : "");
    formData.append(
      "property_description",
      propertyDescription ? propertyDescription : ""
    );
    images?.forEach((image, index) => {
      formData.append("images", image);
    });

    formData.append("configurations", areaType ? areaType : "");
    formData.append("minimum_configurations", minsize ? minsize : "");
    formData.append("maximum_configurations", maxsize ? maxsize : "");
    formData.append(
      "minimum_project_size",
      projectminsize ? projectminsize : ""
    );
    formData.append(
      "maximum_project_size",
      projectmaxsize ? projectmaxsize : ""
    );
    formData.append("project_size", projectareatype ? projectareatype : "");

    axios
      .post(`http://157.66.191.24:3089/website/update_project`, formData)
      .then((response) => {
        setstatese(true);

        swal(response.data.msg, {
          icon: "success",
        });
        setTimeout(() => {
          Navigate("/DeveloperAllProject");
        }, 3000);
      })
      .catch((error) => {
        setstatese(false);
        if (error.response && error.response.status === 400) {
          swal(error.response.data.msg, {
            icon: "error",
          });
        } else {
        }
      });
    setstatese(false);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    GetProperty();
  }, [0]);

  const GetProperty = () => {
    const data = {
      projectId: listingID,
    };

    axios
      .post("http://157.66.191.24:3089/website/get_project_details", data)
      .then((res) => {
        setstartprice(res?.data?.data[0]?.start_price);
        setendprice(res?.data?.data[0]?.end_price);
        setminsize(res?.data?.data[0]?.minimum_configurations);
        setmaxsize(res?.data?.data[0]?.maximum_configurations);
        setprojectminsize(res?.data?.data[0]?.minimum_project_size);
        setprojectmaxsize(res?.data?.data[0]?.maximum_project_size);
        setprojectareatype(res?.data?.data[0]?.project_size);
        setSelectedState(res?.data?.data[0]?.state_name);
        setSelectedCity(res?.data?.data[0]?.city_name);

        setSelectedProperty(res?.data?.data[0]?.project_status);
        setSelectedPropertyType(res?.data?.data[0]?.project_type);
        setSelectedOption(res?.data?.data[0]?.bedrooms);

        setprojectbuildingname(res?.data?.data[0]?.project_name);
        setLocality(res?.data?.data[0]?.locality);
        setAreaType(res?.data?.data[0]?.configurations);
        setAdditionalRooms(res?.data?.data[0]?.additional_rooms);

        setPossessionStatus(res?.data?.data[0]?.possession_status);
        setFurnishingStatus(res?.data?.data[0]?.furnishing_status);
        setPropertyAge(res?.data?.data[0]?.age_of_project);
        
        setNumberOfBathrooms(res?.data?.data[0]?.no_of_bathroom);
        setRoomCount(res?.data?.data[0]?.rooms);
        setCoveredParking(res?.data?.data[0]?.covered_parking);
        setOpenParking(res?.data?.data[0]?.uncovered_parking);

        setBalconyType(res?.data?.data[0]?.balcony);
        setPowerBackup(res?.data?.data[0]?.power_backup);
        setFacing(res?.data?.data[0]?.facing);
        setView(res?.data?.data[0]?.view);
        setFlooring(res?.data?.data[0]?.flooring);
        setFlooringNumber(res?.data?.data[0]?.flooring_no);
        setTowerBlock(res?.data?.data[0]?.tower);
        setTotalFloorCount(res?.data?.data[0]?.total_floor_count);
        setUnitNumber(res?.data?.data[0]?.unit_no);
        setpropertyDescription(res?.data?.data[0]?.project_description);
        setSelectedAmenities(res?.data?.data[0]?.amenities);
        setselectedLocation(res?.data?.data[0]?.defining_location);
        setExplainingPrice(res?.data?.data[0]?.explaining_price);
        setexplaintheproperty(res?.data?.data[0]?.explaining_the_project);
        setdefiningsizes(res?.data?.data[0]?.defining_size_structure);
        setsuitables(res?.data?.data[0]?.suitable_for);

      })
      .catch((error) => {});
  };
  return (
    <>
      <Toaster />
      <AgentSidebar />
      <div className="dashboard__content bg-23">
        <section className="flat-title2 ">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-group fs-30 lh-45 fw-7">Add Project</div>
              </div>
            </div>
          </div>
        </section>
        <section className="flat-upload-photo">
          <div className="container7">
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={Propertiesdata}>
                  <div className="tf-upload">
                    <h3 className="titles">Upload photo</h3>
                    <div className="wrap-upload center">
                      <div className="box-upload">
                        <div className="img-up relative">
                          <img
                            className="avatar"
                            id="profileimg"
                            src="assets/images/icon/icon-upload.png"
                            alt
                          />
                        </div>
                        <div
                          className="button-box relative"
                          id="upload-profile"
                        >
                          <a href="#" className="btn-upload sc-button">
                            {" "}
                            <span>Select multiple photos</span>{" "}
                          </a>

                          <input
                            accept=".png, .jpg, image/*"
                            maxLength={10}
                            onChange={handleFileChange}
                            multiple
                            id="tf-upload-img"
                            type="file"
                            name="profile"
                            
                          />
                        </div>
                      </div>
                      <div className="box-photo">
                        {images.length > 0 ? (
                          <ul className="flex">
                            {images?.map((image, index) => (
                              <li key={index} className="file-delete">
                                <img
                                  style={{
                                    height: "150px",
                                    borderRadius: "5px",
                                    width: "200px",
                                  }}
                                  src={URL.createObjectURL(image)}
                                  alt={`Selected ${index}`}
                                />
                                <a
                                  className="icon-clear remove-file"
                                  onClick={() => handleFileDelete(index)}
                                >
                                  <i className="far fa-trash-alt" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="flex">
                            <li className="file-delete">
                              <img
                                src="assets/images/img-box/dashboard-upload-1.jpg"
                                alt
                              />{" "}
                            </li>
                            <li className="file-delete">
                              <img
                                src="assets/images/img-box/dashboard-upload-2.jpg"
                                alt
                              />{" "}
                            </li>
                            <li className="file-delete">
                              <img
                                src="assets/images/img-box/dashboard-upload-3.jpg"
                                alt
                              />{" "}
                            </li>
                            <li className="file-delete">
                              <img
                                src="assets/images/img-box/dashboard-upload-4.jpg"
                                alt
                              />{" "}
                            </li>
                            <li className="file-delete">
                              <img
                                src="assets/images/img-box/dashboard-upload-5.jpg"
                                alt
                              />{" "}
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="tf-infomation bg-white">
                    <h3 className="titles">Infomation</h3>
                    <div className="info-box info-wg">
                      <div className="inner-1 form-wg flex">
                        <div className="wg-box select-group">
                          <label className="title-user fw-6">State</label>
                          <div className="nice-select" tabIndex={0}>
                            <span className="current">
                              {selectedState ? selectedState : "Choose a State"}
                            </span>
                            <ul className="list">
                              <li
                                data-value=""
                                className={`option ${
                                  !selectedState ? "selected" : ""
                                }`}
                                onClick={handleStateChange}
                              >
                                Choose a State
                              </li>
                              {states.map((state, index) => (
                                <li
                                  key={index}
                                  data-value={state}
                                  className={`option ${
                                    selectedState === state ? "selected" : ""
                                  }`}
                                  onClick={handleStateChange}
                                >
                                  {state}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="wg-box select-group">
                          <label className="title-user fw-6">City</label>
                          <div className="nice-select" tabIndex={0}>
                            <span className="current">
                              {selectedCity ? selectedCity : "Choose a City"}
                            </span>
                            <ul className="list">
                              <li
                                data-value=""
                                className={`option ${
                                  !selectedCity ? "selected" : ""
                                }`}
                                onClick={handleCityChange}
                              >
                                Choose a City
                              </li>
                              {cities.map((city, index) => (
                                <li
                                  key={index}
                                  data-value={city}
                                  className={`option ${
                                    selectedCity === city ? "selected" : ""
                                  }`}
                                  onClick={handleCityChange}
                                >
                                  {city}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="wg-box select-group">
                          <label className="title-user fw-6">Video</label>
                          <div className="" tabIndex={0}>
                            <div className="">
                              <input
                                onChange={(e) => {
                                  SetVideo(e.target.files[0]);
                                }}
                                accept="video/mp4"
                                type="file"
                                className="nice-select"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="inner-2 form-wg flex">
                        <div className="wg-box2 select-group ">
                          <fieldset>
                            <label className="title-user fw-6">
                              Project Status
                            </label>
                            <div className="" tabIndex={0}>
                              <select
                                required
                                value={selectedProperty}
                                onChange={(e) => {
                                  setSelectedProperty(e.target.value);
                                }}
                                className="nice-select"
                              >
                                <option
                                  className="nice-select"
                                  selected
                                  disabled
                                  value=""
                                >
                                  Please Select
                                </option>
                                <option
                                  className="nice-select"
                                  value="Advanced Stage"
                                >
                                  Advanced Stage
                                </option>
                                <option
                                  className="nice-select"
                                  value="Early Stage"
                                >
                                  Early Stage
                                </option>
                                <option
                                  className="nice-select"
                                  value="Mid Stage"
                                >
                                  Mid Stage
                                </option>
                                <option
                                  className="nice-select"
                                  value="Near Possession"
                                >
                                  Near Possession
                                </option>
                                <option
                                  className="nice-select"
                                  value="New Launch"
                                >
                                  New Launch
                                </option>
                                <option
                                  className="nice-select"
                                  value="Partially Ready To Move"
                                >
                                  Partially Ready To Move
                                </option>
                                <option
                                  className="nice-select"
                                  value="Ready to Move"
                                >
                                  Ready to Move
                                </option>
                                <option value="Under Construction">
                                  Under Construction
                                </option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Well Occupied">
                                  Well Occupied
                                </option>
                              </select>
                            </div>
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Project type
                            </label>
                            <div className="" tabIndex={0}>
                              <select
                                className="nice-select"
                                required
                                value={selectedPropertyType}
                                onChange={(e) => {
                                  setSelectedPropertyType(e.target.value);
                                }}
                              >
                                <option
                                  className="nice-select"
                                  selected
                                  disabled
                                  value=""
                                >
                                  Please Select
                                </option>

                                <option value="Rera Registered Projects">
                                  Rera Registered Projects
                                </option>

                                <option
                                  className="nice-select"
                                  value="Affordable Housing"
                                >
                                  Affordable Housing
                                </option>
                                <option
                                  className="nice-select"
                                  value="Luxury Housing"
                                >
                                  Luxury Housing
                                </option>
                                <option
                                  className="nice-select"
                                  value="Virtual Tour Projects"
                                >
                                  Virtual Tour Projects
                                </option>
                              </select>
                            </div>
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">Bedrooms</label>

                          <div className="" tabIndex={0}>
                            <select
                              className="nice-select"
                              required
                              value={selectedOption}
                              onChange={(e) => {
                                setSelectedOption(e.target.value);
                              }}
                            >
                              <option
                                className="nice-select"
                                selected
                                disabled
                                value=""
                              >
                                Please Select
                              </option>
                              <option className="form-control" value="1 BHK">
                                1 BHK
                              </option>
                              <option className="form-control" value="Villa">
                                Villa
                              </option>
                              <option className="form-control" value="2 BHK">
                                2 BHK
                              </option>
                              <option className="form-control" value="3 BHK">
                                3 BHK
                              </option>
                              <option className="form-control" value="4 BHK">
                                4 BHK
                              </option>
                              <option className="form-control" value="5+ BHK">
                                5+ BHK
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="inner-2 form-wg flex fff">
                        <div className="wg-box2 select-group fff">
                          <fieldset>
                            <label className="title-user fw-6">
                              Project/Building Name
                            </label>
                            <input
                              value={projectbuildingname}
                              onChange={(e) => {
                                setprojectbuildingname(e.target.value);
                              }}
                              placeholder="Start Typing Project/Society Name For Suggestions"
                              type="text"
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group fff">
                          <fieldset>
                            <label className="title-user fw-6">Locality</label>
                            <input
                              value={Locality}
                              onChange={(e) => {
                                setLocality(e.target.value);
                              }}
                              type="text"
                              placeholder="Typing Locality Name"
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>

                        <div className="wg-box2 select-group mt-1">
                          <div className="flex align-center ">
                            <label className="title-user fw-6 mt-2 ">
                              Price
                            </label>
                          </div>
                          <div className="row">
                            <fieldset style={{ width: "50%" }}>
                              <input
                                value={startprice}
                                onChange={(e) => {
                                  setstartprice(e.target.value);
                                }}
                                type="number"
                                min="0"
                                placeholder="Start price"
                                className="input-form"
                                required
                              />
                            </fieldset>

                            <fieldset style={{ width: "50%" }}>
                              <input
                                required
                                value={endprice}
                                onChange={(e) => {
                                  setendprice(e.target.value);
                                }}
                                type="number"
                                min="0"
                                placeholder="End price"
                                className="input-form"
                              />
                            </fieldset>
                          </div>
                        </div>
                      </div>

                      <div className="inner-2 form-wg flex fff mt-4">
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Configurations
                            </label>

                            <div className="row">
                              <div style={{ width: "33%" }}>
                                <fieldset>
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="Size Min"
                                    className="input-form"
                                    value={minsize}
                                    onChange={(e) => {
                                      setminsize(e.target.value);
                                    }}
                                    required
                                  />
                                </fieldset>
                              </div>
                              <div style={{ width: "33%" }}>
                                <fieldset>
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="Max Size"
                                    className="input-form"
                                    value={maxsize}
                                    onChange={(e) => {
                                      setmaxsize(e.target.value);
                                    }}
                                    required
                                  />
                                </fieldset>
                              </div>
                              <div
                                style={{ width: "33%" }}
                                className=""
                                tabIndex={0}
                              >
                                <select
                                  required
                                  value={areaType}
                                  onChange={(e) => {
                                    setAreaType(e.target.value);
                                  }}
                                  className="nice-select"
                                >
                                  <option
                                    value=""
                                    selected
                                    disabled
                                    className="nice-select"
                                  >
                                    Select Please
                                  </option>
                                  <option value="sq-ft" className="nice-select">
                                    Sq.Ft
                                  </option>
                                  <option className="nice-select" value="sq-yd">
                                    Sq.Yd.
                                  </option>
                                  <opion value="sq-mt" className="nice-select">
                                    Sq.Mt
                                  </opion>
                                  <option className="nice-select" value="acre">
                                    Acre
                                  </option>
                                </select>
                              </div>
                            </div>
                          </fieldset>
                        </div>

                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Project Size
                            </label>

                            <div className="row">
                              <div style={{ width: "33%" }}>
                                <fieldset>
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="Min"
                                    className="input-form"
                                    value={projectminsize}
                                    onChange={(e) => {
                                      setprojectminsize(e.target.value);
                                    }}
                                    required
                                  />
                                </fieldset>
                              </div>
                              <div style={{ width: "33%" }}>
                                <fieldset>
                                  <input
                                    type="number"
                                    min="0"
                                    placeholder="Size"
                                    className="input-form"
                                    value={projectmaxsize}
                                    onChange={(e) => {
                                      setprojectmaxsize(e.target.value);
                                    }}
                                    required
                                  />
                                </fieldset>
                              </div>
                              <div
                                style={{ width: "33%" }}
                                className=""
                                tabIndex={0}
                              >
                                <select
                                  required
                                  value={projectareatype}
                                  onChange={(e) => {
                                    setprojectareatype(e.target.value);
                                  }}
                                  className="nice-select"
                                >
                                  <option
                                    value=""
                                    selected
                                    disabled
                                    className="nice-select"
                                  >
                                    Select Please
                                  </option>
                                  <option value="sq-ft" className="nice-select">
                                    Sq.Ft
                                  </option>
                                  <option className="nice-select" value="sq-yd">
                                    Sq.Yd.
                                  </option>
                                  <opion value="sq-mt" className="nice-select">
                                    Sq.Mt
                                  </opion>
                                  <option className="nice-select" value="acre">
                                    Acre
                                  </option>
                                </select>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tf-rent tf-infomation bg-white">
                    <h3 className="titles">Additional information</h3>

                    <div className="info-box info-wg">
                      <div className="inner-1 form-wg flex">
                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Additional Rooms
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={additionalRooms}
                              onChange={(e) => {
                                setAdditionalRooms(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option value="" selected disabled>
                                Select Please
                              </option>
                              <option
                                value="Pooja Room"
                                className="nice-select"
                              >
                                Pooja Room
                              </option>
                              <option
                                value="Servant Room"
                                className="nice-select"
                              >
                                Servant Room
                              </option>
                              <option
                                value="Study Room"
                                className="nice-select"
                              >
                                Study Room
                              </option>
                              <option
                                value="Extra Room"
                                className="nice-select"
                              >
                                Extra Room
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Possession Status
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={possessionStatus}
                              onChange={(e) => {
                                setPossessionStatus(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                className="nice-select"
                              >
                                Select Please
                              </option>
                              <option
                                value="Ready To Move"
                                className="nice-select"
                              >
                                Ready To Move
                              </option>
                              <option
                                value="Under Construction"
                                className="nice-select"
                              >
                                Under Construction
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Furnishing Status
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={furnishingStatus}
                              onChange={(e) => {
                                setFurnishingStatus(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option value="" selected disabled>
                                Please select
                              </option>
                              <option value="Furnished">Furnished</option>
                              <option value="Semi-Furnished">
                                Semi-Furnished
                              </option>
                              <option value="Unfurnished">Unfurnished</option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Age of project (Years)
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={propertyAge}
                              onChange={(e) => {
                                setPropertyAge(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                className="nice-select"
                                value=""
                                selected
                                disabled
                              >
                                Choose
                              </option>
                              <option className="nice-select" value="0-1">
                                0-1
                              </option>
                              <option className="nice-select" value="2-4">
                                2-4
                              </option>
                              <option className="nice-select" value="5-7">
                                5-7
                              </option>
                              <option value="8-10" className="nice-select">
                                8-10
                              </option>
                              <optoin vale="10+">10+</optoin>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="inner-1 form-wg flex">
                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Number of Bathroom
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={numberOfBathrooms}
                              onChange={(e) => {
                                setNumberOfBathrooms(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                className="nice-select"
                              >
                                Select Please
                              </option>
                              <option value="1" className="nice-select">
                                1
                              </option>
                              <option className="nice-select" value="2">
                                2
                              </option>
                              <option className="nice-select" value="3">
                                3
                              </option>
                              <option className="nice-select" value="4">
                                4
                              </option>
                              <option value="5+" className="nice-select">
                                5+
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">Flooring</label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={flooring}
                              onChange={(e) => {
                                setFlooring(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                className="nice-select"
                                value=""
                                disabled
                                selected
                              >
                                Select Please
                              </option>
                              <option value="Marble" className="nice-select">
                                Marble
                              </option>
                              <option value="Concrete" className="nice-select">
                                Concrete
                              </option>
                              <option value="Cemented" className="nice-select">
                                Cemented
                              </option>
                              <option className="nice-select" value="Carpeted">
                                Carpeted
                              </option>
                              <option value="Wooden" className="nice-select">
                                Wooden
                              </option>
                              <option value="Others" className="nice-select">
                                Others
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Covered Parking
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={coveredParking}
                              onChange={(e) => {
                                setCoveredParking(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                className="nice-select"
                                value=""
                                selected
                                disabled
                              >
                                Select Please
                              </option>
                              <option value="1" className="nice-select">
                                1
                              </option>
                              <option value="2" className="nice-select">
                                2
                              </option>
                              <option value="3" className="nice-select">
                                3
                              </option>
                              <option value="4" className="nice-select">
                                4
                              </option>
                              <option value="5" className="nice-select">
                                5
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Open/Uncovered Parking
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={openParking}
                              onChange={(e) => {
                                setOpenParking(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                className="nice-select"
                              >
                                Select Please
                              </option>
                              <option className="nice-select" value="N/A">
                                N/A
                              </option>
                              <option value="1" className="nice-select">
                                1
                              </option>
                              <option value="2" className="nice-select">
                                2
                              </option>
                              <option value="3" className="nice-select">
                                3
                              </option>
                              <option value="4" className="nice-select">
                                4
                              </option>
                              <li value="5" className="nice-select">
                                5
                              </li>
                              <li value="6+" className="nice-select">
                                6+
                              </li>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="inner-1 form-wg flex">
                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">Balcony</label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={balconyType}
                              onChange={(e) => {
                                setBalconyType(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                value=""
                                className="nice-select"
                                selected
                                disabled
                              >
                                Select Please
                              </option>
                              <option value="Connected" className="nice-select">
                                Connected
                              </option>
                              <option
                                value="Individual"
                                className="nice-select"
                              >
                                Individual
                              </option>
                              <option
                                value="Room-attached"
                                className="nice-select"
                              >
                                Room-attached
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">
                            Power Back-up
                          </label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={powerBackup}
                              onChange={(e) => {
                                setPowerBackup(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                value=""
                                selected
                                disabled
                                className="nice-select"
                              >
                                Select Please
                              </option>
                              <option
                                value="No Back-up"
                                className="nice-select"
                              >
                                No Back-up
                              </option>
                              <option value="Available" className="nice-select">
                                Available
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">Facing</label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={facing}
                              onChange={(e) => {
                                setFacing(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                className="nice-select"
                                value=""
                                selected
                                disabled
                              >
                                Select Please
                              </option>
                              <option value="East" className="nice-select">
                                East
                              </option>
                              <option value="West" className="nice-select">
                                West
                              </option>
                              <option value="North" className="nice-select">
                                North
                              </option>
                              <option value="South">South</option>
                              <option
                                value="North East"
                                className="nice-select"
                              >
                                North East
                              </option>
                              <option
                                value="North West"
                                className="nice-select"
                              >
                                North West
                              </option>
                              <option
                                className="nice-select"
                                value="South East"
                              >
                                South East
                              </option>
                              <option
                                className="nice-select"
                                value="South West"
                              >
                                South West
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="wg-box2 select-group">
                          <label className="title-user fw-6">View</label>
                          <div className="" tabIndex={0}>
                            <select
                              required
                              value={view}
                              onChange={(e) => {
                                setView(e.target.value);
                              }}
                              className="nice-select"
                            >
                              <option
                                className="nice-select"
                                value=""
                                selected
                                disabled
                              >
                                Select Please
                              </option>
                              <option
                                value="Beach View"
                                className="nice-select"
                              >
                                Beach View
                              </option>
                              <option
                                className="nice-select"
                                value="Garden View"
                              >
                                Garden View
                              </option>
                              <option
                                value="Golf Course"
                                className="nice-select"
                              >
                                Golf Course
                              </option>
                              <option className="nice-select" value="Lake View">
                                Lake View
                              </option>
                              <option value="Park View" className="nice-select">
                                Park View
                              </option>
                              <option value="Road View" className="nice-select">
                                Road View
                              </option>
                              <option
                                value="Community View"
                                className="nice-select"
                              >
                                Community View
                              </option>
                              <option value="Pool View" className="nice-select">
                                Pool View
                              </option>
                              <option
                                value="Creek View"
                                className="nice-select"
                              >
                                Creek View
                              </option>
                              <option value="Sea View" className="nice-select">
                                Sea View
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="inner-4 form-wg flex fff">
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">Rooms</label>
                            <input
                              min="0"
                              type="number"
                              placeholder="Enter rooms number"
                              value={roomCount}
                              onChange={(e) => {
                                setRoomCount(e.target.value);
                              }}
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Flooring Number
                            </label>
                            <input
                              type="number"
                              min="0"
                              placeholder="Enter Flooring number"
                              value={flooringNumber}
                              onChange={(e) => {
                                setFlooringNumber(e.target.value);
                              }}
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>

                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Tower/Block
                            </label>
                            <input
                              type="number"
                              min="0"
                              placeholder="Tower/block"
                              value={towerBlock}
                              onChange={(e) => {
                                setTowerBlock(e.target.value);
                              }}
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>

                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">
                              Total Floor Count
                            </label>
                            <input
                              min="0"
                              type="number"
                              placeholder="Total floor count"
                              value={totalFloorCount}
                              onChange={(e) => {
                                setTotalFloorCount(e.target.value);
                              }}
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>
                      </div>

                      <div className="inner-4 form-wg flex fff">
                        <div className="wg-box2 select-group">
                          <fieldset>
                            <label className="title-user fw-6">Unit No</label>
                            <input
                              type="number"
                              min="0"
                              placeholder="Unit No"
                              value={unitNumber}
                              onChange={(e) => {
                                setUnitNumber(e.target.value);
                              }}
                              className="input-form"
                              required
                            />
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tf-amenities bg-white">
                    <h3 className="titles">Amenities</h3>
                    <div className="wrap-amenities flex">
                      <div className="box box-1 flex">
                        <div className="inner-1">
                          {amenitiesList?.slice(0, 12)?.map((amenity) => (
                            <label className="flex" key={amenity.value}>
                              <input
                                name={amenity.value}
                                type="checkbox"
                                value={amenity.value}
                                checked={selectedAmenities.includes(
                                  amenity.value
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <span className="btn-checkbox"></span>
                              <span className="fs-13">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                        <div className="inner-1">
                          {amenitiesList?.slice(12, 24)?.map((amenity) => (
                            <label className="flex" key={amenity.value}>
                              <input
                                name={amenity.value}
                                type="checkbox"
                                value={amenity.value}
                                checked={selectedAmenities.includes(
                                  amenity.value
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <span className="btn-checkbox"></span>
                              <span className="fs-13">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="box box-2 flex">
                        <div className="inner-1">
                          {amenitiesList?.slice(24, 36)?.map((amenity) => (
                            <label className="flex" key={amenity.value}>
                              <input
                                name={amenity.value}
                                type="checkbox"
                                value={amenity.value}
                                checked={selectedAmenities.includes(
                                  amenity.value
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <span className="btn-checkbox"></span>
                              <span className="fs-13">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                        <div className="inner-1">
                          {amenitiesList?.slice(36, 48)?.map((amenity) => (
                            <label className="flex" key={amenity.value}>
                              <input
                                name={amenity.value}
                                type="checkbox"
                                value={amenity.value}
                                checked={selectedAmenities.includes(
                                  amenity.value
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <span className="btn-checkbox"></span>
                              <span className="fs-13">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="box box-3 flex">
                        <div className="inner-1">
                          {amenitiesList?.slice(48, 60)?.map((amenity) => (
                            <label className="flex" key={amenity.value}>
                              <input
                                name={amenity.value}
                                type="checkbox"
                                value={amenity.value}
                                checked={selectedAmenities.includes(
                                  amenity.value
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <span className="btn-checkbox"></span>
                              <span className="fs-13">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                        <div className="inner-1">
                          {amenitiesList?.slice(60)?.map((amenity) => (
                            <label className="flex" key={amenity.value}>
                              <input
                                name={amenity.value}
                                type="checkbox"
                                value={amenity.value}
                                checked={selectedAmenities.includes(
                                  amenity.value
                                )}
                                onChange={handleCheckboxChange}
                              />
                              <span className="btn-checkbox"></span>
                              <span className="fs-13">{amenity.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <br />
                    <h3>Define Your Project</h3>
                    <p>
                      Please Choose the Keywords that Defines Project Clearly
                    </p>
                    <hr />
                    <div>
                      <h3 style={{ marginBottom: 10 }}>1.Defining Location</h3>
                      <div className="flex gap-2 flex-wrap">
                        {location?.map((locattions) => (
                          <label className="flex" key={locattions.value}>
                            <input
                              name={locattions.value}
                              type="checkbox"
                              value={locattions.value}
                              checked={selectedLocation.includes(
                                locattions.value
                              )}
                              onChange={handleCheckboxChanged}
                            />
                            <span className="btn-checkbox"></span>
                            <span className="fs-13">{locattions.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div>
                      <h3 style={{ marginBottom: 10 }}>2. Explaining Price</h3>
                      <div className="flex gap-2 flex-wrap">
                        {explainprices?.map((priceses) => (
                          <label className="flex" key={priceses.value}>
                            <input
                              name={priceses.value}
                              type="checkbox"
                              value={priceses.value}
                              checked={ExplainingPrice.includes(priceses.value)}
                              onChange={handleCheckboxChanges}
                            />
                            <span className="btn-checkbox"></span>
                            <span className="fs-13">{priceses.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div>
                      <h3 style={{ marginBottom: 10 }}>
                        3. Explaining The Project
                      </h3>

                      <div className="flex gap-2 flex-wrap">
                        {explainthepropertys?.map((property) => (
                          <label className="flex" key={property.value}>
                            <input
                              name={property.value}
                              type="checkbox"
                              value={property.value}
                              checked={explaintheproperty.includes(
                                property.value
                              )}
                              onChange={handleCheckboxChangeses}
                            />
                            <span className="btn-checkbox"></span>
                            <span className="fs-13">{property.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div>
                      <h3 style={{ marginBottom: 10 }}>
                        4. Defining size &amp; structure
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {definingsize?.map((size) => (
                          <label className="flex" key={size.value}>
                            <input
                              name={size.value}
                              type="checkbox"
                              value={size.value}
                              checked={definingsizes.includes(size.value)}
                              onChange={handleCheckboxChangesesed}
                            />
                            <span className="btn-checkbox"></span>
                            <span className="fs-13">{size.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div>
                      <h3 style={{ marginBottom: 10 }}>5. Suitable For</h3>
                      <div className="flex flex-wrap gap-2">
                        {suitable?.map((suit) => (
                          <label className="flex" key={suit.value}>
                            <input
                              name={suit.value}
                              type="checkbox"
                              value={suit.value}
                              checked={suitables.includes(suit.value)}
                              onChange={handleCheckboxChang}
                            />
                            <span className="btn-checkbox"></span>
                            <span className="fs-13">{suit.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div>
                      <h3 style={{ marginBottom: 10 }}>Project Description</h3>
                      <textarea
                        value={propertyDescription}
                        onChange={(e) => {
                          setpropertyDescription(e.target.value);
                        }}
                        style={{ color: "black" }}
                        placeholder="Description"
                      />
                    </div>
                  </div>
                  <div className="tf-save">
                    <div className="wrap-button flex justify-center">
                      {statese === false ? (
                        <button
                          className="sc-button"
                          name="submit"
                          type="submit"
                        >
                          <span>Post Now</span>
                        </button>
                      ) : (
                        <div className="sc-button" name="submit">
                          <span>Project Posting..</span>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
                <div className="tf-bottom">
                  {/* <div className="title-bottom center text-color-4">
                    Copyright © 2024{" "}
                    <a href="#" className="text-color-2 fw-6">
                      Justthing.
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Developerprojectupdate;


