import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import PokemonList from "./pages/PokemonList.jsx";
import PokemonDetail from "./pages/PokemonDetail.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
      </div>
    </>
  );
}

export default App;