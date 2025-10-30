import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const { favorites } = useSelector((state) => state.pokemon);

  return (
    <div className="home">
      <h1>Bienvenido al Pokédex</h1>
      <p>Seleccioná tus Pokémon favoritos 💫</p>

      <h2>⭐ Tus Pokémon Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tenés favoritos todavía.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((p, index) => (
            <Link key={p.name} to={`/pokemon/${p.name}`} className="fav-card">
              <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.name}.png`}
              alt={p.name}
              />
              <p>{p.name.toUpperCase()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}