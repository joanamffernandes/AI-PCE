import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './pages/login/Login';
import Home from "./pages/home/Home";
import {AuthProvider} from './pages/AuthContext';
import ProtectedRoute from "./pages/ProtectedRoute";
import PassRecovery from './pages/PassRecovery';
import NotFound from "./pages/NotFound";

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
                    <Route path="/passrecovery" element={<PassRecovery/>}>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

