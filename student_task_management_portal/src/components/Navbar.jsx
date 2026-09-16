import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="brand">
                <div className="brand-mark">S</div>
                <h2>Student Task Portal</h2>
            </div>
            <div className="nav-links">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;