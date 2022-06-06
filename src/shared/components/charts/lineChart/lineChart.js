import React,{useEffect, useState} from 'react';
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
import SadIcon from '../../../../assets/images/dashboardModule/home/sad.svg';
import HappyIcon from '../../../../assets/images/dashboardModule/home/happy.svg';
let sadEmoji = new Image(35, 35);
sadEmoji.src = SadIcon;

let happyEmoji = new Image(35, 35);
happyEmoji.src = HappyIcon;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,

    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: false
        }
    },
    tooltips: {
        enabled: false
    },
    scales: {
        y: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
                color: "white",
                stepSize: 20
            }
        },
        x: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
                color: "white",
            }
        }
    }
};

const data1 = [0, 55, 20, 80, 22, 100];
const emojiIcon = [2, 5];

export const data = {
    labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    datasets: [
        {
            pointRadius: 0,
            lineTension: 0.4,
            data: data1,
            borderColor: 'white',
            color: 'white',
        },
        {
            data: data1.map((v, i) => emojiIcon.includes(i) ? v + 10 : null),
            fill: false,
            pointStyle: [sadEmoji, happyEmoji],
            pointRadius: 15,
        }
    ],
};

export function LineChart({happinessLabel, happinessGraphData, emojisIcon, emojisIndex}) {

    const dataSet = {
        labels: happinessLabel,
        datasets: [
            {
                pointRadius: 0,
                lineTension: 0.4,
                data: happinessGraphData,
                borderColor: 'white',
                color: 'white',
            },
            {
                data: happinessGraphData.map((v, i) => emojisIndex.includes(i) ? v + (v ? (v/5) : 5) : null),
                fill: false,
                pointStyle: emojisIcon,
                borderColor: 'transparent',
                pointRadius: 15,
            }
        ],
    };
    return (
        <>
            {
            happinessGraphData.length ? 
                <Line options={options} data={dataSet} /> : 
                <div style={{height: 220}} className='d-flex align-items-center justify-content-center'> No Record</div>
            }
        </>
    );
}
