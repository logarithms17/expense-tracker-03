import PropTypes from "prop-types";
import Icons from "../Icons/Icons";
import check from "../../assets/check.svg";
import trash from "../../assets/trash-2.svg";
import edit from "../../assets/edit-icon.svg";

import { deleteCategory } from "../../redux/authOperations";

import { useSelector, useDispatch } from "react-redux";

const CategoryList = ({
  handleButtonChange,
  handleCategorySelection,
  title,
}) => {
  const categoryList =
    useSelector((state) =>
      title === "Expenses"
        ? state.auth.user.categories.expenses
        : state.auth.user.categories.incomes
    ) || []; // create an empty array if undefined

  const dispatch = useDispatch();

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <ul className="h-[200px] flex flex-col gap-2 scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-900 overflow-hidden overflow-y-scroll scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl">
      {categoryList.map(({ categoryName, _id }) => (
        <li key={_id} className="py-2 text-lg flex justify-between">
          {categoryName}
          <div className="flex mr-4 gap-3">
            <button
              onClick={(e) => handleCategorySelection(categoryName, _id, title)}
            >
              <img src={check} alt="" />
            </button>
            <button onClick={(e) => handleButtonChange(_id, categoryName)}>
              <img src={edit} alt="" />
            </button>
            <Icons
              icon={trash}
              handleDeleteCategory={handleDeleteCategory}
              id={_id}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;

CategoryList.propTypes = {
  title: PropTypes.string.isRequired,
  handleButtonChange: PropTypes.func.isRequired,
  handleCategorySelection: PropTypes.func.isRequired,
};
