import React from "react";
import Nav from "../Nav/Nav";
import { AuthorizedWrapper, LeftWrapper, RightWrapper } from "./Authorized.styled";
import Profile from "../Profile/Profile";
import Team from "../Team/Team";
import Location from "../Locations/Locations";
import Chat from "../Chat/Chat";
import Collection from "../Collection/Collection";
import { Routes, Route } from "react-router-dom";

const Authorized = () => {
  return (
    <>
      <Nav />
      <AuthorizedWrapper>
        <LeftWrapper>
          <Routes>
            <Route path="/locations" exact element={<Location />} />
            <Route path="/collection" exact element={<Collection />} />

            {/* <Route path="/"></Route> */}
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
