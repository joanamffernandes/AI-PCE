import React from 'react';
import "./KpiChart.css";
import WaitingTimeLineChart from "./waiting/WaitingTimeLineChart";
import WaitingTimeWithAnesthesiaBarChart from "./waiting/WaitingTimeWithAnesthesiaBarChart";
import WaitingTimeDiagnosticBarChart from "./waiting/WaitingTimeDiagnosticBarChart";

function WaitingTimeKpiChart() {


    const colorPalette = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];
    const aColorPalette = ['#3d6098', '#6098cf'];

    return (
        <div>
            <h1 className='h1'> KPIs - Tempo de Espera </h1>
            <div className="kpi-container">
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Tempo Médio de Espera por Ano (em dias)</h5>
                        <WaitingTimeLineChart dataKey="ano" stroke="#003f5c" sortData={true}/>
                    </div>
                </div>
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Tempo Médio de Espera por Mês (em dias)</h5>
                        <WaitingTimeLineChart dataKey="mes" stroke="#7a5195" sortData={false}/>
                    </div>
                </div>
                <div className="kpi-chart card full-width">
                    <div className="card-body">
                        <h5 className="kpi-title">Tempo Médio de Espera por Tipo de Diagnóstico com Anestesia (em
                            dias)</h5>
                        <WaitingTimeWithAnesthesiaBarChart colorPalette={colorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card full-width">
                    <div className="card-body">
                        <h5 className="kpi-title">Tempo Médio de Espera por Tipo de Diagnóstico (em dias)</h5>
                        <WaitingTimeDiagnosticBarChart colorPalette={colorPalette}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitingTimeKpiChart;
