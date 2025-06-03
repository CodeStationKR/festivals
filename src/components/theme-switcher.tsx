"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Switch } from "./ui/switch";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme !== "dark") {
      return (
        <SunIcon
          className="h-6 w-6 text-yellow-600"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    }
    return (
      <MoonIcon
        className="h-6 w-6 text-yellow-700"
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        onClick={() => {
          const currentTheme = theme === "system" ? systemTheme : theme;
          setTheme(currentTheme === "dark" ? "light" : "dark");
        }}
      />
      {renderThemeChanger()}
    </div>
  );
};

export default ThemeSwitcher;
