import React, { useEffect, useState } from 'react';
import { CartesianGrid, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

const DropsBarChart = ({ colorPalette }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/motivo', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            response.json().then(data => {
                if (response.ok) {
                    if (data.success) {
                        // Ordenar os valores por ano em ordem crescente
                        data.response.sort((a, b) => a["ano"] - b["ano"]);
                        setData(data.response);
                    } else {
                        alert(data.response);
                    }
                }
            });
        }).catch(error => {
            alert(error.message);
            console.log(error.message);
        });

    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Contra indicação temporária" fill={colorPalette[0]} />
                <Bar dataKey="Contra indicação definitiva" fill={colorPalette[1]} />
                <Bar dataKey="Desistência" fill={colorPalette[2]} />
                <Bar dataKey="Morte" fill={colorPalette[3]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DropsBarChart;
