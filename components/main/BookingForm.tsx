"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import { useLanguage } from "@/contexts/LanguageContext";

const BookingForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: t("booking.successMessage"),
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || t("booking.errorMessage"),
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: t("booking.errorMessage"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="BookingForm" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements removed for performance */}

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] text-center mx-auto inline-flex items-center"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] font-helvetica-neue">{t("booking.badge")}</h1>
          </motion.div>

          <AnimatedHeading as="h2" className="mt-4 text-4xl md:text-5xl font-bold">
            {t("booking.heading")}
          </AnimatedHeading>

          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            {t("booking.subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-sm"
        >
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
              <p className={`text-center ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                {submitStatus.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  {t("booking.name")} <span className="text-gray-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder={t("booking.placeholderName")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  {t("booking.email")} <span className="text-gray-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder={t("booking.placeholderEmail")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  {t("booking.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder={t("booking.placeholderPhone")}
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                  {t("booking.service")} <span className="text-gray-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 text-white placeholder-gray-400 transition-all duration-300"
                >
                  <option value="" disabled>{t("booking.selectService")}</option>
                  <option value="Web Development">{t("booking.webDev")}</option>
                  <option value="Content Marketing">{t("booking.contentMarketing")}</option>
                  <option value="SEO Optimization">{t("booking.seo")}</option>
                  <option value="Graphic Design">{t("booking.graphicDesign")}</option>
                  <option value="Social Media Marketing">{t("booking.socialMedia")}</option>
                  <option value="Other">{t("booking.other")}</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                {t("booking.message")} <span className="text-gray-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 text-white placeholder-gray-400 transition-all duration-300 resize-none"
                placeholder={t("booking.placeholderMessage")}
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-lg text-white font-medium shadow-lg shadow-gray-500/20 hover:shadow-gray-500/40 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isSubmitting ? t("booking.submitting") : t("booking.buttonText")}
            </motion.button>

            <div className="mt-4">
              <a
                href="https://api.whatsapp.com/send?phone=+919810724697&text=Hey"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg text-white font-medium shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                {t("booking.textUs")}
              </a>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              {t("booking.privacyText")} <a href="#" className="text-gray-400 hover:text-gray-300 underline">{t("booking.privacyPolicy")}</a> {t("booking.and")} <a href="#" className="text-gray-400 hover:text-gray-300 underline">{t("booking.termsOfService")}</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingForm;