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

    <div className="theme-builders">
      <BuilderHero />
      <Philosophy />
      <Services />
      <Projects />
      <Process />
      <Flexibility />
      <CustomerFeedbackSection font="builder-h2" />
      <FAQSection  font="builder-h2"faqs={faqs} />
      <CTASection />
      <Footer   image={"/Builder/footer.png"} />
    </div>
    </section>
  );
}