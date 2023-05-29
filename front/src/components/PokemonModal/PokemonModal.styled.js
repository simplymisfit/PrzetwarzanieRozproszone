import styled from "styled-components";
import Modal from "styled-react-modal";
import themeColors from "../../styles/colors";

const StyledModal = Modal.styled`
  width: 80vw;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: ${themeColors.colors.white};
`;

const ModalTop = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  background-color: ${themeColors.colors.primary};
`;

const ModalTitle = styled.div`
  color: ${themeColors.colors.white};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalWrapper = styled.div`
  padding: 20px 40px;
`;

const ModalMainWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ModalStatsWrapper = styled.div`
  border: 1px solid ${themeColors.colors.stroke};
  border-radius: 10px;
  width: 300px;
  overflow: hidden;
`;

const ModalStatsTitle = styled.div`
  padding: 10px;
  background-color: ${themeColors.colors.primary};
  color: ${themeColors.colors.white};
`;

const ModalStats = styled.div`
  padding: 10px;
`;

const ModalStat = styled.div``;

const ModalImage = styled.img``;

const ModalDescriptionTitle = styled.div`
  color: ${themeColors.colors.primary};
  padding-top: 40px;
  padding-bottom: 20px;
`;

const ModalDescription = styled.div``;

export {
  StyledModal,
  ModalTop,
  ModalTitle,
  ModalButtons,
  ModalWrapper,
  ModalMainWrapper,
  ModalStatsWrapper,
  ModalStatsTitle,
  ModalStats,
  ModalStat,
  ModalImage,
  ModalDescriptionTitle,
  ModalDescription,
};
