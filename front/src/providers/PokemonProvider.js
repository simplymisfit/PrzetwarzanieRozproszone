import { createContext, useState } from "react";

export const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [pokemonDetails, setPokemonDetails] = useState();

  const providerData = [pokemonDetails, setPokemonDetails];

  return <PokemonContext.Provider value={providerData}>{props.children}</PokemonContext.Provider>;
};

export default PokemonProvider;
