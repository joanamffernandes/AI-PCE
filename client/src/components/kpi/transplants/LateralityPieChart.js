import React, {useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';

const LateralityPieChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/lateralidade', {
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
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    dataKey="total_transplantes"
                    data={data}
                    innerRadius="50%"
                    outerRadius="100%"
                    startAngle={180}
                    endAngle={0}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colorPalette[index]} name={entry.lateralidade} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default LateralityPieChart;
