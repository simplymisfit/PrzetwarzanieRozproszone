import React, { useState } from "react";
import { RightItemWrapper, RightItemHeader, ProfileDescription } from "./Profile.styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Profile = () => {
  const [isOpen, setOpen] = useState(true);
  return (
    <RightItemWrapper>
      <RightItemHeader isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span>Profil</span>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </RightItemHeader>
      {isOpen ? <ProfileDescription></ProfileDescription> : null}
    </RightItemWrapper>
  );
};

export default Profile;
