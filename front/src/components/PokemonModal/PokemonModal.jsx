import React, { useState } from "react";
import Modal from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";
// import {StyledModal} from './PokemonModal.styled'
const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PokemonModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  return (
    <ModalProvider>
      <button onClick={toggleModal}>Click me</button>
      <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
        <span>I am a modal!</span>
        <button onClick={toggleModal}>Close me</button>
      </StyledModal>
    </ModalProvider>
  );
};

export default PokemonModal;
