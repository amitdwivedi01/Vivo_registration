import React, { useState } from "react";
import { Button, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    // age: "",
    // gender: "",
    // profession: "",
    contact: "",
    email: "",
    // handset: "",
    // x200_awareness: "",
    // source: "",
    state: "",
    // photography_interest: "",
    // photograph_type: [],
    // go_out_for_photography: "",
    // visitReason: "",
    // other_profession: "",
    // other_handset: "",
    // other_source: "",
    // other_visitReason: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "photograph_type") {
      setFormData((prevState) => {
        const updatedPhotographTypes = checked
          ? [...prevState.photograph_type, value]
          : prevState.photograph_type.filter((item) => item !== value);

        return {
          ...prevState,
          [name]: updatedPhotographTypes,
        };
      });
    } else if (name === "mobile") {
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
    if (formData.contact.length !== 10) {
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
        // age: "",
        // gender: "",
        contact: "",
        email: "",
        // profession: "",
        // handset: "",
        state: "",
        // x200_awareness: "",
        // source: "",
        // photography_interest: "",
        // photograph_type: [],
        // go_out_for_photography: "",
        // visitReason: "",
        // other_profession: "",
        // other_handset: "",
        // other_source: "",
        // other_visitReason: "",
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
    <div className="bg-blue-600 flex flex-col items-center h-screen w-full">
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
          <div>
            <label htmlFor="email">Email:</label>
            <TextInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="contact">Contact Number:</label>
            <TextInput
              type="number"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          {/* <div className="flex flex-col gap-1">
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
          </div> */}
          <div className="flex flex-col gap-1">
            <label htmlFor="state">What state do you currently live in ?</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your state
              </option>
              <option value="KTPO">KTPO</option>
              <option value="Mumbai">Mumbai</option>
              {/* <option value="Gujrat">Gujrat</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal </option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Pune">Pune</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Kerala">Kerala</option>
              <option value="Panjab">Panjab</option>
              <option value="Delhi">Delhi</option> */}
            </select>
          </div>
          {/* <div className="flex flex-col gap-1">
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
              <option value="Small scale business">Small scale business</option>
              <option value="Large scale business">Large scale business</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Salaried">Corporate</option>
              <option value="Student">Student</option>
              <option value="Housewife">Housewife</option>
              <option value="Retired">Retired</option>
              <option value="Others">Others</option>
            </select>
            {formData.profession === "Others" && (
              <div className="mt-2">
                <textarea
                  className="resize-none w-full rounded-md"
                  id="other-profession"
                  name="other_profession"
                  value={formData.other_profession || ""}
                  onChange={handleChange}
                  rows="1"
                  placeholder="Enter your profession"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="handset">
              Please select the current smartphone brands that you are using.
            </label>
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
            {formData.handset === "Others" && (
              <div className="mt-2">
                <textarea
                  className="resize-none w-full rounded-md"
                  id="other-handset"
                  name="other_handset"
                  value={formData.other_handset || ""}
                  onChange={handleChange}
                  rows="1"
                  placeholder="Enter other handset"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label>
              Were you aware of the newly launched vivo X200 series (X200 and
              X200 Pro) before visiting the setup?
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="aware-yes"
                name="x200_awareness"
                value="Yes"
                onChange={handleChange}
                required
              />
              <label htmlFor="aware-yes">Yes</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="aware-no"
                name="x200_awareness"
                value="No"
                onChange={handleChange}
                required
              />
              <label htmlFor="aware-no">No</label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="source">
              From where did you get to know about vivo X200 series launch?
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
            >
              <option selected>Choose...</option>
              <option value="Online – Ads on social media">
                Online – Ads on social media
              </option>
              <option value="Online – Brand website">
                Online – Brand website
              </option>
              <option value="Online – Third party website">
                Online – Third party website
              </option>
              <option value="Online – Articles or expert/tech views or blogs">
                Online – Articles or expert/tech views or blogs
              </option>
              <option value="Online - Instagram, YouTube, etc.">
                Online - Instagram, YouTube, etc.
              </option>
              <option value="Out of home hoardings like billboards, etc.">
                Out of home hoardings like billboards, etc.
              </option>
              <option value="Friends and family">Friends and family</option>
              <option value="Retail store">Retail store</option>
              <option value="Television">Television</option>
              <option value="Radio">Radio</option>
              <option value="Others">Others</option>
            </select>
            {formData.source === "Others" && (
              <div className="mt-2">
                <textarea
                  className="resize-none w-full rounded-md"
                  id="other-source"
                  name="other_source"
                  value={formData.other_source || ""}
                  onChange={handleChange}
                  rows="1"
                  placeholder="Enter your profession"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="visitReason">What made you visit the setup?</label>
            <select
              id="visitReason"
              name="visitReason"
              value={formData.visitReason}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="Setup design">Setup design</option>
              <option value="Product">Product</option>
              <option value="Activities">Activities</option>
              <option value="MC Engagement">MC Engagement</option>
              <option value="Announcement about the X200 series">
                Announcement about the X200 series
              </option>
              <option value="Gifts">Gifts</option>
              <option value="Photo op">Photo op</option>
              <option value="ZEISS logo">ZEISS logo</option>
              <option value="Curious to know more what was happening">
                Curious to know more what was happening
              </option>
              <option value="Others">Others</option>
            </select>
            {formData.visitReason === "Others" && (
              <div className="mt-2">
                <textarea
                  className="resize-none w-full rounded-md"
                  id="other-visitReason"
                  name="other_visitReason"
                  value={formData.other_visitReason || ""}
                  onChange={handleChange}
                  rows="1"
                  placeholder="Enter your profession"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="photography">
              Do you like photography? If yes, would you like to be part of
              photowalks hosted by Vivo India, or a part of our photography
              community?
            </label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="photography-yes"
                name="photography_interest"
                value="Yes"
                onChange={handleChange}
                required
              />
              <label htmlFor="photography-yes">Yes</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="photography-no"
                name="photography_interest"
                value="No"
                onChange={handleChange}
                required
              />
              <label htmlFor="photography-yes">No</label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="photograph-type">
              What kind of photographs do you like clicking? (multiple choice):
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="nature"
                name="photograph_type"
                value="Nature"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="nature">
                Nature
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="family"
                name="photograph_type"
                value="Family"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="family">
                Family
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="wildlife"
                name="photograph_type"
                value="Wildlife"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="wildlife">
                Wildlife
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="selfies"
                name="photograph_type"
                value="Selfies"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="selfies">
                Selfies
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="portraits"
                name="photograph_type"
                value="Portraits"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="portraits">
                Portraits
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="travel"
                name="photograph_type"
                value="Travel"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="travel">
                Travel
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="mr-2"
                id="na"
                name="photograph_type"
                value="NA"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="na">
                NA
              </label>
            </div>
          </div>

          <div>
            <label>Do you specially go out to click pictures?</label>
            <div>
              <input
                type="radio"
                id="go-out-yes"
                name="go_out_for_photography"
                value="Yes"
                onChange={handleChange}
                required
              />
              <label htmlFor="go-out-yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="go-out-no"
                name="go_out_for_photography"
                value="No"
                onChange={handleChange}
                required
              />
              <label htmlFor="go-out-no">No</label>
            </div>
          </div> */}

          {isLoading ? (
            <button
              className="bg-blue-600 hover:bg-blue-800 p-2 rounded-md text-white font-semibold"
              disabled
            >
              {<Spinner />}
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-800 p-2 rounded-md text-white font-semibold"
              type="submit"
            >
              SUBMIT
            </button>
          )}
        </form>
      </div>

      <div className="text-white text-lg mt-2">
        <h1>&copy; 2024 VIVO, All Rights Reserved</h1>
      </div>

      <Modal dismissible show={showModal} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opastate-50">
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
