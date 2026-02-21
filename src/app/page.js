import Image from "next/image";
import Hero from "@/Components/hero";
import PropertiesSection from "@/Components/PropertiesSection";
import VirtualTourSection from "@/Components/VirtualTourSection";
import FeaturedProjectSection from "@/Components/FeaturedProjectSection";
import CustomerFeedbackSection from "@/Components/CustomerFeedbackSection";
import FaqSection from "@/Components/FaqSection";
import  {homePage}  from "@/Data/homePage";
import CtaBannerSection from "@/Components/CtaBannerSection";
import VisionSection from "@/Components/VisionSection";
import DesignSection from "@/Components/DesignSection";
import CraftedSection from "@/Components/CraftedSection";
import PrecisionSection from "@/Components/PrecisionSection";
import TradingRules from "@/Components/TradingRules";
const {faqs}=homePage
export default function Home() {
  return (
   <div>
    <Hero/>
    <PropertiesSection/>
    <VirtualTourSection/>
    <FeaturedProjectSection/>
    <CustomerFeedbackSection/>
    <FaqSection faqs={faqs}/>
    <CtaBannerSection/>
    <VisionSection/>
    <DesignSection/>
    <PrecisionSection/>
    <TradingRules/>
    <CraftedSection/>
   </div>
  );
}
