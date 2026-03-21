import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowUpRight,
  Banknote,
  Calendar,
  ChevronRight,
  Info,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useLanguage } from "@/lib/i18n/LanguageContext"; // ✅ NEW

export default function SvgSlider() {
  const { t } = useLanguage(); // ✅ NEW

  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  const slides = [
    { pattern: "pattern-1", titleKey: "slideTitle1", bgColor: "bg-indigo-600" },
    { pattern: "pattern-2", titleKey: "slideTitle2", bgColor: "bg-blue-600" },
    { pattern: "pattern-3", titleKey: "slideTitle3", bgColor: "bg-purple-600" },
    { pattern: "pattern-4", titleKey: "slideTitle4", bgColor: "bg-teal-600" },
  ];

  const stats = [
    { number: "300K+", labelKey: "statCompanies" },
    { number: "10K+", labelKey: "statOpenings" },
    { number: "21Mn+", labelKey: "statStudents" },
    { number: "600K+", labelKey: "statLearners" },
  ];

  const [internships, setinternship] = useState<any>([]);
  const [jobs, setjob] = useState<any>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const [internshipres, jobres] = await Promise.all([
          axios.get("https://clone-internshala.onrender.com/api/internship"),
          axios.get("https://clone-internshala.onrender.com/api/job"),
        ]);
        setinternship(internshipres.data);
        setjob(jobres.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredInternships = internships.filter(
    (item: any) => !selectedCategory || item.category === selectedCategory
  );
  const filteredJobs = jobs.filter(
    (item: any) => !selectedCategory || item.category === selectedCategory
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8 py-8">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("heroTitle")} {/* ✅ */}
          </h1>
          <p className="text-xl text-gray-600">
            {t("heroSubtitle")} {/* ✅ */}
          </p>
        </div>

        {/* Swiper Section */}
        <div className="mb-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={`relative h-[400px] ${slide.bgColor}`}>
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {slide.pattern === "pattern-1" && (
                        <pattern id="pattern-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="3" fill="white" />
                        </pattern>
                      )}
                      {slide.pattern === "pattern-2" && (
                        <pattern id="pattern-2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <rect x="15" y="15" width="10" height="10" fill="white" />
                        </pattern>
                      )}
                      {slide.pattern === "pattern-3" && (
                        <pattern id="pattern-3" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="white" />
                        </pattern>
                      )}
                      {slide.pattern === "pattern-4" && (
                        <pattern id="pattern-4" x="5" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                          <path d="M30 5 L55 30 L30 55 L5 30 Z" fill="white" />
                        </pattern>
                      )}
                      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${slide.pattern})`} />
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">
                      {t(slide.titleKey)} {/* ✅ */}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Category Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("latestInternships")} {/* ✅ */}
          </h2>
          <div className="flex flex-wrap gap-4">
            <span className="text-gray-700 font-medium">
              {t("popularCategories")} {/* ✅ */}
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Internship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredInternships.map((internship: any, index: any) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <ArrowUpRight size={20} />
                <span className="font-medium">{t("activelyHiring")}</span> 
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{internship.title}</h3>
              <p className="text-gray-500 mb-4">{internship.company}</p>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Banknote size={18} />
                  <span>{internship.stipend}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{internship.startDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {t("internshipTag")} {/* ✅ */}
                </span>
                <Link href={`/detailiternship/${internship._id}`} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  {t("viewDetails")} {/* ✅ */}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("latestJobs")} {/* ✅ */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredJobs.map((job: any, index: any) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <ArrowUpRight size={20} />
                  <span className="font-medium">{t("activelyHiring")}</span> {/* ✅ */}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{job.title}</h3>
                <p className="text-gray-500 mb-4">{job.company}</p>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote size={18} />
                    <span>{job.CTC}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info size={18} />
                    <span>{job.Experience}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {t("jobTag")} {/* ✅ */}
                  </span>
                  <Link href={`/detailjob/${job._id}`} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    {t("viewDetails")} {/* ✅ */}
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {t(stat.labelKey)} {/* ✅ */}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}