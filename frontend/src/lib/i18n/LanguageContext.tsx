import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "./translations";

// Types
interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => string;
}

// Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState("en");

    useEffect(() => {
        const saved = localStorage.getItem("preferred-language");
        if (saved && translations[saved as keyof typeof translations]) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        localStorage.setItem("preferred-language", lang);
    };

    const t = (key: string): string => {
        const lang = language as keyof typeof translations;
        return translations[lang]?.[key] || translations["en"]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
    return context;
};