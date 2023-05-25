import React, { useState } from "react";
import { ChatDescription, BottomPanel, MessagesWrapper } from "./Chat.styled";
import { RightItemWrapper, RightItemHeader } from "../Profile/Profile.styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import Textarea from '@mui/joy/Textarea';
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import themeColors from "../../styles/colors";
import styled from "styled-components";

const Chat = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <RightItemWrapper>
      <RightItemHeader isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span>PokeChat</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </RightItemHeader>
      {isOpen ? (
        <ChatDescription>
          <MessagesWrapper></MessagesWrapper>
          <BottomPanel>
            <StyledTextarea color="primary" minRows={1} variant="outlined" size="md" placeholder="Wiadomość" />
            <Button variant="contained" size="medium" color="primary">
              Wyślij
            </Button>
          </BottomPanel>
        </ChatDescription>
      ) : null}
    </RightItemWrapper>
  );
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 4px;
  color: ${themeColors.colors.primary}
  background:  '#fff';
  border:  ${themeColors.colors.stroke}

  &:hover {
    border-color: ${themeColors.colors.primary};
  }

  &:focus {
    border-color: ${themeColors.colors.primary};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default Chat;
