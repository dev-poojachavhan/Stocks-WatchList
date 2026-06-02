import { useEffect, useState } from "react";

export const ThemeToggle = () => {

 const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

  useEffect(() => {
  document.documentElement.setAttribute(
  "data-theme",
  theme
);
  localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
      }
      className="group
relative

flex
items-center
gap-2

overflow-hidden

rounded-2xl
border

border-[var(--border)]

bg-[var(--surface)]

px-4
py-2.5

text-[var(--text)]

backdrop-blur-xl

transition-all
duration-300

hover:border-emerald-400/30
hover:text-[var(--text)]
hover:bg-[var(--accent-soft)]
hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]
hover:scale-[1.02]
active:scale-[0.98]
"
    >
      <div
  className="
    absolute
    inset-0

    opacity-0
    group-hover:opacity-100

    transition-opacity
    duration-300

    bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_65%)]

    pointer-events-none
  "
/>
      <div className="relative z-10 flex items-center gap-2">
  <span className="text-sm text-emerald-300">
    {theme === "dark" ? "🌙" : "☀️"}
  </span>

  <span className="text-sm font-medium tracking-tight">
    {theme === "dark" ? "Dark" : "Light"}
  </span>
</div>
    </button>
  );
};