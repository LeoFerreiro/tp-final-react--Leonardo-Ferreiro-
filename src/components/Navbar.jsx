import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>PokéApp</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/pokemons">Pokémons</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;