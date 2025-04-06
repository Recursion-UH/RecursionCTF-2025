import Image from "next/image";
import Link from "next/link";

import ReactHtmlParser from "html-react-parser";

import DetailDate from "@molecules/DetailDate";
import { DetailContent } from "@mocks/content";

export default function DetailArticle() {
  return (
    <main className="w-screen p-7 lg:p-16">
      <section className="flex flex-col gap-5 px-7 lg:gap-10 lg:px-16">
        <Link
          href={"/"}
          className="text-text-m font-semibold text-[#0077BD] lg:text-text-l"
        >
          Home {">"} Artikel Kegiatan
        </Link>
        <section className="flex flex-col gap-3">
          <h1 className="text-text-l font-bold lg:text-[24px]">
            CODE {"(Community Dedication)"}
          </h1>
          <DetailDate date="Rabu, 26 Juli 2023" views={12} />
        </section>
        <section className="relative -z-10 flex h-auto items-center justify-center lg:w-full">
          <Image
            src="/image/code.webp"
            alt="Community Dedication"
            width={1333}
            height={553}
            objectFit="cover"
            objectPosition="top"
          />
        </section>
        <section className="text-justify text-text-s md:text-text-m lg:text-text-l">
          {ReactHtmlParser(DetailContent)}
        </section>
      </section>
    </main>
  );
}
