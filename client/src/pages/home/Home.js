import './Home.css';
import {useAuth} from "../AuthContext";

function Home() {
    const {logout} = useAuth();

    function handleLogout() {
        logout();
    }

    return (
        <div className="mt-5 mx-3">
            <h1>Home</h1>
            <button className="btn btn-sm btn-link" style={{paddingLeft: '0px'}} onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
