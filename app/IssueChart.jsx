'use client';
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {Card, Text, Flex} from '@radix-ui/themes';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const IssueChart = ({ open, inProgress, closed }) => {
  const data = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
        {
          data: [open, inProgress, closed],
          backgroundColor: ['#FF92AD', '#E796F3', '#BAA7FF'],
        }
      ]
  };

  const options = {
    indexAxis: 'x',
    barThickness:70,
    responsive: true 
  };

  return (
    <Card>
      <Bar data={data} options={options} />
    </Card>
  );
};

export default IssueChart;