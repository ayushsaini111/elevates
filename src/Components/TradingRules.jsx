

"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

function TradingRules() {
  const pathRef = useRef(null)
  const endRef = useRef(null)

useEffect(() => {
  if (!pathRef.current) return

  const path = pathRef.current
  const length = path.getTotalLength()

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  const animation = gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: path,
      start: "top center",
      end: "bottom 90%",
      scrub: true,
    },
  })

  ScrollTrigger.refresh()

  return () => {
    animation.scrollTrigger?.kill()
    animation.kill()
  }
}, [])

  return (
    <section className="overflow-hidden   lg:px-0 ">

      {/* Heading */}
      <div className=" max-w-7xl mx-auto text-center px-s32 text-cente heading-h2 mb-s80 sm:mb-[200px]">
        <p>From Land Purchase</p>
<p>to Final Home Seamlessly Delivered</p>
<p><span className="underline">by</span> <span>One Group</span></p>
      </div>

      {/* Blob Container */}
      <div className="relative w-full max-w-[1760px] mx-auto pt-[150px] md:pt-[150px]">
        <svg className="w-full z-50 h-auto transition scale-170 -translate-x-13 -translate-y-10 lg:scale-110 " xmlns="http://www.w3.org/2000/svg" width="1761" height="1542" viewBox="0 0 1761 1542" fill="none">
          <path ref={pathRef} d="M-23 501.234C34.7266 530.21 382.788 750.859 476.506 571.952C535.79 458.779 287.635 233.123 517.068 55.5704C622.027 -25.6548 940.57 26.6024 871.232 270.73C783.973 577.955 929.424 553.134 1246.59 651.787C1531.48 740.399 1820.36 751.569 1721.02 1003.44C1698.85 1059.66 1505.22 1319.46 1350.95 1204.98C1150.35 1056.1 1089.4 499.806 795.37 662.829C711.753 709.19 560.03 993.692 937.357 1114.08C1168.97 1187.98 1115.28 1400.6 1101.45 1542" stroke="url(#paint0_linear_147_669)" strokeWidth="40" strokeMiterlimit="6" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="paint0_linear_147_669" x1="809.5" y1="802" x2="1741" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#01503A" />
              <stop offset="1" stopColor="#9DB2AC" />
            </linearGradient>
          </defs>


          {/* TEXT BLOCKS */}


          <foreignObject x="450" y="120" width="420" height="300">
            <div

              className="relative"
              style={{ width: "420px", height: "300px" }}
            >

              {/* TREE */}
              <div className="
      absolute
      left-0
      bottom-10
      w-[200px]
      h-[260px]
      scale-110
      z-20
    ">
                <Image
                  src="/Images/tree.png"
                  alt="Palm Tree"
                  fill
                  className="object-contain"
                />
              </div>

              {/* CARD */}
              <div className="
      absolute
      left-[100px]
      bottom-[40px]
      bg-secondary-light
      rounded-r40
      px-s32
      py-s16
      shadow-lg
      z-10
      min-w-[280px]
    ">

                <span className="
        bg-primary-main
        text-background
        px-s16
        py-s8
        rounded-full
        caption
        inline-block
        mb-2
      ">
                  Plots / Lands
                </span>

                <p className="text-main font-medium text-lg">
                  Ayansh Elevating Lives
                </p>

              </div>

            </div>
          </foreignObject>

          <foreignObject x="1100" y="260" width="460" height="350">
            <div

              className="relative"
              style={{ width: "420px", height: "300px" }}
            >

              {/* TREE */}
              <div className="
      absolute
      left-0
      bottom-10
      w-[200px]
      h-[260px]
      scale-110
      z-20
    ">
                <Image
                  src="/Images/tree.png"
                  alt="Palm Tree"
                  fill
                  className="object-contain"
                />
              </div>

              {/* CARD */}
              <div className="
      absolute
      left-[100px]
      bottom-[40px]
      bg-secondary-light
      rounded-r40
      px-s32
      py-s24
      shadow-lg
      z-10
      min-w-[280px]
    ">

                <span className="
        bg-primary-main
        text-background
       px-s32
      py-s16
        rounded-full
        caption
        inline-block
        mb-2
      ">
                  Architecture
                </span>

                <p className="text-main font-medium text-lg">
                  Ayansh Infra Build
                </p>

              </div>

            </div>
          </foreignObject>

          <foreignObject x="730" y="755" width="460" height="300">
            <div

              className="relative"
              style={{ width: "420px", height: "300px" }}
            >

              {/* TREE */}
              <div className="
      absolute
      left-0
      bottom-10
      w-[200px]
      h-[260px]
      scale-110
      z-20
    ">
                <Image
                  src="/Images/tree.png"
                  alt="Palm Tree"
                  fill
                  className="object-contain"
                />
              </div>

              {/* CARD */}
              <div className="
      absolute
      left-[100px]
      bottom-[40px]
      bg-secondary-light
      rounded-r40
      px-s32
      py-s16
      shadow-lg
      z-10
      min-w-[280px]
    ">

                <span className="
        bg-primary-main
        text-background
        px-s16
        py-s8
        rounded-full
        caption
        inline-block
        mb-2
      ">
                  Construction
                </span>

                <p className="text-main font-medium text-lg">
                  Ayansh Civil Solutions
                </p>

              </div>

            </div>
          </foreignObject>

          <foreignObject x="1150" y="800" width="460" height="300">
            <div

              className="relative"
              style={{ width: "420px", height: "300px" }}
            >

              {/* TREE */}
              <div className="
      absolute
      -right-20
      bottom-10
      w-[200px]
      h-[260px]
      scale-110
      z-20
    ">
                <Image
                  src="/Images/tree.png"
                  alt="Palm Tree"
                  fill
                  className="object-contain"
                />
              </div>

              {/* CARD */}
              <div className="
      absolute
      left-[100px]
      bottom-[40px]
      bg-secondary-light
      rounded-r40
       px-s32
      py-s16
      shadow-lg
      z-10
      min-w-[280px]
    ">

                <span className="
        bg-primary-main
        text-background
        px-s16
        py-s8
        rounded-full
        caption
        inline-block
        mb-2
      ">
                  Interior/ Exterior Design
                </span>

                <p className="text-main font-medium text-lg">
                  Ayansh Builders & Developer
                </p>

              </div>

            </div>
          </foreignObject>
        </svg>
      </div>


      {/* Bottom Statement */}
      

    </section>
  )
}

export default TradingRules   