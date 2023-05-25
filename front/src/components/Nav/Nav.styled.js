import styled from "styled-components";
import themeColors from "../../styles/colors";
const NavWrapper = styled.div`
  background-color: ${themeColors.colors.darkGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding-right: 15px;
  padding-left: 10px;
  position: fixed;
  top: 0;
  width: calc(100vw - 25px);
  z-index: 2;
  svg {
    padding: 10px;
  }
`;
const NavLogo = styled.div`
  img {
    cursor: pointer;
    height: 50px;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  align-items: center;
  display: flex;
`;

const Li = styled.li`
  float: right;

  a {
    display: block;
    color: ${themeColors.colors.gray};
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    color: #fff;
  }
`;
export { NavWrapper, NavLogo, Ul, Li };
