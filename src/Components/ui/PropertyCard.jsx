import Image from "next/image";
import Button from "@/Components/ui/Button";
import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <div className="
      
      bg-white
      rounded-r24
     max-w-[350px]
    ">

      {/* Image Section */}
      <div className="relative w-full  h-[280px] overflow-hidden rounded-r24">
        <Image
          src={property.image}
          alt={property.location}
          fill
          className="
            object-cover
          
            
          "
        />
      </div>

      {/* Content */}
      <div className="py-s24 px-s16 space-y-s6">

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <h3 className="heading-h4 font-semibold text-main">
            {property.price}
          </h3>
          <span className="text-sm text-secondary">
            ({property.pricePer})
          </span>
        </div>

        {/* Location */}
        <p className="text-main body-default">
          {property.location}
        </p>

        {/* Property Type */}
        <p className=" body-default">
          {property.type} ({property.area})
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-s16">

          <Button variant="secondary" className="px-s24 py-s8 rounded-full" as="link" href={"/comingsoon"}>
            Call Agent
          </Button>


<Link  href="/comingsoon"
  className="
    text-primary-main
    caption
    transition-colors duration-200
    hover:text-primary-light
  "
>
  View Details →
</Link>


        </div>

      </div>

    </div>
  );
}
