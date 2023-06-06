import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import '../KpiChart.css';

const WaitingTimeWithAnesthesiaBarChart = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/tempo-espera/anestesia', {
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
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="recharts-tooltip"
                     style={{backgroundColor: 'white', padding: '10px', border: '1px solid #ccc'}}>
                    <p className="recharts-tooltip-label">{`${label}`}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={`tooltip-${index}`}
                            className="recharts-tooltip-item"
                            style={{color: `${entry.dataKey === 'tempo_espera_transp' ? '#000000' : entry.fill}`}}
                        >
                            {`${entry.name}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }

        return null;
    };


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
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>
                <Bar name="Tempo espera para consulta anestesia" dataKey="tempo_espera_anest" stackId="a"
                     fill={colorPalette[0]}/>
                <Bar name="Espera entre consulta e transplante" dataKey="tempo_espera_anest_cir" stackId="a"
                     fill={colorPalette[1]}/>
                <Bar name="Tempo total de espera" dataKey="tempo_espera_transp" stackId="a" fill="transparent"/>
            </BarChart>
        </ResponsiveContainer>

    );
};

export default WaitingTimeWithAnesthesiaBarChart;
