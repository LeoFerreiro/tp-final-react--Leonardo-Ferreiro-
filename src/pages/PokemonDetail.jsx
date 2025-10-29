import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPokemonDetail, clearSelectedPokemon } from "../store/pokemonSlice";
import "../styles/detail.css";

export default function PokemonDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: pokemon, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (!pokemon || pokemon.name !== id) {
      dispatch(fetchPokemonDetail(id));
    }
    return () => dispatch(clearSelectedPokemon());
  }, [id, pokemon, dispatch]);

  if (loading || !pokemon) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando Pokémon...</p>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img
        src={pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default}
        alt={pokemon.name}
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