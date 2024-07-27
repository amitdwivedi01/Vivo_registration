import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/vivo_new_logo.png";

const citiesInIndia = [
  "Delhi",
  "Haryana",
  "Delhi - Airport",
  "Mumbai - Airport",
  "Bangalore - Airport",
  "Hyderabad - Airport"
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
    usedVivoBefore: "",
    favoriteFeature: "",
    attractFeature: "",
    trustSource: "",
    awareOfLaunch: "",
    launchSource: "",
    considerBuying: "",
    paymentMode: "",
    rating: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      if (value.length > 10) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value.slice(0, 10),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) {
      alert("Please fill in a 10-digit mobile number.");
      return;
    }
    if (!citiesInIndia.includes(formData.city)) {
      alert("Please select the correct city.");
      return;
    }
    setIsLoading(true);

    try {
      const NewFormData = new FormData();
      for (const key in formData) {
        NewFormData.append(key, formData[key]);
      }
      const response = await axios.post(
        "https://vivo-registration.onrender.com/api/register",
        // "http://localhost:5000/api/register",
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
        usedVivoBefore: "",
        favoriteFeature: "",
        attractFeature: "",
        trustSource: "",
        awareOfLaunch: "",
        launchSource: "",
        considerBuying: "",
        paymentMode: "",
        rating: "",
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
          className="w-[450px]"
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
          <div className="flex flex-col gap-1">
            <label htmlFor="profession">Profession:</label>
            <select
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Profession
              </option>
              <option value="Business">Business</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Salaried">Salaried</option>
              <option value="Student">Student</option>
              <option value="Others">Others</option>
            </select>
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
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your City
              </option>
              {citiesInIndia.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            {/* <input
              type="text"
              id="city"
              name="city"
              list="cities"
              onChange={handleChange}
              value={formData.city}
              placeholder="Select your city"
              className="form-input border-gray-300 rounded-md"
            />
            <datalist id="cities">
              {citiesInIndia.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </datalist> */}
            </select>
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
            <label htmlFor="favoriteFeature">
              Which feature of the product impressed you the most?
            </label>
            <select
              id="favoriteFeature"
              name="favoriteFeature"
              value={formData.favoriteFeature}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Attracted Features
              </option>
              <option value="Design, Sleekness">Design, Sleekness</option>
              <option value="Hover mode">Hover mode</option>
              <option value="Rear Camera Selfie">Rear Camera Selfie</option>
              <option value="AI Features">AI Features</option>
              <option value="ZEISS Collaboration">ZEISS Collaboration</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="awareOfLaunch">
              Were you aware that vivo was launching the fold ?
            </label>
            <select
              id="awareOfLaunch"
              name="awareOfLaunch"
              value={formData.awareOfLaunch}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {formData.awareOfLaunch === "Yes" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="launchSource">
                If yes, where did you find out about the launch?
              </label>
              <select
                id="launchSource"
                name="launchSource"
                value={formData.launchSource}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select source
                </option>
                <option value="Online">Online</option>
                <option value="Retail stores - Branding, Poster etc">
                  Retail stores - Branding, Poster etc
                </option>
                <option value="Word of Mouth">Word of Mouth</option>
                <option value="Hoardings">Hoardings</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="considerBuying">
              Would you consider buying the X Fold3 Pro?
            </label>
            <select
              id="considerBuying"
              name="considerBuying"
              value={formData.considerBuying}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
              <option value="Maybe later">Maybe later</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="paymentMode">
              While purchasing a product like fold, what would be your preferred
              mode of payment?
            </label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select payment mode
              </option>
              <option value="Finance">Finance</option>
              <option value="EMI">EMI</option>
              <option value="Cash/Full swipe Credit Cards">Cash/Full swipe Credit Cards</option>
            </select>
          </div>
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="attractFeature">
              What Attracted you to the Setup
            </label>
            <select
              id="attractFeature"
              name="attractFeature"
              value={formData.attractFeature}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select attraction
              </option>
              <option value="Setup Design">Setup Design</option>
              <option value="Product Logo/ vivo Branding">
                Product Logo/ vivo Branding
              </option>
              <option value="Violinist">Violinist</option>
              <option value="Announcement">Announcement </option>
            </select>
          </div> */}
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
            <label htmlFor="trustSource">
            If you don’t use vivo anymore, what would bring you back to the brand?
            </label>
            <select
              id="trustSource"
              name="trustSource"
              value={formData.trustSource}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select source
              </option>
              <option value="Better product innovation">Better product innovation</option>
              <option value="Better brand perception">Better brand perception</option>
              <option value="More offers">More offers</option>
              <option value="Special loyalty rewards">Special loyalty rewards</option>
            </select>
          </div>
          
          
          <div className="flex flex-col gap-1">
            <label htmlFor="rating">
              On a scale of 1 to 5, how would you rate our product (choose) - 5
              being best:
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select rating
              </option>
              <option value="5 star">5 star</option>
              <option value="4 star">4 star</option>
              <option value="3 star">3 star</option>
              <option value="2 star">2 star</option>
              <option value="1 star">1 star</option>
            </select>
          </div>
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
