import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users/create-account', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage("");
                setSuccessMessage('Conta criada com sucesso! A redirecionar para o login...');

                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Aguarda 2 segundos antes de navegar para o login
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage('Ocorreu um erro no processo de criação da conta!');
            console.log(error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-4">
                        <h1 className="display-4 mb-4 login-title">Criar conta</h1>
                        {errorMessage && <p className="my-3 text-danger">{errorMessage}</p>}
                        {successMessage && <p className="my-3 text-success">{successMessage}</p>}
                        <form className="mt-2 bg-light p-4 shadow rounded" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Utilizador</label>
                                <input type="text" className="form-control" id="username" value={username}
                                       onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">Primeiro nome</label>
                                <input type="text" className="form-control" id="first_name" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Último nome</label>
                                <input type="text" className="form-control" id="last_name" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={password}
                                       onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Criar conta</button>
                        </form>
                        <p className="mt-3">Já tem uma conta? <Link to="/login" className="btn-link">Faça login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
