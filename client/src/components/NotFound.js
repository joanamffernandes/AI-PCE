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
                <div className="h1 title">Diagnosis: Page does not exist.</div>
                <p className="mb-0">Unfortunately, we couldn't find the content you're looking for.<br/>Our check-up
                    indicates that:</p>

                <div>
                    <ul style={{listStyleType: 'disc', paddingLeft: '40px'}}>
                        <li className="item">The page may have been removed in the meantime;</li>
                        <li className="item">The URL address may be incorrect.</li>
                    </ul>
                </div>

                <div className="mt-2">
                    <button className="btn btn-sm btn-link" style={{paddingLeft: '0px'}}
                            onClick={handleHomePage}>Homepage
                    </button>
                </div>
            </div>
        </div>

    );
}

export default NotFound;
