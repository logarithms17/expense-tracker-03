import PrimaryButton from "../Buttons/PrimaryButton";
import CurrencyInputBox from "../InputBox/CurrencyInputBox";
import RadioInput from "../InputBox/RadioInput";
import TimeInput from "../InputBox/TimeInput";
import DateInput from "../InputBox/DateInput";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { createTransaction, refreshUser } from "../../redux/authOperations";

const TransactionForm = ({
  handleCategoryClick,
  handleRadioChange,
  categoryInput,
  categoryId,
  setCategoryInput,
}) => {
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const date = formData.get("date");
    const time = formData.get("time");
    const category = categoryId;
    const sum = formData.get("sum");
    const comment = formData.get("comment");
    const type = formData.get("type");

    const transaction = {
      date,
      time,
      category,
      sum,
      comment,
      type,
    };

    dispatch(createTransaction(transaction));

    dispatch(refreshUser());

    setCategoryInput("");

    e.target.reset();
  };
  return (
    <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex items-center gap-5">
        <RadioInput
          title="Expense"
          name="type"
          id="expense"
          value="expenses"
          handleRadioChange={handleRadioChange}
        />
        <RadioInput
          title="Income"
          name="type"
          id="income"
          value="incomes"
          handleRadioChange={handleRadioChange}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <DateInput />
          <TimeInput />
        </div>
        <label htmlFor="category" className="flex-1">
          <p className="pb-3">Category</p>
          <input
            type="text"
            placeholder="Please choose or create a category"
            className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-neutral-500 w-full custom-input-icon`}
            name="category"
            id={categoryId}
            onClick={handleCategoryClick}
            value={categoryInput}
            onChange={() => {}}
          />
        </label>
        <CurrencyInputBox />
        <label htmlFor="" className="flex-1">
          <p className="pb-3">Comment</p>
          <textarea
            placeholder="Enter the text"
            className="bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 w-full text-neutral-500"
            rows="3"
            name="comment"
          />
        </label>
        <div className="flex items-start">
          <PrimaryButton title="Add" icon="" />
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;

TransactionForm.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  categoryInput: PropTypes.string.isRequired,
};
