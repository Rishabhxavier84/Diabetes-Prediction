import React, { useState } from "react";
import api from "../Api/api";
import { Result } from ".";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { extractedFields, extractPDFText } from "./Pdf/pdfExtractor";

const Form = () => {
  const { username, loading } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    bmi: "",
    age: "",
  });

  const [result, setResult] = useState(null);

  const navigate = useNavigate()

  const handlePDFUpload = async (event) => {
    const file = event.target.files[0]

    if (!file) return

    try {
      
      const text = await extractPDFText(file)

      const extractedData = extractedFields(text)

      setFormData((prev) => ({
        ...prev,
        ...extractedData,
      }))
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleDashboard = () => {
    navigate("/user/dashboard")
  }

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


  const formElements = [
    {
      id: 1,
      title: 'name',
      type: 'text',
      name: 'name',
      styleId: 'name',
      function: handleNameChange,
      min: 'None',
      step: 'None'
    },
    {
      id: 2,
      title: 'age',
      type: 'number',
      name: 'age',
      styleId: 'age',
      function: handleChange,
      min: '18',
      step: '1'
    },
    {
      id: 3,
      title: 'pregnancies',
      type: 'number',
      name: 'pregnancies',
      styleId: 'pregnancies',
      function: handleChange,
      min: '0',
      step: '1'
    },
    {
      id: 4,
      title: 'glucose',
      type: 'number',
      name: 'glucose',
      styleId: 'glucose',
      function: handleChange,
      min: 'None',
      step: '0.01'
    },
    {
      id: 5,
      title: 'blood pressure',
      type: 'number',
      name: 'blood_pressure',
      styleId: 'blood_pressure',
      function: handleChange,
      min: 'None',
      step: '0.01'
    },
    {
      id: 6,
      title: 'bmi',
      type: 'number',
      name: 'bmi',
      styleId: 'bmi',
      function: handleChange,
      min: 'None',
      step: '0.01'
    },
    
  ]


  return (
    <div className="flex-col justify-center items-center bg-gray-50">
      <h1 className="m-5 p-5 text-3xl text-center font-bold">
        Diabetes Prediction
        
      </h1>
      <div className="flex justify-end item-center">
        <p className="flex item-center p-2 font-5 capitalize mx-5 font-bold">Welcome back {username}</p>
        <div className='flex item-center gap-5 justify-end'>
          <button 
            onClick={handleDashboard} 
            className=" p-1 px-4 text-sm border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black cursor-pointer font-bold"
          >
            Dashboard
          </button>
      </div>
        <Logout />
      </div>
      
      
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className=" bg-gray-200 p-10 px-30 my-5 rounded-4xl shadow-2xl border-[0.5px] border-gray-500"
        >
          {/* <div className=" flex gap-5 p-3 m-3">
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
              min="0"
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
          </div> */}

          <div className="flex items-center justify-center">
            <label htmlFor="file">Upload Report</label>
            <input type="file" accept="application/pdf" name="file" id="file" onChange={handlePDFUpload} className="rounded-md p-2 text-sm cursor-pointer
                file:mr-4 file:rounded-2xl file:border-2 file:bg-amber-50
                file:px-4 file:py-2 file:text-sm file:font-medium file:border-fuchsia-500
              file:text-black" />
          </div>

          {formElements.map((idx) => (
            <div key={idx.id} className=" flex gap-5 p-3 m-3">
            <p className="p-1 px-4 w-3xs capitalize">{idx.title} :</p>
            <input
              type={idx.type}
              name={idx.name}
              id={idx.id}
              value={formData[idx.name]}
              onChange={idx.function}
              min={idx.min}
              step={idx.step}
              className="p-1 px-4 border-2 border-fuchsia-500 rounded-2xl bg-amber-50 text-black"
            />
          </div>
          ))}

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
