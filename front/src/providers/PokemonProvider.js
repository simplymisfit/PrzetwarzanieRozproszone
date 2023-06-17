import { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext(undefined);

const PokemonProvider = (props) => {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ file: PokemonProvider.js:7 ~ PokemonProvider ~ user:", user);
  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Bulbasaur",
    },
    {
      id: 2,
      name: "Charmander",
    },
    {
      id: 3,
      name: "Squirtle",
    },
    {
      id: 4,
      name: "Jigglypuff",
    },
  ]);
  const [newTeam, setNewTeam] = useState([]);

  useEffect(() => {
    setNewTeam(team);
  }, [team]);
  // const [firstPokemon, setFirstPokemon] = useState({});
  // const [secondPokemon, setSecondPokemon] = useState({});
  // const [thirdPokemon, setThirdPokemon] = useState({});
  // const [fourthPokemon, setFourthPokemon] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(JSON.parse(loggedInUser));
  }, []);

  const providerData = {
    user: user,
    setUser: setUser,
    team: team,
    setTeam: setTeam,
    newTeam: newTeam,
    setNewTeam: setNewTeam,
    // firstPokemon: firstPokemon,
    // setFirstPokemon: setFirstPokemon,
    // secondPokemon: secondPokemon,
    // setSecondPokemon: setSecondPokemon,
    // thirdPokemon: thirdPokemon,
    // setThirdPokemon: setThirdPokemon,
    // fourthPokemon: fourthPokemon,
    // setFourthPokemon: setFourthPokemon,
  };

  return <PokemonContext.Provider value={providerData}>{props.children}</PokemonContext.Provider>;
};

export default PokemonProvider;
