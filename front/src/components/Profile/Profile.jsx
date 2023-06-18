import React, { useState, useContext } from "react";
import { RightItemWrapper, RightItemHeader, ProfileDescription, UserName } from "./Profile.styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PokemonContext } from "../../providers/PokemonProvider";
const Profile = () => {
  const [isOpen, setOpen] = useState(true);
  const { user, wins, loses } = useContext(PokemonContext);

  return (
    <RightItemWrapper>
      <RightItemHeader isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span>Profil</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </RightItemHeader>
      {isOpen ? (
        <ProfileDescription>
          <UserName>{user?.username}</UserName>
          <p>Zwycięstwa: {wins}</p>
          <p>Przegrane: {loses}</p>
          <p>Współczynnik zwycięstw {((wins / (wins + loses)) * 100).toFixed(2)}%</p>
        </ProfileDescription>
      ) : null}
    </RightItemWrapper>
  );
};

export default Profile;
