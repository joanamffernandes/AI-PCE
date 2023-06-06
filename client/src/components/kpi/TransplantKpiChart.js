import React from 'react';
import "./KpiChart.css";
import DiagnosisBar from "./transplants/DiagnosisBar";
import ProcedurePieChart from "./transplants/ProcedurePieChart";
import LateralityPieChart from "./transplants/LateralityPieChart";
import AgeLineChart from "./transplants/AgeLineChart";
import AnesthesiaPieChart from "./transplants/AnesthesiaPieChart";
import PriorityPieChart from "./transplants/PriorityPieChart";
import TransplantsOnHolidaysBarChart from "./transplants/TransplantsOnHolidaysBarChart";

function TransplantKpiChart() {


    const colorPalette = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];
    const pColorPalette = ['#003f5c', '#3d6098', '#6098cf'];
    const aColorPalette = ['#3d6098', '#6098cf'];

    return (
        <div>
            <h1 className='h1'> KPIs - Transplantes </h1>
            <div className="kpi-container">
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de Transplantes por Procedimento</h5>
                        <ProcedurePieChart colorPalette={colorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de Transplantes por Lateralidade</h5>
                        <LateralityPieChart colorPalette={colorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card full-width">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de Transplantes por Diagnóstico</h5>
                        <DiagnosisBar colorPalette={colorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card full-width">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de transplantes por idade</h5>
                        <AgeLineChart colorPalette={colorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de transplantes por Anestesia</h5>
                        <AnesthesiaPieChart colorPalette={aColorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de transplantes por Prioridade</h5>
                        <PriorityPieChart colorPalette={pColorPalette}/>
                    </div>
                </div>
                <div className="kpi-chart card full-width">
                    <div className="card-body">
                        <h5 className="kpi-title">Número de transplantes por ano realizados ao fim de semana ou feriado</h5>
                        <TransplantsOnHolidaysBarChart colorPalette={colorPalette}/>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TransplantKpiChart;
