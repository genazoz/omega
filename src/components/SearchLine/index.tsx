import React, {ChangeEvent, useRef} from "react";
import styled from "styled-components";
import debounce from 'lodash.debounce'
import {filterSelector, setSearchQuery} from "../../features/filter/filterSlice";

import theme from "../../theme";
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";

const SearchWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  padding: 5px 20px 0;

  cursor: pointer;
  border-radius: 15px;
  background: #ff7dd1;
  box-shadow: 0 5px 0px 0px #3c2c31;
`;
const Search = styled.input`
  width: 100%;
  padding: 13px 0px;

  font-size: 25px;
  font-family: ${theme.fonts.bebasB};
  color: #ffffff;

  background: transparent;
  border: unset;

  &::placeholder {
    color: #d861ae; 
  }

  &:focus + span,
  &:not(:placeholder-shown) + span {
    width: 100%;
  }
`;
const CloseButton = styled.i`
  position: absolute;
  right: 0;

  padding: 10px;
`

export const SearchLine: React.FC = () => {
  const dispatch = useAppDispatch();
  const {searchQuery} = useSelector(filterSelector);
  const [value, setValue] = React.useState(searchQuery);
  const searchRef = useRef<HTMLInputElement>(null);

  const changeSearch = React.useCallback(debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  }, 300), [])

  const onChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    changeSearch(e);
  }

  const resetSearchQuery = () => {
    setValue('');
    dispatch(setSearchQuery(''));
    searchRef.current?.focus();
  }

  return (
    <SearchWrapper>
      <Search ref={searchRef} value={value} type={"text"} placeholder={"Поиск товара..."}
              onChange={(e) => onChangeSearchQuery(e)}/>
      {value && (<CloseButton className="fal fa-times" onClick={resetSearchQuery}></CloseButton>)}
    </SearchWrapper>);
}
