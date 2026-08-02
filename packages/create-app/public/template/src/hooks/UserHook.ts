/**@format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @filePath src/hooks/UserHook.ts
 * @accessPath @/hooks/UserHook
 * @description User Context hooks for the handling the user contexts
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0 - Initial Creation
 */
import { useContext } from "react";
import { UserContext } from "@/context/UserProvider";

export default function useUserContext() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext[UserContext] needs to be under UserProvider");
    return context;
}