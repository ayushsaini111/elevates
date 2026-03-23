import Footer from '@/Components/Footer'
import Hero from '@/Components/Civil/hero'
import VisionSection from '@/Components/VisionSection'
import React from 'react'
import ServiceIntro from '@/Components/Civil/ServiceIntro'
import ConstructionModels from '@/Components/Civil/ConstructionModels'
import ProjectsCarousel from '@/Components/Civil/ProjectsCarousel'
import ConstructionProcess from '@/Components/Civil/ConstructionProcess'
import CustomerFeedbackSection from '@/Components/Civil/CustomerFeedbackSection'
import QualitySection from '@/Components/Civil/QualitySection'
import FaqSection from '@/Components/FaqSection'
import  {civilData}  from "@/Data/civil";
import CTASection from '@/Components/Civil/CTASection'

const {faqs}=civilData

function page() {
  return (
    <div>
      <Hero/>
      <ServiceIntro/>
      <ConstructionModels/>
      <ProjectsCarousel/>
      <ConstructionProcess/>
      <QualitySection/>
      <CustomerFeedbackSection/>
    <FaqSection faqs={faqs}/>
<CTASection/>
      <Footer image={"/Civil/footer.png"} />
    </div>
  )
}

export default page