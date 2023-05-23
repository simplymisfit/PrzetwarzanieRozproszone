import React from "react";
import { ErrorWrapper, ErrorLeft, ErrorRight, ErrorDescription } from "./ErrorNotification.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ErrorNotification = ({ message }) => {
  return (
    <ErrorWrapper>
      <ErrorLeft>
        <HighlightOffIcon />
      </ErrorLeft>
      <ErrorRight>
        <ErrorDescription>{message}</ErrorDescription>
      </ErrorRight>
    </ErrorWrapper>
  );
};

export default ErrorNotification;