import { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext(undefined);

const PokemonProvider = (props) => {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ file: PokemonProvider.js:7 ~ PokemonProvider ~ user:", user);
  // const [pokemonDetails, setPokemonDetails] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(JSON.parse(loggedInUser));
  }, []);

  const providerData = { user: user, setUser: setUser };

  return <PokemonContext.Provider value={providerData}>{props.children}</PokemonContext.Provider>;
};

export default PokemonProvider;
