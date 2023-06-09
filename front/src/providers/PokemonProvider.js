import { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext(undefined);

const PokemonProvider = (props) => {
  const [user, setUser] = useState(null);
  const channel = JSON.parse(localStorage.getItem("channel"));
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [team, setTeam] = useState([]);
  const [newTeam, setNewTeam] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(JSON.parse(loggedInUser));
  }, []);

  useEffect(() => {
    setNewTeam(team);
  }, [team]);

  useEffect(() => {
    if (user?.username) {
      getWinsAndLoses();
      getPlayerPokemons();
    }
  }, [user]);

  const getPlayerPokemons = () => {
    fetch(`${channel}/api/game/playerPokemons`, {
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
      })
      .catch((error) => console.error(error));
  };

  const getWinsAndLoses = () => {
    fetch(`${channel}/api/game/getWinsAndLoses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
        } else {
          setWins(data[0]);
          setLoses(data[1]);
        }
      })
      .catch((error) => console.error(error));
  };

  const setPokemons = () => {
    let pokemonsIds = [newTeam[0].id, newTeam[1].id, newTeam[2].id, newTeam[3].id];

    fetch(`${channel}/api/game/setPokemons`, {
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

  const eventSource = new EventSource(`${channel}/api/game/chat`);
  const chatMessagesElement = document.getElementById("chat-messages");
  eventSource.addEventListener("message", function (event) {
    const message = event.data;
    const time = message.split(" | ")[0];
    const playerName = message.split(" | ")[1].split(":")[0].trim();
    let msgValue = "";
    if (message.includes("Zalogowano") || message.includes("Wylogowano")) {
      msgValue = message.split(" : ")[1];
    } else {
      msgValue = message.split(`":"`)[1] ? message.split(`":"`)[1].split(`"}`)[0] : "";
    }

    const messageItem = document.createElement("li");
    messageItem.textContent = `(${time}) ${playerName}:${msgValue}`;
    chatMessagesElement?.appendChild(messageItem);
  });

  const providerData = {
    user: user,
    setUser: setUser,
    team: team,
    setTeam: setTeam,
    newTeam: newTeam,
    setNewTeam: setNewTeam,
    setPokemons: setPokemons,
    wins: wins,
    loses: loses,
    getWinsAndLoses: getWinsAndLoses,
    channel: channel,
    messages: messages,
    setMessages: setMessages,
  };

  return <PokemonContext.Provider value={providerData}>{props.children}</PokemonContext.Provider>;
};

export default PokemonProvider;
