import axios from "axios";
import styled from "styled-components";

const CheckBlock = styled.div`
  display: flex;
  align-items: center;
`;

const RadioBtn = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
  opacity: 0.7;
`;

const RadioButton = ({
  type,
  id,
  memberId,
  value,
  text,
  inputStatus,
  setInputStatus,
  setTotalPrice,
  form,
  setForm,
  setZipCode,
  setFullAddress,
  setAddress,
}) => {
  const handleClickRadioButton = async (e) => {
    setInputStatus(id);

    if (type === "gift") {
      setTotalPrice(e.target.value);
    }

    if (id === "sameInform") {
      let response = await axios.get(`/api/auth/output?id=${memberId}`);
      const [addressFirst, addressSeccond, addressThird] =
        response.data[0].address.split("/");
      setForm({
        ...form,
        orderUser: response.data[0].userName,
        receiveUser: response.data[0].userName,
        phoneNumber: response.data[0].phoneNumber,
      });
      setZipCode(addressFirst);
      setFullAddress(addressSeccond);
      setAddress(addressThird);
    }

    if (id === "newInform") {
      setForm({
        ...form,
        orderUser: "",
        receiveUser: "",
        phoneNumber: "",
      });
      setZipCode("");
      setFullAddress("");
      setAddress("");
    }
  };

  return (
    <CheckBlock>
      <RadioBtn
        type="radio"
        id={id}
        value={value}
        checked={inputStatus === id}
        onChange={handleClickRadioButton}
      />
      <label>{text}</label>
    </CheckBlock>
  );
};

export default RadioButton;
