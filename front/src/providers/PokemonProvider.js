import { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext(undefined);

const PokemonProvider = (props) => {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ file: PokemonProvider.js:7 ~ PokemonProvider ~ user:", user);

  const [team, setTeam] = useState([]);
  // const [playerPokemonsIds, setPlayerPokemonsIds] = useState([]);

  const [newTeam, setNewTeam] = useState([]);

  useEffect(() => {
    setNewTeam(team);
  }, [team]);

  useEffect(() => {
    getPlayerPokemons();
  }, [user]);

  const getPlayerPokemons = () => {
    fetch(`http://localhost:8080/api/game/playerPokemons`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: PokemonProvider.js:39 ~ .then ~ data:", data);
        if (data?.error) {
        } else {
          setTeam(data);
        }

        // let ids = [];
        // for (let i = 0; i < data.length; i++) {
        //   ids.push(data[i].id);
        // }
        // setPlayerPokemonsIds(ids);
      })
      .catch((error) => console.error(error));
  };

  const setPokemons = () => {
    let pokemonsIds = [newTeam[0].id, newTeam[1].id, newTeam[2].id, newTeam[3].id];

    fetch(`http://localhost:8080/api/game/setPokemons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonsIds),
    })
      .then((response) => getPlayerPokemons())
      .then((data) => {})
      .catch((error) => console.error(error));
  };

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
    setPokemons: setPokemons,
  };

  return <PokemonContext.Provider value={providerData}>{props.children}</PokemonContext.Provider>;
};

export default PokemonProvider;
