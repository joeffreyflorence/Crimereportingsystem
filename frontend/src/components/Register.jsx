/* eslint-disable no-unused-vars */
import {useState} from "react";
import axios from "axios";
import loginImg from "../assets/login.jpg";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users", {
        name: name,
        username: username,
        password: password,
      });
      history("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.errors);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-800 flex flex-col justify-center">
        <form
          onSubmit={Register}
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Register
          </h2>
          <p className="text-red-500 mt-4">{msg}</p>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Register
          </button>
          <div className="mt-3 text-center">
            <p>
              Already Account?{" "}
              <span>
                {" "}
                <a className="text-blue-500 hover:text-white" href="/">
                  Login
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
