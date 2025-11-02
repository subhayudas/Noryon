"use client";

import Script from "next/script";

const CalendlyWidget = () => {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div className="w-screen h-screen relative">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/subhayudas49/30min?hide_gdpr_banner=1"
          style={{ width: "100%", height: "100vh", minHeight: "700px" }}
        />
      </div>
    </>
  );
};

export default CalendlyWidget;
