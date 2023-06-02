import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/login/Login';
import Home from "./components/home/Home";
import HomePage from "./components/home/HomePage";
import {AuthProvider} from './components/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import PassRecovery from './components/PassRecovery';
import NotFound from "./components/NotFound";
import Composition from "./components/composition/Composition";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route exact path='/' element={<ProtectedRoute/>}>
                        <Route exact path='/' element={<Home/>}/>
                    </Route>
                    <Route exact path='/home' element={<ProtectedRoute/>}>
                        <Route exact path='/home' element={<Home/>}/>
                    </Route>
                    <Route exact path='/homepage' element={<ProtectedRoute/>}>
                        <Route exact path='/homepage' element={<HomePage/>}/>
                    </Route>
                    <Route path="/passrecovery" element={<PassRecovery/>}/>
                    <Route path='/composition' element={<ProtectedRoute/>}>
                        <Route exact path='/composition' element={<Composition/>}/>
                        <Route path="/composition/:proposal_id" element={<Composition />} />
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

