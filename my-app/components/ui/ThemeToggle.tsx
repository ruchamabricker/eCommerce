"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TbSunMoon } from "react-icons/tb";
const classItem = `relative flex cursor-default
select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none 
transition-colors focus:bg-accent focus:text-accent-foreground
 data-[disabled]:pointer-events-none data-[disabled]:opacity-50`;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="p-2">
        {theme === "light" ? (
          <SunIcon color="black" className="h-[1.2rem] w-[1.2rem]" />
        ) :( theme === "dark" ? (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />)
          : (<TbSunMoon className="h-[1.2rem] w-[1.2rem]" /> ))
        }
      </DropdownMenu.Trigger>

      {/* DropDownMenu */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md
             data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
          align="end"
        >
          {/* Items */}

          <DropdownMenu.Item
            className={classItem}
            onClick={() => setTheme("light")}
          >
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={classItem}
            onClick={() => setTheme("dark")}
          >
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={classItem}
            onClick={() => setTheme("system")}
          >
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
