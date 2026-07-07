import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Philosophy from "@/components/Philosophy";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

/**
 * Renovo Labs — single-page launch + waitlist site.
 * Section order is deliberate: desire (hero, products) → trust
 * (philosophy) → conversion (waitlist) → legal (footer).
 */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Products />
      <Philosophy />
      <Waitlist />
      <Footer />
    </main>
  );
}
