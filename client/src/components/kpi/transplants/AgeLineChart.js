import React, {useEffect, useState} from 'react';
import {LineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const AgeLineChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/idade', {
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
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="idade" type="number" label={{ value: 'Idade Paciente', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Total Transplantes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="total_transplantes" stroke={colorPalette[0]} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default AgeLineChart;
