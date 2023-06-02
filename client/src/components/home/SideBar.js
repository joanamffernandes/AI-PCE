import React from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

function SideBar(props) {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/proposals">
                        <FaList /> Listagem de Propostas
                    </Link>
                </li>
                <li>
                    <Link to="/kpis">
                        <FaChartBar /> KPIs
                    </Link>
                </li>
            </ul>
            <div>
                <Link to="/logout">
                    <FaSignOutAlt /> Logout
                </Link>
            </div>
        </div>
    );
}
export default SideBar;
