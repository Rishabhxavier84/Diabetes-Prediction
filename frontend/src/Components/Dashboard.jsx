import React, { useEffect, useState } from 'react'
import api from '../Api/api';
import Block from './Admin/Block';
import Logout from './Logout';

const Dashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    diabetic: 0,
    non_diabetic: 0,
    today_prediction: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const cleanup = await api.delete("/user/cleanup");
        // console.log(cleanup.data)
        const [predictionRes, statsRes] = await Promise.all([
          api.get("/user/prediction"),
          api.get("/user/stats"),
        ]);
        setPredictions(predictionRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex-col justify-center items-center bg-gray-50">
        <h1 className="m-5 p-5 text-3xl text-center font-bold">
          User Dashboard
        </h1>
        <div className="flex justify-end items-center mx-10 px-5">
          <Logout/>
        </div>
      </div>
      {/*  */}
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="flex justify-between items-center border-b">
            <Block head="Total Predictions" value={stats.total} />
            <Block head="Diabetic" value={stats.diabetic} />
            <Block head="Non-diabetic" value={stats.non_diabetic} />
            <Block head="Today's Predictions" value={stats.today_prediction} />
          </div>

          
          {predictions.length === 0 ? (
            <p
             className="p-6 text-center text-gray-500 font-medium">
              No Data available
            </p>
          ):(
            <div className="overflow-x-auto border-l border-r border-b rounded-b-xl">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>

                    <th className="px-6 py-4 text-left">Pregnencies</th>

                    <th className="px-6 py-4 text-left">Glucose</th>

                    <th className="px-6 py-4 text-left">Blood Pressure</th>

                    <th className="px-6 py-4 text-left">BMI</th>

                    <th className="px-6 py-4 text-left">Age</th>

                    <th className="px-6 py-4 text-left">Result</th>

                    <th className="px-6 py-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {predictions.map((prediction) => (
                    <tr
                      key={prediction.uid}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{prediction.name}</td>

                      <td className="px-6 py-4">{prediction.pregnancies}</td>

                      <td className="px-6 py-4">{prediction.glucose}</td>

                      <td className="px-6 py-4">{prediction.blood_pressure}</td>

                      <td className="px-6 py-4">{prediction.bmi}</td>

                      <td className="px-6 py-4">{prediction.age}</td>

                      <td
                        className={`px-6 py-4 font-bold ${prediction.prediction ? "text-red-600" : "text-green-600"}`}
                      >
                        {prediction.prediction ? "Diabetic" : "Non-diabetic"}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(prediction.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );

}

export default Dashboard