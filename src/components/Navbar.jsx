import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">PokéApp</h1>
      <ul className="nav-links">
        <li><NavLink to="/" className="link">Inicio</NavLink></li>
        <li><NavLink to="/pokemons" className="link">Pokémons</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;