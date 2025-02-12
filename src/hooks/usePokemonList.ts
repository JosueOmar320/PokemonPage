import { useState } from "react";
import { Pokemon } from "../types/Pokemon";

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemonList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      if (!response.ok) throw new Error("Error al obtener la lista de Pokémon");

      const data = await response.json();

      const detailedPokemonList: Pokemon[] = await Promise.all(
        data.results.map(async (p: { name: string; url: string }) => {
          const pokemonResponse = await fetch(p.url);
          return pokemonResponse.json();
        })
      );

      setPokemonList(detailedPokemonList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setPokemonList([]);
      setError((error as Error).message);
    }
  };

  return { pokemonList, fetchPokemonList, loading, error };
};

export default usePokemonList;
