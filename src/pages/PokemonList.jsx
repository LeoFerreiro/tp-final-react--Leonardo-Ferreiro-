import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, toggleFavorite } from "../store/pokemonSlice";
import { Link } from "react-router-dom";
import "../styles/list.css";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { list, loading, favorites } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando Pokémon...</p>;

  const isFavorite = (name) => favorites.some((p) => p.name === name);

  return (
    <div className="pokemon-list">
      {list.map((p, index) => (
        <div key={p.name} className="pokemon-card">
          <Link to={`/pokemon/${p.name}`}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={p.name}
            />
            <h3>{p.name.toUpperCase()}</h3>
          </Link>
          <button
            className={`fav-btn ${isFavorite(p.name) ? "active" : ""}`}
            onClick={() => dispatch(toggleFavorite(p.name))}
          >
            ⭐
          </button>
        </div>
      ))}
    </div>
  );
}