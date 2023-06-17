import React, { useState, useContext } from "react";
import {
  TeamDescription,
  PokemonWrapper,
  PokemonImage,
  PokemonStats,
  PokemonName,
  ProgressBarWrapper,
  ProgressBarHP,
  ProgressBarEXP,
} from "./Team.styled";
import { RightItemWrapper, RightItemHeader } from "../Profile/Profile.styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Pokemon from "./images/pokemon.png";
import { PokemonContext } from "../../providers/PokemonProvider";

const Team = () => {
  const [isOpen, setOpen] = useState(true);
  const { team } = useContext(PokemonContext);
  console.log("🚀 ~ file: Team.jsx:21 ~ Team ~ team:", team);

  let pokemons = [
    { name: "Pikachu ", lvl: 10, hp: 2431, hpNeeded: 2700, exp: 10, expNeeded: 100 },
    { name: "Pikachu ", lvl: 11, hp: 2431, hpNeeded: 2700, exp: 1, expNeeded: 100 },
    { name: "Pikachu ", lvl: 12, hp: 100, hpNeeded: 2700, exp: 10, expNeeded: 100 },
    { name: "Pikachu ", lvl: 10, hp: 300, hpNeeded: 2700, exp: 56, expNeeded: 100 },
    { name: "Pikachu ", lvl: 15, hp: 1200, hpNeeded: 2700, exp: 10, expNeeded: 100 },
    { name: "Pikachu ", lvl: 10, hp: 1900, hpNeeded: 2700, exp: 31, expNeeded: 100 },
  ];

  return (
    <RightItemWrapper>
      <RightItemHeader isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span>Drużyna</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </RightItemHeader>
      {isOpen ? (
        <TeamDescription>
          {team?.map((pokemon, id) => {
            return (
              <PokemonWrapper key={id}>
                <PokemonImage src={pokemon.photoUrl} />
                <PokemonStats>
                  <PokemonName>{pokemon.name}</PokemonName>
                  <ProgressBarWrapper color="#fb1b1b">
                    <ProgressBarEXP>
                      <span>ATAK: {pokemon.attack}</span>
                    </ProgressBarEXP>
                  </ProgressBarWrapper>
                  <ProgressBarWrapper color="green">
                    <ProgressBarHP>
                      <span>ŻYCIE: {pokemon.hp}</span>
                    </ProgressBarHP>
                  </ProgressBarWrapper>
                </PokemonStats>
              </PokemonWrapper>
            );
          })}
        </TeamDescription>
      ) : null}
    </RightItemWrapper>
  );
};

export default Team;
