import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const consoleSettings = JSON.parse(localStorage.getItem("Console")) || {};
        const dark = !!consoleSettings.DarkTheme;

        setIsDark(dark);

        // Apply initial theme to HTML tag
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const consoleSettings = JSON.parse(localStorage.getItem("Console")) || {};
        const newDark = !consoleSettings.DarkTheme;

        // Update localStorage for Telescope
        consoleSettings.DarkTheme = newDark;
        localStorage.setItem("Console", JSON.stringify(consoleSettings));

        // Update app UI theme
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white text-sm">
            {isDark ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeSwitcher;
