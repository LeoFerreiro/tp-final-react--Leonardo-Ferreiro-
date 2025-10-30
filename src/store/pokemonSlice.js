import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- Asynchronous fetchers ---
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

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    selected: null,
    favorites: [], // 🆕 nuevo estado
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPokemon: (state) => {
      state.selected = null;
    },

    // 🆕 Agregar o quitar de favoritos
    toggleFavorite: (state, action) => {
      const name = action.payload;
      const exists = state.favorites.find((p) => p.name === name);

      if (exists) {
        state.favorites = state.favorites.filter((p) => p.name !== name);
      } else {
        const fromList = state.list.find((p) => p.name === name);
        if (fromList) {
          // Si viene del listado
          state.favorites.push({ ...fromList });
        } else if (state.selected && state.selected.name === name) {
          // Si viene del detalle
          state.favorites.push({
            name: state.selected.name,
            id: state.selected.id,
            sprites: state.selected.sprites,
          });
        }
      }
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