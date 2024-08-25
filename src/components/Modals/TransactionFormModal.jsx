import PrimaryButton from "../Buttons/PrimaryButton";
import RadioInput from "../InputBox/RadioInput";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { refreshUser, updateTransaction } from "../../redux/authOperations";

const initialTime = () => {
  const date = new Date();
  const pad = (num) => num.toString().padStart(2, "0"); // Pad single-digit numbers
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${hours}:${minutes}`; // Format to HH:mm
};

const initialDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero
  return `${year}-${month}-${day}`;
};

const TransactionFormModal = ({ toggleFormModal, transactionsData }) => {
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  //HANDLE DATE STATE
  const [date, setDate] = useState(initialDate());
  //HANDLE TIME STATE
  const [time, setTime] = useState(initialTime());
  //HANDLE TRANSACTION TYPE
  const [showExpenseTransaction, setShowExpenseTransaction] = useState(false);
  const [showIncomeTransaction, setShowIncomeTransaction] = useState(false);
  //HANDLE SUM VALUE
  const [sum, setSum] = useState(transactionsData.sum);
  //HANDLE COMMENT VALUE
  const [comment, setComment] = useState(transactionsData.comment);

  useEffect(() => {
    if (transactionsData.type === "expenses") {
      setShowExpenseTransaction(true);
      setSelectedTransactionType("expenses");
    } else if (transactionsData.type === "incomes") {
      setShowIncomeTransaction(true);
      setSelectedTransactionType("incomes");
    }
  }, [transactionsData.type]);

  const dispatch = useDispatch();

  // HANDLE CURRENCY NAME
  const currency = useSelector((state) => state.auth.user.currency);
  const uppercaseCurrency = currency.toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const date = formData.get("date");
    const time = formData.get("time");
    const category = transactionsData.category._id;
    const sum = Number(formData.get("sum"));
    const comment = formData.get("comment");
    const type = selectedTransactionType;
    const id = transactionsData._id;

    const transaction = {
      date,
      time,
      category,
      sum,
      comment,
      type,
    };

    dispatch(updateTransaction({ type, id, transaction }));
    dispatch(refreshUser());

    e.target.reset();
    toggleFormModal();
  };

  const handleOverlayClick = (e) => {
    // Check if the click was on the overlay, not on the modal
    if (e.target === e.currentTarget) {
      toggleFormModal();
    }
  };

  const handleRadioChange = (e) => {
    setSelectedTransactionType(e.target.value);
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen bg-stone-950 z-10 opacity-50 top-0 left-0 m-auto overflow-hidden"
        onClick={handleOverlayClick}
      ></div>
      <div className="w-[500px] h-[661px] bg-neutral-900 opacity-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-3xl px-10 py-8">
        <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            
            {showExpenseTransaction && (
              <RadioInput
                title="Expense"
                name="type"
                id="expense"
                value="expenses"
                handleRadioChange={handleRadioChange}
              />
            )}

            {showIncomeTransaction && (
              <RadioInput
                title="Income"
                name="type"
                id="income"
                value="incomes"
                handleRadioChange={handleRadioChange}
              />
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <label htmlFor="date" className="flex-1">
                <p className="pb-3">Date</p>
                <input
                  type="date"
                  className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-neutral-500 w-full custom-input-icon`}
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <label htmlFor="time" className="flex-1">
                <p className="pb-3">Time</p>
                <input
                  type="time"
                  placeholder="00:00"
                  className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-neutral-500 w-full custom-input-icon`}
                  name="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
            </div>

            <label htmlFor="category" className="flex-1">
              <p className="pb-3">Category</p>
              <input
                type="text"
                placeholder="Please choose or create a category"
                className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-neutral-500 w-full custom-input-icon`}
                name="category"
                id={transactionsData.category._id}
                // onClick={handleCategoryClick}
                value={transactionsData.category.categoryName}
                onChange={() => {}}
              />
            </label>

            <div className="flex items-end justify-between overflow-hidden relative">
              <label htmlFor="" className="flex flex-col gap-3 flex-1">
                <p>Sum</p>
                <input
                  type="number"
                  placeholder="Enter the sum"
                  className="p-2 flex-grow outline-none bg-neutral-900 placeholder:text-neutral-500 text-neutral-500 border border-neutral-500 rounded-lg"
                  name="sum"
                  value={sum}
                  onChange={(e) => setSum(e.target.value)}
                />
                <p className="absolute top-11 right-6 text-neutral-500">
                  {uppercaseCurrency}
                </p>
              </label>
            </div>

            <label htmlFor="" className="flex-1">
              <p className="pb-3">Comment</p>
              <textarea
                placeholder="Enter the text"
                className="bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 w-full text-neutral-500"
                rows="3"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>

            <div className="flex items-start">
              <PrimaryButton title="Edit" icon="" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TransactionFormModal;

TransactionFormModal.propTypes = {
  toggleFormModal: PropTypes.func.isRequired,
  transactionsData: PropTypes.object.isRequired,
};
