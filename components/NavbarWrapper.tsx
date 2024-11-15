import Navbar from "./Navbar";
import { auth } from "@/auth";

const NavbarWrapper = async () => {
  const session = await auth();
  return <Navbar session={session} />;
};

export default NavbarWrapper;
