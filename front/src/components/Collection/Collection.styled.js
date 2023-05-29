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

const RegionsWrapper = styled.div`
  display: flex;
`;

const RegionUl = styled.ul`
  display: flex;
  list-style: none;
`;

const RegionLi = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  color: ${(props) => (props.isActive ? themeColors.colors.primary : null)};
  border-right: ${(props) => (props.isActive ? "1px solid #ddd" : "1px solid transparent")};
  border-left: ${(props) => (props.isActive ? "1px solid #ddd" : "1px solid transparent")};
  border-bottom: ${(props) => (props.isActive ? "1px solid transparent" : "1px solid #ddd")};
  &:hover {
    color: ${themeColors.colors.primary};
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  padding-left: 40px;
  gap: 10px;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  color: ${(props) => (props.isActive ? themeColors.colors.stroke : "#ddd")};
  border: ${(props) => (props.isActive ? `1px solid ${themeColors.colors.stroke}` : "1px solid #ddd")};
`;

const ImagesWrapper = styled.div`
  padding: 20px 0;
`;

const ImageWrapper = styled.div`
  border: 1px solid #ccc;
  width: fit-content;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
`;

const PokemonInfo = styled.div`
  text-align: center;
`;

export {
  CollectionWrapper,
  CollectionHeader,
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
};
