import React, { useState } from "react";
import api from "../Api/api";
import { Result } from ".";

const Form = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    BMI: "",
    Age: "",
  });

  const [result, setResult] = useState(null);

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
            <p className="p-1 px-4 w-3xs">Pregnancies :</p>
            <input
              type="number"
              name="Pregnancies"
              id="Pregnancies"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Glucose :</p>
            <input
              type="number"
              name="Glucose"
              id="Glucose"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Blood Pressure :</p>
            <input
              type="number"
              name="BloodPressure"
              id="BloodPressure"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">BMI :</p>
            <input
              type="number"
              name="BMI"
              id="BMI"
              onChange={handleChange}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          <div className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs">Age :</p>
            <input
              type="number"
              name="Age"
              id="Age"
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
