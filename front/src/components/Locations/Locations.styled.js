import styled from "styled-components";
import themeColors from "../../styles/colors";

const LeftItemWrapper = styled.div``;
const LeftItemHeader = styled.h3`
  background: ${themeColors.colors.primary};
  margin: 0;
  border-radius: 10px 10px 0px 0px;
  padding: 10px;
  color: ${themeColors.colors.white};
`;

const LocationsWrapper = styled.div`
  // height: 200px;
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 0px 0px 10px 10px;
  border-top: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Location = styled.div`
  border-radius: 10px 10px 10px 10px;
  overflow: hidden;
  border: 1px solid ${themeColors.colors.stroke};
`;

const LocationHeader = styled.h4`
  background: ${themeColors.colors.primary};
  margin: 0px;
  padding: 10px;
  color: rgb(255, 255, 255);
`;

const LocationDetails = styled.div`
  display: flex;
`;

const LocationImage = styled.img``;

const LocationDescription = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin-top: 0;
  }
  button {
    width: fit-content;
  }
`;

export { LeftItemWrapper, LeftItemHeader, LocationsWrapper, Location, LocationHeader, LocationImage, LocationDescription, LocationDetails };
