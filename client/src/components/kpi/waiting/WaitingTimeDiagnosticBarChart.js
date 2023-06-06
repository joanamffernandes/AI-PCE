import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '../test/MyKpiChart.css';

const WaitingTimeDiagnosticBarChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/tempo-espera/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((response) => {
                response.json().then((data) => {
                    if (response.ok) {
                        if (data.success) {
                            data.response.sort((a, b) => a["diagnostico"].localeCompare(b["diagnostico"]));
                            setData(data.response);
                        } else {
                            alert(data.response);
                        }
                    }
                });
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            });
    }, []);


    const CustomizedAxisTick = ({x, y, payload}) => {
        let label = payload.value;

        // Define um limite para o comprimento da label
        const maxLength = 10;
        if (label.length > maxLength) {
            label = label.substring(0, maxLength) + "..";
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
                    {label}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                width={800}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="diagnostico" interval={0} tick={<CustomizedAxisTick/>}/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar name="Tempo total de espera" dataKey="tempo_espera_transp" stackId="a" fill={colorPalette[0]}/>
            </BarChart>
        </ResponsiveContainer>

    );
};

export default WaitingTimeDiagnosticBarChart;
