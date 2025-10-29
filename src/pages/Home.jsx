import "../styles/home.css";

function Home() {
  return (
    <section className="home fade-in">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt="PokéAPI"
        className="home-logo"
      />
      <h2>Bienvenido a la PokéApp</h2>
      <p>Explorá tus pokémons favoritos con un diseño moderno y fluido.</p>
    </section>
  );
}

export default Home;