import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/vivo_new_logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    profession: "",
    mobile: "",
    email: "",
    handset: "",
    experienceRating: "",
    zeissFactor: "",
    vivoDemoHelped: "",
    photoUploadFrequency: "",
    favoritePhotoType: "",
    socialMediaTime: "",
    purchasePreference: "",
    influencerImpact: "",
    favoriteV40Feature: "",
    setupAttraction: "",
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
    setIsLoading(true);

    try {
      const NewFormData = new FormData();
      for (const key in formData) {
        NewFormData.append(key, formData[key]);
      }
      const response = await axios.post(
        "https://vivo-registration.onrender.com/api/register",
<<<<<<< HEAD
=======
        // "http://localhost:5000/api/register",
>>>>>>> 298d430f8ad679ce22d83d25c3bd513a1985bc73
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
        mobile: "",
        email: "",
        handset: "",
        experienceRating: "",
        zeissFactor: "",
        vivoDemoHelped: "",
        photoUploadFrequency: "",
        favoritePhotoType: "",
        socialMediaTime: "",
        purchasePreference: "",
        influencerImpact: "",
        favoriteV40Feature: "",
        setupAttraction: "",
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
              <option value="Below 18">Below 18</option>
              <option value="18-25">18-25</option>
              <option value="25-30">25-30</option>
              <option value="30-35">30-35</option>
              <option value="35-40">35-40</option>
              <option value="40-50">40-50</option>
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
              <option value="vivo">vivo</option>
              <option value="iQOO">iQOO</option>
              <option value="Samsung">Samsung</option>
              <option value="Oppo">Oppo</option>
              <option value="RealMe">RealMe</option>
              <option value="MI">MI</option>
              <option value="Google Pixel">Google Pixel</option>
              <option value="OnePlus">OnePlus</option>
              <option value="Honor">Honor</option>
              <option value="Apple">Apple</option>
              <option value="Nothing">Nothing</option>
              <option value="Tecno">Tecno</option>
              <option value="Motorola">Motorola</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="experienceRating">
              How would you rate your overall experience at the setup on a scale
              of 1 to 5, 5 being the highest?
            </label>
            <select
              id="experienceRating"
              name="experienceRating"
              value={formData.experienceRating}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select rating
              </option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="zeissFactor">
              Do you think association with ZEISS will be one of the deciding
              factors to purchase V40 Series?
            </label>
            <select
              id="zeissFactor"
              name="zeissFactor"
              value={formData.zeissFactor}
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
            <label htmlFor="vivoDemoHelped">
              Did the phone demo help view vivo in a better way? Did the
              imagery experience enhance perception of vivo?
            </label>
            <select
              id="vivoDemoHelped"
              name="vivoDemoHelped"
              value={formData.vivoDemoHelped}
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
            <label htmlFor="photoUploadFrequency">
              How often do you upload photos on social media?
            </label>
            <select
              id="photoUploadFrequency"
              name="photoUploadFrequency"
              value={formData.photoUploadFrequency}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select frequency
              </option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-monthly">Bi-monthly</option>
              <option value="Never">Never</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="favoritePhotoType">
              What kind of photos do you like uploading of your own?
            </label>
            <select
              id="favoritePhotoType"
              name="favoritePhotoType"
              value={formData.favoritePhotoType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select photo type
              </option>
              <option value="Group photos">Group photos</option>
              <option value="Selfies">Selfies</option>
              <option value="Portraits">Portraits</option>
              <option value="Candids">Candids</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="socialMediaTime">
              How much time do you spend on social media in a day?
            </label>
            <select
              id="socialMediaTime"
              name="socialMediaTime"
              value={formData.socialMediaTime}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select time
              </option>
              <option value="1 Hr">1 Hr</option>
              <option value="2 hr">2 hr</option>
              <option value="3 hr">3 hr</option>
              <option value="4 hr+">4 hr+</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="purchasePreference">
              Do you prefer buying your phone online or offline?
            </label>
            <select
              id="purchasePreference"
              name="purchasePreference"
              value={formData.purchasePreference}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="influencerImpact">
              Do influencer/paid partnerships help in awareness or do you get
              aware through news, site notifications, websites, etc.?
            </label>
            <select
              id="influencerImpact"
              name="influencerImpact"
              value={formData.influencerImpact}
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
            <label htmlFor="favoriteV40Feature">
              Which feature of V40/V40 Pro did you like the most?
            </label>
            <select
              id="favoriteV40Feature"
              name="favoriteV40Feature"
              value={formData.favoriteV40Feature}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select feature
              </option>
              <option value="Camera – ZEISS Multifocal Portrait">
                Camera – ZEISS Multifocal Portrait
              </option>
              <option value="Studio Quality Aura light">
                Studio Quality Aura light
              </option>
              <option value="Design – Slimness">Design – Slimness</option>
              <option value="Ultra slim 3d curved display">
                Ultra slim 3d curved display
              </option>
              <option value="AI Eraser">AI Eraser</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="setupAttraction">What attracted you to the setup?</label>
            <select
              id="setupAttraction"
              name="setupAttraction"
              value={formData.setupAttraction}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select attraction
              </option>
              <option value="Setup Design">Setup Design</option>
              <option value="Photo Op">Photo Op</option>
              <option value="Product">Product</option>
              <option value="Emcee Engagement">Emcee Engagement</option>
              <option value="Activities">Activities</option>
              <option value="Gifts">Gifts</option>
              <option value="Announcement about the V40 Series">
                Announcement about the V40 Series
              </option>
              <option value="ZEISS Logo">ZEISS Logo</option>
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
