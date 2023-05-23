import styled from "styled-components";
import themeColors from "../../styles/colors";
const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 4px;
    min-width: 600px;
  }
  @media only screen and (max-width: 600px) {
    margin: 30px 10px;
    form {
      min-width: auto;
      width: 80%;
    }
  }
`;

const Header = styled.h2`
  color: ${themeColors.colors.primary};
  margin-top: 0;
  font-size: 30px;
`;

const SubmitButton = styled.button`
  background-color: ${themeColors.colors.primary};
  border-radius: 4px;
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-evenly;
  color: rgb(255, 255, 255);
  margin: 20px auto;
  cursor: pointer;
  border: 0;
  padding: 16.5px 14px;
  font-family: "Inter-Regular";
`;

const PokemonImage = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 200px;
  }
`;

const TextButton = styled.button`
  color: ${themeColors.colors.primary};
  background-color: transparent;
  cursor: pointer;
  border: 0;
  padding: 16.5px 14px;
  font-family: "Inter-Regular";
`;

const NoAccountWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 12px;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export { FormWrapper, Header, SubmitButton, PokemonImage, TextButton, NoAccountWrapper };
