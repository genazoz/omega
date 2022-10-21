import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const LoaderEl = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  #still-cloud {
    position: absolute;
    width: 80px;
    fill: ${theme.colors.pink};
    opacity: 0;
    animation: loading2 .6s alternate infinite;
  }

  #pulsating-cloud {
    position: absolute;
    width: 50px;
    fill: ${theme.colors.pink};
    opacity: 0;
    animation: loading .6s alternate infinite;
  }

  @keyframes loading {
    0% {
      font-size: 3em;
      transform: scale(1.7);
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
  @keyframes loading2 {
    0% {
      font-size: 2em;
      transform: scale(1.7);
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`

export const Loader: React.FC = () => {
  return (
    <LoaderEl>
      <svg id={'still-cloud'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.001 451.001">
        <path d="M406.989,248.191c0.673-4.522,1.012-9.094,1.012-13.69c0-51.28-41.72-93-93-93c-7.281,0-14.453,0.836-21.444,2.494    c-10.332-19.948-25.37-37.061-44.059-50.007c-23.126-16.02-50.27-24.487-78.497-24.487c-76.093,0-138,61.907-138,138    c0,14.618,2.24,28.859,6.674,42.519C15.92,261.131,0,285.18,0,312.5c0,38.047,30.953,69,69,69h313.001c38.047,0,69-30.953,69-69    C451.001,283.605,432.935,258.296,406.989,248.191z"/>
      </svg>
      <svg id={'pulsating-cloud'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.001 451.001">
        <path d="M406.989,248.191c0.673-4.522,1.012-9.094,1.012-13.69c0-51.28-41.72-93-93-93c-7.281,0-14.453,0.836-21.444,2.494    c-10.332-19.948-25.37-37.061-44.059-50.007c-23.126-16.02-50.27-24.487-78.497-24.487c-76.093,0-138,61.907-138,138    c0,14.618,2.24,28.859,6.674,42.519C15.92,261.131,0,285.18,0,312.5c0,38.047,30.953,69,69,69h313.001c38.047,0,69-30.953,69-69    C451.001,283.605,432.935,258.296,406.989,248.191z"/>
      </svg>
    </LoaderEl>
  );
}
