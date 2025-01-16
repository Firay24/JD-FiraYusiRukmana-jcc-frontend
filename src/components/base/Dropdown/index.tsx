import { Menu, MenuButton, MenuItem, MenuItems, MenuItemsProps } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import React, { Fragment } from "react";

interface DropdownProps {
  children: React.ReactNode;
  options: DropdownOption[];
  anchor?: MenuItemsProps["anchor"];
  isFullWidth?: boolean;
}

export interface DropdownOption {
  text: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function Dropdown({ children, options, anchor = { to: "bottom end", gap: 6 }, isFullWidth }: DropdownProps) {
  const itemClass = "block w-full cursor-pointer rounded p-2 text-black hover:bg-neutral-100";
  return (
    <Menu>
      <MenuButton as="div">{children}</MenuButton>
      <MenuItems anchor={anchor} className={clsx({ "w-[var(--button-width)]": isFullWidth }, "z-20 flex flex-col rounded-lg border border-neutral-300 bg-white focus:outline-none")}>
        {options.map((item, index) => (
          <MenuItem key={index}>
            <div>
              {item.href && (
                <Link href={item.href} onClick={item.onClick} className={itemClass}>
                  {item.text}
                </Link>
              )}
              {!item.href && (
                <div onClick={item.onClick} className={itemClass}>
                  {item.text}
                </div>
              )}
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
