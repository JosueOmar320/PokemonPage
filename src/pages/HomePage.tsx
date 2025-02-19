import {
  Box,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import PokeCard from "../components/PokeCard";
import usePokemon from "../hooks/usePokemon";
import usePokemonList from "../hooks/usePokemonList";
import useTypesList from "../hooks/useTypesList";

const HomePage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { pokemon, fetchPokemon, loading, error, setPokemon } = usePokemon();
  const { FetchPokemonTypes, typesPokemon } = useTypesList();
  const { pokemonList, fetchPokemonList } = usePokemonList();

  useEffect(() => {
    fetchPokemonList();
    FetchPokemonTypes();
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
  }, [pokemonName, setPokemon]);

  const filteredPokemonList = selectedType
    ? pokemonList.filter((poke) =>
        poke.types.some((t) => t.type.name === selectedType)
      )
    : pokemonList;

  return (
    <Box>
      <Grid2 container spacing={2} justifyContent="center">
        <TextField
          label="Pokemon Name"
          name="pokemonName"
          value={pokemonName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPokemonName(event.target.value);
            fetchPokemon(event.target.value);
            if (event.target.value === "") {
              setPokemon(null);
            }
          }}
          sx={{ width: "70%" }}
        />
      </Grid2>

      <Box mt={2}>
        <Grid2 container spacing={2} justifyContent="center">
          <FormControl sx={{ width: "70%" }}>
            <InputLabel>Filtrar por Tipo</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {typesPokemon.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Box>

      {/* Resultados */}
      <Box mt={4}>
        <Grid2 container spacing={2} justifyContent="center">
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {pokemon ? (
            <PokeCard pokemon={pokemon} />
          ) : (
            pokemonList.length > 0 &&
            !pokemonName &&
            filteredPokemonList.map((poke) => (
              <PokeCard key={poke.id} pokemon={poke} />
            ))
          )}
        </Grid2>
      </Box>
    </Box>
  );
};

export default HomePage;
