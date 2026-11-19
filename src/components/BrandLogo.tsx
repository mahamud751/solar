import React from "react";
import Image from "next/image";
import { useContent } from "@/data/content";

interface BrandLogoProps {
  /** White version of the logo for dark backgrounds (footer). */
  inverted?: boolean;
  className?: string;
}

export function BrandLogo({ inverted = false, className = "" }: BrandLogoProps) {
  const { COMPANY_INFO } = useContent();
  return (
    <Image
      src={COMPANY_INFO.logoImage ?? "/images/gd/green-dhaka-logo.png"}
      alt={COMPANY_INFO.name}
      width={730}
      height={330}
      priority={!inverted}
      className={`h-11 w-auto select-none sm:h-12 ${inverted ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
