import React, {useEffect, useState} from 'react';
import {Pie, PieChart, Cell, ResponsiveContainer, Legend} from 'recharts';

const AnesthesiaPieChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/anestesia', {
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
//<Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
    return (
        <ResponsiveContainer width="100%" height={320}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="total_transplantes"
                    nameKey="anestesia"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
                    ))}
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>

    );
};

export default AnesthesiaPieChart;
