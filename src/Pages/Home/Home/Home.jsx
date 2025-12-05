import React from "react";
import Banner from "../Banner/Banner";
import HowWork from "../HowWork/HowWork";
import Brands from "../brands/brands";
import Reviews from "../Reviews/Reviews";
import LoadingSipper from "../../../Components/LoadingSpinner/LoadingSipper";

// Reviews Data Promise
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowWork />
      <Brands />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
