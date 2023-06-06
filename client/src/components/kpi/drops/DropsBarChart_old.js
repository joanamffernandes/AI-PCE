import React, {useEffect, useState} from 'react';
import {CartesianGrid, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const DropsBarChart_old = ({ fill, reason }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/motivo/' + reason, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',}
        }).then(response => {
            response.json().then(data => {
                if (response.ok) {
                    if (data.success) {
                        // Ordenar os valores por dataKey em ordem crescente
                        data.response.sort((a, b) => a["ano"] - b["ano"]);
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
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill={fill} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DropsBarChart_old;
