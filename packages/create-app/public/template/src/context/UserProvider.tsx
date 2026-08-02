/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/context/UserProvider.ts
 * @accessPath @/context/UserProvider
 * @description User Provider for the handling the user data that is accessable throught out the app.
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0 - Initial Creation
 */


import {
    useState,
    useMemo,
    useCallback,
    createContext,
    ReactNode,
} from "react";

export type themeTypes = "light" | "dark" | "system";

export interface IUserName {
    full_name: string;
    first_name: string | null;
    last_name: string;
    middle_name?: string | null;
}

export interface IUserData {
    id: string | number;
    isLogged: boolean;
    userName: string;
    name: IUserName;
    image?: string | null;
    clerkId: string | number;
    theme?: themeTypes;
}

export interface IUserContextData {
    userData: IUserData | undefined;
    isFirstLaunch: boolean;
    isAuthenticated: boolean;
    setUserData: (data: IUserData) => void;
    updateTheme: (theme: themeTypes) => void;
    updateLaunch: (launch: boolean) => void;
}

export const UserContext = createContext<IUserContextData | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<IUserData | undefined>(undefined);
    const [isFirstLaunch, setFirstLanch] = useState<boolean>(true);

    const updateTheme = useCallback((theme: themeTypes) => {
        setUserData(prev => (prev ? { ...prev, theme } : undefined));
    }, []);

    const updateLaunch = useCallback((launch: boolean) => {
        setFirstLanch(launch);
    }, []);

    const value = useMemo(
        () => ({
            userData,
            isFirstLaunch,
            isAuthenticated: !!userData,
            setUserData,
            updateTheme,
            updateLaunch,
        }),
        [userData, isFirstLaunch, updateTheme, updateLaunch]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}