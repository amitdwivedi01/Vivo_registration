import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import axios from "axios";
import * as XLSX from "xlsx";

const Admin = () => {
  const [stateFilter, setstateFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [userData, setUserData] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleExportToExcel = () => {
    const modifiedUserData = filteredUserData.map((user) => {
      const modifiedUser = { ...user };

      // Check and modify fields if the value is "Others"
      if (user.source === "Others" && user.other_source) {
        modifiedUser.source = `Other: ${user.other_source}`;
      }

      if (user.profession === "Others" && user.other_profession) {
        modifiedUser.profession = `Other: ${user.other_profession}`;
      }

      if (user.handset === "Others" && user.other_handset) {
        modifiedUser.handset = `Other: ${user.other_handset}`;
      }

      if (user.visitReason === "Others" && user.other_visitReason) {
        modifiedUser.visitReason = `Other: ${user.other_visitReason}`;
      }

      // Include photograph_type field in the export
      if (user.photograph_type && user.photograph_type.length > 0) {
        modifiedUser.photograph_type = user.photograph_type.join(", ");
      }

      if (user.timestamp) {
        modifiedUser.timestamp = new Date(user.timestamp).toLocaleDateString(
          "en-GB"
        );
      }

      // Remove the other_* fields as they are already integrated
      delete modifiedUser.other_source;
      delete modifiedUser.other_profession;
      delete modifiedUser.other_handset;
      delete modifiedUser.other_visitReason;
      delete modifiedUser.__v;
      delete modifiedUser._id;
      delete modifiedUser.index;

      return modifiedUser;
    });

    const filename = "userData.xlsx";
    const ws = XLSX.utils.json_to_sheet(modifiedUserData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserData");
    XLSX.writeFile(wb, filename);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");

        if (response.status === 200) {
          const users = response.data.map((user, index) => ({
            ...user,
            index, // Preserve original index
          }));
          setUserData(users);
          const cities = [...new Set(users.map((user) => user.state))];
          setUniqueCities(cities);
          const dates = [
            ...new Set(
              users.map((user) =>
                user.timestamp ? user.timestamp.split("T")[0] : null
              )
            ),
          ];
          setUniqueDates(dates.filter((date) => date !== null)); // Filter out null values
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

  // Filter user data based on selected state and date
  const filteredUserData = userData
    .filter((user) => {
      if (dateFilter && user.timestamp) {
        return (
          user.timestamp.split("T")[0] === dateFilter &&
          (stateFilter === "All" || user.state === stateFilter)
        );
      } else if (dateFilter) {
        return false; // If dateFilter is set but user has no timestamp, exclude from filter
      } else if (stateFilter === "All") {
        return true; // No filters applied
      } else {
        return user.state === stateFilter; // Only state filter applied
      }
    })
    .sort((a, b) => a.index - b.index); // Maintain original order

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
                value={stateFilter}
                onChange={(e) => setstateFilter(e.target.value)}
              >
                <option value="All">All Cities</option>
                {uniqueCities.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <select
                className="form-select mr-4"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Select Date</option>
                {uniqueDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <h2 className="mr-4 text-md">Count: {filteredUserData.length}</h2>
              <Button onClick={handleExportToExcel}>Export to Excel</Button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  state
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profession
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Handset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  X200 Awareness
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visit Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photography Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photograph Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Go Out for Photography
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUserData.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.profession === "Others"
                      ? `Other: ${user.other_profession}`
                      : user.profession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.handset === "Others"
                      ? `Other: ${user.other_handset}`
                      : user.handset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.source === "Others"
                      ? `Other: ${user.other_source}`
                      : user.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.x200_awareness}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.visitReason === "Others"
                      ? `Other: ${user.other_visitReason}`
                      : user.visitReason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.photography_interest}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Array.isArray(user.photograph_type)
                      ? user.photograph_type.join(", ")
                      : ""}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.go_out_for_photography}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.timestamp).toLocaleDateString("en-GB")}
                  </td>
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
