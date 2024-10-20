import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export function Header() {
  return (
    <Navbar isBordered className="bg-gray-800">
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit text-white no-underline">
          <p className="font-bold text-inherit text-white m-0">MEMOSHE</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="text-gray-300 hover:text-white">
            Beranda
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-gray-300 hover:text-white">
            Flashcards
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-gray-300 hover:text-white">
            Tentang
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Masuk
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
