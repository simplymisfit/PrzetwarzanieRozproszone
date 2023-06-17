import styled from "styled-components";
import themeColors from "../../styles/colors";

const CollectionWrapper = styled.div``;
const CollectionHeader = styled.h3`
  background: ${themeColors.colors.primary};
  margin: 0;
  border-radius: 0px 10px 0px 0px;
  padding: 10px;
  color: ${themeColors.colors.white};
`;

const CollectionDescription = styled.div`
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 0px 0px 10px 10px;
  border-top: 0;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  padding-left: 20px;
  gap: 10px;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  color: ${(props) => (props.isActive ? themeColors.colors.stroke : "#ddd")};
  border: ${(props) => (props.isActive ? `1px solid ${themeColors.colors.stroke}` : "1px solid #ddd")};
`;

const ImagesWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  border: 1px solid #ccc;
  width: fit-content;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-color: ${(props) => (props.inTeam ? themeColors.colors.primary : "#ddd")};
`;

const PokemonImage = styled.img`
  width: 100px;
  max-height: 100px;
  opacity: ${(props) => (props.isActive ? "100%" : "30%")};
`;

const PokemonInfo = styled.div`
  text-align: center;
  filter: ${(props) => (props.isActive ? "contrast(100%);" : "contrast(0%);")};
  color: ${(props) => (props.inTeam ? themeColors.colors.primary : "#000")};
`;

const PokemonNumberWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  gap: 20px;
`;

const PokemonNumber = styled.div`
  background-color: ${(props) => (props.isActive ? themeColors.colors.primary : "#fff")};
  border: 1px solid #ddd;
  border-color: ${(props) => (props.isActive ? themeColors.colors.stroke : "#ddd")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LeftItemWrapper = styled.div``;
const LeftItemHeader = styled.h3`
  background: ${themeColors.colors.primary};
  margin: 0;
  border-radius: 10px 10px 0px 0px;
  padding: 10px;
  color: ${themeColors.colors.white};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const SetPokemonButton = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  width: fit-content;
  color: ${themeColors.colors.primary};
  border: 1px solid ${themeColors.colors.primary};
  &:hover {
    background: ${themeColors.colors.primary};
    color: #fff;
  }
`;

export {
  CollectionWrapper,
  CollectionHeader,
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
};
