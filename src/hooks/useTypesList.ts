import { useState } from "react";
import TypePokemon from "../types/TypePokemon";

const useTypesList = () => {
  const [typesPokemon, setTypesPokemon] = useState<TypePokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const FetchPokemonTypes = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/type/");

      if (!response.ok) throw new Error("Error al obtener la lista de Pokémon");

      const data = await response.json();

      const detailedPokemonTypeList: TypePokemon[] = await Promise.all(
        data.results.map(async (p: { name: string; url: string }) => {
          const pokemonResponse = await fetch(p.url);
          return pokemonResponse.json();
        })
      );

      setTypesPokemon(detailedPokemonTypeList);
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };
  return { FetchPokemonTypes, typesPokemon, error, loading };
};

export default useTypesList;
