import './Home.css';
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";

function Home() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
    }

    function handleComposition() {
        navigate("/composition");
    }

    return (
        <div className="mt-5 mx-3">
            <h1>Home</h1>
            <div className="mt-2">
                <button className="btn btn-sm btn-link" style={{paddingLeft: '0px'}} onClick={handleComposition}>Go to
                    Composition
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-sm btn-link" style={{paddingLeft: '0px'}} onClick={handleLogout}>Logout
                </button>
            </div>
        </div>
    );
}

export default Home;
