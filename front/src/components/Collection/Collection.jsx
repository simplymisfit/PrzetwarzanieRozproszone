import React, { useState } from "react";
import {
  CollectionDescription,
  RegionsWrapper,
  RegionUl,
  RegionLi,
  Options,
  Option,
  ImagesWrapper,
  ImageWrapper,
  PokemonImage,
  PokemonInfo,
} from "./Collection.styled";
import { LeftItemWrapper, LeftItemHeader } from "../Locations/Locations.styled";
import Squirtle from "./images/7.png";
import PokemonModal from "../PokemonModal/PokemonModal";

const Collection = () => {
  // const [pokemons, setPokemons] = useState([]);
  const [region, setRegion] = useState("Kanto");
  const [category, setCategory] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const categories = [
    { name: "Kanto", value: 1 },
    { name: "Johto", value: 2 },
    { name: "Hoenn", value: 3 },
    { name: "Sinnoh", value: 4 },
    { name: "Unova", value: 5 },
    { name: "Kalos", value: 6 },
    { name: "Alola", value: 7 },
  ];

  return (
    <LeftItemWrapper>
      <LeftItemHeader>Kolekcja</LeftItemHeader>
      <CollectionDescription>
        <RegionsWrapper>
          <RegionUl>
            {categories.map((item, id) => {
              return (
                <RegionLi key={id} isActive={region === item.name ? true : false} onClick={() => setRegion(item.name)}>
                  {item.name}
                </RegionLi>
              );
            })}
          </RegionUl>
        </RegionsWrapper>

        <Options>
          Pokaż:
          <Option onClick={() => setCategory(0)} isActive={category === 0 ? true : false}>
            Wszystkie
          </Option>
          <Option onClick={() => setCategory(1)} isActive={category === 1 ? true : false}>
            Niezłapane
          </Option>
          <Option onClick={() => setCategory(2)} isActive={category === 2 ? true : false}>
            Złapane
          </Option>
        </Options>
        <ImagesWrapper>
          <ImageWrapper onClick={() => toggleModal()}>
            <PokemonImage src={Squirtle} />
            <PokemonInfo>#1 Squirtle</PokemonInfo>
          </ImageWrapper>
        </ImagesWrapper>
      </CollectionDescription>
      <PokemonModal isOpen={isOpen} toggleModal={toggleModal} />
    </LeftItemWrapper>
  );
};

export default Collection;
