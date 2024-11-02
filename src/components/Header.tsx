'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import NextLink from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  const { t } = useLanguage();

  return (
    <Navbar isBordered className="bg-blue-900 border-b border-blue-800">
      <NavbarBrand>
        <NextLink href="/" passHref legacyBehavior>
          <Link className="font-bold text-inherit text-blue-200 no-underline">
            <p className="font-bold text-inherit m-0 text-2xl">
              MEMOSHE
            </p>
          </Link>
        </NextLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NextLink href="/" passHref legacyBehavior>
            <Link className="text-blue-100 hover:text-blue-300 transition duration-300">
              {t('home')}
            </Link>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/flashcards" passHref legacyBehavior>
            <Link className="text-blue-100 hover:text-blue-300 transition duration-300">
              {t('flashcards')}
            </Link>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/study" passHref legacyBehavior>
            <Link className="text-blue-100 hover:text-blue-300 transition duration-300">
              {t('study')}
            </Link>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/about" passHref legacyBehavior>
            <Link className="text-blue-100 hover:text-blue-300 transition duration-300">
              {t('about')}
            </Link>
          </NextLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LanguageSelector />
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/login" passHref legacyBehavior>
            <Button 
              as={Link} 
              color="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {t('login')}
            </Button>
          </NextLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
