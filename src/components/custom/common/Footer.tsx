"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, Facebook, Twitter, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4 py-16"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-sora tracking-wide">
              NG Store
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              NG Store designs and manufactures its own apparel, ensuring
              consistent quality, perfect fit, and modern style.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium font-sora uppercase tracking-wider">
              Follow Us
            </h4>

            <div className="flex gap-4">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/ngfashionstore.in/",
                },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/profile.php?id=61561559403800",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-full border p-2 text-muted-foreground hover:text-foreground"
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="text-sm font-sora font-medium uppercase tracking-wider">
              Contact
            </h4>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin size={18} />
                New Delhi, India
              </p>
              <p className="flex items-start gap-2">
                <Mail size={18} />
                ngfashion9554@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NG Store. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
