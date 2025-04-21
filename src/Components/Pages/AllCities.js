import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const AllCities = () => {
  // List of cities for each letter
  const citiesData = {
    A: [
      "Adilabad",
      "Afzalgarh",
      "Agra",
      "Ahmedabad",
      "Ajmer",
      "Akola",
      "Alappuzha",
      "Alibag",
      "Aligarh",
      "Alipurduar",
      "Almora",
      "Alwar",
      "Ambala",
      "Amboli",
      "Amravati",
      "Amritsar",
      "Amroha",
      "Anakapalli",
      "Anand",
      "Anantapur",
      "Anjuna",
      "Asansol",
      "Auli",
      "Auraiya",
      "Aurangabad",
      "Aurangabad - Bihar",
      "Ayodhya",
    ],
    B: [
      "Badacsonytomaj (Nemesgulács)",
      "Baddi",
      "Bagepalli",
      "Bahadurgarh",
      "Baheri",
      "Bakkhali",
      "Balugaon",
      "Banaskantha",
      "Bangalore",
      "Bani",
      "Bankura",
      "Barabanki",
      "Baramati",
      "Bareilly",
      "Barmer",
      "Barpeta",
      "Bascharage",
      "Basohli",
      "Bathinda",
      "Bawal",
      "Belgarh",
      "Berhampore",
      "Bettiah",
      "Bewar",
      "Bhadani",
      "Bhaderwah",
      "Bhadrak",
      "Bhagalpur",
      "Bhandara",
      "Bharatpur",
      "Bharuch",
      "Bhilai",
      "Bhimtal",
      "Bhiwadi",
      "Bhiwani",
      "Bhiwapur",
      "Bhogaon",
      "Bhopal",
      "Bhubaneswar",
      "Bhuj",
      "Bibirani",
      "Bihar sharif",
      "Bijainagar",
      "Bijnor",
      "Bilaspur",
      "Bilhaur",
      "Bodhgaya",
      "Bokaro",
      "Budgam",
      "Bulandshahr",
      "Burhanpur",
    ],
    C: [
      "Calicut",
      "Chail",
      "Chakradharpur",
      "Chandanapuri",
      "Chandausi",
      "Chandigarh",
      "Chandod",
      "Chandrapur",
      "Charkhi-Dadri",
      "Chennai",
      "Chidambaram",
      "Chikballapur",
      "Chikmagalur",
      "Chimur",
      "Chittoor",
      "Chittorgarh",
      "Coimbatore",
      "Coorg",
      "Corbett-Ramnagar",
      "Courtallam",
      "Cuttack",
    ],
    D: [
      "Dalhousie",
      "Daltonganj",
      "Daman",
      "Darbhanga",
      "Darjeeling",
      "Datia",
      "Dediapada",
      "Dehradun",
      "Delhi",
      "Delhi Transit",
      "Deoghar",
      "Dewas",
      "Dhanaulti",
      "Dhanbad",
      "Dhar",
      "Dharampur",
      "Dharamshala",
      "Dhubri",
      "Dhule",
      "Dibrugarh",
      "Digha",
      "Doddaballapura",
      "Durgapur",
      "Dwarahat",
    ],
    E: ["Etawah", "Erragondapalem", "Erode", "Ernakulam", "Eluru"],
    F: ["Fagu", "Faridabad", "Farukh Nagar", "Firozabad"],
    G: [
      "Gadchandur",
      "Ganderbal",
      "Gandhinagar",
      "Gangtok",
      "Gaya",
      "Ghaziabad",
      "Goa",
      "Gondia",
      "Gorakhpur",
      "Govardhan",
      "Gudalur",
      "Gudivada",
      "Guntur",
      "Gurgaon",
      "Gurugram",
      "Guruvayur",
      "Guwahati",
      "Gwalior",
    ],
    H: [
      "Hajipur",
      "Haldwani",
      "Hansi",
      "Hanumangarh",
      "HAPUR 1", // Including as provided
      "Harda",
      "Hardoi",
      "Haridwar",
      "Hartola",
      "Hassan",
      "Hathras",
      "Havelock",
      "Hazaribagh",
      "Himmatnagar",
      "Hisar",
      "Hodal",
      "Hoshangabad",
      "Hubli-Dharwad",
      "Hyderabad",
    ],
    I: ["Imphal", "Indore", "Islampur"],
    J: [
      "Jabalpur",
      "Jaigaon",
      "Jaipur",
      "Jalandhar",
      "Jammu",
      "Jamshedpur",
      "Jhajjar",
      "Jhansi",
      "Jhinjhak",
      "Jind",
      "Jodhpur",
      "Jogipur",
      "Jorhat",
      "Junagadh",
    ],
    K: [
      "Kadi",
      "Kaimukhiya",
      "Kakinada",
      "Kalimpong",
      "Kalka",
      "Kannur",
      "Kanpur",
      "Kanyakumari",
      "Karimnagar",
      "Karnal",
      "Karnali",
      "Kasargod",
      "Kasauli",
      "Kasganj",
      "Kashid",
      "Kashipur",
      "Katra",
      "Kattumannarkoil",
      "Kausani",
      "Kaziranga",
      "Keylong",
      "Khajuraho",
      "Khalvani",
      "Khammam",
      "Kharar",
      "Khardiya",
      "Khatu-Shyamji",
      "Khopoli",
      "Kishangarh",
      "Kochi",
      "Kodaikanal",
      "Kokernag",
      "Kolhapur",
      "Kolkata",
      "Kollam",
      "Kosi Kalan",
      "Kota",
      "Kotputli",
      "Kottayam",
      "Kovalam",
      "Krishnagiri",
      "Krishnanagar",
      "Kufri",
      "Kullu",
      "Kumbakonam",
      "Kurawali",
      "Kurnool",
      "Kurukshetra",
      "Kushinagar",
    ],
    L: [
        "Lachung",
        "Lansdowne",
        "Lasadiya",
        "Latagudi",
        "Latur",
        "Lonavala",
        "Lucknow",
        "Ludhiana",
        "Luhari",
      ],
      M: [
        "Madurai",
        "Mahabaleshwar",
        "Mahabalipuram",
        "Mahmudabad",
        "Mahud",
        "Mahuvas",
        "Mainpuri",
        "Majorda",
        "Malappuram",
        "Malda",
        "Manali",
        "Mancherial",
        "Mandarmoni",
        "Mandi",
        "Mandla",
        "Manesar",
        "Mangaldoi",
        "Mangalore",
        "Mathura",
        "Mayiladuthurai",
        "Mcleod-Ganj",
        "Meerut",
        "Mehandipur",
        "Merta",
        "Mirzapur",
        "Mithyafali",
        "Mohali",
        "Moradabad",
        "Morbi",
        "Morni",
        "Motihari",
        "Mount-Abu",
        "Mukteshwar",
        "Mumbai",
        "Munnar",
        "Murtizapur",
        "Mussoorie",
        "Muzaffarnagar",
        "Muzaffarpur",
        "Mysore",
      ],
      N: [
        "Nabinagar",
        "Nadiad",
        "Nagaon",
        "Nagaon Assam",
        "Nagina",
        "Nagpur",
        "Nainital",
        "Nalgonda",
        "Namakkal",
        "Narkanda",
        "Narnaul",
        "Nashik",
        "Navelim Village",
        "Navi Mumbai",
        "Navsari",
        "Nawada",
        "Neemrana",
        "Neil Island",
        "Nellore",
        "Nerwa",
        "Netrang",
        "New Delhi",
        "Neyveli",
        "Nizamabad",
        "Noida",
        "Nuh",
      ],
      O: ["Ooty"],
      P: [
        "Pachmarhi",
        "Palwal",
        "Panipat",
        "Panruti",
        "Parwanoo",
        "Pataudi",
        "Pathanamthitta",
        "Patiala",
        "Patna",
        "Patnitop",
        "Payyannur",
        "Pelling",
        "Phagwara",
        "Pinjore",
        "Pithampur",
        "Pondicherry",
        "Poonch",
        "Porbandar",
        "Port-Blair",
        "Pratapgarh",
        "Prayagraj",
        "Pune",
        "Puri",
        "Purulia",
        "Pushkar",
      ],
      R: [
        "Raebareily",
        "Raipur",
        "Rajahmundry",
        "Rajgarh",
        "Rajkot",
        "Rajnandgaon",
        "Rajpura",
        "Ramanathapuram",
        "Ramgarh",
        "Ranchi",
        "Rangia",
        "Ranikhet",
        "Ranthambore",
        "Rasulabad",
        "Rathuwa Dab",
        "Ratnagiri",
        "Ravangla",
        "Rayagada",
        "Rewari",
        "Rishikesh",
        "Rohtak",
        "Roorkee",
        "Rourkela",
        "Rudrapur",
      ],
      S: [
        "Sagar",
        "Saharanpur",
        "saint medard en jalles",
        "Saint-Médard-en-Jalles",
        "Salasar",
        "Salem",
        "Sangareddy",
        "Satna",
        "Shadnagar",
        "Shahada",
        "Shantiniketan",
        "Shillong",
        "Shimla",
        "Shirdi",
        "Shitlakhet",
        "Shivoli",
        "Silchar",
        "Siliguri",
        "Siolim",
        "Sirhind",
        "Sirsa",
        "Sitapur",
        "Sohagpur",
        "Solan",
        "Somnath",
        "Srikakulam",
        "Srinagar",
        "Srinagar-Uttarakhand",
        "Stockholm",
        "Suar",
        "Sukapur",
        "Sultanpur",
        "Surat",
        "Surjan Nagar",
      ],
      T: [
        "Tajpur",
        "Tarapith",
        "Tehri",
        "Tezpur",
        "Thakurdwara, Uttarakhand, India",
        "Thekkady",
        "Thrissur",
        "Tijara",
        "Tirunelveli",
        "Tirupati",
        "Tiruppur",
        "Tosham",
        "Trichy",
        "Trivandrum",
        "Tuticorin",
      ],
      U: [
        "Udaipur",
        "Udhampur",
        "Udupi-Manipal",
        "Ujjain",
        "Una",
        "Unnao",
        "Uttarkashi",
        "Uttiramerur",
      ],
      V: [
        "Vadodara",
        "Vagator",
        "Vapi",
        "Varanasi",
        "Varkala",
        "Vellore",
        "Vemulawada",
        "Vijayawada",
        "Villupuram",
        "Virudhachalam",
        "Visakhapatnam",
        "Vitthalapur",
        "Vizianagaram",
        "Vrindavan",
      ],
      W: ["Warangal", "Wardha", "Wayanad"],
      Y: ["Yavatmal", "Yercaud"],
      Z: ["Zirakpur"]
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const [selectedLetter, setSelectedLetter] = useState("A"); // State to track the selected letter

  const handleClick = (letter) => {
    setSelectedLetter(letter);
  };

  return (
    <>
      <div>
        <section className="flat-title flat-title52">
          <div className="container6">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-inner style">
                  <div className="title-group fs-12">
                    <Link className="home fw-6 text-color-3" to="/">
                      Home
                    </Link>
                    <span>AllCities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="container"
          style={{ textAlign: "center", backgroundColor: "#f8f8f8" }}
        >
          {alphabet.map((letter, index) => (
            <div
              style={{
                textTransform: "uppercase",
                minWidth: "30px",
                width: "4vw",
                maxWidth: "45px",
                textAlign: "center",
                display: "inline-block",
              }}
              key={index}
            >
              <Link
                style={{
                  textDecoration: "none",
                  padding: "10px 0px",
                  display: "inline-block",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: selectedLetter === letter ? "#ee2e24" : "#000", // Change color on select
                  minWidth: "20px",
                  borderBottom:
                    selectedLetter === letter ? "3px solid #ee2e24" : "none", // Border on select
                  fontWeight: "600",
                }}
                to="#"
                onClick={() => handleClick(letter)}
              >
                {letter}
              </Link>
            </div>
          ))}
        </div>

        {selectedLetter && (
          <div className="container" style={{ marginBottom: "60px" }}>
            <h4 style={{ fontSize: "24px", margin: "40px auto" }}>
              Cities from{" "}
              {`${selectedLetter} (${
                citiesData[selectedLetter]
                  ? citiesData[selectedLetter].length
                  : 0
              })`}
            </h4>

            {citiesData[selectedLetter] ? (
              citiesData[selectedLetter].map((city, index) => (
                <div
                  style={{ width: "25%", display: "inline-block" }}
                  key={index}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      padding: "10px 0px",
                      display: "inline-block",
                      color: "#000",
                      fontSize: "14px",
                      cursor: "pointer",
                      minWidth: "20px",
                      paddingLeft: "25px",
                    }}
                    to={`/hotelList?city=${city}`}
                  >
                    {city}
                  </Link>
                </div>
              ))
            ) : (
              <div>No cities available for this letter.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AllCities;
