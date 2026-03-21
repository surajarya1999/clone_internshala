import { Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { auth, provider } from "../firebase/firebase";
import { toast } from "react-toastify";
import { signInWithPopup, signOut } from "firebase/auth";
import { selectuser } from '@/Feature/Userslice';
import { useSelector } from 'react-redux';
import { useLanguage } from '@/lib/i18n/LanguageContext';  // ✅ NEW
import LanguageSwitcher from './LanguageSwitcher';          // ✅ NEW

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector(selectuser);
    const { t } = useLanguage();  // ✅ NEW

    const handlelogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            toast.success("logged in successfully");
        } catch (error) {
            console.error(error);
            toast.error("login failed");
        }
    };

    const handlelogout = () => {
        signOut(auth);
    };

    return (
        <div className="relative">
            <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">

                        {/* 1. Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/">
                                <img src="/logo.png" alt="Logo" className="h-17 w-auto object-contain" />
                            </a>
                        </div>

                        {/* 2. Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                            <Link href="/internship" className="text-gray-600 hover:text-blue-600 font-medium">
                                {t("Internships")} {/* ✅ */}
                            </Link>
                            <Link href="/job" className="text-gray-600 hover:text-blue-600 font-medium">
                                {t("Jobs")} {/* ✅ */}
                            </Link>

                            <div className="relative">
                                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:bg-white transition-all">
                                    <Search size={14} className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={t("search")} // ✅
                                        className="ml-2 bg-transparent focus:outline-none text-sm w-32 lg:w-48"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Right Side */}
                        <div className="flex items-center space-x-3">

                            {/* Desktop Auth */}
                            <div className="hidden md:flex items-center space-x-3">
                                {user ? (
                                    <div className="flex items-center space-x-3 bg-gray-50 p-1 pr-3 rounded-full border border-gray-100">
                                        <Link href="/profile">
                                            <img src={user.photo} alt="Profile" className="w-8 h-8 rounded-full border border-white shadow-sm" />
                                        </Link>
                                        <button onClick={handlelogout} className="text-xs font-semibold text-red-500 uppercase">
                                            {t("logout")} {/* ✅ */}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={handlelogin} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span>{t("login")}</span> {/* ✅ */}
                                        </button>
                                        <a href="/adminlogin" className="text-sm font-medium text-gray-500">
                                            {t("admin")} {/* ✅ */}
                                        </a>
                                    </>
                                )}

                                {/* ✅ Language Switcher — desktop */}
                                <LanguageSwitcher />
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Mobile Drawer */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-xl">
                        <Link href="/internship" className="block text-lg font-medium text-gray-700 py-2">
                            {t("internships")} {/* ✅ */}
                        </Link>
                        <Link href="/job" className="block text-lg font-medium text-gray-700 py-2 border-b border-gray-50">
                            {t("jobs")} {/* ✅ */}
                        </Link>

                        {/* ✅ Language Switcher — mobile */}
                        <div className="pt-2">
                            <LanguageSwitcher />
                        </div>

                        <div className="pt-2 space-y-4">
                            {user ? (
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <img src={user.photo} className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold text-gray-800">
                                            {t("myProfile")} {/* ✅ */}
                                        </span>
                                    </div>
                                    <button onClick={handlelogout} className="text-red-500 font-bold text-sm uppercase">
                                        {t("logout")} {/* ✅ */}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <button onClick={handlelogin} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 shadow-sm active:bg-gray-50">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="font-semibold text-gray-500">
                                            {t("signIn")} {/* ✅ */}
                                        </span>
                                    </button>
                                    <a href="/adminlogin" className="text-center text-gray-500 py-2">
                                        {t("adminLogin")} {/* ✅ */}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;