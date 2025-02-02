import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";
import usePokemon from "./hooks/usePokemon";
import usePokemonList from "./hooks/usePokemonList";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const { pokemon, fetchPokemon, loading, error } = usePokemon();
  const { pokemonList, fetchPokemonList } = usePokemonList();

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const clickSearch = () => {
    fetchPokemon(pokemonName);
  };

  return (
    <Box>
      <Grid2
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          label="Pokemon Name"
          name="pokemonName"
          value={pokemonName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPokemonName(event.target.value);
          }}
          sx={{ width: "70%" }}
        />
        <Button onClick={clickSearch} variant="contained" color="primary">
          search
        </Button>
      </Grid2>
      <Box mt={2}>
        <Grid2
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {loading && <CircularProgress />}

          {error && <Typography color="error">{error}</Typography>}

          {pokemon && <PokeCard pokemon={pokemon} />}

          {pokemonList.length > 0 &&
            !pokemonName &&
            pokemonList.map((pokemons) => {
              return <PokeCard pokemon={pokemons} />;
            })}
        </Grid2>
      </Box>
    </Box>
  );
}

export default App;
