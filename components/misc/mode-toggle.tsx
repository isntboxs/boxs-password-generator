"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { FaComputer } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-8 items-center justify-between gap-x-1 overflow-hidden rounded-full border border-input bg-background">
        {themeItems.map((item) => (
          <Button
            key={item.name}
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              theme === item.name ? "" : "border-none"
            )}
            onClick={() => setTheme(item.name)}
          >
            {item.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};

const themeItems = [
  {
    icon: <FaComputer className="size-4" />,
    name: "system",
    title: "System",
  },
  {
    icon: <BsSun className="size-4" />,
    name: "light",
    title: "Light",
  },
  {
    icon: <BsMoonStars className="size-4" />,
    name: "dark",
    title: "Dark",
  },
] as const;
