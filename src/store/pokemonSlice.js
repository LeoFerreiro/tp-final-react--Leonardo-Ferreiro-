import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Async Thunks ---
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
    const data = await res.json();
    return data.results;
  }
);

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    return await res.json();
  }
);

// --- Helpers ---
const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// --- Slice ---
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    selected: null,
    favorites: loadFavorites(), // 🧠 carga desde localStorage
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPokemon: (state) => {
      state.selected = null;
    },

    toggleFavorite: (state, action) => {
      const name = action.payload;
      const exists = state.favorites.find((p) => p.name === name);

      if (exists) {
        state.favorites = state.favorites.filter((p) => p.name !== name);
      } else {
        const fromList = state.list.find((p) => p.name === name);
        if (fromList) {
          state.favorites.push({ name: fromList.name });
        } else if (state.selected && state.selected.name === name) {
          state.favorites.push({ name: state.selected.name });
        }
      }

      // 🧠 Guarda automáticamente en localStorage
      saveFavorites(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedPokemon, toggleFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;