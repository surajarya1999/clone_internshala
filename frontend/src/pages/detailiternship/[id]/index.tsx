import { ArrowUpRight, Calendar, Clock, DollarSign, ExternalLink, MapPin, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectuser } from '@/Feature/Userslice';
import { toast } from 'react-toastify';
import { useLanguage } from '@/lib/i18n/LanguageContext'; // ✅

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useLanguage(); // ✅
  const [internshipData, setinternship] = useState<any>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`https://clone-internshala.onrender.com/api/internship/${id}`);
        setinternship(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [availability, setAvailability] = useState("");
  const user = useSelector(selectuser);

  if (!internshipData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handlesubmitapplication = async () => {
    if (!coverLetter.trim()) {
      toast.error("please write a cover letter");
      return;
    }
    if (!availability) {
      toast.error("please select your availability");
      return;
    }
    try {
      const applicationdata = {
        category: internshipData.category,
        company: internshipData.company,
        coverLetter: coverLetter,
        user: user,
        Application: id,
        availability,
      };
      await axios.post("https://clone-internshala.onrender.com/api/application", applicationdata);
      toast.success("Application submit successfully");
      router.push('/internship');
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application");
    }
  };

  const availabilityOptions = [
    t("availability1"),
    t("availability2"),
    t("availability3"),
    t("availability4"),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <ArrowUpRight className="h-5 w-5" />
            <span className="font-medium">{t("activelyHiring")}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{internshipData.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{internshipData.company}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{internshipData.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="h-5 w-5" />
              <span>{internshipData.stipend}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>{internshipData.startDate}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-green-500 text-sm">
              {t("postedOn")} {internshipData.createdAt}
            </span>
          </div>
        </div>

        {/* About Company */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("aboutCompany")} {internshipData.company}
          </h2>
          <div className="flex items-center space-x-2 mb-4">
            <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <span>{t("visitWebsite")}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-600">{internshipData.aboutCompany}</p>
        </div>

        {/* Internship Details */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t("aboutInternship")}</h2>
          <p className="text-gray-600 mb-6">{internshipData.aboutInternship}</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("whoCanApply")}</h3>
          <p className="text-gray-600 mb-6">{internshipData.whoCanApply}</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("perks")}</h3>
          <p className="text-gray-600 mb-6">{internshipData.perks}</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("additionalInfo")}</h3>
          <p className="text-gray-600 mb-6">{internshipData.additionalInfo}</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("numberOfOpenings")}</h3>
          <p className="text-gray-600">{internshipData.numberOfOpening}</p>
        </div>

        {/* Apply Button */}
        <div className="p-6 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-150"
          >
            {t("applyNow")}
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("applyTo")} {internshipData.company}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Resume */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("yourResume")}</h3>
                <p className="text-gray-600">{t("resumeNote")}</p>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("coverLetter")}</h3>
                <p className="text-gray-600 mb-2">{t("coverLetterNote")}</p>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder={t("coverLetterPlaceholder")}
                />
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("yourAvailability")}</h3>
                <div className="space-y-3">
                  {availabilityOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="availability"
                        value={option}
                        checked={availability === option}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                {user ? (
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    onClick={handlesubmitapplication}
                  >
                    {t("submitApplication")}
                  </button>
                ) : (
                  <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    {t("signUpToApply")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;