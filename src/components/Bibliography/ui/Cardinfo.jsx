"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] from-blue-800 to fill-blue-100 w-full flex items-center justify-center">
      <div className="flex gap-8">

        <PinContainer title="Director" href="/">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-white">
              Kumar Deepak
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-white ">don't worry about te design</span>
            </div>
            <div
              className="flex flex-1 w-full h-32 rounded-lg mt-4 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://via.placeholder.com/400x300")`,
              }}
            />
          </div>
        </PinContainer>

        <PinContainer title="Chief Technology Officer" href="/">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-white">
              Sourav Singh
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-white ">Anything i can do it</span>
            </div>
            <div
              className="flex flex-1 w-full h-32 rounded-lg mt-4 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://via.placeholder.com/400x300")`,
              }}
            />
          </div>
        </PinContainer>

        <PinContainer title="Managing Director" href="/">
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-white">
              Uma Nand Singh
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-white ">Just u say so</span>
            </div>
            <div
              className="flex flex-1 w-full h-32 rounded-lg mt-4 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://via.placeholder.com/400x300")`,
              }}
            />
          </div>
        </PinContainer>
      </div>
    </div>
  );
}
