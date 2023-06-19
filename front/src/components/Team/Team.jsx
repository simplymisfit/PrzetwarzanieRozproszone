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
import { PokemonContext } from "../../providers/PokemonProvider";

const Team = () => {
  const [isOpen, setOpen] = useState(true);
  const { team } = useContext(PokemonContext);

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
                      <span>ŻYCIE: 100</span>
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
