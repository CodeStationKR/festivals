import React from "react";
import Link from "next/link";
import Logo from "./logo";
import Container from "./ui/container";
import { Button } from "./ui/button";
import ThemeSwitcher from "./theme-switcher";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background py-4 shadow-sm">
      <Container>
        <div className="flex w-full items-center justify-between">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link href={"/colors"}>
              <Button variant={"link"}>Colors</Button>
            </Link>
            <Link href={"/seo"}>
              <Button variant={"link"}>SEO</Button>
            </Link>
            <Link href={"/favicon"}>
              <Button variant={"link"}>Favicon</Button>
            </Link>
            <Link href={"/utilities"}>
              <Button variant={"link"}>Utilities</Button>
            </Link>
            <Link href={"/examples"}>
              <Button variant={"link"}>Examples</Button>
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
