import React, {useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from 'recharts';

const PriorityPieChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/prioridade', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        }).then(response => {
            response.json().then(data => {
                if (response.ok) {
                    if (data.success) {
                        setData(data.response);
                    } else {
                        alert(data.response)
                    }
                }
            });
        }).catch(error => {
            alert(error.message);
            console.log(error.message)
        });

    }, []);

    return (
        <ResponsiveContainer width="100%" height={320}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="total_transplantes"
                    nameKey="prioridade"
                    cx="50%" cy="50%" outerRadius={100}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]}/>
                    ))}
                </Pie>
                <Legend/>
            </PieChart>
        </ResponsiveContainer>

    );
};

export default PriorityPieChart;
