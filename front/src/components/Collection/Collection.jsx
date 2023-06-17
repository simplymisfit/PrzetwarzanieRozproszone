import React, { useState, useContext } from "react";
import {
  CollectionDescription,
  Options,
  Option,
  ImagesWrapper,
  ImageWrapper,
  PokemonImage,
  PokemonInfo,
  PokemonNumberWrapper,
  PokemonNumber,
  LeftItemWrapper,
  LeftItemHeader,
  SetPokemonButton,
  ButtonWrapper,
} from "./Collection.styled";
import Squirtle from "./images/7.png";
import PokemonModal from "../PokemonModal/PokemonModal";
import { PokemonContext } from "../../providers/PokemonProvider";

const Collection = () => {
  const [category, setCategory] = useState(0);
  const [activePokemon, setActivePokemon] = useState(0);
  console.log("🚀 ~ file: Collection.jsx:21 ~ Collection ~ activePokemon:", activePokemon);

  const { team, setTeam, newTeam, setNewTeam } = useContext(PokemonContext);
  console.log("🚀 ~ file: Collection.jsx:24 ~ Collection ~ newTeam:", newTeam);
  const { user } = useContext(PokemonContext);
  console.log("🚀 ~ file: Collection.jsx:25 ~ Collection ~ team:", team);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const setPokemon = (pokemonId) => {
    let data = [...newTeam];
    data[activePokemon] = {
      id: pokemonId,
      name: "test",
    };
    setNewTeam(data);
  };

  const setPokemons = () => {
    let pokemonsIds = [newTeam[0].id, newTeam[1].id, newTeam[2].id, newTeam[3].id];
    fetch(`http://localhost:8080/api/game/setPokemons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonsIds),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: Fight.jsx:12 ~ handleAttack ~ data:", data);
        // setBattleLog(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <LeftItemWrapper>
      <LeftItemHeader>Kolekcja Pokemonów</LeftItemHeader>
      <CollectionDescription>
        <Options>
          Pokaż:
          <Option onClick={() => setCategory(0)} isActive={category === 0 ? true : false}>
            Wszystkie
          </Option>
          <Option onClick={() => setCategory(1)} isActive={category === 1 ? true : false}>
            Dostępne
          </Option>
          <Option onClick={() => setCategory(2)} isActive={category === 2 ? true : false}>
            Niedostępne
          </Option>
        </Options>
        <PokemonNumberWrapper>
          <PokemonNumber isActive={activePokemon === 0 ? true : false} onClick={() => setActivePokemon(0)}>
            1
          </PokemonNumber>
          <PokemonNumber isActive={activePokemon === 1 ? true : false} onClick={() => setActivePokemon(1)}>
            2
          </PokemonNumber>
          <PokemonNumber isActive={activePokemon === 2 ? true : false} onClick={() => setActivePokemon(2)}>
            3
          </PokemonNumber>
          <PokemonNumber isActive={activePokemon === 3 ? true : false} onClick={() => setActivePokemon(3)}>
            4
          </PokemonNumber>
        </PokemonNumberWrapper>
        <ImagesWrapper>
          <ImageWrapper onClick={() => setPokemon(1)}>
            <PokemonImage src={Squirtle} />
            <PokemonInfo>#1 Bulbasaur</PokemonInfo>
          </ImageWrapper>
          <ImageWrapper onClick={() => setPokemon(2)}>
            <PokemonImage src={Squirtle} />
            <PokemonInfo>#2 Charmander</PokemonInfo>
          </ImageWrapper>
          <ImageWrapper onClick={() => setPokemon(3)}>
            <PokemonImage src={Squirtle} />
            <PokemonInfo>#3 Squirtle</PokemonInfo>
          </ImageWrapper>
          <ImageWrapper onClick={() => setPokemon(4)}>
            <PokemonImage src={Squirtle} />
            <PokemonInfo>#4 Squirtle</PokemonInfo>
          </ImageWrapper>
        </ImagesWrapper>
        <ButtonWrapper>
          <SetPokemonButton onClick={() => setPokemons()}>Wybierz Pokemony</SetPokemonButton>
        </ButtonWrapper>
      </CollectionDescription>
      <PokemonModal isOpen={isOpen} toggleModal={toggleModal} />
    </LeftItemWrapper>
  );
};

export default Collection;
