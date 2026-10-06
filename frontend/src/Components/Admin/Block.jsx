import React from "react";

const Block = ({ head, value }) => {
  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold">{head}</h2>

      <p className="text-gray-500">Total: {value}</p>
    </div>
  );
};

export default Block;
