import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";

const usePokemon = (pokemonName: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonName) return;

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

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

    fetchPokemon();
  }, [pokemonName]);

  return { pokemon, loading, error };
};

export default usePokemon;
