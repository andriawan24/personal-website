"use client";

import { Strings } from "@/utils/strings";
import { MenuType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { animate, motion, useMotionValueEvent, useScroll } from "framer-motion";
import classNames from "classnames";

const menus: MenuType[] = [
  {
    name: Strings.aboutMe,
    url: Strings.linkAboutMe,
  },
  {
    name: Strings.blogs,
    url: Strings.linkBlogs,
  },
  {
    name: Strings.myProjects,
    url: Strings.linkMyProjects,
  },
];

export default function Navbar(): ReactElement {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [onTop, setOnTop] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    if (prev === 0 && latest === 1) {
      setOnTop(true);
      return;
    }

    if (latest > prev && latest > 0.15) {
      setOnTop(false);
    } else {
      setOnTop(true);
    }
  });

  return (
    <motion.header
      className={classNames(
        "sticky z-10 top-0 flex flex-row justify-between items-center px-4 md:px-32 bg-color-background-dark transition-all duration-200 py-3",
        {
          "shadow-md": !onTop,
        },
        {
          "shadow-none": onTop,
        },
      )}
    >
      <Link
        href="/"
        className="cursor-pointer hover:scale-105 duration-200 transition-all active:scale-100 active:duration-0"
      >
        <Image
          src={"/images/img_logo.webp"}
          width={80}
          height={80}
          alt={Strings.imageLogoAlt}
        />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className="flex flex-row items-center gap-4 md:gap-7">
          {menus.map((menu) => {
            const isActive = pathname == menu.url;
            return (
              <li
                className={`${isActive ? "text-color-text-primary" : "text-color-text-secondary"} font-medium text-lg md:text-lg transition-opacity duration-200 hover:opacity-90`}
                key={menu.url}
              >
                <a href={menu.url}>{menu.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
