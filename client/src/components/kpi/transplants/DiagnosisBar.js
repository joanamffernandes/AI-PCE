import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const DiagnosisBar = ({colorPalette}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kpis/transplantes/diagnostico', {
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
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} layout="vertical" margin={{top: 20, right: 30, left: 10, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <YAxis dataKey="diagnostico" interval={0} type="category" width={200}/>
                <XAxis type="number"/>
                <Tooltip/>
                <Bar dataKey="total_transplantes" fill={colorPalette[0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DiagnosisBar;
