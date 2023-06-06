import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/login/Login';
import CreateAccount from "./components/login/CreateAccount";
import ProposalList from "./components/proposals/ProposalList";
import HomePage from "./components/home/HomePage";
import {AuthProvider} from './components/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import PassRecovery from './components/PassRecovery';
import NotFound from "./components/NotFound";
import Composition from "./components/proposals/composition/Composition";
import TransplantKpiChart from "./components/kpi/TransplantKpiChart";
import WaitingTimeKpiChart from "./components/kpi/WaitingTimeKpiChart";
import DropKpiChart from "./components/kpi/DropKpiChart";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/create-account" element={<CreateAccount/>}/>
                    <Route exact path='/' element={<ProtectedRoute/>}>
                        <Route exact path='/' element={<HomePage/>}/>
                    </Route>
                    <Route exact path='/homepage' element={<ProtectedRoute/>}>
                        <Route exact path='/homepage' element={<HomePage/>}/>
                    </Route>
                    <Route exact path='/proposals' element={<ProtectedRoute/>}>
                        <Route exact path='/proposals' element={<ProposalList/>}/>
                    </Route>
                    <Route exact path='/transplantKpiChart' element={<ProtectedRoute/>}>
                        <Route exact path='/transplantKpiChart' element={<TransplantKpiChart/>}/>
                    </Route>
                    <Route exact path='/waitingTimeKpiChart' element={<ProtectedRoute/>}>
                        <Route exact path='/waitingTimeKpiChart' element={<WaitingTimeKpiChart/>}/>
                    </Route>
                    <Route exact path='/dropKpiChart' element={<ProtectedRoute/>}>
                        <Route exact path='/dropKpiChart' element={<DropKpiChart/>}/>
                    </Route>
                    <Route path="/passrecovery" element={<PassRecovery/>}/>
                    <Route path='/composition' element={<ProtectedRoute/>}>
                        <Route exact path='/composition' element={<Composition/>}/>
                        <Route path="/composition/:proposal_id" element={<Composition/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

