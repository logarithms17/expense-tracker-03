import { useEffect, useState } from "react";
import FinanceWidget from "../HeroImage/FinanceWidget";
import arrowIcon from "../../assets/arrow-icon.svg";
import arrowDownIcon from "../../assets/angle-arrow-down.svg";

import PropTypes from "prop-types";
import SearchBar from "../InputBox/SearchBar";
import Table from "../Table/Table";

import TransactionFormModal from "../Modals/TransactionFormModal";

import { useSelector, useDispatch } from "react-redux";
import { getTransactions } from "../../redux/authOperations";
import UserSetsModal from "../Modals/UserSetsModal";

const AllExpenseTab = ({ title, showModal, toggleModal }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionsData, setTransactionsData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const dispatch = useDispatch();

  const toggleFormModal = () => setShowTransactionForm((prev) => !prev);

  const expenseTotal = useSelector(
    (state) => state.auth.user.transactionsTotal.expenses
  );

  const incomeTotal = useSelector(
    (state) => state.auth.user.transactionsTotal.incomes
  );

  const data = useSelector((state) => {
    return state.auth.transactions.data;
  });

  const handleOpenModal = (item) => {
    setShowTransactionForm(true);
    setTransactionsData(item);
  };

  // Assuming that state.auth.transactions holds the fetched data, status, and error

  useEffect(() => {
    // Dispatch the action to fetch expenses on component mount
    dispatch(getTransactions({ type: "expenses" }));
  }, [dispatch]);

  useEffect(() => {
    if (!showTransactionForm) {
      dispatch(getTransactions({ type: "expenses" }));
    }
  }, [showTransactionForm, dispatch]);

  // filter functionality
  let filteredData;
  if (searchQuery) {
    filteredData = data.filter((transaction) => {
      return transaction.category.categoryName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  } else if (searchDate) {
    filteredData = data.filter((transaction) => {
      return transaction.date.toLowerCase().includes(searchDate.toLowerCase());
    });
  } else {
    filteredData = data;
  }

  console.log(transactionsData);

  return (
    <>
      <div className="flex lg:flex-row sm:flex-col lg:items-end justify-between relative">
        {showModal && (
          <UserSetsModal title="Profile Settings" toggleModal={toggleModal} />
        )}

        {showTransactionForm && (
          <TransactionFormModal
            toggleFormModal={toggleFormModal}
            transactionsData={transactionsData}
          />
        )}

        <div className="flex flex-col sm:mb-10 lg:mb-0">
          <h1 className="mt-[59px]">{title}</h1>
          <p className="description mt-5 md:w-[499px]">
            View and Manage every transaction seamlessly! Your entire financial
            landscape, all in one place.
          </p>
        </div>

        <div className="flex md:flex-row sm:flex-col gap-6">
          <FinanceWidget
            total={incomeTotal}
            title="Total Income"
            src={arrowIcon}
            percentage=""
            styles="dashboardWidget"
            textColor="text-white"
          />
          <FinanceWidget
            total={expenseTotal}
            title="Total Expense"
            src={arrowDownIcon}
            percentage=""
            styles="dashboardWidget"
            textColor="text-white"
          />
        </div>
      </div>
      <div>
        <div className="bg-neutral-900 py-5 rounded-3xl my-10 lg:h-[439px] mg:h-[504px] md:w-full">
          <SearchBar
            setSearchQuery={setSearchQuery}
            setSearchDate={setSearchDate}
          />
          <Table data={filteredData} handleOpenModal={handleOpenModal} />
        </div>
      </div>
    </>
  );
};

export default AllExpenseTab;

AllExpenseTab.propTypes = {
  title: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
