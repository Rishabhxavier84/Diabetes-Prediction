import React from "react";
import { useNavigate } from "react-router-dom";
// import { UserButton } from "@clerk/react";

const Denied = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col justify-center items-center bg-gray-50 h-full">
      <h1 className="m-5 p-5 text-3xl text-center font-bold">403 Forbidden</h1>
      <div className="flex justify-end items-center mx-10 px-5">
        {/* <UserButton /> */}
      </div>
      <p className="m-10 p-10 font-semibold flex justify-center items-center">
        You don't have the security clearance to access this page.
      </p>
      <div className="flex justify-center items-center m-10 p-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className=" p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Denied;
