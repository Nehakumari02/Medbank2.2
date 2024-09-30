import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout({ children }: any) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
