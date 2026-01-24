"use client";

import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../public/logo.jpeg";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          {/* <Image src={logo} alt="NG Store Logo" width={40} height={40} /> */}
          <span className="text-xl font-semibold tracking-wide">NG Store</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="relative hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="relative">
                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    href={item.href}
                    className={`relative pb-1 transition ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}

                    {/* Underline */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-underline"
                        className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-foreground"
                      />
                    )}
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <motion.div
            key={open ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="border-t border-border/40 bg-background/80 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-6 px-4 py-6">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <motion.li
                  key={item.href}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`relative inline-block pb-1 ${
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}

                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-foreground" />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
