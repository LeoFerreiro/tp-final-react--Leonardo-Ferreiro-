import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PokemonDetail() {
  const { id } = useParams();
  const selected = useSelector((state) => state.pokemon.selected);
  const [pokemon, setPokemon] = useState(selected);
  const [loading, setLoading] = useState(!selected);

  useEffect(() => {
    if (!selected) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        });
    }
  }, [id, selected]);

  if (loading) return <p>Cargando Pokémon...</p>;
  if (!pokemon) return <p>No se encontró el Pokémon.</p>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
      <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
      <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
      <Link to="/pokemons">← Volver al listado</Link>
    </div>
  );
}