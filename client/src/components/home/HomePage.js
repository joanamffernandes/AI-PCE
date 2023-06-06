import React, {useState} from 'react';
import SideBar from './SideBar';
import ProposalList from '../proposals/ProposalList';
import TransplantKpiChart from '../kpi/TransplantKpiChart';
import WaitingTimeKpiChart from '../kpi/WaitingTimeKpiChart';
import DropKpiChart from '../kpi/DropKpiChart';
import {useAuth} from '../AuthContext';
import './HomePage.css';

function HomePage() {
    const [activePage, setActivePage] = useState('proposals');
    const {logout} = useAuth();

    const handleSetActivePage = (page) => {
        setActivePage(page);
    };

    let content;
    if (activePage === 'proposals') {
        content = <ProposalList/>;
    } else if (activePage === 'transplantKpi') {
        content = <TransplantKpiChart/>;
    } else if (activePage === 'waitingTimeKpi') {
        content = <WaitingTimeKpiChart/>;
    } else if (activePage === 'dropKpi') {
        content = <DropKpiChart/>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <SideBar handleSetActivePage={handleSetActivePage} handleLogoutClick={logout}/>
                </div>
                <div className="col-lg-10 content"> {content} </div>
            </div>
        </div>
    );
}

export default HomePage;
