import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PokemonDetail.css";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando detalle", err));
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!pokemon) return <p>No se encontró el Pokémon.</p>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />

      <div className="pokemon-info">
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p>
          <strong>Tipo:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>Habilidades:</strong>{" "}
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>

      <Link to="/pokemons" className="back-btn">← Volver al listado</Link>
    </div>
  );
}

export default PokemonDetail;