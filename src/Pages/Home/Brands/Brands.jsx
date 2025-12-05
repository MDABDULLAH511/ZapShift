import React from "react";
import SharedSectionHeader from "../../../Components/SharedSectionHeader/SharedSectionHeader";
import Marquee from "react-fast-marquee";
import logoImage1 from "../../../assets/brands/amazon.png";
import logoImage2 from "../../../assets/brands/amazon_vector.png";
import logoImage3 from "../../../assets/brands/casio.png";
import logoImage4 from "../../../assets/brands/moonstar.png";
import logoImage5 from "../../../assets/brands/randstad.png";
import logoImage6 from "../../../assets/brands/star.png";
import logoImage7 from "../../../assets/brands/start_people.png";

import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";

const Brands = () => {
  const brandsLogo = [
    logoImage1,
    logoImage3,
    logoImage4,
    logoImage5,
    logoImage2,
    logoImage6,
    logoImage7,
  ];

  return (
    <div className="py-20">
      <SharedSectionHeader
        parentClass="mx-auto"
        title="We've helped thousands of sales teams"
        titleClass="text-secondary"
      />
      <Marquee speed={50}>
        <div className="flex items-center gap-10">
          {brandsLogo.map((logo, index) => (
            <img key={index} src={logo} alt="" />
          ))}
        </div>
      </Marquee>
    </div>
  );
};
export default Brands;
