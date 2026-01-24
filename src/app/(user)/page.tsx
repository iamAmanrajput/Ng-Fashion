import Carousel from "@/components/custom/homepage/Carousel";
import FeaturedProducts from "@/components/custom/homepage/FeaturedProducts";
import Testimonials from "@/components/custom/homepage/Testimonials";
import React from "react";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <section className="py-4">
        <Carousel />
      </section>

      <section>
        <FeaturedProducts />
      </section>

      <section>
        <Testimonials />
      </section>
    </main>
  );
};

export default Home;
