import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  display: block;
  width: 200px;
`;

export default ({ onSearch }) => {
  const onChange = (e) => {
    onSearch(e.target.value);
  };
  return <SearchInput onChange={onChange} placeholder="搜索"></SearchInput>;
};
