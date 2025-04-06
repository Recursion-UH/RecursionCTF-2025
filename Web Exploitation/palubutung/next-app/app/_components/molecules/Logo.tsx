interface LogoProps {
  variant: "primary" | "white";
}

import OkifLogo from "@atoms/OkifLogo";

const Logo = (props: LogoProps) => {
  const textColor =
    props.variant === "primary"
      ? "text-primary-darker"
      : props.variant === "white"
      ? "text-white"
      : "text-default";
  return (
    <section className="flex items-center gap-2 ">
      <OkifLogo size={48} />
      <p className={`hidden text-text-s font-bold ${textColor} lg:block`}>
        ORGANISASI KEMAHASISWAAN INFORMATIKA
        <br />
        FAKULTAS TEKNIK - UNIVERSITAS HASANUDDIN
      </p>
      <p className={`block text-text-l font-bold lg:hidden ${textColor} `}>
        OKIF FT-UH
      </p>
    </section>
  );
};

export default Logo;
