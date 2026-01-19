"use client";

import { useState } from "react";
import about1 from "../../assets/OverMission.jpg";
import about2 from "../../assets/OverVision.webp";
import about3 from "../../assets/about.jpg";

export default function HomeAbout() {
  const [, setHoveredCard] = useState(null);

  return (
    <section className="relative bg-white py-24 lg:pt-20 lg:pb-5 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Playfair Display] italic text-slate-900 mb-6">
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Tomorrow's Infrastructure
            </span>
          </h2>
          <p className="text-2xl text-slate-600 max-w-3xl font-playfair mx-auto leading-relaxed font-light">
            Discover how S Raj Infra Projects is shaping the future of
            engineering and construction
          </p>
        </div>

        {/* Main Content with Image - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Welcome Card */}
            <div className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <h3 className="text-3xl font-bold text-slate-900 mb-4 font-[Playfair Display] ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  Welcome
                </span>{" "}
                to S Raj Infra Projects
              </h3>
              <p className="text-slate-700 leading-relaxed text-base font-[Playfair Display] italic text-justify">
                We are dedicated to providing{" "}
                <span className="font-semibold text-slate-900">
                  world-class engineering solutions
                </span>
                , innovating and constructing bridges and other engineering
                marvels using{" "}
                <span className="font-semibold text-amber-600">
                  cutting-edge technology
                </span>{" "}
                and{" "}
                <span className="font-semibold text-amber-600">
                  cost-efficient practices
                </span>
                .
              </p>
            </div>
          </div>

          {/* Right Image with Animation */}
          <div className="relative h-96 lg:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl opacity-20 blur-2xl animate-pulse" />
            <img
              src={about3}
              alt="Infrastructure Construction"
              className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-2xl blur-xl opacity-30 z-0" />
          </div>
        </div>

        {/* Vision & Mission Section - Side by Side with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Vision Card with Image */}
          <div
            className="group relative"
            onMouseEnter={() => setHoveredCard("vision")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 -z-10" />

            <div className="relative bg-white rounded-3xl overflow-hidden border-2 border-slate-200 group-hover:border-transparent transition-all duration-500">
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img
                  src={about2}
                  alt="Our Vision"
                  className="w-full h-full object-fill transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold font-[Playfair Display] mb-4">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                    Vision
                  </span>
                </h3>
                <p className="text-slate-700 leading-relaxed font-[Playfair Display] italic text-justify">
                  To innovate and construct{" "}
                  <span className="font-semibold text-slate-900">
                    world-class bridges
                  </span>{" "}
                  and engineering marvels using cutting-edge technology and
                  cost-efficient practices, aiming to become a{" "}
                  <span className="font-bold text-amber-600">
                    globally recognized leader in construction engineering
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card with Image */}
          <div
            className="group relative"
            onMouseEnter={() => setHoveredCard("mission")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 -z-10" />

            <div className="relative bg-white rounded-3xl overflow-hidden border-2 border-slate-200 group-hover:border-transparent transition-all duration-500">
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img
                  src={about1}
                  alt="Our Mission"
                  className="w-full h-full object-fill transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold font-[Playfair Display] mb-4">
                  Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                    Mission
                  </span>
                </h3>
                <p className="text-slate-700 leading-relaxed font-[Playfair Display] italic text-justify">
                  To be a{" "}
                  <span className="font-semibold text-slate-900">
                    premier engineering organization
                  </span>
                  , delivering signature bridges and engineering marvels both
                  domestically and internationally,{" "}
                  <span className="font-bold text-amber-600">
                    fostering innovation
                  </span>
                  , creating value, and{" "}
                  <span className="font-bold text-amber-600">
                    setting global benchmarks
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
