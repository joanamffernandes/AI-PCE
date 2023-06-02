import React, { useState } from 'react';
import SideBar from './SideBar';
import ProposalList from '../proposals/ProposalList';
import KpiChart from '../kpi/KpiChart';

function HomePage() {
    const [activePage, setActivePage] = useState('proposals');

    const handleListProposalsClick = () => {
        setActivePage('proposals');
    };

    const handleKpiClick = () => {
        setActivePage('kpi');
    };

    const handleLogoutClick = () => {
        // implementar lógica de logout aqui
    };

    let content;
    if (activePage === 'proposals') {
        content = <ProposalList />;
    } else if (activePage === 'kpi') {
        content = <KpiChart />;
    }

    return (
        <div className="page">
            <SideBar
                onListProposalsClick={handleListProposalsClick}
                onKpiClick={handleKpiClick}
                onLogoutClick={handleLogoutClick}
            />
            <div className="content">{content}</div>
        </div>
    );
}

export default HomePage;
