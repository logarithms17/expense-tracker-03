import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

const CurrencyDropDown = ({ display, border, extraData, textColor }) => {
  const userCurrency = useSelector((state) => state.auth.user.currency);
  const capitalizeCurrency = userCurrency.toUpperCase();

  const [currency, setCurrency] = useState(capitalizeCurrency);

  useEffect(() => {
    setCurrency(capitalizeCurrency); // Update the currency state after the component mounts
  }, [capitalizeCurrency]);

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className={` bg-neutral-900 ${textColor} outline-none ${display} ${border} bottom-[10px] right-2 px-2 ${extraData}`}
      name="currency"
    >
      <option value="uah">₴ UAH</option>
      <option value="usd">$ USD</option>
      <option value="eur">€ EUR</option>
    </select>
  );
};

export default CurrencyDropDown;

CurrencyDropDown.propTypes = {
  display: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
  extraData: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
