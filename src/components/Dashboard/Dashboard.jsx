import FinanceWidget from "../HeroImage/FinanceWidget";
import arrowIcon from "../../assets/arrow-icon.svg";
import arrowDownIcon from "../../assets/angle-arrow-down.svg";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import TransactionForm from "../TransactionForm/TransactionForm";
import CategoriesModal from "../Modals/CategoriesModal";
import UserSetsModal from "../Modals/UserSetsModal";
import { Notify } from "notiflix";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "../../redux/authOperations";

const Dashboard = ({ showModal, toggleModal }) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  const [chartType, setChartType] = useState("expenses");
  // Toggle Categories Expense Modal
  const [showCategoriesExpenseModal, setShowCategoriesExpenseModal] =
    useState(false);
  // Toggle Categories Incomes Modal
  const [showCategoriesIncomeModal, setShowCategoriesIncomeModal] =
    useState(false);
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to fetch expenses on component mount
    dispatch(refreshUser());
  }, [dispatch]);

  const expenseTotal = useSelector((state) => {
    return state.auth.user.transactionsTotal.expenses;
  });

  const incomeTotal = useSelector(
    (state) => state.auth.user.transactionsTotal.incomes
  );

  // TOGGLE EXPENSE CATEGORIES MODAL
  const toggleModalExpense = () => {
    setShowCategoriesExpenseModal(!showCategoriesExpenseModal);
  };

  // TOGGLE EXPENSE CATEGORIES MODAL
  const toggleModalIncome = () => {
    setShowCategoriesIncomeModal(!showCategoriesIncomeModal);
  };

  // Update the state when a radio button is selected
  const handleRadioChange = (e) => {
    setSelectedTransactionType(e.target.value);
  };

  // TRIGGERS TO OPEN THE MODAL FOR CATEGORY
  const handleCategoryClick = () => {
    if (selectedTransactionType === "") {
      Notify.warning("Please select a transaction type");
      return;
    }

    if (selectedTransactionType === "expenses") {
      setShowCategoriesExpenseModal(true);
    }

    if (selectedTransactionType === "incomes") {
      setShowCategoriesIncomeModal(true);
    }
  };

  // HANDLES THE VALUE OF THE CATEGORY IN THE TRANSACTION FORM
  const handleCategorySelection = (categoryName, _id, title) => {
    setCategoryInput(categoryName);
    setCategoryId(_id);
    if (title === "Expenses") {
      toggleModalExpense();
    }

    if (title === "Incomes") {
      toggleModalIncome();
    }
  };

  return (
    <main className="flex lg:flex-row sm:flex-col lg:gap-9 md:gap-1">
      {showCategoriesExpenseModal && (
        <CategoriesModal
          title="Expenses"
          toggleModalExpense={toggleModalExpense}
          handleCategorySelection={handleCategorySelection}
        />
      )}
      {showCategoriesIncomeModal && (
        <CategoriesModal
          title="Incomes"
          toggleModalExpense={toggleModalIncome}
          handleCategorySelection={handleCategorySelection}
        />
      )}
      {showModal && (
        <UserSetsModal title="Profile Settings" toggleModal={toggleModal} />
      )}

      <section>
        <h1 className="mt-[59px]">Expense Log</h1>
        <p className="description mt-5">
          Capture and organize every penny spent with ease! A clear view of you
          financial habits
          <br /> at your fingertips.
        </p>
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <FinanceWidget
            total={incomeTotal}
            title="Total Income"
            src={arrowIcon}
            percentage=""
            styles="dashboardWidget"
            textColor="text-white"
            setChartType={setChartType}
          />
          <FinanceWidget
            total={expenseTotal}
            title="Total Expense"
            src={arrowDownIcon}
            percentage=""
            styles="dashboardWidget"
            textColor="text-white"
            setChartType={setChartType}
          />
        </div>

        <div className="order-last">
          <ExpenseChart chartType={chartType} />
        </div>
      </section>
      <section className="mt-14 p-8 bg-neutral-900 rounded-3xl lg:w-[600px]">
        <TransactionForm
          handleCategoryClick={handleCategoryClick}
          handleRadioChange={handleRadioChange}
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          categoryId={categoryId}
        />
      </section>
    </main>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
