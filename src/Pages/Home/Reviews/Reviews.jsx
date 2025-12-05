import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SharedSectionHeader from "../../../Components/SharedSectionHeader/SharedSectionHeader";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="py-20">
      <SharedSectionHeader
        parentClass="mx-auto"
        title="What our customers are sayings"
        titleClass="text-secondary"
        subtitle="Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!"
      />

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: "15%",
          depth: 50,
          modifier: 1,
          scale: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review, id) => (
          <SwiperSlide key={id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
