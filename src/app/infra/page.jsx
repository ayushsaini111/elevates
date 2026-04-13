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

        <div className="theme-infra ">
          <Hero/>
          <Philosophy />
          <Expertise />
          <Process />
          <Projects />
          <WhyWorkSection/>
        <CustomerFeedbackSection font="infra-h2" />
        <FAQSection faqs={faqs} font="infra-h2" />
        <CTASection />
        <Footer image={"/Builder/footer.png"} />
        </div>
      </section>
    </>
  );
}