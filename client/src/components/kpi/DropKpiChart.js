import React from 'react';
import "./KpiChart.css";
import DropsBarChart from "./drops/DropsBarChart";
import DropsDiagnosticBarChart from "./drops/DropsDiagnosticBarChart";

function DropKpiChart() {

    const colorPalette = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];

    return (
        <div>
            <h1 className='h1'> KPIs - Motivos de Cancelamento </h1>
            <div className="kpi-container">
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Transplantes não realizados por Ano</h5>
                        <DropsBarChart colorPalette={colorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Desistências por Diagnostico</h5>
                        <DropsDiagnosticBarChart fill={colorPalette[0]}/>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default DropKpiChart;
