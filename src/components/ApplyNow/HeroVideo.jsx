import React from "react";
import video from "../../assets/Video/S_RAJ_INFRA_VIDEO.mp4";

export const HeroVideo = () => {
    return (
        <div className="relative min-h-screen">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ filter: "brightness(0.7)" }}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
            </div>
        </div>
    );
};