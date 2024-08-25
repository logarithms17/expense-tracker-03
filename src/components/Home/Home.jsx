import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";
import UserImage from "./UserImage";
import HeroImage from "../HeroImage/HeroImage";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-2 mt-12 gap-10 lg:px-0 md:px-10">
      <HeroImage />
      <section className="flex flex-col lg:justify-between lg:order-last sm:order-first">
        <div>
          <p className="text-neutral-500 text-[15px]">EXPENSE LOG</p>
          <h1>
            Manage Your{" "}
            <span className="text-green-400 underline underline-offset-8 decoration-4">
              Finances
            </span>
            <br />
            Masterfully!
          </h1>
          <p className="description py-8">
            ExpenseTracker effortlessly empowers you to take control of your
            finances! <br />
            With intuitive features, it simplifies the process of tracking and
            managing <br />
            expenses, allowing for a stress-free mastery over your financial
            world.
          </p>
          <div className="flex gap-6">
            <Link to="/signup">
              <PrimaryButton title="Sign Up" icon="" />
            </Link>
            <Link to="/signin">
              <SecondaryButton
                title="Sign in"
                styles="secondaryButton"
                icon=""
              />
            </Link>
          </div>
        </div>

        <div className="sm:hidden lg:flex gap-7">
          <div>
            <div className="flex items-center space-x-[-10px] ">
              <UserImage user={user1} alt="user1" z="z-20" />
              <UserImage user={user2} alt="user2" z="z-10" />
              <UserImage user={user3} alt="user3" z="z-5" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl">1000 users+</p>
            <p className="description">
              Trusted by users for reliable <br />
              expense tracking!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
