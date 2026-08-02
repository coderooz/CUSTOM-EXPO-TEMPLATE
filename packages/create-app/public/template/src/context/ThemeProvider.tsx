import {useCallback, useState, createContext} from "react"

export type themeTypes = "light" | "dark" | "system";

export interface IThemeContext {
    theme: themeTypes,
    setTheme : (data: themeTypes) => void;
    toggleTheme : (theme: themeTypes) => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: Readonly<{children: React.ReactNode;}>) {
    const [theme, setTheme] = useState<themeTypes>("system");

    const toggleTheme = useCallback((theme : themeTypes)=> {
        return null;
    }, []);

    const value = {
        theme, setTheme, toggleTheme
    };
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

