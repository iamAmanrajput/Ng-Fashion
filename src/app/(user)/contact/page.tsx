"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactSchemaType } from "@/schema/contact.schema";
import axios from "axios";
import { EMAIL } from "@/utils/helper";

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "";

const Contact = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  const submitHandler = async (data: ContactSchemaType) => {
    setSuccess(false);

    if (!FORMSPREE_URL) {
      console.error("Formspree URL is missing");
      return;
    }

    try {
      const res = await axios.post(FORMSPREE_URL, data, {
        headers: {
          Accept: "application/json",
        },
      });

      if (res.status === 200) {
        setSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <h1 className="text-4xl font-sora md:text-5xl font-semibold tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Have a question or need help? We’d love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-14 md:grid-cols-2">
          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-semibold tracking-tight">
              Contact Information
            </h2>

            <Card className="border-border/50">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5" />
                  <p className="text-muted-foreground">
                    Agar Nagar, Prem Nagar - III, Delhi - 110086
                    <br />
                    New Delhi, India
                  </p>
                </div>

                <div className="flex items-start gap-4 hover:text-blue-600 transition duration-200">
                  <Mail className="mt-1 h-5 w-5" />
                  <Link
                    href={`mailto:${EMAIL}`}
                    className="text-muted-foreground hover:text-blue-600 transition duration-200"
                  >
                    {EMAIL}
                  </Link>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5" />
                  <p className="text-muted-foreground">+91 81308 09132</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-8">
                <h3 className="mb-6 text-2xl font-semibold">
                  Send us a message
                </h3>

                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <Input
                      type="text"
                      placeholder="Enter your Name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={18} />
                  </Button>

                  {success && (
                    <p className="text-sm text-green-600 text-center">
                      Message sent successfully. We’ll get back to you soon!
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section className="mx-auto max-w-7xl px-4 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-border/50"
        >
          <iframe
            title="NG Store Location"
            src="https://www.google.com/maps?q=28.6983931,77.0402507&output=embed"
            className="h-100 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;
