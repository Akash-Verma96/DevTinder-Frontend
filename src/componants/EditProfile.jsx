import React, { useState } from "react";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToster, setShowToster] = useState(false);

  user = useSelector((store) => store.user);

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setShowToster(true);

      setTimeout(() => {
        setShowToster(false);
      }, 3000);

      console.log(showToster);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center gap-30">
        <div className="w-full max-w-sm  rounded-2xl  p-6 bg-black shadow-lg shadow-cyan-500/50 inset-shadow-sm inset-shadow-cyan-500 ...">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Akash"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Photo Url
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter Photo"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <p className="text-red-500 mb-3">{error}</p>
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
            onClick={saveProfile}
          >
            Update Details
          </button>
        </div>
        <div className="bg-slate-800 p-2 rounded-2xl shadow-lg shadow-cyan-500/50 inset-shadow-sm inset-shadow-cyan-500 ...">
          Preview
        </div>
        {/* <Card user={user} /> */}
        <div className="relative w-[320px] h-[430px] rounded-2xl overflow-hidden shadow-xl bg-black">
          {/* Image */}
          <img
            src={photoUrl}
            alt="user-image"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* User Info */}
          <div className="absolute bottom-15 left-4 right-4 text-white">
            <h2 className="text-xl font-semibold">
              {firstName + " " + lastName} {age ? age : "20"}
            </h2>
            <p className="text-sm opacity-90">{about}</p>
            <p className="text-xs mt-1 opacity-80">📍 {gender}</p>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-6">
            <button
              className="bg-slate-900 p-1 text-2xl rounded-3xl shadow-lg hover:scale-105 transition hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.9)]
  hover:ring-2 hover:ring-blue-400 hover:rotate-360"
            >
              🧑‍💻
            </button>
          </div>
        </div>
      </div>
      { showToster && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span className="text-slate-900" >Profile saved successfully.</span>
        </div>
      </div>
      )}
    </>
  );
};

export default EditProfile;
