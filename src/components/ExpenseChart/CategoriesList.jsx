import PropTypes from "prop-types";

const CategoriesList = ({ data }) => {
  return (
    <ul className="h-[130px] flex flex-col gap-[10px] scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 overflow-hidden hover:overflow-y-auto">
      {data.map(({ name, value, color }, index) => (
        <li
          key={index}
          className="text-black flex justify-between"
          style={{ color: color }}
        >
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-[6px] mr-3"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <p className="description">{name}</p>
          </div>
          <p className="text-white font-semibold mr-2">{value}%</p>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;

CategoriesList.propTypes = {
  data: PropTypes.array.isRequired,
};
