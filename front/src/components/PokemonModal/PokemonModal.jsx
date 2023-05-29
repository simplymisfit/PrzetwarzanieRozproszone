import React, { useState } from "react";
import Modal from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";
import PokemonImg from "./images/7.png";
import {
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
} from "./PokemonModal.styled";

// const StyledModal = Modal.styled`
//   width: 20rem;
//   height: 20rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
const PokemonModal = ({ isOpen, toggleModal }) => {
  return (
    <ModalProvider>
      <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
        <ModalTop>
          <ModalTitle>Squirtle #002</ModalTitle>
          <button onClick={toggleModal}>Close me</button>
        </ModalTop>
        <ModalButtons>
          <button onClick={toggleModal}>Pikachu #001</button>
          <button onClick={toggleModal}>Charmander #003</button>
        </ModalButtons>
        <ModalWrapper>
          <ModalMainWrapper>
            <ModalStatsWrapper>
              <ModalStatsTitle>Dane Pokemona</ModalStatsTitle>
              <ModalStats>
                <ModalStat>Typ</ModalStat>
                <ModalStat>Atak</ModalStat>
                <ModalStat>Obrona</ModalStat>
                <ModalStat>Sp. atak</ModalStat>
                <ModalStat>Sp. obrona</ModalStat>
                <ModalStat>Życie</ModalStat>
                <ModalStat>Prędkość</ModalStat>
              </ModalStats>
            </ModalStatsWrapper>
            <ModalImage src={PokemonImg} />
          </ModalMainWrapper>
          <ModalDescriptionTitle>Opis Pokemona</ModalDescriptionTitle>
          <ModalDescription>
            Squirtle to mały Pokémon, który przypomina jasnoniebieskiego żółwia. Chociaż zwykle chodzi na dwóch krótkich nogach, w grze Super Smash
            Bros. Brawl pokazano, że może biegać na czworakach. Ma duże, fioletowawe lub czerwonawe oczy i lekko zahaczoną górną wargę. Każda z dłoni
            i stóp ma trzy spiczaste palce. Koniec jego długiego ogona zwija się do środka. Jego ciało jest otoczone twardą skorupą, która tworzy się
            i twardnieje po urodzeniu. Ta skorupa jest brązowa u góry, jasnożółta u dołu i ma gruby biały grzbiet między dwiema połówkami.
          </ModalDescription>
        </ModalWrapper>
      </StyledModal>
    </ModalProvider>
  );
};

export default PokemonModal;
