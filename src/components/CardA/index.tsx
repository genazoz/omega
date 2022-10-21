import React, {useMemo} from "react";
import styled from "styled-components";

import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {addItem, cartSelector} from '../../features/cart/cartSlice'
import {Goods, removeGoods} from "../../features/goods/goodsSlice";
import {ButtonStyles} from "../../globalStyles";
import {filterSelector} from "../../features/filter/filterSlice";
import {settingsSelector} from "../../features/settings/settingsSlice";
import {useAppDispatch} from "../../app/store";
import {toast} from "react-toastify";

const Card = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  padding: 20px;

  cursor: pointer;
  border-radius: 24px;
  background: #69cbe3;
  box-shadow: 0 5px 0px 0px #5ea6b9;
`;
const Name = styled.p`
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow: hidden;
  margin: 10px auto auto;
  max-width: 82%;
  width: max-content;
  height: max-content;

  font-size: 90px;
  color: #5fc2da;
  font-weight: 700;

  border: unset;  
`;
const LinkElement = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
`;
const ImageWrapper = styled.div`
  position: relative;
  
  width: 95%;
  margin: auto;
  padding: 100% 0 0 0;
`
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  
  object-fit: contain;
  width: 100%;
  height: 100%;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`
const Price = styled.p`
  overflow: hidden;
  width: max-content;
  margin: 5px 10px;

  color: #ffffff;
  font-size: 25px;
  text-overflow: ellipsis;
  white-space: nowrap;

  transition: 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
const AddToCartButton = styled(ButtonStyles)<{ isActive: boolean }>`
  min-width: unset;
  width: 50px;
  margin: unset;
  padding: 15px;

  font-size: 26px;
  font-weight: 700;
  color: white;
  
  border-radius: 15px;
  border: none;
  background: #ff7dd1;
  box-shadow: 0 5px 0px 0px #3c2c31;
  cursor: pointer;

  transition: 0.2s all;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    margin: auto;
    padding: 3px 0 0;
    }

  &:active {
    transform: scale(1.1)
  }

  ${(props) => {
  if (props.isActive) {
    return `
        span {
          font-size: 18px;
        }`;
  }
}}
`;
const RemoveButton = styled(ButtonStyles)`
  min-width: 40px;
  height: 40px;
  margin: unset;
  
  font-size: 14px;
`

type GoodsCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
}

export const CardA: React.FC<GoodsCardProps> = ({id, imageUrl, title, price}) => {
  const dispatch = useAppDispatch();
  const {items} = useSelector(cartSelector);
  const itemInCart = useMemo(() => items.find((item: { id: string }) => item.id === id), [items]);
  const {currentPage, searchQuery} = useSelector(filterSelector)
  const {goodsPerPage} = useSelector(settingsSelector)

  const onClickAddToCartButton = () => {
    const goods: Goods = {id, imageUrl, title, price};

    dispatch(addItem({goods}));
  };
  const onClickRemoveButton = async () => {
    const removeGoodsParams = {id, currentPage, searchQuery, goodsPerPage};

    const {payload} = await dispatch(removeGoods(removeGoodsParams));

    switch(payload) {
      case 'success':
        toast.success("Товар удалён успешно!");
        break;
      default:
        toast.error(`Ошибка: ${payload}`);
      break;
    }
  }

  return (
    <Card>
      <Name>{title}</Name>
      <LinkElement as={Link} to={`/card/${id}`}>
        <ImageWrapper>
          <Image src={imageUrl} alt={'product image'}></Image>
        </ImageWrapper>
      </LinkElement>
      <Footer>
        <Price>{price}Р</Price>
        <Buttons>
          <AddToCartButton
            onClick={onClickAddToCartButton}
            isActive={itemInCart ? true : false}
          >
            <span>{itemInCart ? itemInCart.count : '+'}</span>
          </AddToCartButton>
          <RemoveButton onClick={onClickRemoveButton}>
            x
          </RemoveButton>
        </Buttons>
      </Footer>
    </Card>
  );
}
