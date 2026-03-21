import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Clock, DollarSign, Filter, Pin, PlayCircle, X } from 'lucide-react';
import Link from "next/link";
import axios from 'axios';
import { useLanguage } from "@/lib/i18n/LanguageContext";

const index = () => {
    const { t } = useLanguage();

    const [filteredjob, setfilteredjobs] = useState<any>([]);
    const [isFiltervisible, setisFiltervisible] = useState(false);
    const [filter, setfilters] = useState({
        category: "",
        location: "",
        workFromHome: false,
        partTime: false,
        salary: 50,
        experience: "",
    });
    const [filteredJobs, setjob] = useState<any>([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get("https://clone-internshala.onrender.com/api/job");
                setjob(res.data);
                setfilteredjobs(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchdata();
    }, []);

    useEffect(() => {
        const filtered = filteredJobs.filter((job: any) => {
            const matchesCategory = job.category.toUpperCase().includes(filter.category.toLowerCase());
            const matchesLocation = job.location.toLowerCase().includes(filter.location.toLowerCase());
            return matchesCategory && matchesLocation;
        });
        setfilteredjobs(filtered);
    }, [filter, filteredJobs]);

    const handlefilterchange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setfilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const clearFilters = () => {
        setfilters({
            category: "",
            location: "",
            workFromHome: false,
            partTime: false,
            salary: 50,
            experience: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* ── Desktop Filter ── */}
                    <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-black">{t("filters")}</span>
                            </div>
                            <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700">
                                {t("clearAll")}
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t("category")}</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={filter.category}
                                    onChange={handlefilterchange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder={t("categoryPlaceholder")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t("location")}</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={filter.location}
                                    onChange={handlefilterchange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder={t("locationPlaceholder")}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t("experience")}</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={filter.experience}
                                    onChange={handlefilterchange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder={t("experiencePlaceholder")}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="workFromHome"
                                        checked={filter.workFromHome}
                                        onChange={handlefilterchange}
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                    <span className="text-gray-700">{t("workFromHome")}</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="partTime"
                                        checked={filter.partTime}
                                        onChange={handlefilterchange}
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                    <span className="text-gray-700">{t("partTime")}</span>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t("annualSalary")}</label>
                                <input
                                    type="range"
                                    name="salary"
                                    min="0"
                                    max="100"
                                    value={filter.salary}
                                    onChange={handlefilterchange}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>₹0L</span><span>₹50L</span><span>₹100L</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Main Content ── */}
                    <div className="flex-1">
                        <div className="md:hidden mb-4">
                            <button
                                onClick={() => setisFiltervisible(!isFiltervisible)}
                                className="w-full flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm text-black"
                            >
                                <Filter className="h-5 w-5" />
                                <span>{t("showFilters")}</span>
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                            <p className="text-center font-medium text-black">
                                {filteredjob.length} {t("jobsFound")}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {filteredjob.map((job: any) => (
                                <div key={job._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 text-blue-600 mb-4">
                                        <ArrowUpRight className="h-5 w-5" />
                                        <span className="font-medium">{t("activelyHiring")}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                                    <p className="text-gray-600 mb-4">{job.company}</p>
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <PlayCircle className="h-5 w-5" />
                                            <div>
                                                <p className="text-sm font-medium">{t("category")}</p>
                                                <p className="text-sm">{job.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Pin className="h-5 w-5" />
                                            <div>
                                                <p className="text-sm font-medium">{t("location")}</p>
                                                <p className="text-sm">{job.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <DollarSign className="h-5 w-5" />
                                            <div>
                                                <p className="text-sm font-medium">{t("ctc")}</p>
                                                <p className="text-sm">{job.CTC}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                {t("jobTag")}
                                            </span>
                                            <div className="flex items-center space-x-1 text-green-600">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">{t("postedRecently")}</span>
                                            </div>
                                        </div>
                                        <Link href={`/detailjob/${job._id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                                            {t("viewDetails")}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mobile Filter Modal ── */}
            {isFiltervisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity">
                    <div className="bg-white h-full w-auto max-w-md ml-auto flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-800">{t("filters")}</h2>
                            <button onClick={() => setisFiltervisible(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 pb-32">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("category")}</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={filter.category}
                                        onChange={handlefilterchange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder={t("categoryPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("location")}</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={filter.location}
                                        onChange={handlefilterchange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder={t("locationPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t("experience")}</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={filter.experience}
                                        onChange={handlefilterchange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder={t("experiencePlaceholder")}
                                    />
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-gray-700 font-medium">{t("workFromHome")}</span>
                                        <input
                                            type="checkbox"
                                            name="workFromHome"
                                            checked={filter.workFromHome}
                                            onChange={handlefilterchange}
                                            className="h-5 w-5 text-blue-600 rounded-md border-gray-300"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-gray-700 font-medium">{t("partTime")}</span>
                                        <input
                                            type="checkbox"
                                            name="partTime"
                                            checked={filter.partTime}
                                            onChange={handlefilterchange}
                                            className="h-5 w-5 text-blue-600 rounded-md border-gray-300"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {t("annualSalary")} (₹ {filter.salary}L)
                                    </label>
                                    <input
                                        type="range"
                                        name="salary"
                                        min="0"
                                        max="100"
                                        value={filter.salary}
                                        onChange={handlefilterchange}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                        <span>₹0L</span><span>₹50L</span><span>₹100L</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                            <button
                                onClick={() => setisFiltervisible(false)}
                                className="flex-[2] py-3.5 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
                            >
                                {t("applyFilters")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default index;