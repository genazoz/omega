import React from "react";
import styled from "styled-components";
import theme from "../../theme";
import {useAppDispatch} from "../../app/store";
import {removeItem} from '../../features/cart/cartSlice'

const Card = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 18px;

  background: ${theme.colors.pink};
  border-radius: 24px;
  box-shadow: 0 5px 0px 0px #3c2c31;
`;
const Image = styled.img`
  position: relative;
  z-index: 1;

  width: 105%;
  height: auto;
  margin: 30px 0 0;
  
  pointer-events: none;
`;
const Remove = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin: 15px;
  padding: 2px 0 0 0;

  color: #ff7dd1;
  font-size: 23px;

  cursor: pointer;
  background: #d861ae;
  border-radius: 100px;
`;
const Text = styled.span`
  font-family: ${theme.fonts.dinCondM};
  font-size: 20px;
`;
const Name = styled(Text)`
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow: hidden;
  width: max-content;
  max-width: 82%;
  height: max-content;
  margin: 10px auto auto;

  font-size: 90px;
  color: #d861ae;
  font-weight: 700;
  
  pointer-events: none;
  border: unset;
`;

type GoodsCardProps = {
  id: string;
  imageUrl: string;
  title: string;
}

export const CardB: React.FC<GoodsCardProps> = ({id, imageUrl, title}) => {
  const dispatch = useAppDispatch();

  const onClickRemoveFromCartButton = () => {
    dispatch(removeItem(id));
  };

  return (
    <Card>
      <Remove
        onClick={() => {
          onClickRemoveFromCartButton();
        }}
      >
        ×
      </Remove>
      <Image width="300" height="300" src={`${imageUrl}`} alt=""></Image>
      <Name>{title}</Name>
    </Card>
  );
}
