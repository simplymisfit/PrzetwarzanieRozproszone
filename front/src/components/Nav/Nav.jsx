import React from "react";
import Logo from "../../assets/images/Logo.png";
import { motion } from "framer-motion";
import { NavWrapper, NavLogo, Ul, Li } from "./Nav.styled";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <NavWrapper>
      <NavLogo>
        <Link to="/">
          <img src={Logo} alt="logo pokemon" />
        </Link>
      </NavLogo>

      {window.innerWidth < 600 ? (
        <>
          {isOpen ? (
            <Ul>
              <Li key="1">
                <Link to="/locations">Lokacje</Link>
              </Li>
              <Li key="2">
                <Link to="/collection">Kolekcja</Link>
              </Li>
              <Li key="3">
                <Link to="/">Wyloguj się</Link>
              </Li>
            </Ul>
          ) : null}
          <MenuButton
            isOpen={isOpen}
            onClick={() => setOpen(!isOpen)}
            strokeWidth="6"
            color="rgb(0,180,216,70)"
            lineProps={{ strokeLinecap: "round" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
        </>
      ) : (
        <Ul>
          <Li key="1">
            <Link to="/locations">Lokacje</Link>
          </Li>
          <Li key="2">
            <Link to="/collection">Kolekcja</Link>
          </Li>
          <Li key="3">
            <Link to="/">Wyloguj się</Link>
          </Li>
        </Ul>
      )}
    </NavWrapper>
  );
};

const MenuButton = ({ isOpen = false, width = 24, height = 24, strokeWidth = 1, color = "#000", transition = null, lineProps = null, ...props }) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * width) / height;

  return (
    <motion.svg viewBox={`0 0 ${unitWidth} ${unitHeight}`} overflow="visible" preserveAspectRatio="none" width={width} height={height} {...props}>
      <motion.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
    </motion.svg>
  );
};

export default Nav;
