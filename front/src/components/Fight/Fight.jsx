import React, { useState, useEffect, useContext } from "react";
import {
  PlayersList,
  PlayerListHeader,
  Player,
  RoundWrapper,
  RoundHeader,
  RoundDescription,
  PokemonImagesWrapper,
  PokemonImage,
  Pokemon,
  PokemonName,
  BattleLogWrapper,
  NextFightButton,
} from "./Fight.styled";
import PokemonImg from "./images/7.png";
import Button from "@mui/material/Button";
import { PokemonContext } from "../../providers/PokemonProvider";

function Fight() {
  const [battleLog, setBattleLog] = useState([]);
  const [inBattle, setInBattle] = useState(false);
  const [displayedElements, setDisplayedElements] = useState([]);
  const [actualLog, setActualLog] = useState("");
  const [players, setPlayers] = useState([]);
  const { user, getWinsAndLoses, channel } = useContext(PokemonContext);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    getPokemonList();
    fetchActivePlayersCount();
  }, []);

  const fetchActivePlayersCount = () => {
    fetch(`${channel}/api/game/activePlayers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error(error));
  };

  const handleAttack = (defenderId) => {
    fetch(`${channel}/api/game/attack/${defenderId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) alert(data?.message);
        else {
          // getLogs(data);
          setBattleLog(data);
          setInBattle(true);
          getWinsAndLoses();
        }
      })
      .catch((error) => console.error(error));
  };

  const getPokemonList = () => {
    fetch(`${channel}/api/game/pokemonList`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data);
      })
      .catch((error) => console.error(error));
  };

  const nextFigth = () => {
    setDisplayedElements([]);
    setInBattle(false);
  };

  useEffect(() => {
    const displayArrayWithDelay = () => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setDisplayedElements((prevElements) => [...prevElements, battleLog[currentIndex]]);
        currentIndex++;

        if (currentIndex === battleLog.length) {
          clearInterval(intervalId);
        }
      }, 1000);
    };
    if (battleLog.length > 0) displayArrayWithDelay();
  }, [battleLog]);

  return (
    <div>
      {inBattle ? (
        <>
          {/* <PokemonImagesWrapper>
            <Pokemon>
              <PokemonImage src={PokemonImg} />
              <PokemonName>Squirtle</PokemonName>
            </Pokemon>

            <Pokemon>
              <PokemonImage src={PokemonImg} />
              <PokemonName>Squirtle</PokemonName>
            </Pokemon>
          </PokemonImagesWrapper> */}
          <BattleLogWrapper>
            {displayedElements?.map((log, index) => (
              <RoundWrapper key={index}>
                <RoundHeader>Runda {index + 1}</RoundHeader>
                <RoundDescription>{log}</RoundDescription>
              </RoundWrapper>
            ))}
            {displayedElements.length >= battleLog.length ? <NextFightButton onClick={() => nextFigth()}>Następna walka</NextFightButton> : null}
          </BattleLogWrapper>
        </>
      ) : (
        <PlayersList>
          <PlayerListHeader>Lista graczy</PlayerListHeader>
          {players?.length == 0 ? <p>Wcztywanie...</p> : null}
          {players?.map((player, id) => {
            return (
              <Player key={id} onClick={() => handleAttack(player?.id)}>
                {player?.username}
              </Player>
            );
          })}
        </PlayersList>
      )}
    </div>
  );
}

export default Fight;
