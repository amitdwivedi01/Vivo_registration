import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import axios from "axios";
import * as XLSX from "xlsx";

const Admin = () => {
  const [cityFilter, setCityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [userData, setUserData] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);

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
        const response = await axios.get("https://vivo-registration-eugssn7j7-amitdwivedi01s-projects.vercel.app/api/users");
        if (response.status === 200) {
          const users = response.data;
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
  });

  return (
    <>
      {userData.length > 0 ? (
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
              <h2 className="mr-4 text-md">count: {filteredUserData.length}</h2>
              <Button onClick={handleExportToExcel}>Export to Excel</Button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
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
                <td className="px-6 py-4 whitespace-nowrap">{user.handset}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.attractFeature}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.tenure}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.source}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.profession}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.attraction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.usedVivoBefore}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.cameraModulePreference}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.favoriteFeatureV30e}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.portraitExperience}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.standoutFeature}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.timestamp}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Admin;
