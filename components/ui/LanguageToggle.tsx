"use client";

import React from "react";
import styled from "styled-components";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const isChecked = language === "fr"; // French = checked (right), English = unchecked (left)

  return (
    <StyledWrapper>
      <div className="switch">
        <input
          className="switch-check"
          id="language-switch"
          type="checkbox"
          checked={isChecked}
          onChange={toggleLanguage}
          aria-label={`Switch to ${language === "en" ? "French" : "English"}`}
        />
        <label className="switch-label" htmlFor="language-switch">
          <span className="switch-text-left">EN</span>
          <span className="switch-slider" />
          <span className="switch-text-right">FR</span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    border: 4px solid rgba(58, 58, 58, 0.1);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5) inset;
    height: 48px;
    margin: 2px;
    position: relative;
    width: 120px;
    display: inline-block;
    user-select: none;
  }

  .switch-check {
    position: absolute;
    visibility: hidden;
    user-select: none;
  }

  .switch-label {
    cursor: pointer;
    display: block;
    height: 42px;
    width: 115px;
    position: relative;
    user-select: none;
  }

  .switch-text-left,
  .switch-text-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: opacity 0.2s;
    z-index: 10;
    pointer-events: none;
  }

  .switch-text-left {
    left: 12px;
  }

  .switch-text-right {
    right: 12px;
  }

  .switch-label:before {
    background: #fff;
    background: -webkit-radial-gradient(45%, circle, rgb(255, 58, 58) 0%, rgb(255, 113, 113) 100%);
    border-radius: 10px;
    border: 1px solid #742323;
    box-shadow: 0 2px 5px rgba(255, 67, 48, 0.6), 0 0 5px rgba(255, 159, 109, 0.5) inset;
    content: "";
    display: block;
    height: 10px;
    left: -20%;
    position: absolute;
    top: 16px;
    transition: all 0.2s;
    width: 10px;
    z-index: 12;
    user-select: none;
  }

  .switch-label:after {
    background: #fff;
    background: -moz-radial-gradient(45%, circle, rgba(60, 60, 60, 0.6) 0%, rgba(151, 151, 151, 0.6) 100%);
    border-radius: 10px;
    border: 1px solid #111;
    box-shadow: 0 2px 5px rgba(20, 20, 20, 0.5);
    content: "";
    display: block;
    height: 10px;
    right: -20%;
    position: absolute;
    top: 16px;
    transition: all 0.2s;
    width: 10px;
    z-index: 12;
    user-select: none;
  }

  .switch-slider {
    background: linear-gradient(#4f4f4f, #2b2b2b);
    border-radius: 30px;
    border: 1px solid #1a1a1a;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5), 0 1px 1px rgba(255, 255, 255, 0.1) inset, 0 -2px 0 rgba(0, 0, 0, 0.2) inset;
    display: block;
    height: 38px;
    left: 1px;
    position: absolute;
    top: 1px;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
    width: 53px;
    user-select: none;
  }

  .switch-slider:before {
    background: #fff;
    background: -webkit-linear-gradient(left, rgba(48, 48, 48, 0.4), rgba(34, 34, 34, 0.4));
    background: linear-gradient(left, rgba(48, 48, 48, 0.4), rgba(34, 34, 34, 0.4));
    border-radius: 30px 10px 10px 30px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2) inset;
    content: "";
    display: block;
    height: 33px;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 21px;
    user-select: none;
  }

  .switch-slider:after {
    background: #fff;
    background: -webkit-linear-gradient(right, rgba(48, 48, 48, 0.4), rgba(34, 34, 34, 0.4));
    border-radius: 10px 30px 30px 10px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2) inset;
    content: "";
    display: block;
    height: 33px;
    position: absolute;
    right: 2px;
    top: 2px;
    width: 21px;
    user-select: none;
  }

  .switch-check:checked + .switch-label .switch-slider {
    left: 59px;
  }

  .switch-check:checked + .switch-label:before {
    background: -webkit-radial-gradient(45%, circle, rgba(60, 60, 60, 0.6) 0%, rgba(151, 151, 151, 0.6) 100%);
    border: 1px solid #111;
    box-shadow: 0 2px 5px rgba(20, 20, 20, 0.5);
    user-select: none;
  }

  .switch-check:checked + .switch-label:after {
    background: -webkit-radial-gradient(45%, circle, lightgreen 0%, lightgreen 100%);
    border: 1px solid #004562;
    box-shadow: 0 2px 5px green, 0 0 5px green inset;
    user-select: none;
  }
`;

export default LanguageToggle;

