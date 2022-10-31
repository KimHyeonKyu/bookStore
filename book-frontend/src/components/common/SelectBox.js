import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SelectBoxWrap = styled.div`
    text-align: center;
`;

const SelectBox = ({ options, basketList, setBasketList, checkLogin}) => {
  const selectList = async e => {
    await axios.put(`/api/basket/updateItem?_id=${basketList._id}&quantity=${e.target.value}`);

    let response = await axios.get(`/api/basket/output?id=${checkLogin}`);
    setBasketList(response.data);
  }
  return (
    <SelectBoxWrap>
      <select onChange={selectList}>
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
