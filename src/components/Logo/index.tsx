import React, {ReactElement} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import theme from "../../theme";

const Logo = styled.div<{big: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin: 0;

  font-family: ${theme.fonts.bebasB};
  font-size: calc(28px);

  span {
    display: block;
    width: auto;
    padding: 8px 16px 6px 16px;
    margin-left: -2px;

    color: #FFFFFF;

    background: #ff7dd1;
    border-radius: 12px;

    @media (max-width: ${theme.media.mob}) {
      padding: 7px 8px 1px 8px;
    }

    ${(props) =>
      props.theme === "dark" && "background: #14132d; color: #FFFFFF;"}
    ${(props) =>
      props.big &&
      `font-size: 38px;
      
        @media (max-width: ${theme.media.mob}) {
          font-size: 30px;
        }`}
  }
`;

type LogoProps = {
  text: ReactElement | string;
  type?: string;
  href?: string;
  theme?: string;
  big?: boolean;
}

const LogoComponent: React.FC<LogoProps> = ({ text, type = "div", href = `/`, theme = "default", big = false }) => {
  return (
    <>
      {type === "link" ? (
        <Link to={href}>
          <Logo theme={theme} big={big}>
            <span>{text}</span>
          </Logo>
        </Link>
      ) : (
        <Logo theme={theme} big={big}>
          <span>{text}</span>
        </Logo>
      )}
    </>
  );
}

export default LogoComponent;
