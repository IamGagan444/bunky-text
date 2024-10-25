"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import { LogIn, LayoutDashboard, Loader2 } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/ModeToggle";
import Logout from "./Logout";
import { useSession } from "next-auth/react";

export default function FloatingNav() {
  const { data: session, status } = useSession();

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: status === "authenticated" ? "Logout" : "Login",
      icon:
        status === "authenticated" ? (
          <Logout />
        ) : (
          <LogIn className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
      href: status === "authenticated" ? "" : "/accounts/sign-in",
    },
    {
      title: "Dashboard",
      icon: (
        <LayoutDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Gagan",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Github",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/IamGagan444",
    },

    {
      title: "Theme",
      icon: <ModeToggle />,
      href: "",
    },
  ];

  if (status === "loading") {
    return (
      <div className="h-dvh w-full fixed inset-0 bg-gray-50 dark:bg-neutral-900 flex items-center justify-center z-50 ">
        <Loader2 className=" animate-spin size-10 " />
      </div>
    );
  }

  return (
    <div className="">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
