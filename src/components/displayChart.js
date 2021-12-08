import { useRef } from "react";
import { useState } from "react";
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { render } from "react-dom";

var thingspeakHandler = require('./dataHandler');

export async function chartData(sensorids, startdate, enddate, datafield){

    console.log("received id:"+ sensorids)
    const data = await thingspeakHandler.getThingspeakProcessedData([sensorids], startdate, enddate);
    console.log('DATA: ', data); 
    
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Test() {
   return <Line options={options} data={data} />;
}



export function showChart(sensorids, startdate, enddate){
    console.log("Here we are")
    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );

}