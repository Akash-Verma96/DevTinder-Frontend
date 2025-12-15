import React from "react";

const Card = ({user}) => {
  const { firstName, lastName, age, gender, photoUrl, skills, about } = user;

  return (
    <div className=" h-150 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
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
            className="bg-slate-900 p-2 text-xl rounded-full shadow-lg hover:scale-105 transition hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.9)]
  hover:ring-2 
  hover:ring-blue-400 hover:rotate-360"
          >
            ❌
          </button>
          <button
            className="bg-slate-900 p-1 text-2xl rounded-3xl shadow-lg hover:scale-105 transition hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.9)]
  hover:ring-2 
  hover:ring-blue-400 hover:rotate-360"
          >
            🧑‍💻
          </button>
        </div>
      </div>
    </div>

  );
};

export default Card;
