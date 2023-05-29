import styled from "styled-components";
import themeColors from "../../styles/colors";

const ExpeditionWrapper = styled.div`
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 0px 0px 10px 10px;
  border-top: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EncounterDescription = styled.div`
  background-color: ${themeColors.colors.green};
  color: ${themeColors.colors.white};
  padding: 10px;
  border-radius: 10px;
`;

const EncounterPokemonWrapper = styled.div`
  display: flex;
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 10px;
  padding: 10px;
  gap: 20px;
`;

const EncounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EncounterImage = styled.img`
  width: 200px;
  height: 200px;
`;

const EncounterName = styled.div``;

const EncounterStats = styled.div``;

const Stat = styled.div``;

const ChoosePokemon = styled.div`
  background-color: ${themeColors.colors.primary};
  color: ${themeColors.colors.white};
  padding: 10px;
  border-radius: 10px;
`;

const ChoosePokemonText = styled.div`
  text-align: center;
`;

const PokemonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PokemonWrapper = styled.div`
  width: 145px;
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 10px 10px 0 0;
`;

const PokemonImage = styled.img`
  width: 125px;
  height: 125px;
  padding: 10px;
`;

const PokemonName = styled.div`
  text-align: center;
  margin: 5px;
`;

const PokemonTypesWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const PokemonType = styled.div`
  font-size: 12px;
  background-color: ${(props) => props.color};
  padding: 5px;
  width: 50%;
  text-align: center;
`;

export {
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
};
