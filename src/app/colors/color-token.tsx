import { cn } from "@/lib/utils";
import React from "react";
import { TColorVariant, copyToClipboard, getColorTokens } from "./utils";

type TColorToken = {
  mode: "light" | "dark";
  primaryColors: TColorVariant;
};

const ColorToken: React.FC<TColorToken> = ({ mode, primaryColors }) => {
  const baseColorTokens = getColorTokens(primaryColors);
  const colors = baseColorTokens[mode];
  return (
    <div className={mode === "light" ? "light" : "dark"}>
      <div
        className={cn("px-16 py-20", "flex flex-col gap-6")}
        style={{
          backgroundColor: colors["--muted"].color,
        }}
      >
        <h3
          className="text-2xl font-bold"
          style={{
            color: colors["--foreground"].color,
          }}
        >
          {mode === "light" ? "Light Theme" : "Dark Theme"}
        </h3>
        <p
          className="text-xl font-medium"
          style={{
            color: colors["--muted-foreground"].color,
          }}
        >
          {mode === "light" ? "라이트 모드" : "다크 모드"}에 대응되는 컬러
          토큰입니다.
        </p>
        <div className="flex flex-col">
          {Object.entries(colors).map(([name, color]) => (
            <ColorCard
              key={name}
              name={name}
              color={color.color}
              textColor={color.textColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorToken;

const ColorCard: React.FC<{
  color: string;
  textColor?: string;
  name: string;
}> = ({ color, name, textColor }) => {
  return (
    <button
      style={{ backgroundColor: color, color: textColor }}
      onClick={() => {
        copyToClipboard(color);
      }}
      className="flex items-center justify-between p-4 font-bold"
    >
      <p>{name}</p>
      <p className="font-normal">{color}</p>
    </button>
  );
};
