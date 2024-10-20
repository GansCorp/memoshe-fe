'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import NextLink from 'next/link';

export function Header() {
  return (
    <Navbar isBordered className="bg-gray-800 border-b border-gray-700">
      <NavbarBrand>
        <NextLink href="/" passHref legacyBehavior>
          <Link className="font-bold text-inherit text-blue-400 no-underline">
            <p className="font-bold text-inherit m-0 text-2xl">
              MEMOSHE
            </p>
          </Link>
        </NextLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NextLink href="/" passHref legacyBehavior>
            <Link className="text-gray-300 hover:text-blue-400 transition duration-300">
              Beranda
            </Link>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/flashcards" passHref legacyBehavior>
            <Link className="text-gray-300 hover:text-blue-400 transition duration-300">
              Flashcards
            </Link>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/about" passHref legacyBehavior>
            <Link className="text-gray-300 hover:text-blue-400 transition duration-300">
              Tentang
            </Link>
          </NextLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <NextLink href="/login" passHref legacyBehavior>
            <Button as={Link} color="primary" variant="flat">
              Masuk
            </Button>
          </NextLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
