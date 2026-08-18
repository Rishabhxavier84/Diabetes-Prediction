import React, { useState } from "react";
import api from "../Api/api";
import { Result } from ".";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    bmi: "",
    age: "",
  });

  const [result, setResult] = useState(null);

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: String(e.target.value),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/predict", formData);
      setResult(res.data.diabetes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-col justify-center items-center bg-gray-50">
      <h1 className="m-5 p-5 text-3xl text-center font-bold">
        Diabetes Prediction
      </h1>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className=" bg-gray-200 p-10 px-30 my-5 rounded-4xl shadow-2xl border-[0.5px] border-gray-500"
        >
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Name :</p>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleNameChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Pregnancies :</p>
            <input
              type="number"
              name="pregnancies"
              id="pregnancies"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Glucose :</p>
            <input
              type="number"
              step="0.01"
              name="glucose"
              id="glucose"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Blood Pressure :</p>
            <input
              type="number"
              step="0.01"
              name="blood_pressure"
              id="blood_pressure"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">BMI :</p>
            <input
              type="number"
              step="0.01"
              name="bmi"
              id="bmi"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Age :</p>
            <input
              type="number"
              name="age"
              id="age"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black cursor-pointer"
            >
              Predict
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center items-center">
        {result !== null && <Result result={result} />}
      </div>
    </div>
  );
};

export default Form;
