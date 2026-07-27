import React from "react";

const Result = ({ result }) => {
    return (
      <div className="mt-0 m-5 p-5 w-150 bg-gray-200 rounded-4xl shadow-2xl border-[0.5px] border-gray-500">
        <h2 className="text-xl font-bold text-center">Prediction</h2>
        <div>
          {result ? (
            <p className=" text-center font-semibold text-red-600">
              The Patient is diabetic
            </p>
          ) : (
            <p className="text-center font-semibold text-green-500">
              The Patient is NOT diabetic
            </p>
          )}
        </div>
      </div>
    );
};

export default Result;

{/* <div className="mt-5 p-4 rounded bg-gray-100">
  <h2 className="text-xl font-bold">Prediction</h2>

  {result ? (
    <p className="text-red-600">The patient is diabetic.</p>
  ) : (
    <p className="text-green-600">The patient is not diabetic.</p>
  )}
</div>; */}