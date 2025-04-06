import React from "react";
import Image from "next/image";

interface ProkerCardProps {
  src: string;
  title: string;
  description: string;
  largeSize: boolean;
}

export default function ProkerCard(props: ProkerCardProps) {
  const { src, title, description, largeSize } = props;
  const width = largeSize ? "w-screen" : "w-full lg:w-1/2"; //[1312px] [640px]
  const height = largeSize ? "h-[420px]" : "h-[240px]";
  const weight = largeSize ? "font-bold" : "font-semibold";
  const fontsize = largeSize ? "text-heading-l" : "text-heading-s";

  return (
    <main
      className={`relative ${width} ${height} -z-50 overflow-hidden rounded-lg `}
    >
      <Image
        src={src}
        alt={title}
        fill
        priority
        draggable={false}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div className="absolute flex h-full w-full flex-col justify-end gap-2 bg-gradient-to-b from-transparent to-[rgba(0,0,0,1)] p-5 lg:p-8">
        <span
          className={`${fontsize} ${weight} line-clamp-1 text-secondary-white`}
        >
          {title}
        </span>
        <p className="line-clamp-1 text-text-l text-secondary-white">
          {description}
        </p>
      </div>
    </main>
  );
}
