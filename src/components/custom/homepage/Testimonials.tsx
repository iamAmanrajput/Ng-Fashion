"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Delhi, India",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "Absolutely loved the quality and fit. The fabric feels premium and the design is very classy.",
  },
  {
    id: 2,
    name: "Rohit Verma",
    location: "Mumbai, India",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "NG Fashion exceeded my expectations. Fast delivery and amazing craftsmanship.",
  },
  {
    id: 3,
    name: "Sneha Kapoor",
    location: "Bangalore, India",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Stylish outfits and very comfortable to wear. Will definitely shop again!",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl py-10">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-muted-foreground">
          Trusted by customers across India
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="h-full">
              <CardContent className="flex h-full flex-col justify-between p-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < item.rating
                          ? "fill-foreground text-foreground"
                          : "text-muted-foreground"
                      }
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mb-6 text-sm text-muted-foreground">
                  “{item.review}”
                </p>

                {/* User */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium font-sora">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
