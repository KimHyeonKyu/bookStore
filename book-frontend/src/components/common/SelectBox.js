import React from "react";
import styled from "styled-components";

const SelectBoxWrap = styled.div`
    text-align: center;
`;

const SelectBox = ({ options }) => {
  return (
    <SelectBoxWrap>
      <select>
        <option hidden>수량</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </SelectBoxWrap>
  );
};

export default SelectBox;
