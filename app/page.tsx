import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";

export default async function Page() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Features />
        <Footer />
      </div>
    </>
  );
}
