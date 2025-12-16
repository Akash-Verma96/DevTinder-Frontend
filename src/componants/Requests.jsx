import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    if (requests) return;
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequest(requests?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!requests) return;

  if (requests.length === 0) {
    return <div className="text-center mt-5">No Request Found</div>;
  }

  return (
    requests && (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Requests</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((user, index) => (
            <div
              className="border bg-black rounded-lg p-4 flex flex-col items-center text-center shadow-lg  transition  hover:ring-2 hover:ring-green-900"
              key={index}
            >
              <img
                src={user.fromUserId.photoUrl}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mb-3"
              />

              <h2 className="text-lg font-semibold">
                {user.fromUserId.firstName} {user.fromUserId.lastName}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                {user.fromUserId.about}
              </p>

              <div className="flex flex-wrap gap-4 mt-3 justify-center">
                <button
                  onClick={() => handleRequest("rejected", user._id)}
                  className="px-3 py-1 rounded-xl text-white bg-gradient-to-r from-gray-600 to-slate-700 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.9)] hover:ring-2 hover:ring-blue-400"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleRequest("accepted", user._id)}
                  className="px-3 py-1 rounded-xl text-white bg-gradient-to-r from-green-300 to-green-700 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.9)] hover:ring-2 hover:ring-blue-400 hover:from-green-700 hover:to-green-500"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Requests;
