import { homePage } from "../Data/homePage";
import PropertyCard from "@/Components/ui/PropertyCard";

export default function PropertiesSection() {
  const { propertiesSection } = homePage;

  return (
    <section className="py-s80 py-s104 px-s32 md:px-s64  xl:px-0 md:py-s160 ">

      <div className="max-w-7xl mx-auto ">

        {/* Heading */}
        <div className="mb-s80">
          <h2 className="heading-h2 text-main">
            {propertiesSection.headingTop}
          </h2>

          <h3 className="heading-h2 text-main uppercase">
            <span className="heading-h3 text-primary-main">
              {propertiesSection.highlight}
            </span>
            {propertiesSection.headingBottom}
          </h3>
        </div>

        {/* Grid */}
        <div className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-x-s32 md:gap-x-s40 gap-y-s64 md:gap-y-s80
        ">
          {propertiesSection.properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
