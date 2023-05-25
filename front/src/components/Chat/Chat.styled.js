import styled from "styled-components";
import themeColors from "../../styles/colors";

const ChatDescription = styled.div`
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 0px 0px 10px 10px;
  border-top: 0;
`;

const MessagesWrapper = styled.div`
  height: 250px;
`;

const BottomPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  gap: 5px;
`;

export { ChatDescription, BottomPanel, MessagesWrapper };
