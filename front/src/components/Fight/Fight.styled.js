import styled from "styled-components";
import themeColors from "../../styles/colors";

const PlayersList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const PlayerListHeader = styled.h3``;

const Player = styled.div`
  padding: 20px;
  background-color: #fff;
  width: 80%;
  border: 1px solid ${themeColors.colors.primary};
  color: ${themeColors.colors.primary};
  cursor: pointer;
  border-radious: 10px;
  &:hover {
    background: ${themeColors.colors.primary};
    color: #fff;
  }
`;

const BattleLogWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const RoundWrapper = styled.div`
  padding: 20px;
  border: 1px solid ${themeColors.colors.stroke};
`;

const RoundHeader = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const RoundDescription = styled.div``;

const PokemonImagesWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
`;

const Pokemon = styled.div``;

const PokemonName = styled.h3`
  text-align: center;
`;

const NextFightButton = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid ${themeColors.colors.primary};
  color: ${themeColors.colors.primary};
  cursor: pointer;
  border-radious: 10px;
  text-align: center;
  margin-top: 50px;
  &:hover {
    background: ${themeColors.colors.primary};
    color: #fff;
  }
`;

export {
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
};
