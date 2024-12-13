import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Recharts.css'; // Import the CSS

const RechartsComponent = ({ data }) => {
  return (
    <div className="recharts-container">
      <h3>Stock Bar Chart</h3>
      {data.length > 0 ? (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>No data available for the chart</p>
      )}
    </div>
  );
};

export default RechartsComponent;
