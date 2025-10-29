import "../styles/home.css";

function Home() {
  return (
    <section className="home fade-in">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt="PokéAPI"
        className="home-logo"
      />
      <h2>Bienvenido a la App de Pockemon</h2>
      <p>Explorá los pokemons y selecciona tus favoritos!!</p>
    </section>
  );
}

export default Home;