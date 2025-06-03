import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ResponsiveImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<"img"> & {
    src: string;
    alt: string;
    objectFit?: "cover" | "contain";
    width?: number;
    height?: number;
  }
>(({ className, src, alt, objectFit = "contain", ...props }, ref) => (
  <div className="relative h-full w-full">
    <Image
      ref={ref}
      fill
      src={src}
      alt={alt}
      objectFit={objectFit}
      className={cn("h-full w-full", className)}
      {...props}
    />
  </div>
));

ResponsiveImage.displayName = "ResponsiveImage";

export { ResponsiveImage };
