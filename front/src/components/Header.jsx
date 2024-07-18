import  { useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Header.css";
import { logout} from "../Redux/authSlice"; 
import { useDispatch } from "react-redux";
export default function Header() {
  const dispatch = useDispatch();
  const hamburgerRef = useRef();
  const navMenuRef = useRef();

  function closeMenu() {
    hamburgerRef.current.classList.remove("active");
    navMenuRef.current.classList.remove("active");
  }

  
  
    
  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  function mobileMenu() {
    hamburgerRef.current.classList.toggle("active");
    navMenuRef.current.classList.toggle("active");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hamburgerRef]);

  return (
    <header className="header" ref={hamburgerRef}>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          WebDev.
        </Link>
        <ul className="nav-menu" ref={navMenuRef}>
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={closeMenu}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create-roles" className="nav-link" onClick={closeMenu}>
              Create Roles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Logout" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-link" onClick={closeMenu}>
              Get Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/nav4" className="nav-link">
              nav4
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/nav5" className="nav-link">
              nav5
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/nav6" className="nav-link">
              nav6
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/nav7" className="nav-link">
              nav7
            </Link>
          </li>
        </ul>
        <div className="hamburger" ref={hamburgerRef} onClick={mobileMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </nav>
    </header>
  );
}