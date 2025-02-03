import { useState } from "react";
import { Pokemon } from "../types/Pokemon";

const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (pokemonName: string) => {
    setError(null);
    if (!pokemonName) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Pokémon no encontrado");

      const data: Pokemon = await response.json();
      setPokemon(data);
    } catch (err) {
      setError((err as Error).message);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, fetchPokemon, loading, error, setPokemon };
};

export default usePokemon;
