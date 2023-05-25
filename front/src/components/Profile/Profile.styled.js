import styled from "styled-components";
import themeColors from "../../styles/colors";

const RightItemWrapper = styled.div``;
const RightItemHeader = styled.h3`
  background: ${themeColors.colors.primary};
  margin: 0;
  border-radius: ${(props) => (props.isOpen ? "10px 10px 0px 0px" : "10px")};
  padding: 10px;
  color: ${themeColors.colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileDescription = styled.div`
  height: 200px;
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 0px 0px 10px 10px;
  border-top: 0;
`;

export { RightItemWrapper, RightItemHeader, ProfileDescription };
