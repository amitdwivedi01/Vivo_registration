import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import axios from "axios";
import * as XLSX from "xlsx";

const Admin = () => {
  const [cityFilter, setCityFilter] = useState("All");
  const [userData, setUserData] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

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
        const response = await axios.get("http://localhost:5000/api/users");
        if (response.status === 200) {
          setUserData(response.data);
          const cities = [...new Set(response.data.map(user => user.city))];
          setUniqueCities(cities);
        } else {
          alert("Error loading data");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    };
    getUserData();
  }, []);

  // Filter user data based on selected city
  const filteredUserData =
    cityFilter === "All"
      ? userData
      : userData.filter((user) => user.city === cityFilter);

  return (
    <>
      {userData ? (
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
              <Button onClick={handleExportToExcel}>Export to Excel</Button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUserData.map((user) => (
                <tr key={user.id}>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="w-[100px] rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.handset}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.tenure}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.source}</td>
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
