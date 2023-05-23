import styled from "styled-components";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`width: 20rem;
height: 20rem;
display: flex;
align-items: center;
justify-content: center;
background-color: ${(props) => props.theme.colors.white};`;

export { StyledModal };
