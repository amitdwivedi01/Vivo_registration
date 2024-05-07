import React, { useState } from 'react';
import { Button, Checkbox, TextInput, Modal, Spinner } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/vivo_logo.png';

const citiesInIndia = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    handset: '',
    tenure: '',
    source: '',
    file: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the input is for the mobile number field
    if (name === "mobile") {
      // If the input length is more than 10, truncate it to 10 characters
      if (value.length > 10) {
        setFormData(prevState => ({
          ...prevState,
          [name]: value.slice(0, 10) // Only take the first 10 characters
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB.');
      e.target.value = null; // Clear input field
    } else {
      setFormData(prevState => ({
        ...prevState,
        file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobile.length < 10) {
      alert('Please fill in a 10-digit mobile number.');
      return; // Prevent form submission
    }
    setIsLoading(true);
    
    try {
      const NewFormData = new FormData();
      NewFormData.append('name', formData.name);
      NewFormData.append('email', formData.email);
      NewFormData.append('mobile', formData.mobile);
      NewFormData.append('city', formData.city);
      NewFormData.append('handset', formData.handset);
      NewFormData.append('tenure', formData.tenure);
      NewFormData.append('source', formData.source);
      NewFormData.append('file', formData.file);
      
      const response = await axios.post('/api/register', NewFormData);
      
      if (response.status === 201) {
        setShowModal(true);
        setIsLoading(false);
      } else {
        alert('Error submitting form. Please try again.');
        setIsLoading(false);
      }
      
      setFormData({
        name: '',
        email: '',
        mobile: '',
        city: '',
        handset: '',
        tenure: '',
        source: '',
        file: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form:', error);
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    Navigate('/');
  };

  const handleBack = () => {
    Navigate('/');
  };
  return (
    <div className='bg-blue-600 flex flex-col items-center h-screen w-full'>
      <div className="flex justify-center py-4">
        <img src={logo} className="w-[300px]" alt="" onClick={handleBack} style={{ cursor: 'pointer' }} />
      </div>
      <div className='flex justify-center items-center w-full max-w-[400px] bg-white rounded-2xl p-4 m-2 mt-8'>   
        <form className="flex flex-col gap-6 justify-center w-full" onSubmit={handleSubmit}>
          <div>
            <TextInput type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" required />
          </div>
          <div>
            <TextInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email ID" required />
          </div>
          <div>
            <TextInput type="number" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile NO" required />
          </div>
          <div>
            <select className="input input-bordered" name="city" value={formData.city} onChange={handleChange}>
              <option value="" disabled hidden>City</option>
              {citiesInIndia.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <TextInput type="text" name="handset" value={formData.handset} onChange={handleChange} placeholder="Current Handset" required />
          </div>
          <div>
            <TextInput type="text" name="tenure" value={formData.tenure} onChange={handleChange} placeholder="Current Handset Tenure" required />
          </div>
          <div>
            <TextInput type="text" name="source" value={formData.source} onChange={handleChange} placeholder="Information Source Before Purchase" required />
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {
            isLoading ?
            <Button className='bg-blue-600 hover:bg-blue-800' disabled> {<Spinner />} </Button> :
            <Button className='bg-blue-600 hover:bg-blue-800' type="submit"> SUBMIT</Button>
          }           
        </form>
      </div>

      <div className='text-white text-lg mt-2'>
        <h1>&copy; 2024 VIVO, All Rights Reserved</h1>
      </div>

      <Modal dismissible show={showModal} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Thank you for your registration!</h2>
            <Button onClick={handleModalClose} className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</Button>
            </div>
        </div>
     </Modal>

    </div>
  );
};

export default Register;
