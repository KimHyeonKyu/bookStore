import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectBoxWrap = styled.div`
    text-align: center;
`;

const SelectBox = ({ options, basketList }) => {
    const [selectValue, setSelectValue] = useState();
 
    const findOptionValue = (e) => {
    setSelectValue(e.target.value);
    basketList.quantity = selectValue;
  }

  return (
    <SelectBoxWrap>
      <select onChange={findOptionValue} value={selectValue}>
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
