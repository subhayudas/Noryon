"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContainerScrollTitle = () => {
  const { t } = useLanguage();
  
  return (
    <div className="font-bold text-4xl md:text-5xl text-white">
      {t("containerScroll.heading")}
    </div>
  );
};

export default ContainerScrollTitle;



