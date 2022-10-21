import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../app/store";
import {setFilters} from "../features/filter/filterSlice";
import {fetchGoods} from "../features/goods/goodsSlice";
import {fetchCountOfPages} from "../features/filter/filterSlice";
import {useSearchParams} from 'react-router-dom';
import {setShowCart, setShowCreateProductModal, settingsSelector} from "../features/settings/settingsSlice";
import {filterSelector} from "../features/filter/filterSlice";
import {goodsSelector} from "../features/goods/goodsSlice";

import {GoodsList, SearchLine, Pagination} from "../components";
import theme from "../theme";
import Logo from "../components/Logo";
import {Loader} from "../components/Loader";
import AuthModal from "../components/CreateProductModal";
import {cartSelector} from "../features/cart/cartSlice";
import {ButtonStyles} from "../globalStyles";

const Catalog = styled.div`
  padding-top: 80px;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Wrapper = styled.div`
  flex: 1;
  min-width: 320px;
  height: max-content;
  min-height: calc(100vh - 130px);
  margin: 0 0 100px 0;
  padding: 0 var(--unit);
`;
const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  margin: auto;
  padding: 60px 0 120px 0;

  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    padding: 8px 30px 0 30px;

    font-size: 80px;

    box-shadow: 0 10px 0px 0px #3c2c31;

    @media (max-width: ${theme.media.tab}) {
      font-size: 50px;
    }
    @media (max-width: ${theme.media.mob}) {
      font-size: 30px;
    }
  }
`;
const CartIndicator = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  padding: 2px 0 0;

  font-family: ${theme.fonts.bebasB};
  font-size: 15px;
  color: #FFFFFF;

  cursor: pointer;
  background: #d861ae;
  border-radius: 50%;

  @media (max-width: ${theme.media.tab}) {
    padding-top: 1px;
  }
`;
const ButtonCart = styled(ButtonStyles)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;
const ButtonAdd = styled(ButtonStyles)`
  margin: 0;
`
const Header = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 0 35px;

  @media (max-width: ${theme.media.mob}) {
    flex-direction: column;
  }
`
const SearchLineWrapper = styled.div`
  width: 100%;
`

function CatalogPage() {
  const dispatch = useAppDispatch();
  const {goodsPerPage} = useSelector(settingsSelector);
  const {currentPage, searchQuery, countOfPages} = useSelector(filterSelector);
  const {items, status} = useSelector(goodsSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const {totalCount} = useSelector(cartSelector);
  const {showCart} = useSelector(settingsSelector);

  const onClickUserButton = () => {
    dispatch(setShowCreateProductModal(true));
  };

  const onClickShowCartButton = () => {
    dispatch(setShowCart(!showCart));
  };

  React.useEffect(() => {
    const currentPageParam = parseInt(`${searchParams.get('page')}`);
    const currentPageResult: number = currentPageParam || 1;

    dispatch(setFilters({currentPage: currentPageResult}));
  }, [])

  React.useEffect(() => {
    if (!currentPage)
      return;

    const querySearch = searchQuery ? `&search=${searchQuery}` : "";
    const fetchGoodsParams = {querySearch, goodsPerPage, currentPage};
    const fetchCountOfPagesParams = {querySearch, goodsPerPage};

    dispatch(fetchGoods(fetchGoodsParams))
    dispatch(fetchCountOfPages(fetchCountOfPagesParams))
  }, [searchQuery, currentPage]);

  React.useEffect(() => {
    const params: { page?: string } = {};

    if (currentPage && currentPage !== 1) {
      params.page = `${currentPage}`;
    }

    setSearchParams(params)
  }, [currentPage]);

  return (<Catalog>
    <Wrapper>
      <Header>
        <SearchLineWrapper>
          <SearchLine/>
        </SearchLineWrapper>
        <ButtonCart onClick={onClickShowCartButton}>
          {totalCount > 0 && (
            <CartIndicator>{totalCount}</CartIndicator>
          )}
          Корзина
        </ButtonCart>
        <ButtonAdd theme={'green'} onClick={onClickUserButton}>
          Создать товар
        </ButtonAdd>
        <AuthModal selector='#modal-root'/>
      </Header>
      {
        status === 'error'
          ? (
            <ErrorInfo>
              <Logo text={'Произошла ошибка'}></Logo>
            </ErrorInfo>
          )
          : (
            <>
              {status === 'loading' && <Loader/>}
              <GoodsList items={items} loading={status === 'loading'}/>
              {items.length > 0 && countOfPages > 1 && (<Pagination goodsPerPage={goodsPerPage}/>)}
            </>)
      }
    </Wrapper>
  </Catalog>);
}

export default CatalogPage;
