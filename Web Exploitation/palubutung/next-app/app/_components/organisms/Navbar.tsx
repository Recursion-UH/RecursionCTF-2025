import Link from "next/link";
import Logo from "@molecules/Logo";
import NavbarItems from "@molecules/NavbarItems";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-screen justify-between bg-secondary-white p-4 lg:px-8">
      <Logo variant="primary" />
      <NavbarItems />
    </nav>
  );
};

export default Navbar;
