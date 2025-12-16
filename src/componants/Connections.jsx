import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import axios from "axios";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    if (connections) return;
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(connections?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="text-center  text-xl mt-10">NO Connections Found</div>
    );
  }

  return (
    connections && (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Connections</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user, index) => (
            <div
              className="border bg-black rounded-lg p-4 flex flex-row gap-2 items-center text-center shadow-lg hover:scale-105 transition  hover:ring-2 hover:ring-green-900"
              key={index}
            >
              <div>
                <img
                  src={user.photoUrl}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm text-gray-600 mt-1">{user.about}</p>

                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 border rounded-full shadow-lg hover:scale-105 transition hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.9)] hover:ring-2 hover:ring-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Connections;
