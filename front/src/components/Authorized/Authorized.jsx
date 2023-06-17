import React from "react";
import Nav from "../Nav/Nav";
import { AuthorizedWrapper, LeftWrapper, RightWrapper } from "./Authorized.styled";
import Profile from "../Profile/Profile";
import Team from "../Team/Team";
import Chat from "../Chat/Chat";
import Collection from "../Collection/Collection";
import { Routes, Route } from "react-router-dom";
import Fight from "../Fight/Fight";

const Authorized = () => {
  return (
    <>
      <Nav />
      <AuthorizedWrapper>
        <LeftWrapper>
          <Routes>
            <Route path="/fight" exact element={<Fight />} />
            <Route path="/" exact element={<Collection />} />
          </Routes>
        </LeftWrapper>
        <RightWrapper>
          <Profile />
          <Team />
          <Chat />
        </RightWrapper>
      </AuthorizedWrapper>
    </>
  );
};

export default Authorized;
