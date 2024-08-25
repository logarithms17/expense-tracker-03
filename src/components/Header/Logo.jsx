import { Link } from "react-router-dom";
import logo from "../../assets/Icon.svg";

const Logo = () => {
  return (
    <Link to="/dashboard">
      <div className="flex justify-center items-center h-full">
        <img src={logo} alt="logo" style={{ width: "27px", height: "16px" }} />
        <p className="font-bold md:text-2xl px-1 sm:text-xl">EXPENSETRACKER</p>
      </div>
    </Link>
  );
};

export default Logo;
