import Image from "next/image";

export default function Home() {
  const lines = ["Building", "Clean", "Cloud", "Shit", "Since", "2023"];

  return (
    <section className="relative h-[calc(100vh-5rem)] overflow-hidden">
      {/* Text Column */}
      <div className="container grid grid-cols-2 h-full content-center relative z-10">
        <div className="text-8xl lg:text-9xl uppercase font-medium tracking-tighter space-y-2 leading-[0.9]">
          {lines.map((text, index) => (
            <div
              key={index}
              className={index % 2 === 0 ? "text-left" : "text-right"}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Full Image Behind Right-Aligned */}
      <div className="absolute -right-40 bottom-0 w-[70vw] h-[110vh] top-4 pointer-events-none z-0">
        <Image
          src="/images/me.png"
          alt="Freemancodz - Headshot"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
