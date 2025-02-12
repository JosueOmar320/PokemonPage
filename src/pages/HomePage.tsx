import {
  Box,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import usePokemon from "../hooks/usePokemon";
import usePokemonList from "../hooks/usePokemonList";

const HomePage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const { pokemon, fetchPokemon, loading, error, setPokemon } = usePokemon();
  const { pokemonList, fetchPokemonList } = usePokemonList();

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (pokemonName) {
        fetchPokemon(pokemonName);
      } else {
        setPokemon(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [pokemonName, fetchPokemon, setPokemon]);

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
            fetchPokemon(event.target.value);
            if (event.target.value == "") {
              setPokemon(null);
            }
          }}
          sx={{ width: "70%" }}
        />
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
};

export default HomePage;
