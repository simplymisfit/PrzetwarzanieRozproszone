import React from "react";
import {
  ExpeditionWrapper,
  EncounterDescription,
  EncounterPokemonWrapper,
  EncounterImage,
  EncounterWrapper,
  EncounterName,
  EncounterStats,
  Stat,
  ChoosePokemon,
  ChoosePokemonText,
  PokemonsWrapper,
  PokemonWrapper,
  PokemonImage,
  PokemonName,
  PokemonTypesWrapper,
  PokemonType,
} from "./Expedition.styled";
import { LeftItemWrapper, LeftItemHeader } from "../Locations/Locations.styled";
import PokemonImg from "./images/7.png";

const Expedition = () => {
  let pokemons = [
    {
      name: "Pikachu",
      type1: "Kamień",
      type2: "Woda",
    },
    {
      name: "Pikachu",
      type1: "Kamień",
      type2: "Woda",
    },
    {
      name: "Pikachu",
      type1: "Kamień",
      type2: "Woda",
    },
    {
      name: "Pikachu",
      type1: "Kamień",
      type2: "Woda",
    },
    {
      name: "Pikachu",
      type1: "Kamień",
      type2: "Woda",
    },
    {
      name: "Pikachu",
      type1: "Kamień",
      type2: "Woda",
    },
  ];
  return (
    <LeftItemWrapper>
      <LeftItemHeader>Ekspedycja</LeftItemHeader>
      <ExpeditionWrapper>
        <EncounterDescription>
          Natrafiasz na nieznanego pokemona! Wyjmujesz swój pokedex i sprawdzasz co to za okaz. To Squirtle:
        </EncounterDescription>
        <EncounterPokemonWrapper>
          <EncounterImage src={PokemonImg} />
          <EncounterWrapper>
            <EncounterName>Pikachu (46 poz.)</EncounterName>
            <EncounterStats>
              <Stat>Atak : 159</Stat>
              <Stat>Obrona : 159</Stat>
              <Stat>Sp. atak : 159</Stat>
              <Stat>Sp. obrona : 159</Stat>
              <Stat>Szybkość : 159</Stat>
              <Stat>Życie : 159</Stat>
            </EncounterStats>
          </EncounterWrapper>
        </EncounterPokemonWrapper>
        <ChoosePokemon>Wybierz pokemona</ChoosePokemon>
        <ChoosePokemonText>Wybierz pokemona którym chcesz walczyć, lub uciekaj:</ChoosePokemonText>
        <PokemonsWrapper>
          {pokemons.map((pokemon, id) => {
            return (
              <PokemonWrapper>
                <PokemonImage src={PokemonImg} />
                <PokemonName>{pokemon.name}</PokemonName>
                <PokemonTypesWrapper>
                  <PokemonType color="rgba(184, 160, 56, 1)">{pokemon.type1}</PokemonType>
                  <PokemonType color="rgba(104, 144, 240, 1)">{pokemon.type2}</PokemonType>
                </PokemonTypesWrapper>
              </PokemonWrapper>
            );
          })}
        </PokemonsWrapper>
      </ExpeditionWrapper>
    </LeftItemWrapper>
  );
};

export default Expedition;
