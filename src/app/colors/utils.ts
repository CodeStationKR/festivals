/* eslint-disable no-bitwise */
import { toast } from "@/components/ui/use-toast";
import TailwindColors from "tailwindcss/colors";

export type TColor = {
  [key in keyof typeof TailwindColors]: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
};

export type TColorVariant = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export const TemplateColors = {
  red: TailwindColors.red,
  orange: TailwindColors.orange,
  amber: TailwindColors.amber,
  yellow: TailwindColors.yellow,
  lime: TailwindColors.lime,
  green: TailwindColors.green,
  emerald: TailwindColors.emerald,
  teal: TailwindColors.teal,
  cyan: TailwindColors.cyan,
  sky: TailwindColors.sky,
  blue: TailwindColors.blue,
  indigo: TailwindColors.indigo,
  violet: TailwindColors.violet,
  purple: TailwindColors.purple,
  fuchsia: TailwindColors.fuchsia,
  pink: TailwindColors.pink,
  rose: TailwindColors.rose,
};

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast({
    title: "클립보드에 복사되었습니다.",
    description: "붙여넣기하여 사용하세요.",
  });
}

export function getColorTokens(primaryColors: TColorVariant) {
  return {
    light: {
      "--background": {
        color: TailwindColors.white,
        textColor: TailwindColors.neutral[900],
      },
      "--foreground": {
        color: TailwindColors.neutral[900],
        textColor: TailwindColors.white,
      },
      "--primary": {
        color: primaryColors[700],
        textColor: TailwindColors.white,
      },
      "--primary-foreground": {
        color: TailwindColors.white,
        textColor: primaryColors[700],
      },
      "--muted": {
        color: TailwindColors.neutral[100],
        textColor: TailwindColors.neutral[500],
      },
      "--muted-foreground": {
        color: TailwindColors.neutral[500],
        textColor: TailwindColors.neutral[100],
      },
      "--border": {
        color: TailwindColors.neutral[200],
        textColor: TailwindColors.neutral[900],
      },
      "--ring": {
        color: primaryColors[500],
        textColor: TailwindColors.white,
      },
    },
    dark: {
      "--background": {
        color: TailwindColors.neutral[900],
        textColor: TailwindColors.neutral[50],
      },
      "--foreground": {
        color: TailwindColors.neutral[50],
        textColor: TailwindColors.neutral[900],
      },
      "--primary": {
        color: primaryColors[50],
        textColor: primaryColors[700],
      },
      "--primary-foreground": {
        color: primaryColors[700],
        textColor: primaryColors[50],
      },
      "--muted": {
        color: TailwindColors.neutral[800],
        textColor: TailwindColors.neutral[400],
      },
      "--muted-foreground": {
        color: TailwindColors.neutral[400],
        textColor: TailwindColors.neutral[800],
      },
      "--border": {
        color: TailwindColors.neutral[600],
        textColor: TailwindColors.neutral[200],
      },
      "--ring": {
        color: primaryColors[500],
        textColor: TailwindColors.white,
      },
    },
  };
}

function hexToHsl(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const hsl = rgbToHsl(r, g, b);
  return `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return [h, s, l];
}

export function getColorCodes(color: TColorVariant) {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --brand-50: ${hexToHsl(color[50])};
    --brand-100: ${hexToHsl(color[100])};
    --brand-200: ${hexToHsl(color[200])};
    --brand-300: ${hexToHsl(color[300])};
    --brand-400: ${hexToHsl(color[400])};
    --brand-500: ${hexToHsl(color[500])};
    --brand-600: ${hexToHsl(color[600])};
    --brand-700: ${hexToHsl(color[700])};
    --brand-800: ${hexToHsl(color[800])};
    --brand-900: ${hexToHsl(color[900])};

    --base-50: 0 0% 98%;
    --base-100: 0 0% 96%;
    --base-200: 0 0% 90%;
    --base-300: 0 0% 84%;
    --base-400: 0 0% 64%;
    --base-500: 0 0% 45%;
    --base-600: 0 0% 32%;
    --base-700: 0 0% 25%;
    --base-800: 0 0% 15%;
    --base-900: 0 0% 9%;

    --base-white: 0 0% 100%;
    --base-black: 0 0% 0%;

    --red-50: 0 86% 97%;
    --red-400: 0 91% 71%;
    --red-500: 0 84% 60%;
    --red-600: 0 72% 51%;

    --background: var(--base-50);
    --foreground: var(--base-900);

    --primary: var(--brand-500);
    --primary-foreground: var(--base-50);

    --muted: var(--base-100);
    --muted-foreground: var(--base-500);

    --destructive: var(--red-500);
    --destructive-foreground: var(--base-white);

    --border: var(--base-200);
    --input: var(--base-200);
    --ring: var(--base-400);

    --radius: 0.5rem;
  }

  .dark {
    --background: var(--base-900);
    --foreground: var(--base-50);

    --primary: var(--brand-50);
    --primary-foreground: var(--brand-500);

    --muted: var(--base-800);
    --muted-foreground: var(--base-400);

    --destructive: var(--red-50);
    --destructive-foreground: var(--red-600);

    --border: var(--base-600);
    --input: var(--base-700);
    --ring: var(--brand-400);
  }
}

@layer base {
  * {
    @apply border-border;
    @apply font-pretendard;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}
