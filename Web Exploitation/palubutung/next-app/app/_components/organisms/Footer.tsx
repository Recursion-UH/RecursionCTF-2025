import Logo from "@molecules/Logo";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-screen flex-col gap-8 bg-primary-darker px-4 py-8 text-white md:px-7 lg:gap-16 lg:p-[72px_64px]">
      <main className="flex flex-col items-start justify-between gap-8 lg:flex-row">
        <section className="flex flex-col gap-8 text-xs">
          <Logo variant={"white"} />
          <main className="flex flex-col gap-4">
            <section className="flex flex-row items-center gap-[10px]">
              <Image width={19} height={19} src="/icon/place.svg" alt="" />
              <span className="text-text-s">
                Gedung Student Center Lt. 1 Fakultas Teknik
                <br /> Universitas Hasanuddin, Gowa 92171
              </span>
            </section>
            <section className="flex flex-row items-center gap-[10px]">
              <Image
                width={18}
                height={18}
                src="/icon/mail_outline.svg"
                alt=""
              />

              <span className="text-text-s">okifftuh@gmail.com</span>
            </section>
          </main>
        </section>
        <section className="flex flex-col gap-4 lg:items-end">
          <span className="text-text-l font-bold">
            Unit Kegiatan Mahasiswa Departemen
          </span>
          <Link href={"/"} className="text-text-m">
            Coder Institute
          </Link>
          <Link href={"/"} className="text-text-m">
            Robotic Enthusiast
          </Link>
        </section>
      </main>
      <section className="flex flex-col-reverse justify-between gap-4 font-medium lg:flex-row">
        <span className="text-text-s font-medium">
          © 2023 Organisasi Kemahasiswaan Informatika FT-UH (OKIF FT-UH)
        </span>
        <ul className="flex gap-4 text-text-s">
          <li>
            <Link href={"/"}>Instagram</Link>
          </li>
          <li>
            <Link href={"/"}>Twitter</Link>
          </li>
          <li>
            <Link href={"/"}>Linked In</Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
