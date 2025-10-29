import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, fetchPokemonDetail } from "../store/pokemonSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../styles/list.css";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando Pokémon...</p>;

  return (
    <div className="pokemon-list">
      {list.map((p, index) => (
        <Link
          key={p.name}
          to={`/pokemon/${p.name}`}
          onClick={() => dispatch(fetchPokemonDetail(p.name))} // <--- fetch del detalle
          className="pokemon-card"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            alt={p.name}
          />
          <h3>{p.name.toUpperCase()}</h3>
        </Link>
      ))}
    </div>
  );
}