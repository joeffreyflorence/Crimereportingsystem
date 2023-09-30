import axios from "axios";
import { useEffect, useState } from "react";
import AddCrime from "./crimes/AddCrime.jsx";
import UpdateCrime from "./crimes/UpdateCrime.jsx";
import DeleteCrime from "./crimes/DeleteCrime.jsx";

const Crime = () => {
  const [name, setName] = useState("");
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    getUser();
    getCrimes();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const data = await axios.get(`http://localhost:8080/api/users/current`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const user = data.data.data.name;
    setName(user);
  };

  const getCrimes = async () => {
    const token = localStorage.getItem("token");
    const crimes = await axios.get(`http://localhost:8080/api/crimes`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log(crimes.data.paging.page);
    const data = crimes.data.data;
    setCrimes(data);
  };

  return (
    <div className="ml-8 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Report Crime</h1>
      <div className="overflow-x-auto mt-4 justify-center">
        <div className="py-2">
          <AddCrime />
        </div>
        <table className="table justify-center">
          <thead>
            <tr>
              <th className="text-white text-lg font-semibold text-center">
                ID
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Crime 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Crime Type 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Location 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Time
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {crimes.map((crime, index) => (
              <tr key={crime.id}>
                <td className="text-white text-md font-base text-center">
                  {index + 1}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.name_crime}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.type_crime}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.location}
                </td>
                <td className="text-white text-md font-base text-center">
                  {new Date(crime.incident_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="flex">
                  <div className="mr-1">
                    <UpdateCrime id={parseInt(crime.id)} />
                  </div>

                  <DeleteCrime id={parseInt(crime.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crime;
