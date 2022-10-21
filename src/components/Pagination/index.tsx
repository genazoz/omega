import React from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {filterSelector, setCurrentPage} from "../../features/filter/filterSlice"

import theme from "../../theme";
import ReactPaginate from "react-paginate";

const PaginationWrapper = styled.div`
  width: max-content;
  margin: 30px 0 0;
  padding: 10px;
  
  background: #69cbe3;
  box-shadow: 0 5px 0px 0px #5ea6b9;
  border-radius: 50px;

  .next, .previous {
    display: none;
      
    a {
      color: ${theme.colors.pink};
    }

    &.disabled {
      pointer-events: none;

      a {
        color: #3e3d55;
      }
    }
  }

  .selected {
    width: 25px;
    height: 25px;

    border-radius: 50%;
    background: ${theme.colors.pink};

    &.disabled {
      pointer-events: none;
      background: #191838;
    }
  }

  ul {
    display: flex;
    align-items: center;
  }

  li {
    width: 25px;
    height: 25px;
    margin: 0 6px;

    cursor: pointer;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      font-size: 13px;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
  }
`;

export const Pagination: React.FC<{ goodsPerPage: number }> = ({goodsPerPage}) => {
  const dispatch = useDispatch();
  const {countOfPages, currentPage} = useSelector(filterSelector);

  return (
    <PaginationWrapper>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={goodsPerPage}
        pageCount={countOfPages}
        previousLabel="<"
        forcePage={currentPage - 1}
      />
    </PaginationWrapper>
  );
}
