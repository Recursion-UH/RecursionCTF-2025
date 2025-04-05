interface OkifLogoProps {
  size: number;
}
import Image from "next/image";

const OkifLogo = (props: OkifLogoProps) => {
  return (
    <Image
      priority={true}
      src={"/icon/Okif.svg"}
      alt={`Okif's Logo`}
      width={props.size}
      height={props.size}
    />
  );
};

export default OkifLogo;
