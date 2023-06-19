import React, { useState, useContext, useEffect } from "react";
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
import PokemonModal from "../PokemonModal/PokemonModal";
import { PokemonContext } from "../../providers/PokemonProvider";

const Collection = () => {
  const [activePokemon, setActivePokemon] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const { newTeam, setNewTeam, setPokemons } = useContext(PokemonContext);
  const { user, channel } = useContext(PokemonContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const setPokemon = (pokemonId) => {
    let data = [...newTeam];
    data[activePokemon] = {
      id: pokemonId,
    };
    setNewTeam(data);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

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

  return (
    <LeftItemWrapper>
      <LeftItemHeader>Kolekcja Pokemonów</LeftItemHeader>
      <CollectionDescription>
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
        <ButtonWrapper>
          <SetPokemonButton onClick={() => setPokemons()}>Wybierz Pokemony</SetPokemonButton>
        </ButtonWrapper>
        <ImagesWrapper>
          {pokemonList?.map((pokemon, id) => {
            return (
              <ImageWrapper key={id} inTeam={newTeam[activePokemon]?.id == pokemon.id} onClick={() => setPokemon(pokemon.id)}>
                <PokemonImage isActive={true} src={pokemon.photoUrl} />
                <PokemonInfo inTeam={newTeam[activePokemon]?.id == pokemon.id} isActive={true}>
                  #{pokemon.id} {pokemon.name}
                </PokemonInfo>
              </ImageWrapper>
            );
          })}
        </ImagesWrapper>
      </CollectionDescription>
      <PokemonModal isOpen={isOpen} toggleModal={toggleModal} />
    </LeftItemWrapper>
  );
};

export default Collection;
