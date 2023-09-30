import axios from "axios";
import { useEffect, useState } from "react";

const Welcome = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const data = await axios.get(`http://localhost:8080/api/users/current`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const users = data.data.data.name;
    setName(users);
  };

  return (
    <div className=" mt-4 justify-center text-4x text-white">
      <div className="mx-6">
        <h1 className="text-3xl font-bold">
          Hi there {name ? name : "User"}! Welcome to the Crime and Accident Data Website Dashboard
        </h1>
        <h5 className="mt-4 text-2xl">
        We are proud to present a platform specifically designed to provide up-to-date information on crime and accident data. Our goal is to provide easy and transparent access to relevant data, so you can understand and explore trends, patterns and statistics related to crime and accidents.
        </h5>
        <h5 className="mt-4 text-2xl">
        Through this website, you can explore various types of crime, including street crime, robbery, theft, and more. We also provide information regarding traffic accidents, road incidents, and other accident data that can help you understand the factors that contribute to accidents and take appropriate preventive measures. 
        </h5>
        <h5 className="mt-4 text-2xl">
          We collect data from various reliable sources and we continuously update the information to keep it accurate and useful. We hope that through easy access to this data, the public can raise awareness of the problem of crime and accidents and contribute to creating a safer and better environment for all.

        </h5>
      </div>
    </div>
  );
};

export default Welcome;
