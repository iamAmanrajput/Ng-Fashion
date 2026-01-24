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
    src: "https://images.unsplash.com/photo-1618232468971-54188a224417?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Fashion model wearing modern outfit",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
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
