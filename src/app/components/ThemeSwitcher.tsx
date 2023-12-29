/*
 * @Author: maozhixin maozx@aeroht.com
 * @Date: 2023-12-27 11:41:00
 * @LastEditors: maozhixin maozx@aeroht.com
 * @LastEditTime: 2023-12-27 11:49:22
 * @FilePath: \ticket\src\app\components\ThemeSwitcher.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@nextui-org/react";
import { SunMoon, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Button
        isIconOnly
        color="warning"
        variant="faded"
        aria-label="theme"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? (
          <Moon size={30} />
        ) : (
          <SunMoon color="#f7f7f7" size={30} />
        )}
      </Button>
    </div>
  );
}
