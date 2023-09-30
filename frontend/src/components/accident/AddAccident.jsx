"use client";

import { useState } from "react";
import axios from "axios";

const AddAccident = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [fatalities, setFatalities] = useState("");
  const [injured, setInjured] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [modal, setModal] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:8080/api/accidents`,
      {
        date: date,
        location: location,
        description: description,
        fatalities: fatalities,
        injured: injured,
        vehicle_type: vehicleType,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    setModal(false);
  };

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary text-white" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal text-white text-center ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Data Accident</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold text-sm">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a location"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a short description"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Death</label>
              <input
                type="text"
                value={fatalities}
                onChange={(e) => setFatalities(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a number of death"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Wounded</label>
              <input
                type="text"
                value={injured}
                onChange={(e) => setInjured(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a number of wounded persons"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Vechicle Type</label>
              <input
                type="text"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Define what type of vehicle"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a date"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccident;
