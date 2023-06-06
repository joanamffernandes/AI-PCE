import React from 'react';
import { FaList, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SideBar.css';

function SideBar({ handleSetActivePage, handleLogoutClick }) {
    const handleClickProposals = () => {
        handleSetActivePage('proposals');
    };

    const handleClickTransplantKpi = () => {
        handleSetActivePage('transplantKpi');
    };

    const handleClickWaitingTimeKpi = () => {
        handleSetActivePage('waitingTimeKpi');
    };

    const handleClickDropKpi = () => {
        handleSetActivePage('dropKpi');
    };

    return (
        <div className="sidebar open">
            <div className="sidebar-heading border-bottom">
                <span className="sidebar-title">Transplante de Córnea</span>
            </div>
            <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle rounded collapsed" onClick={handleClickProposals}>
                        <FaList className="sidebar-icon" />
                        Propostas
                    </button>
                </li>
                <li className="mb-1">
                    <button
                        className="btn btn-toggle rounded collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#dashboard-collapse"
                        aria-expanded="false"
                    >
                        <FaChartBar className="sidebar-icon" />
                        KPI
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <button className="link-dark rounded" onClick={handleClickTransplantKpi}>
                                    Transplantes
                                </button>
                            </li>
                            <li>
                                <button className="link-dark rounded" onClick={handleClickWaitingTimeKpi}>
                                    Tempo de espera
                                </button>
                            </li>
                            <li>
                                <button className="link-dark rounded" onClick={handleClickDropKpi}>
                                    Motivos de Cancelamento
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle rounded collapsed" onClick={handleLogoutClick}>
            <span className="sidebar-icon">
              <FaSignOutAlt />
            </span>
                        <span className="sidebar-text">Sair</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
