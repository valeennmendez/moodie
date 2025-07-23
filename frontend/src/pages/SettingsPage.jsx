import React from "react";
import { useThemeStore } from "../store/themeStore";
import { THEMES } from "../constants/themesOptions.js";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-[91.9vh]">
      <div className="flex flex-col w-full items-center justify-center pt-5">
        <h1 className="text-base-content font-bold text-4xl">Elige tu tema</h1>
        <h2 className="text-base-content/80 font-semibold text-2xl">
          Tenemos todos estos...
        </h2>
      </div>
      <div className="p-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`group flex flex-col cursor-pointer items-center gap-1.5 p-2 rounded-lg transition-colors ${
              theme === t ? "bg-base-200" : "hover:bg-base-200/50"
            }`}
            onClick={() => setTheme(t)}
          >
            <div
              className="relative h-8 w-full rounded-md overflow-hidden"
              data-theme={t}
            >
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-natural"></div>
              </div>
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
