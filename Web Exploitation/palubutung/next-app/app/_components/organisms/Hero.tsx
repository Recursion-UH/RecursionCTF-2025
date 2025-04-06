"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import OkifLogo from "@atoms/OkifLogo";

const Hero = () => {
  const [logoSize, setLogoSize] = useState(308);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setLogoSize(308);
      } else if (window.innerWidth >= 768) {
        setLogoSize(231);
      } else {
        setLogoSize(154);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative z-10 h-screen w-screen">
      <Image
        src="/image/code.webp"
        alt="hero image"
        fill
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-70"></div>

      <section className="relative flex h-full flex-col items-center justify-center gap-11">
        <OkifLogo size={logoSize} />
        <p className="text-center text-heading-s font-semibold text-secondary-white md:text-heading-m lg:text-heading-l lg:leading-[52px]">
          ORGANISASI KEMAHASISWAAN INFORMATIKA
          <br />
          FAKULTAS TEKNIK - UNIVERSITAS HASANUDDIN
        </p>
      </section>
    </section>
  );
};

export default Hero;
