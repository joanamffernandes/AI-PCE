import "./NotFound.css"
import {useNavigate} from "react-router-dom";


function NotFound() {

    const navigate = useNavigate();

    function handleHomePage() {
        navigate("/");
    }

    return (
        <div className="container mt-5 not-found-page ">
            <img className="icon" loading="lazy" src="/info_error.png" alt="Atenção"/>
            <div className="mt-4">
                <h1 className="h1">Diagnóstico: a página não existe.</h1>

                <p>Infelizmente não encontramos o conteúdo que procura.<br/>O nosso check-up indica que:</p>

                <ul style={{listStyleType: 'disc', paddingLeft: '40px'}}>
                    <li>A página pode ter sido entretanto removida;</li>
                    <li>O endereço URL pode estar incorreto.</li>
                </ul>

                <div className="mt-2">
                    <button className="btn btn-sm btn-link" style={{paddingLeft: '0px'}}
                            onClick={handleHomePage}>Ir para homepage
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
