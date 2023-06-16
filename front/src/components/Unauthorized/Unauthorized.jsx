import React, { useState } from "react";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import { UnauthorizedWrapper, UnauthorizedBackground } from "./Unauthorized.styled";
import PokemonBackground from "../../assets/images/pokemon-background.png";
const Unauthorized = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <UnauthorizedWrapper>
      {/* <UnauthorizedBackground src={PokemonBackground} /> */}
      {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegistrationForm setIsLogin={setIsLogin} />}
    </UnauthorizedWrapper>
  );
};

export default Unauthorized;
