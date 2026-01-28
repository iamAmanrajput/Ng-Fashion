"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e",
    alt: "Fashion model wearing modern outfit",
  },
  {
    src: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f",
    alt: "Luxury fashion clothing",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    alt: "Designer fashion shoot",
  },
];

const Carousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="w-full h-120 rounded-2xl overflow-hidden"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-full w-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
