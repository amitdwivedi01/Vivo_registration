import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import axios from "axios";
import * as XLSX from "xlsx";

const Admin = () => {
  const [cityFilter, setCityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [userData, setUserData] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExportToExcel = () => {
    const filename = "userData.xlsx";
    const ws = XLSX.utils.json_to_sheet(filteredUserData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserData");
    XLSX.writeFile(wb, filename);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("https://vivo-registration.onrender.com/api/users");
<<<<<<< HEAD
=======
        // const response = await axios.get("http://localhost:5000/api/users");
>>>>>>> 298d430f8ad679ce22d83d25c3bd513a1985bc73

        if (response.status === 200) {
          const users = response.data.map((user, index) => ({
            ...user,
            index, // Preserve original index
          }));
          setUserData(users);
          const cities = [...new Set(users.map(user => user.city))];
          setUniqueCities(cities);
          const dates = [...new Set(users.map(user => user.timestamp ? user.timestamp.split('T')[0] : null))];
          setUniqueDates(dates.filter(date => date !== null)); // Filter out null values
        } else {
          alert("Error loading data");
        }
      } catch (error) {
        alert("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  // Filter user data based on selected city and date
  const filteredUserData = userData.filter(user => {
    if (dateFilter && user.timestamp) {
      return user.timestamp.split('T')[0] === dateFilter && (cityFilter === "All" || user.city === cityFilter);
    } else if (dateFilter) {
      return false; // If dateFilter is set but user has no timestamp, exclude from filter
    } else if (cityFilter === "All") {
      return true; // No filters applied
    } else {
      return user.city === cityFilter; // Only city filter applied
    }
  }).sort((a, b) => a.index - b.index); // Maintain original order

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-3xl font-semibold">User Data</h2>
            <div className="flex items-center">
              <select
                className="form-select mr-4"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="All">All Cities</option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              <select
                className="form-select mr-4"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Select Date</option>
                {uniqueDates.map((date, index) => (
                  <option key={index} value={date}>{date}</option>
                ))}
              </select>
              <h2 className="mr-4 text-md">Count: {filteredUserData.length}</h2>
              <Button onClick={handleExportToExcel}>Export to Excel</Button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ZEISS Factor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vivo Demo Helped</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo Upload Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favorite Photo Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Media Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Preference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favorite V40 Feature</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setup Attraction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUserData.map((user) => (
                <tr key={user._id}>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-[100px] rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.profession}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.handset}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.experienceRating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.zeissFactor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.vivoDemoHelped}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.photoUploadFrequency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.favoritePhotoType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.socialMediaTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.purchasePreference}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.influencerImpact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.favoriteV40Feature}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.setupAttraction}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(user.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Admin;
