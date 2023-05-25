import styled from "styled-components";
// import themeColors from "../../styles/colors";

const AuthorizedWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  padding-top: 30px;
  padding: 20px;
  gap: 30px;
`;

const LeftWrapper = styled.div`
  width: 67%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const RightWrapper = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export { AuthorizedWrapper, LeftWrapper, RightWrapper };
