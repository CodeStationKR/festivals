"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AosInitializer: React.FC = () => {
  useEffect(() => {
    AOS.init();
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(function () {
        AOS.refresh();
      }, 500);
    });
  }, []);
  return null;
};

export default AosInitializer;
