import CustomerFeedbackSection from "@/Components/CustomerFeedbackSection";
import FAQSection from "@/Components/FaqSection";
import Footer from "@/Components/Footer";
import CTASection from "@/Components/Infra/CTASection";
import Expertise from "@/Components/Infra/Expertise";
import Hero from "@/Components/Infra/Hero";
import Philosophy from "@/Components/Infra/Philosophy";
import Process from "@/Components/Infra/Process";
import Projects from "@/Components/Infra/Projects";
import WhyWorkSection from "@/Components/Infra/whyworks";
import { infraData } from "@/Data/infra";

const { faqs } = infraData

export default function Page() {
  return (
    <>
      <section>

        <div className="theme-infra space-y-s80 md:space-y-s160">
          <Hero/>
          <Philosophy />
          <Expertise />
          <Process />
          <Projects />
          <WhyWorkSection/>
        </div>
        <CustomerFeedbackSection />
        <FAQSection faqs={faqs} />
        <CTASection />
        <Footer image={"/Builder/footer.png"} />
      </section>
    </>
  );
}