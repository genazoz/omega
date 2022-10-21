import React from "react";

import styled from "styled-components";
import theme from "../../theme";
import {CardA} from "../";
import {Goods, goodsSelector} from "../../features/goods/goodsSlice";
import {useSelector} from "react-redux";
import {Loader} from "../Loader";

const GoodsListEl = styled.div<{isLoading: boolean}>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 50px;
  
  transition: .2s opacity;

  ${props => props.isLoading && `
    opacity: .1;
  `};
  
  @media (max-width: ${theme.media.tab}) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;
  }
  @media (max-width: ${theme.media.tabMd}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }
  @media (max-width: ${theme.media.tabSm}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
  }
`;

type GoodsListProps = {
  items: Goods[],
  loading?: boolean
}

export const GoodsList: React.FC<GoodsListProps> = ({items, loading = false}) => {
  const {removingStatus} = useSelector(goodsSelector)

  return (
    <>
      <GoodsListEl isLoading={loading || removingStatus === 'loading'}>
        {items.map((goods, index) => (
          <CardA {...goods} key={index} />
        ))}
      </GoodsListEl>
      {removingStatus === 'loading' && <Loader/>}
    </>
  );
}

