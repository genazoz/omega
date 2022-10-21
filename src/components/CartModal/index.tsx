import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {setShowCart, settingsSelector} from "../../features/settings/settingsSlice";
import {useAppDispatch} from "../../app/store";
import theme from "../../theme";
import {CardB} from "../index";
import Logo from "../Logo";
import {cartSelector} from "../../features/cart/cartSlice";
import {ClientOnlyPortal} from "../ClientOnlyPortal";
import {CSSTransition} from "react-transition-group";

const Wrapper = styled.div<{ isActive: boolean }>`
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  &.cart-modal-enter {
    opacity: 0;
  }
  &.cart-modal-enter-active {
    opacity: 1;

    transition: opacity .2s;
  }
  &.cart-modal-exit {
    opacity: 1;
  }
  &.cart-modal-exit-active {
    opacity: 0;
    transition: opacity .2s;
  }
`;
const Cart = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 360px;
  max-width: calc(100% - 24px * 2);
  height: max-content;
  max-height: calc(100% - 80px);
  margin: auto;
  padding: 30px;

  border: none;
  transform: translateY(-20%);

  color: black;

  transition: .4s transform;
  
  .cart-modal-enter & {
  }
  .cart-modal-enter-active & {
    transform: translateY(0%);
  }
  .cart-modal-enter-done & {
    transform: translateY(0%);
  }
  .cart-modal-exit & {
    transform: translateY(20%);
  }
  .cart-modal-exit-active & {
    transform: translateY(20%);
  }

  @media (max-width: ${theme.media.mob}) {
    max-height: calc(100% - 30px);
    padding: 40px 35px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    padding: 25px 20px;
  }
`;
const List = styled.ul`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: max-content;
  margin: 0 0 20px 0;
  padding: 20px;

  background: #d861ae;
  border-radius: 26px;
  box-shadow: 0 5px 0px 0px #3c2c31;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Total = styled.span`
  margin: 0 0 10px 0;
  
  color: ${theme.colors.pink};
  font-size: 40px;
`
const LogoEmptyWrapper = styled.div`
  width: max-content;
  padding: 104px 0;
`;
const Overflow = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;

  cursor: pointer;
  background: rgba(0, 0, 0, 0.9);
`;

interface CartModalProps {
  selector: string
}

export const CartModal: React.FC<CartModalProps> = ({selector}) => {
  const {items, totalPrice, totalCount} = useSelector(cartSelector);
  const {showCart} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const cart = {
        items,
        totalPrice,
        totalCount
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    isMounted.current = true;
  }, [items])

  const onClickShowCartButton = () => {
    dispatch(setShowCart(!showCart));
  };

  return (
    <ClientOnlyPortal selector={selector}>
      <CSSTransition in={showCart} classNames={'cart-modal'} timeout={200} unmountOnExit>
        <Wrapper className={"js-cart-wrapper"} isActive={showCart}>
          <Overflow isActive={showCart} onClick={onClickShowCartButton}/>
          <Cart isActive={showCart}>
            <Total>
              Итого: {totalCount === 0 ? (`0 Р`) : (`${totalPrice} Р`)}
            </Total>
            <List>
              {totalCount > 0 ? (
                <>
                  {items.map((goods, index) => (
                    <li key={index}>
                      <CardB {...goods} />
                    </li>
                  ))}
                </>
              ) : (
                <LogoEmptyWrapper>
                  <Logo text={"Корзина пуста"} theme={"lined-dark"}/>
                </LogoEmptyWrapper>
              )}
            </List>
          </Cart>
        </Wrapper>
      </CSSTransition>
    </ClientOnlyPortal>
  );
}
