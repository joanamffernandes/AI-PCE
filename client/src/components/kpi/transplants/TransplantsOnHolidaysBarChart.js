import React, {useEffect, useState} from 'react';
import {CartesianGrid, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend} from 'recharts';

const TransplantsOnHolidaysBarChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/feriados-fim-de-semana', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
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
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="ano"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="transplantes_fim_semana" fill={colorPalette[0]}/>
                <Bar dataKey="transplantes_feriado" fill={colorPalette[1]}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TransplantsOnHolidaysBarChart;
