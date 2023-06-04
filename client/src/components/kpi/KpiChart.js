import React from 'react';
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Line, LineChart } from 'recharts';
import "./KpiChart.css";

function KpiChart() {
  const diagnosisData = [
    { name: 'DALK', value: 20 },
    { name: 'DSAEK', value: 30 },
    { name: 'DMEK', value: 50 },
    { name: 'BOWMAN', value: 40 },
  ];

  const colorPalette = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];

  const diagnosisBarData = [
    { name: 'Diagnosis 1', value: 15 },
    { name: 'Diagnosis 2', value: 25 },
    { name: 'Diagnosis 3', value: 35 },
    { name: 'Diagnosis 4', value: 45 },
    { name: 'Diagnosis 5', value: 55 },
    { name: 'Diagnosis 6', value: 65 },
    { name: 'Diagnosis 7', value: 75 },
    { name: 'Diagnosis 8', value: 85 },
    { name: 'Diagnosis 9', value: 95 },
    { name: 'Diagnosis 10', value: 105 },
    { name: 'Diagnosis 11', value: 115 },
  ];

  const lateralityData = [
    { laterality: 'Right Eye', value: 50 },
    { laterality: 'Left Eye', value: 70 },
  ];

  const averageWaitingTimeThisYearData = [
    { month: 'January', avgWaitingTime: 10 },
    { month: 'February', avgWaitingTime: 15 },
    { month: 'March', avgWaitingTime: 12 },
    { month: 'April', avgWaitingTime: 15 },
    { month: 'May', avgWaitingTime: 9 },
  ];

  const averageWaitingTimeByMonthData = [
    { month: 'January', avgWaitingTime: 10 },
    { month: 'February', avgWaitingTime: 15 },
    { month: 'March', avgWaitingTime: 12 },
    { month: 'April', avgWaitingTime: 15 },
    { month: 'May', avgWaitingTime: 9 },
    { month: 'June', avgWaitingTime: 10 },
    { month: 'July', avgWaitingTime: 15 },
    { month: 'August', avgWaitingTime: 12 },
    { month: 'September', avgWaitingTime: 15 },
    { month: 'October', avgWaitingTime: 9 },
    { month: 'November', avgWaitingTime: 10 },
    { month: 'December', avgWaitingTime: 15 },
  ];

  const averageWaitingTimeByYearData = [
    { year: '2015', avgWaitingTime: 10 },
    { year: '2016', avgWaitingTime: 15 },
    { year: '2017', avgWaitingTime: 12 },
    { year: '2018', avgWaitingTime: 15 },
    { year: '2019', avgWaitingTime: 9 },
    { year: '2020', avgWaitingTime: 10 },
    { year: '2021', avgWaitingTime: 15 },
    { year: '2022', avgWaitingTime: 12 },
    { year: '2023', avgWaitingTime: 15 },
  ];

  const dropoutsByYear = [
    { year: '2015', dropouts: 10 },
    { year: '2016', dropouts: 15 },
    { year: '2017', dropouts: 12 },
    { year: '2018', dropouts: 15 },
    { year: '2019', dropouts: 9 },
    { year: '2020', dropouts: 10 },
    { year: '2021', dropouts: 15 },
    { year: '2022', dropouts: 12 },
    { year: '2023', dropouts: 15 },
  ];

  const dropoutsByMonth = [
    { month: 'January', dropouts: 10 },
    { month: 'February', dropouts: 15 },
    { month: 'March', dropouts: 12 },
    { month: 'April', dropouts: 15 },
    { month: 'May', dropouts: 9 },
    { month: 'June', dropouts: 10 },
    { month: 'July', dropouts: 15 },
    { month: 'August', dropouts: 12 },
    { month: 'September', dropouts: 15 },
    { month: 'October', dropouts: 9 },
    { month: 'November', dropouts: 10 },
    { month: 'December', dropouts: 15 },
  ];

  const patientData = [
    { patientId: 1, age: 35 },
    { patientId: 2, age: 42 },
    { patientId: 3, age: 28 },
    { patientId: 4, age: 79 },
    { patientId: 5, age: 70 },
    { patientId: 6, age: 70 },
  ];

  const countData = {};
  patientData.forEach((surgery) => {
    const { age } = surgery;
    if (countData[age]) {
      countData[age] += 1;
    } else {
      countData[age] = 1;
    }
  });

  const chartData = Object.keys(countData).map((age) => ({
    age: parseInt(age),
    occurrences: countData[age],
  }));

  return (
    <div>
      <h1 className='h1'> KPI Dashboard </h1>
      <div className="kpi-container">
        <div className="kpi-chart card">
          <div className="card-body">
            <h5 className="kpi-title">Number of Transplants by Procedure</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={diagnosisData}
                  label
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={index} fill={colorPalette[index % colorPalette.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card">
          <div className="card-body">
            <h5 className="kpi-title">Number of Transplants by Eye Laterality</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={lateralityData}
                  innerRadius="50%"
                  outerRadius="100%"
                  startAngle={180}
                  endAngle={0}
                  label
                >
                  {lateralityData.map((entry, index) => (
                    <Cell key={index} fill={colorPalette[index]} name={entry.laterality} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card full-width">
          <div className="card-body">
            <h5 className="kpi-title">Number of Transplants by Diagnosis</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diagnosisBarData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey="name" type="category" width={120} />
                <XAxis type="number" />
                <Tooltip />
                <Bar dataKey="value" fill={colorPalette[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card">
          <div className="card-body">
            <h5 className="kpi-title">Average Waiting Time By Year </h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={averageWaitingTimeByYearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgWaitingTime" stroke="#003f5c" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card">
          <div className="card-body">
            <h5 className="kpi-title">Average Waiting Time By Month </h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={averageWaitingTimeByMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgWaitingTime" stroke="#7a5195" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card full-width">
          <div className="card-body">
            <h5 className="kpi-title">Average Waiting Time This Year</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={averageWaitingTimeThisYearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgWaitingTime" stroke="#ffa600" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card">
          <div className="card-body">
            <h5 className="kpi-title">Number of Dropouts by Year</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dropoutsByYear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dropouts" fill={colorPalette[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card">
          <div className="card-body">
            <h5 className="kpi-title">Average Number of Dropouts by Month</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dropoutsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dropouts" fill={colorPalette[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="kpi-chart card full-width">
          <div className="card-body">
            <h5 className="kpi-title">Patient's age at time of cirurgy</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" type="number" label={{ value: 'Patient Age', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Occurrences', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="occurrences" stroke={colorPalette[0]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KpiChart;
