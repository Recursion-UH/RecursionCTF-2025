import Image from "next/image";

const About = () => {
  return (
    <section className="w-full flex flex-col gap-8 pt-[72px] pb-12 px-7 lg:flex-row lg:px-16">
      <section className="h-[360px] relative lg:flex-1 lg:h-auto">
        <Image
          fill
          src={"/image/about.webp"}
          alt="about-image"
          style={{ objectFit: "cover", objectPosition: "top" }}
        />
      </section>
      <section className="flex flex-1 flex-col gap-4 md:gap-8 text-justify">
        <h1 className="font-bold text-heading-m sm:text-heading-l">Mengenal OKIF FT-UH</h1>
        <p className="font-medium text-text-l md:text-heading-s">
          OKIF FT-UH adalah organisasi kemahasiswaan non-struktural di
          Departemen Teknik Informatika intra Universitas Hasanuddin yang
          berstatus otonom dan secara struktural merupakan bagian dari OKFT-UH
          yang mengacu pada bagan struktur OKFT-UH.
        </p>
        <p className="font-medium text-text-l md:text-heading-s">
          OKIF FT-UH bertujuan sebagai sarana peningkatan kualitas ketakwaan
          kepada Tuhan Yang Maha Esa, yang berasaskan nilai-nilai luhur
          pancasila demi terwujudnya cita-cita bangsa dengan mengembangkan
          wawasan, integritas dan potensi diri, kemampuan keprofesian, serta
          pengabdian kepada masyarakat.
        </p>
      </section>
    </section>
  );
};

export default About;
