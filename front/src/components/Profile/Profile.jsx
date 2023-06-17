import React, { useState, useContext } from "react";
import { RightItemWrapper, RightItemHeader, ProfileDescription, UserName } from "./Profile.styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PokemonContext } from "../../providers/PokemonProvider";
const Profile = () => {
  const [isOpen, setOpen] = useState(true);
  const { user } = useContext(PokemonContext);
  return (
    <RightItemWrapper>
      <RightItemHeader isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span>Profil</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </RightItemHeader>
      {isOpen ? (
        <ProfileDescription>
          <UserName>Adam</UserName>
          <p>Zwycięstwa: 1</p>
          <p>Przegrane: 1</p>
          <p>Dostępne Pokemony: 1/50</p>
        </ProfileDescription>
      ) : null}
    </RightItemWrapper>
  );
};

export default Profile;
