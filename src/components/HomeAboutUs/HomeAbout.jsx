"use client";

import { useState, useEffect, useRef } from "react";
import about1 from "../../assets/OverMission.jpg";
import about2 from "../../assets/OverVision.webp";
import about3 from "../../assets/about.jpg";

function FeatureItem({ text, delay }) {
  return (
    <div
      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md border border-slate-100 transition-all duration-700"
      style={{ transitionDelay: delay }}
    >
      <span className="flex h-2 w-2 rounded-full bg-orange-600" />
      <span className="text-sm font-semibold text-slate-800">{text}</span>
    </div>
  );
}

export default function HomeAbout() {
  const [isVisible, setIsVisible] = useState({
    title: false,
    subtitle: false,
    welcome: false,
    welcomeText: false,
    image: false,
    visionCard: false,
    missionCard: false,
    splitTrigger: false,
  });
  const [isSplit, setIsSplit] = useState(false);
  const [isSplitReady, setIsSplitReady] = useState(false);

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -80px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute("data-observe");
          if (!elementId) return;

          setIsVisible((prev) => ({
            ...prev,
            [elementId]: true,
          }));

          // Trigger split when trigger element is visible
          if (elementId === "splitTrigger") {
            // phase 1: prepare animation
            setIsSplitReady(true);

            // phase 2: reveal content
            setTimeout(() => setIsSplit(true), 400);
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = sectionRef.current.querySelectorAll("[data-observe]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isSplit]); // 🔥 KEY FIX

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-24 lg:pt-20 lg:pb-20 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div
          data-observe="title"
          className={`mb-4 transition-all duration-700 ${
            isVisible.title
              ? "text-reveal opacity-100"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-[playfair] italic">
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
              Tomorrow's Infrastructure
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <div
          data-observe="subtitle"
          className={`mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible.subtitle
              ? "text-reveal opacity-100"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl">
            Discover how S Raj Infra Projects is shaping the future of{" "}
            <span className="lg:text-2xl text-orange-600 font-semibold font-[playfair] italic">
              engineering and construction
            </span>
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Welcome Heading */}
            <div
              data-observe="welcome"
              className={`transition-all duration-700 ${
                isVisible.welcome
                  ? "text-reveal opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 ">
                  Welcome to
                </span>{" "}
                S Raj Infra Projects
              </h3>
            </div>

            {/* Welcome Text with Highlighted Keywords */}
            <div
              data-observe="welcomeText"
              className={`transition-all duration-700 ${
                isVisible.welcomeText
                  ? "text-reveal opacity-100"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              <p className="text-lg text-slate-700 leading-relaxed text-justify">
                We are dedicated to providing{" "}
                <span className="font-bold text-orange-600">
                  world-class engineering solutions
                </span>
                , innovating and constructing bridges and other engineering
                marvels using{" "}
                <span className="font-bold text-orange-600">
                  cutting-edge technology
                </span>{" "}
                and{" "}
                <span className="font-bold text-orange-600">
                  cost-efficient practices
                </span>
                .
              </p>
            </div>

            {/* Morphing Cards Container */}
            <div
              ref={cardsContainerRef}
              className={`pt-4 transition-all duration-1000 ease-out ${
                isSplit ? "space-y-6" : "space-y-0"
              }`}
            >
              {/* Combined Welcome Card that morphs into Vision Card */}
              <div
                data-observe="visionCard"
                className={`group relative transition-all duration-1000 ease-in-out transform ${
                  isVisible.visionCard
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                } ${isSplit ? "lg:w-full" : "lg:w-full"} hover:shadow-2xl`}
                style={{
                  transitionDelay: "600ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white border-2 border-slate-100 rounded-3xl p-8 sm:p-12 hover:border-orange-300 transition-all duration-500 shadow-lg hover:shadow-2xl">
                  <h4 className="text-3xl font-bold text-slate-900 mb-3 font-[playfair] italic">
                    Our <span className="text-orange-600">Vision</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    To innovate and construct{" "}
                    <span className="font-bold text-slate-900">
                      world-class bridges
                    </span>{" "}
                    and engineering marvels using cutting-edge technology and
                    cost-efficient practices, aiming to become a{" "}
                    <span className="font-bold text-orange-600">
                      leader in construction engineering
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Trigger observer for split */}
              <div data-observe="splitTrigger" className="h-1" />

              {/* Mission Card that appears after split */}
              {isSplit && (
                <div
                  data-observe="missionCard"
                  className={`group relative transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${
                          isSplit
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-6 scale-95 pointer-events-none"
                        }
                         lg:delay-200
             `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white border-2 border-slate-100 rounded-3xl p-8 sm:p-12 hover:border-orange-300 transition-all duration-500 shadow-lg hover:shadow-2xl">
                    <h4 className="text-3xl font-bold text-slate-900 mb-3 font-[playfair] italic">
                      Our <span className="text-orange-600">Mission</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-justify">
                      To be a{" "}
                      <span className="font-bold text-slate-900">
                        premier engineering organization
                      </span>
                      , delivering signature bridges and engineering marvels
                      both domestically and internationally,{" "}
                      <span className="font-bold text-orange-600">
                        fostering innovation
                      </span>
                      , creating value, and{" "}
                      <span className="font-bold text-orange-600">
                        setting global benchmarks
                      </span>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Image + Highlights */}
          <div
            data-observe="image"
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${
              isVisible.image ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative w-full max-w-lg space-y-8">
              {/* Image Wrapper */}
              <div
                className={`relative transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isSplitReady
                    ? "-translate-y-2 scale-[0.98] lg:-translate-y-8 lg:scale-110"
                    : "translate-y-0 scale-100"
                }`}
              >
                {/* 🔥 GLOW GOES HERE */}
                <div
                  className={`absolute rounded-[2rem] transition-all duration-1000
                                         -inset-6 blur-[40px]
                                      lg:-inset-14 lg:blur-[90px]
                          ${
                            isSplit
                              ? "bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 opacity-40 lg:opacity-60"
                              : "bg-gradient-to-br from-orange-300 via-orange-200 to-orange-100 opacity-25 lg:opacity-35"
                          }`}
                />

                <img
                  src={about3}
                  alt="S Raj Infra Projects - Infrastructure Construction"
                  className="w-full h-auto object-cover rounded-3xl shadow-xl relative z-10 animate-float"
                />
                {isSplit && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-fade-in" />
                )}

                {/* Floating badge */}
                {isSplit && (
                  <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg text-sm font-semibold text-orange-600 animate-fade-in">
                    Engineering Excellence
                  </div>
                )}
              </div>

              {/* Feature Highlights (Option 4) */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-1000 ease-out ${
                  isSplit
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10 pointer-events-none"
                }`}
              >
                <FeatureItem text="Quality Driven" delay="0ms" />
                <FeatureItem text="On-Time Delivery" delay="150ms" />
                <FeatureItem text="Sustainable Design" delay="300ms" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
