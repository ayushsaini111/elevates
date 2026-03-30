import Flexibility from "@/Components/Builder/Flexibility";
import BuilderHero from "@/Components/Builder/hero";
import Philosophy from "@/Components/Builder/Philosophy";
import Process from "@/Components/Builder/process";
import Projects from "@/Components/Builder/Projects";
import Services from "@/Components/Builder/Services";
import CTASection from "@/Components/Builder/CTASection";
import CustomerFeedbackSection from "@/Components/CustomerFeedbackSection";
import FAQSection from "@/Components/FaqSection";
import Footer from "@/Components/Footer";
import { builderData } from "@/Data/builder";

const { faqs } = builderData
export default function Page() {
  return (
    <section>

    <div className="theme-builders space-y-s80 md:space-y-s160">
      <BuilderHero />
      <Philosophy />
      <Services />
      <Projects />
      <Process />
      <Flexibility />
    </div>
      <CustomerFeedbackSection />
      <FAQSection faqs={faqs} />
      <CTASection />
      <Footer   image={"/Builder/footer.png"} />
    </section>
  );
}