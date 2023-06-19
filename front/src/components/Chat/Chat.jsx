import React, { useState, useContext, useEffect } from "react";
import { ChatDescription, BottomPanel, MessagesWrapper, Message } from "./Chat.styled";
import { RightItemWrapper, RightItemHeader } from "../Profile/Profile.styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import themeColors from "../../styles/colors";
import styled from "styled-components";
import { PokemonContext } from "../../providers/PokemonProvider";

const Chat = () => {
  const [isOpen, setOpen] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const { user, channel, messages } = useContext(PokemonContext);

  const sendMessage = (msg) => {
    setNewMessage("");
    const textarea = document.getElementById("message");
    textarea.value = "";
    fetch(`${channel}/api/game/trigger`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: msg }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <RightItemWrapper>
      <RightItemHeader isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span>PokeChat</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </RightItemHeader>
      {isOpen ? (
        <ChatDescription>
          <MessagesWrapper>
            <ul id="chat-messages"></ul>
            {/* {messages?.map((message, id) => {
              return <Message key={id}>{message}</Message>;
            })} */}
          </MessagesWrapper>
          <BottomPanel>
            <StyledTextarea
              id="message"
              onChange={(e) => setNewMessage(e.target.value)}
              color="primary"
              minRows={1}
              variant="outlined"
              size="md"
              placeholder="Wiadomość"
            />
            <Button variant="contained" size="medium" color="primary" onClick={() => sendMessage(newMessage)}>
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
