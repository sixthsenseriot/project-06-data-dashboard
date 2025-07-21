import { Link } from "react-router-dom";
import "./SideNavBar.css";

const SideNavBar = () => {
    return (
        <div className="SideNavBar">
            <h1 className="page-header">Yommers</h1>
            <Link to="/" className="nav-link">
                Dashboard
            </Link>
            <Link to="/about" className="nav-link">
                About
            </Link>
        </div>
    );
};

export default SideNavBar;
