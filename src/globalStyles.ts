import styled, { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    font-family: "BebasNeue Bold";
    color: white;
    background: #77e3ff;
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fullpage-wrapper {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a, p {
    font-family: ${theme.fonts.dinCondM};
    font-size: calc(${theme.fontSize} + 1px);

    @media (max-width: ${theme.media.mob}) {
      font-size: 15px;
    }
  }

  li {
    list-style-type: none;
  }

  input, button {
    outline: none;
    font-family: ${theme.fonts.bebasB};
  }

  #fp-nav ul li a span {
    background: #FFFFFF;
  }

  \:root {
    --unit: calc((100vw - 1650px) / 2);
    @media (max-width: ${theme.media.desktop}) {
      --unit: 85px;
    }
    @media (max-width: ${theme.media.desktopMd}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.tab}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.tabMd}) {
      --unit: 32px;
    }
    @media (max-width: ${theme.media.mob}) {
      --unit: 24px;
    }
  }
  
  h1, h2, h3, h4 {
    font-weight: normal;
  }
`;

export const ButtonStyles = styled.button<{theme: string, fullwidth?: boolean, disabled?: boolean }>`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  min-width: 120px;
  width: max-content;
  margin: auto;
  padding: 15px 20px;

  font-size: 26px;
  font-weight: 700;
  color: white;

  border-radius: 15px;
  border: none;
  background: #ff7dd1;
  box-shadow: 0 5px 0px 0px #3c2c31;
  cursor: pointer;

  transition: 0.2s all;

  &:active {
    transform: scale(1.1)
  }

  ${(props) => props.fullwidth && `width: 100%;`}
  ${(props) => props.disabled && `pointer-events: none !important; opacity: .5;`}
`;
export const InputStyles = styled.input`
  width: 100%;
  height: 45px;
  margin: 0;
  padding: 10px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: #FFFFFF;

  background: #ff7dd1;
  border: unset;
  border-radius: 15px;
  box-shadow: 0 5px 0px 0px #3c2c31;

  transition: .15s background-color, .15s border-color;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px rgba(20, 19, 45, .8) inset;
  }

  &[type='file'] {
  }
  &:hover, &:focus {
  }

  .is-error &,
  .is-error &:hover,
  .is-error &:focus {
    border-color: red;
  }

  .is-success &:hover,
  .is-success &:focus {
    border-color: #1bbc9b;
  }
`;

export default GlobalStyles;
