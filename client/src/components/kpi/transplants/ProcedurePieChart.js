import React, {useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';

const ProcedurePieChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/procedimento', {
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
        <ResponsiveContainer width="100%" height={310}>
            <PieChart>
                <Pie
                    dataKey="total_transplantes"
                    nameKey="procedimento"
                    data={data}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colorPalette[index % colorPalette.length]}/>
                    ))}
                </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ProcedurePieChart;
