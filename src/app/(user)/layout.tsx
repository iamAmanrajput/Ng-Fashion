import Navbar from "@/components/custom/common/Navbar";
import Footer from "@/components/custom/common/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-screen">{children}</main>
      <Footer />
    </>
  );
}
