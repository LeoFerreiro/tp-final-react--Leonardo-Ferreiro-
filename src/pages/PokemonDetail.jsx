import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchPokemonDetail,
  clearSelectedPokemon,
  toggleFavorite,
} from "../store/pokemonSlice.js";
import "../styles/detail.css";

export default function PokemonDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: pokemon, loading, favorites } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemonDetail(id));
    return () => dispatch(clearSelectedPokemon());
  }, [dispatch, id]);

  if (loading || !pokemon)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando Pokémon...</p>;

  const isFavorite = favorites.some((p) => p.name === pokemon.name);

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.toUpperCase()}</h1>
      <button
        className={`fav-btn ${isFavorite ? "active" : ""}`}
        onClick={() => dispatch(toggleFavorite(pokemon.name))}
      >
        ⭐ {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
      </button>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="200"
        height="200"
      />
      <div className="pokemon-info">
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
      </div>
      <Link to="/pokemons" className="back-btn">← Volver al listado</Link>
    </div>
  );
}