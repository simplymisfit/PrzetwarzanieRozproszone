import styled from "styled-components";
import themeColors from "../../styles/colors";

const TeamDescription = styled.div`
  // height: 200px;
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 0px 0px 10px 10px;
  border-top: 0;
`;

const PokemonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const PokemonImage = styled.img`
  padding: 10px;
  width: 100px;
`;

const PokemonStats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px;
`;

const PokemonName = styled.div``;

const ProgressBarWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  border: 1px solid ${(props) => props.color};
  position: relative;
  overflow: hidden;
`;

const ProgressBarHP = styled.div`
  width: 100%;
  background-color: green;
  height: 17px;
  span {
    position: absolute;
    margin: 0;
    display: block;
    width: 100%;
    color: black;
    left: 0;
    right: 0;
    text-align: center;
    padding: 1px;
  }
`;

const ProgressBarEXP = styled.div`
  width: 100%;
  background-color: #fb1b1b;
  height: 17px;
  span {
    position: absolute;
    margin: 0;
    display: block;
    width: 100%;
    color: black;
    left: 0;
    right: 0;
    text-align: center;
    padding: 1px;
  }
`;

export { TeamDescription, PokemonWrapper, PokemonImage, PokemonStats, PokemonName, ProgressBarWrapper, ProgressBarHP, ProgressBarEXP };
