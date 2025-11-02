"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import AnimatedHeading from "../ui/animated-heading";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div id="ContactForm" className="flex items-center min-h-screen bg-transparent">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto my-10 bg-transparent p-5 rounded-md shadow-sm">
          <div className="text-center">
            <AnimatedHeading as="h2" className="text-[40px] font-semibold py-10">
              {t("contact.heading")}
            </AnimatedHeading>
            <p className="text-gray-400 text-lg mb-8">
              {t("contact.subtitle")}
            </p>
          </div>
          <div className="m-7">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              id="form"
            >
              <input
                type="hidden"
                name="access_key"
                value="222e866f-6f9f-40d8-ae89-6f10762037e3"
              />
              <input
                type="hidden"
                name="subject"
                value="New AI Solutions Inquiry from Noryon Website"
              />
              <input
                type="hidden"
                name="redirect"
                value="https://web3forms.com/success"
              />
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
              />
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="font-bold block mb-2 text-sm text-gray-400 dark:text-gray-400"
                >
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={t("contact.placeholderName")}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#00c8cf] focus:border-[#00c8cf] dark:bg-[#202636] dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-[#00c8cf] dark:focus:border-[#00c8cf]"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="font-bold block mb-2 text-sm text-gray-400 dark:text-gray-400"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("contact.placeholderEmail")}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#00c8cf] focus:border-[#00c8cf] dark:bg-[#202636] dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-[#00c8cf] dark:focus:border-[#00c8cf]"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="font-bold text-sm text-gray-400 dark:text-gray-400"
                >
                  {t("contact.phone")}
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder={t("contact.placeholderPhone")}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#00c8cf] focus:border-[#00c8cf] dark:bg-[#202636] dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-[#00c8cf] dark:focus:border-[#00c8cf]"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="font-bold block mb-2 text-sm text-gray-400 dark:text-gray-400"
                >
                  {t("contact.businessInfo")}
                </label>
                <textarea
                  rows={5}
                  name="message"
                  id="message"
                  placeholder={t("contact.placeholderMessage")}
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#00c8cf] focus:border-[#00c8cf] dark:bg-[#202636] dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-[#00c8cf] dark:focus:border-[#00c8cf]"
                ></textarea>
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white font-bold transition ease-in-out delay-150 border border-gray-600 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-gray-800 duration-300 focus:outline-none"
                >
                  {t("contact.buttonText")}
                </button>
              </div>
              <p
                className="text-base text-center text-black-400"
                id="result"
              ></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
