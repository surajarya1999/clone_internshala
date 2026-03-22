import { useState } from "react";
import { useLanguage } from "../lib/i18n/LanguageContext";
import { LANGUAGES } from "../lib/i18n/translations";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://clone-internshala.onrender.com/api";

export default function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"email" | "otp">("email");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        if (lang === "fr") {
            setShowModal(true);
            setStep("email");
            setMessage("");
            setEmail("");
            setOtp("");
        } else {
            setLanguage(lang);
        }
    };

    const handleSendOtp = async () => {
        if (!email) {
            setIsError(true);
            setMessage("Email is required");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/otp/send`, { email });
            if (res.data.success) {
                setStep("otp");
                setIsError(false);
                setMessage("OTP sent to your email!");
            }
        } catch (error: any) {
            setIsError(true);
            setMessage(error.response?.data?.message || "Failed to send OTP");
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setIsError(true);
            setMessage("Please enter OTP");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/otp/verify`, { email, otp });
            if (res.data.success) {
                setLanguage("fr");
                setShowModal(false);
                setOtp("");
                setEmail("");
                setMessage("");
            }
        } catch (error: any) {
            setIsError(true);
            setMessage(error.response?.data?.message || "Invalid OTP");
        }
        setLoading(false);
    };

    const handleCancel = () => {
        setShowModal(false);
        setEmail("");
        setOtp("");
        setMessage("");
        setStep("email");
    };

    return (
        <>
            {/* Language Dropdown */}
            <select
                value={language}
                onChange={handleLanguageSelect}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.label}
                    </option>
                ))}
            </select>

            {/* OTP Modal — French ke liye */}
            {showModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">

                        {/* Header */}
                        <div className="text-center mb-6">
                            <span className="text-5xl">🇫🇷</span>
                            <h2 className="text-xl font-bold text-gray-800 mt-3">
                                Verify to switch to French
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Email verification is required
                            </p>
                        </div>

                        {/* Step 1 — Email */}
                        {step === "email" && (
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {message && (
                                    <p className={`text-sm text-center ${isError ? "text-red-500" : "text-green-500"}`}>
                                        {message}
                                    </p>
                                )}
                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send OTP"}
                                </button>
                            </div>
                        )}

                        {/* Step 2 — OTP */}
                        {step === "otp" && (
                            <div className="space-y-4">
                                <p className="text-sm text-green-600 text-center font-medium">
                                    ✅ OTP sent to {email}
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                                    maxLength={6}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-center tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {message && (
                                    <p className={`text-sm text-center ${isError ? "text-red-500" : "text-green-500"}`}>
                                        {message}
                                    </p>
                                )}
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading || otp.length !== 6}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>
                                <button
                                    onClick={() => setStep("email")}
                                    className="w-full text-gray-400 hover:text-gray-600 text-sm py-1"
                                >
                                    ← Change email
                                </button>
                            </div>
                        )}

                        {/* Cancel */}
                        <button
                            onClick={handleCancel}
                            className="w-full mt-4 text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}