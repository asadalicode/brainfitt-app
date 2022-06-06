import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            stacked: true,
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
            stacked: true,
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
                color: "white"
            }
        },
    }
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const data = {
    labels,
    datasets: [
        {
            data: [40, 80, 12, 89, 98, 19, 80],
            backgroundColor: 'white',
            barThickness: 6,
            borderRadius: 5,

        }
    ],
};

export function BarChart({myActivity}) {
    const [label, setLabel]=useState([])
    const [graphData, setGraphData]=useState([])
    const [shadow, setShadow]=useState([])

    useEffect(()=>{
        let _labels = []
        let _data = []
        myActivity && myActivity.map((data) => {
            _labels.push(data.date)
            _data.push(data.total_score)
        })
        let _maxValue = Math.max(..._data);
        let shadowArray = [];
        _data.map(value => {
            let _add = (_maxValue+20) - value
            shadowArray.push(_add)
        })
        setShadow(shadowArray)
        setLabel(_labels)
        setGraphData(_data)
    },[myActivity])

    const dataSet = {
        labels: label,
        datasets: [
            {
                data: graphData,
                backgroundColor: 'white',
                barThickness: 6,
                borderRadius: 5,
    
            },
            {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                data: shadow,
                barThickness: 6,
                borderRadius: 5,

            }
        ],
    };
    return (
        <>
            {graphData.length ? 
                <Bar options={options} data={dataSet} />: 
                <div style={{height: 220}} className='d-flex align-items-center justify-content-center'> No Record</div>
                }
        </>
    );
}
