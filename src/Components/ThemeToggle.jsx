import { useEffect, useState } from "react";

export const ThemeToggle = () => {

 const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
      }
      className="px-3 py-1 rounded-full bg-gray-200 text-black"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};