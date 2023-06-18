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
  const [battleLog, setBattleLog] = useState([
    "Pokemon: Psyduck gracza: a zadał 32 punktów obrażeń pokemonowi Bulbasaur gracza b",
    "Pokemon: Bulbasaur gracza: b został wyeliminowany",
    "Pokemon: Charmander gracza: b wchodzi do walki",
    "Wygrał gracz: a",
  ]);
  const [inBattle, setInBattle] = useState(false);
  const [players, setPlayers] = useState([]);
  const { user, getWinsAndLoses } = useContext(PokemonContext);

  useEffect(() => {
    fetchActivePlayersCount();
  }, []);

  const fetchActivePlayersCount = () => {
    fetch(`http://localhost:8080/api/game/activePlayers`, {
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
    fetch(`http://localhost:8080/api/game/attack/${defenderId}`, {
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
          setBattleLog(data);
          setInBattle(true);
          getWinsAndLoses();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {inBattle ? (
        <>
          <PokemonImagesWrapper>
            <Pokemon>
              <PokemonImage src={PokemonImg} />
              <PokemonName>Squirtle</PokemonName>
            </Pokemon>

            <Pokemon>
              <PokemonImage src={PokemonImg} />
              <PokemonName>Squirtle</PokemonName>
            </Pokemon>
          </PokemonImagesWrapper>
          <BattleLogWrapper>
            {battleLog?.map((log, index) => (
              <RoundWrapper key={index}>
                <RoundHeader>Runda {index + 1}</RoundHeader>
                <RoundDescription>{log}</RoundDescription>
              </RoundWrapper>
            ))}
            <NextFightButton onClick={() => setInBattle(false)}>Następna walka</NextFightButton>
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
