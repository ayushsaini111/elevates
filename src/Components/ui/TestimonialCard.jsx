import Image from "next/image";

export default function TestimonialCard({ item }) {
  return (
    <div className="
      min-w-[250px] md:max-w-[280px]
      bg-secondary-light
      rounded-r24
      p-s24 mx-s16
   
  
    ">

      <div className="flex items-center gap-s12 mb-s16">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="pl-s8">
          <p className="body-default text-main">{item.name}</p>
          <p className="caption text-secondary">{item.role}</p>
        </div>
      </div>

      <p className="text-main body-default leading-relaxed">
        <span className="text-primary-main">“</span> {item.message} <span className="text-primary-main">”</span>
      </p>
    </div>
  );
}
