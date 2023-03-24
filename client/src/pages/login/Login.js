import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
import './Login.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    // const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/users/check-user', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) {
                setErrorMessage();
                alert('Autenticação bem-sucedida!');
                navigate("/home");
                // history.push('/home');
            } else {
                response.json().then(json => {
                    setErrorMessage(json.message);
                });
            }
        }).catch(error => {
            setErrorMessage('Ocorreu um erro no processo de autenticação!');
            console.log(error.message)
        });
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-4 login-title">Transplante da Córnea</h1>
            <div className="row mt-5">
                <div className="col-sm-8 col-md-6 col-lg-4">
                    <form className="bg-light p-4 shadow rounded" onSubmit={handleSubmit}>
                        <h4 className="text-center mb-4">Iniciar Sessão</h4>

                        {errorMessage && <div className="my-3 text-danger text-center">{errorMessage}</div>}

                        <div className="form-group">
                            <label htmlFor="username">Utilizador</label>
                            <input type="username" className="form-control" id="login-username"
                                   name="username"
                                   value={username} onChange={(event) => setUsername(event.target.value)} required/>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="password">Password</label>
                            <small className="float-end">
                                <button type="submit" className="btn btn-sm btn-link login-link-font">Recuperar
                                    Password
                                </button>
                            </small>
                            <input type="password" className="form-control" id="login-password"
                                   name="password"
                                   value={password} onChange={(event) => setPassword(event.target.value)} required/>
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary col-12 my-2">Entrar</button>
                        <div className="form-group">
                            <small>
                                <button type="submit" className="btn btn-sm btn-link login-link-font">Criar conta
                                </button>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
