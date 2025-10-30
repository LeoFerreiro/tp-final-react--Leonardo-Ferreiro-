import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, addFavorite, removeFavorite } from "../store/pokemonSlice.js";
import { Link } from "react-router-dom";
import "../styles/list.css";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { pokemons, favorites, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const isFavorite = (name) => favorites.some((f) => f.name === name);

  const handleFavorite = (pokemon, index) => {
    const id = index + 1;
    if (isFavorite(pokemon.name)) {
      dispatch(removeFavorite(pokemon.name));
    } else {
      dispatch(addFavorite({ name: pokemon.name, id }));
    }
  };

  if (loading) return <p>Cargando Pokémon...</p>;
  if (!pokemons.length) return <p>No se pudieron cargar los Pokémon 😕</p>;

  return (
    <div className="list-container">
  <h2>Lista de Pokémon</h2>

  {/* Grid que envuelve TODAS las tarjetas */}
  <div className="pokemon-grid">
    {pokemons.map((pokemon, index) => (
      <div key={pokemon.name} className="pokemon-card">
        <Link to={`/pokemon/${pokemon.name}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            alt={pokemon.name}
          />
        </Link>
        <p>{pokemon.name.toUpperCase()}</p>
        <button
          className={`fav-btn ${favorites.some(f => f.name === pokemon.name) ? "active" : ""}`}
          onClick={() => handleFavorite(pokemon, index)}
        >
          {favorites.some(f => f.name === pokemon.name) ? "★ Quitar" : "☆ Favorito"}
        </button>
      </div>
    ))}
  </div>
</div>
  );
}