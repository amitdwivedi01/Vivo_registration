import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/vivo_logo.png";

const citiesInIndia = [
  "Agra",
  "Ahmeddabad",
  "Ajmer",
  "Amritsar",
  "Amravati",
  "Aurangabad",
  "Baroda",
  "Bangalore",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Faridabad",
  "Ghaziabad",
  "Goa",
  "Gorakhpur",
  "Gurugram",
  "Guwahati",
  "Hyderbad",
  "Indore",
  "Jaipur",
  "Jalandar",
  "Jammu",
  "Jamshedpur",
  "Jodhpur",
  "Kanpur",
  "kochi",
  "Kolkata",
  "Kota",
  "Kozhikode",
  "Lucknow",
  "Ludhiana",
  "Madhurai",
  "Manglore",
  "Meerut",
  "Mohali",
  "Mumbai",
  "Mysore",
  "Nagpur",
  "Navi Mumbai",
  "Noida",
  "Patna",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Sant kabir Nagar",
  "Sant Ravidas Nagar",
  "Satara",
  "Satna",
  "Shajapur",
  "Shamli",
  "Shimla",
  "Shivpuri",
  "Siddhartnagar",
  "Singrauli",
  "Sirmaur",
  "Sitapur",
  "Solan",
  "Solapur",
  "Sonbhadra",
  "Sonipat",
  "Srinagar",
  "Sultanpur",
  "Surat",
  "Thane",
  "Thiruvananthapura",
  "Tiruchirappalli",
  "Tirupur",
  "udaipur",
  "Udhampur",
  "Udupi",
  "Ujjain",
  "Unnao",
  "Vadodara",
  "Vaishali",
  "Varanasi",
  "Vellore",
  "Vidisha",
  "Vijaywada",
  "Visakhapatnam",
  "Yamuna Nagar",
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    profession: "",
    email: "",
    mobile: "",
    handset: "",
    city: "",
    attraction: "",
    usedVivoBefore: "",
    cameraModulePreference: "",
    favoriteFeatureV30e: "",
    portraitExperience: "",
    standoutFeature: "",
    attractFeature: "",
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  // Check if the input is for the mobile number field
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      // If the input length is more than 10, truncate it to 10 characters
      if (value.length > 10) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value.slice(0, 10), // Only take the first 10 characters
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      e.target.value = null; // Clear input field
    } else {
      setFormData((prevState) => ({
        ...prevState,
        file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) {
      alert("Please fill in a 10-digit mobile number.");
      return; // Prevent form submission
    }
    setIsLoading(true);

    try {
      const NewFormData = new FormData();
      for (const key in formData) {
        NewFormData.append(key, formData[key]);
      }
      const response = await axios.post(
        "https://beautiful-sarong-toad.cyclic.app/api/register",
        NewFormData
      );

      if (response.status === 201) {
        setShowModal(true);
        setIsLoading(false);
      } else {
        alert("Error submitting form. Please try again.");
        setIsLoading(false);
      }

      setFormData({
        name: "",
        age: "",
        gender: "",
        profession: "",
        email: "",
        mobile: "",
        handset: "",
        city: "",
        attraction: "",
        usedVivoBefore: "",
        cameraModulePreference: "",
        favoriteFeatureV30e: "",
        portraitExperience: "",
        standoutFeature: "",
        attractFeature: "",
        file: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    Navigate("/");
  };

  const handleBack = () => {
    Navigate("/");
  };

  return (
    <div className="bg-blue-600 flex flex-col items-center h-full w-full">
      <div className="flex justify-center py-4">
        <img
          src={logo}
          className="w-[300px]"
          alt=""
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="flex justify-center items-center w-full max-w-[400px] bg-white rounded-2xl p-4 m-2 mt-8">
        <form
          className="flex flex-col gap-6 justify-center w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Name:</label>
            <TextInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="age">Age:</label>
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select age group
              </option>
              <option value="14-20 Years">14-20 Years</option>
              <option value="21-25 Years">21-25 Years</option>
              <option value="26-30 Years">26-30 Years</option>
              <option value="31-35 Years">31-35 Years</option>
              <option value="36-40 Years">36-40 Years</option>
              <option value="40-50 Years">40-50 Years</option>
              <option value="50 and above">50 and above</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="profession">Profession:</label>
            <TextInput
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Enter your profession"
            />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <TextInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="mobile">Mobile No.:</label>
            <TextInput
              type="number"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="city">City:</label>
            <div className="">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Search or select your city"
                className="form-input border-gray-300 rounded-md"
              />
              <select
                className="mt-1 mr-1 form-select"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your city
                </option>
                {citiesInIndia
                  .filter((city) =>
                    city.toLowerCase().includes(formData.city.toLowerCase())
                  )
                  .map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="handset">Current Phone:</label>
            <select
              id="handset"
              name="handset"
              value={formData.handset}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your current phone
              </option>
              <option value="Apple">Apple</option>
              <option value="vivo">vivo</option>
              <option value="IQOO">IQOO</option>
              <option value="Samsung">Samsung</option>
              <option value="Realme">Realme</option>
              <option value="Honor">Honor</option>
              <option value="Google Pixel">Google Pixel</option>
              <option value="Oppo">Oppo</option>
              <option value="One Plus">One Plus</option>
              <option value="Tecno">Tecno</option>
              <option value="Redmi">Redmi</option>
              <option value="Moto">Moto</option>
              <option value="Nothing">Nothing</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="attractFeature">
              Which feature of the phone attracts you while making purchase
              decision?
            </label>
            <select
              id="attractFeature"
              name="attractFeature"
              value={formData.attractFeature}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your current phone
              </option>
              <option value="Design">Design</option>
              <option value="Brand">Brand</option>
              <option value="Camera">Camera</option>
              <option value="Processor">Processor</option>
              <option value="Security">Security</option>
              <option value="Battery">Battery</option>
              <option value="Colour">Colour</option>
              <option value="Water-resistant">Water-resistant</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="attraction">
              What attracted you to the activity?
            </label>
            <select
              id="attraction"
              name="attraction"
              value={formData.attraction}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select attraction
              </option>
              <option value="Setup Design">Setup Design</option>
              <option value="Planar Photo Op">Planar Photo Op</option>
              <option value="Product">Product</option>
              <option value="Emcee Engagement">Emcee Engagement</option>
              <option value="Activities">Activities</option>
              <option value="Gifts">Gifts</option>
              <option value="Announcement about the V30 series">
                Announcement about the V30 series
              </option>
              <option value="Zeiss logo">Zeiss logo</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="usedVivoBefore">Have you used vivo before?</label>
            <select
              id="usedVivoBefore"
              name="usedVivoBefore"
              value={formData.usedVivoBefore}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cameraModulePreference">
              Which camera module do you like the most in V30 series?
            </label>
            <select
              id="cameraModulePreference"
              name="cameraModulePreference"
              value={formData.cameraModulePreference}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select preference
              </option>
              <option value="Round Camera">Round Camera</option>
              <option value="Square Camera">Square Camera</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="favoriteFeatureV30e">
              Which feature of V30e do you like the most?
            </label>
            <select
              id="favoriteFeatureV30e"
              name="favoriteFeatureV30e"
              value={formData.favoriteFeatureV30e}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select favorite feature
              </option>
              <option value="Gem Cut Camera Module">
                Gem Cut Camera Module
              </option>
              <option value="5500 mAh Battery">5500 mAh Battery</option>
              <option value="Textured Ribbon">Textured Ribbon</option>
              <option value="Studio-Quality Aura Light">
                Studio-Quality Aura Light
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="portraitExperience">
              As compared to your current handset, did you get a better portrait
              experience?
            </label>
            <select
              id="portraitExperience"
              name="portraitExperience"
              value={formData.portraitExperience}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select experience
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
              <option value="Similar Only">Similar Only</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="standoutFeature">
              Which camera did you like the most for photography?
            </label>
            <select
              id="standoutFeature"
              name="standoutFeature"
              value={formData.standoutFeature}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select camera you like for photography
              </option>
              <option value="Front Camera">Front Camera</option>
              <option value="Rear Camera">Rear Camera</option>
              <option value="Portrait Camera">Portrait Camera</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="file">Upload Image:</label>
            <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
          </div> */}
          {isLoading ? (
            <Button className="bg-blue-600 hover:bg-blue-800" disabled>
              {" "}
              {<Spinner />}{" "}
            </Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-800" type="submit">
              {" "}
              SUBMIT
            </Button>
          )}
        </form>
      </div>

      <div className="text-white text-lg mt-2">
        <h1>&copy; 2024 VIVO, All Rights Reserved</h1>
      </div>

      <Modal dismissible show={showModal} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">
              Thank you for your registration!
            </h2>
            <Button
              onClick={handleModalClose}
              className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
