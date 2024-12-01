"use client";

import React from "react";
import { PinContainer } from "../ui/3d-pin";

export function AnimatedPinDemo() {
  const teamMembers = [
    {
      title: "Director",
      name: "Kumar Deepak",
      description: "don't worry about the design",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7pyhyHsQya4178TCw8BgkFoG31Bo8RLmHQ&s",
    },
    {
      title: "Chief Technology Officer",
      name: "Sourav Singh",
      description: "Anything I can do it",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEu6ZsR0VBPv4ei51SbzDQmsdkq_vxQgwiUw&s",
    },
    {
      title: "Managing Director",
      name: "Uma Nand Singh",
      description: "Just u say so",
      image:
        "https://media.istockphoto.com/id/149452771/photo/man-with-gray-hair-and-beard-wearing-shirt-and-blue-suit.jpg?s=612x612&w=0&k=20&c=XZiyF-Y2DNnYcCA-KFWoDPnBOzr-OAcp4SUdom956Vo=",
    },
  ];

  return (
    <div className="w-full bg-gray-100 bg-gradient-to-b from-richblack-5 to-white py-8 text-center">
      <h2 className="text-7xl font-bold font-inter text-richblack-900 mb-5">
        Board of Directors
      </h2>
      <div className="min-h-[25rem] bg-gradient-to-b from-richblack-5 to-white w-full flex items-center justify-evenly relative p-4 md:p-8 mb-7">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {teamMembers.map((member, index) => (
            <PinContainer key={index} title={member.title} href="/">
              <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-full md:w-[20rem] h-[20rem]">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold font-playfair text-xl text-white">
                  {member.name}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-white font-inter font-semibold">{member.description}</span>
                </div>
                <div
                  className="flex flex-1 w-full h-32 rounded-lg mt-4 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${member.image}")`,
                  }}
                />
              </div>
            </PinContainer>
          ))}
        </div>
      </div>
    </div>
  );
}
