import React, {useEffect, useState} from 'react';
import {ResponsiveContainer, Bar, BarChart, Legend, Tooltip, XAxis, YAxis, CartesianGrid} from 'recharts';

const DropsDiagnosticBarChart = ({fill}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/motivo/desistencia/diagnostico', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            response.json().then(data => {
                if (response.ok) {
                    if (data.success) {
                        data.response.sort((a, b) => a["diagnostico"].localeCompare(b["diagnostico"]));
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
                <XAxis dataKey="diagnostico" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill={fill} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DropsDiagnosticBarChart;
