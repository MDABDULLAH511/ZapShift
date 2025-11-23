import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import BannerBtn from "./BannerBtn";

const Banner = () => {
  return (
    <div className="py-8">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        stopOnHover={false}
        showStatus={false}
        showIndicators={false}
      >
        <div className="relative ">
          <img src={banner1} />
          <BannerBtn className={"bottom-25"} />
        </div>
        <div className="relative ">
          <img src={banner2} />
          <BannerBtn className={"bottom-25"} />
        </div>
        <div className="relative ">
          <img src={banner3} />
          <BannerBtn className={"bottom-32"} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
