import React from "react";
import arrowIcon from "../../assets/arrow-icon.svg";
import image from "../../assets/couple-happy.png";
import FinanceWidget from "./FinanceWidget";

const HeroImage = () => {
  return (
    <section className="relative flex justify-center items-center">
      <FinanceWidget
        total={632.0}
        title="Your balance"
        percentage="+1.29%"
        styles="heroImageWidget"
        textColor="text-black"
        src={arrowIcon}
      />
      <img src={image} alt="couple-happy" />
    </section>
  );
};

export default HeroImage;
