import { useEffect, useState } from "react";
import axios from "axios";
import AddAccident from "./accident/AddAccident.jsx";
import UpdateAccident from "./accident/UpdateAccident.jsx";
import DeleteAccident from "./accident/DeleteAccident.jsx";

const Accident = () => {
  const [name, setName] = useState("");
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    getUser();
    getAccidents();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const data = await axios.get(`http://localhost:8080/api/users/current`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    setName(data.data.data.name);
  };

  const getAccidents = async () => {
    const token = localStorage.getItem("token");
    const data = await axios.get(`http://localhost:8080/api/accidents`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    setAccidents(data.data.data);
  };

  return (
    <div className="ml-8 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Report Accident</h1>
      <div className="overflow-x-auto mt-4 justify-center">
        <div className="py-2">
          <AddAccident />
        </div>
        <table className="table justify-center">
          <thead>
            <tr>
              <th className="text-white text-lg font-semibold text-center">
                ID
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Location
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Description
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Injured
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Vehicle
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Type
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
            {accidents.map((accident, index) => (
              <tr key={accident.id}>
                <td className="text-white text-md font-base text-center">
                  {index + 1}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.location}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.description}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.fatalities}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.injured}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.vehicle_type}
                </td>
                <td className="text-white text-md font-base text-center">
                  {new Date(accident.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="flex">
                  <div className="mr-1">
                    <UpdateAccident id={parseInt(accident.id)} />
                  </div>

                  <DeleteAccident id={parseInt(accident.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default Accident;
