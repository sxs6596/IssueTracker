"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Flex, Container } from "@radix-ui/themes";
const Navbar = () => {
  // currentPath
  const currentPath = usePathname();
  console.log(currentPath);
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/Issues" },
  ];
  const { session } = useSession();
  console.log("session is :", session);
  return (
    
    <nav className="border-b mb-5 px-5 h-14 m">
      <Container>
      <Flex justify="between">
        <Flex gap="3" mt="2">
          {/* <Link href="/">Logo</Link> */}
          <ul className="flex space-x-6 ">
            {Links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={classnames({
                  "text-zinc-900": currentPath === link.href,
                  "text-zinc-500": currentPath !== link.href,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </Flex>
          <Flex gap="3" mt="2">
          <Link href="/api/auth/signout">Signout</Link>
          {/* <Link href="/api/auth/signin">Signin</Link> */}
          </Flex>
      </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
