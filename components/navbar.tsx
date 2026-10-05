"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useModal } from '@/contexts/ModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Topbar = () => {
  const pathname = usePathname();
  const { openModal } = useModal();
  const { isLoggedIn, logout } = useAuth();

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      className="bg-white/80 backdrop-blur-md shadow-sm"
    >
      <NavbarBrand>
        <NextLink href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Art Gallery
          </span>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {siteConfig.navItems
          .filter((item) => !item.hidden || (item.hidden && isLoggedIn))
          .map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={`
                  relative px-4 py-2 font-semibold transition-all duration-300
                  ${pathname === item.href 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-blue-600 
                  after:transition-transform after:duration-300
                  ${pathname === item.href 
                    ? 'after:scale-x-100' 
                    : 'after:scale-x-0 hover:after:scale-x-100'
                  }
                `}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <Button 
            color="success" 
            variant="flat"
            startContent={<MdOutlineAdminPanelSettings size={20} />}
            onPress={logout}
          >
            로그아웃
          </Button>
        ) : (
          <Button 
            color="primary" 
            variant="flat"
            startContent={<MdOutlineAdminPanelSettings size={20} />}
            onPress={openModal}
          >
            관리자
          </Button>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
