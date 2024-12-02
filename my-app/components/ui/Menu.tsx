"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const classLink = `group inline-flex h-8 w-max items-center 
              justify-center rounded-md bg-background px-4 py-2 text-sm font-medium
               transition-colors hover:bg-accent hover:text-accent-foreground
                focus:bg-accent focus:text-accent-foreground focus:outline-none
                 disabled:pointer-events-none disabled:opacity-50 cursor-pointer
                 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`;

export default function Menu() {
  const NAVIGATION = [
    { title: "Markets", href: "/" },
    { title: "Screener", href: "/screener" },
  ];

  return (
    <NavigationMenu.Root
      className={
        "relative z-10 flex max-w-max flex-1 items-center justify-center"
      }
    >
      <NavigationMenu.List className="group flex flex-1 list-none items-center justify-center space-x-1">
        {NAVIGATION.map((item) => (
          <NavigationMenu.Item key={item.title}>
            <Link href={item.href} legacyBehavior>
              <NavigationMenu.Link className={classLink}>
                {item.title}
              </NavigationMenu.Link>
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
