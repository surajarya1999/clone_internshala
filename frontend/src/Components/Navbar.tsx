import { Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { auth, provider } from "../firebase/firebase";
import { toast } from "react-toastify";
import { signInWithPopup, signOut } from "firebase/auth";
import { selectuser } from '@/Feature/Userslice';
import { useSelector } from 'react-redux';


interface User {
    name: string;
    email: string;
    photo: string;
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useSelector(selectuser);
    const handlelogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            toast.success("logged in successfully");
        } catch (error) {
            console.error(error);
            toast.error("login failed");
        }
        // setuser({
        //   name: "Rahul",
        //   email: "xyz@gmail.com",
        //   photo:
        //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
        // });
    };
    const handlelogout = () => {
        signOut(auth);
    };
    return (
        <div className="relative">
            <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">

                        {/* 1. Logo Section */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/">
                                <img src="/logo.png" alt="Logo" className="h-17 w-auto object-contain" />
                            </a>
                        </div>

                        {/* 2. Desktop Navigation (Hidden on Mobile) */}
                        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                            <Link href="/internship" className="text-gray-600 hover:text-blue-600 font-medium">Internships</Link>
                            <Link href="/job" className="text-gray-600 hover:text-blue-600 font-medium">Jobs</Link>

                            <div className="relative">
                                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:bg-white transition-all">
                                    <Search size={14} className="text-gray-400" />
                                    <input type="text" placeholder="Search..." className="ml-2 bg-transparent focus:outline-none text-sm w-32 lg:w-48" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Right Side (Auth + Mobile Menu Button) */}
                        <div className="flex items-center space-x-3">
                            {/* Desktop Auth (Always visible on Desktop) */}
                            <div className="hidden md:flex items-center space-x-3">
                                {user ? (
                                    <div className="flex items-center space-x-3 bg-gray-50 p-1 pr-3 rounded-full border border-gray-100">
                                        <Link href="/profile">
                                            <img src={user.photo} alt="Profile" className="w-8 h-8 rounded-full border border-white shadow-sm" />
                                        </Link>
                                        <button onClick={handlelogout} className="text-xs font-semibold text-red-500 uppercase">Logout</button>
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
                                            <span>Continue with Google</span>
                                        </button>
                                        <a href="/adminlogin" className="text-sm font-medium text-gray-500">Admin</a>
                                    </>
                                )}
                            </div>

                            {/* MOBILE MENU BUTTON (Only visible on Mobile) */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. MOBILE DRAWER (Slide Down Menu) */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-xl">
                        <Link href="/internship" className="block text-lg font-medium text-gray-700 py-2">Internships</Link>
                        <Link href="/job" className="block text-lg font-medium text-gray-700 py-2 border-b border-gray-50">Jobs</Link>

                        <div className="pt-4 space-y-4">
                            {user ? (
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <img src={user.photo} className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold text-gray-800">My Profile</span>
                                    </div>
                                    <button onClick={handlelogout} className="text-red-500 font-bold text-sm uppercase">Logout</button>
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
                                        <span className="font-semibold text-gray-500">Sign in with Google</span>
                                    </button>
                                    <a href="/adminlogin" className="text-center text-gray-500 py-2">Admin Login</a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};


export default Navbar
