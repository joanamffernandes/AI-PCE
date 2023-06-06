import React, {useEffect, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const WaitingTimeLineChart = ({ dataKey, stroke, sortData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/tempo-espera/transplante/' + dataKey, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        }).then(response => {
            response.json().then(data => {
                if (response.ok) {
                    if (data.success) {
                        // Ordenar os valores por dataKey em ordem crescente
                        if (sortData) {
                            data.response.sort((a, b) => a[dataKey] - b[dataKey]);
                        }
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
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={dataKey}/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="tempo_medio_espera" stroke={stroke}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WaitingTimeLineChart;
