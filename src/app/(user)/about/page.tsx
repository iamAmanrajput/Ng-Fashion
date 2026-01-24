"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Sparkles, Target, Eye, Scissors, Leaf, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Modern Design",
    text: "Clean silhouettes with contemporary aesthetics.",
  },
  {
    icon: Scissors,
    title: "Craftsmanship",
    text: "Attention to detail in every stitch.",
  },
  {
    icon: Leaf,
    title: "Quality Fabrics",
    text: "Carefully selected premium materials.",
  },
  {
    icon: Users,
    title: "Customer First",
    text: "Designed with real people in mind.",
  },
];

const About = () => {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            About NG Store
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A modern fashion brand crafting timeless designs with premium
            fabrics, thoughtful details, and a focus on effortless style.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid gap-14 md:grid-cols-2"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-3xl font-semibold tracking-tight">Our Story</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              NG Fashion was born from a passion for creating clothing that
              feels as good as it looks. We believe fashion should be
              expressive, effortless, and timeless — not driven by fleeting
              trends.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every piece reflects our commitment to quality, comfort, and
              modern aesthetics, designed for people who value confidence and
              individuality.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220 }}
              >
                <Card className="group border-border/50 transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <item.icon className="mb-4 h-6 w-6 transition-transform group-hover:scale-110" />
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid gap-8 md:grid-cols-2"
        >
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To create premium fashion that blends comfort, quality, and modern design — making everyday style effortless.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              text: "To become a trusted fashion brand known for timeless designs, ethical practices, and exceptional craftsmanship.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-8">
                  <item.icon className="mb-5 h-7 w-7" />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Discover Our Collection
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore designs crafted with passion, precision, and purpose.
          </p>

          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now</Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
