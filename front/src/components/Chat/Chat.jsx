import React, { useState, useContext } from "react";
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
  const [messages, setMessages] = useState([]);
  const { user } = useContext(PokemonContext);
  const sendMessage = (message) => {
    let previousMessages = [...messages];
    previousMessages.push(newMessage);
    setMessages(previousMessages);
    setNewMessage("");
    const textarea = document.getElementById("message");
    textarea.value = "";
    fetch("http://localhost:8080/api/game/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
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
            {messages?.map((message, id) => {
              return <Message>{message}</Message>;
            })}
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
