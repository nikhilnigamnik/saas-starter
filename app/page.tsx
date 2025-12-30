import { Cta, Features, Footer, Hero, Navbar, Pricing } from '@/components/layout';

export default function page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Cta />
      <Pricing />
      <Footer />
    </main>
  );
}
