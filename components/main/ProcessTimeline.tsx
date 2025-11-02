"use client";

import React from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import AnimatedHeading from "../ui/animated-heading";
import { Timeline } from "../ui/timeline";
import { useLanguage } from "@/contexts/LanguageContext";

const ProcessTimeline = () => {
  const { t } = useLanguage();
  
  const processData = [
    {
      title: t("process.step1.title"),
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-300">
            {t("process.step1.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-blue-500 to-indigo-600 inline-block rounded-lg p-2 mb-3">
                🔍
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step1.card1Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step1.card1Desc")}</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-blue-500 to-indigo-600 inline-block rounded-lg p-2 mb-3">
                👥
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step1.card2Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step1.card2Desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("process.step2.title"),
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-300">
            {t("process.step2.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-purple-500 to-violet-600 inline-block rounded-lg p-2 mb-3">
                📝
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step2.card1Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step2.card1Desc")}</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-purple-500 to-violet-600 inline-block rounded-lg p-2 mb-3">
                🎯
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step2.card2Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step2.card2Desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("process.step3.title"),
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-300">
            {t("process.step3.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-pink-500 to-rose-600 inline-block rounded-lg p-2 mb-3">
                🎨
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step3.card1Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step3.card1Desc")}</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-pink-500 to-rose-600 inline-block rounded-lg p-2 mb-3">
                📱
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step3.card2Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step3.card2Desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("process.step4.title"),
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-300">
            {t("process.step4.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-green-500 to-emerald-600 inline-block rounded-lg p-2 mb-3">
                💻
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step4.card1Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step4.card1Desc")}</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-green-500 to-emerald-600 inline-block rounded-lg p-2 mb-3">
                ⚙️
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step4.card2Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step4.card2Desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("process.step5.title"),
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-300">
            {t("process.step5.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-gray-500 to-gray-400 inline-block rounded-lg p-2 mb-3">
                🧪
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step5.card1Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step5.card1Desc")}</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-gray-500 to-gray-400 inline-block rounded-lg p-2 mb-3">
                🚀
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step5.card2Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step5.card2Desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("process.step6.title"),
      content: (
        <div>
          <p className="mb-8 text-sm font-normal text-gray-300">
            {t("process.step6.description")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 inline-block rounded-lg p-2 mb-3">
                📈
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step6.card1Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step6.card1Desc")}</p>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 inline-block rounded-lg p-2 mb-3">
                🔄
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-helvetica-neue">{t("process.step6.card2Title")}</h4>
              <p className="text-gray-300 text-sm">{t("process.step6.card2Desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="ProcessTimeline" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements removed for performance */}

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] text-center mx-auto inline-flex items-center">
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">{t("process.badge")}</h1>
          </div>

          <AnimatedHeading as="h2" className="mt-4 text-4xl md:text-5xl font-bold">
            {t("process.heading")}
          </AnimatedHeading>

          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
            {t("process.subtitle")}
          </p>
        </div>

        <div className="relative w-full overflow-clip">
          <Timeline data={processData} />
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
