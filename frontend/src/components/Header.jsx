import { useEffect, useState } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  // عند تحميل الصفحة، ارجع للوضع المخزن
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <header className="app-header">
      <h1>
        <img
          src="/logo.png"
          alt="Note Icon"
          style={{ width: "50px", height: "50px", marginRight: "10px", verticalAlign: "middle" }}
        />
        My Notes App
      </h1>

      {/* Dark Mode Switch */}
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <span className="slider"></span>
      </label>
    </header>
  );
}