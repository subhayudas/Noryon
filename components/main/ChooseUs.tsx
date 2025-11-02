"use client";
import React, { useEffect, useRef, useState } from "react";
import { CardHoverEffectDemo } from "./snippets/card-hover-effect-snippet2";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import AnimatedHeading from "../ui/animated-heading";

const ChooseUs = () => {
  return (
    <div className="bg-[#202636]">
        <div className="max-w-5xl mx-auto">
         
          <CardHoverEffectDemo />

          {/* Companys who worked with us */}

          <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-2 py-12">
            <AnimatedHeading as="h2" className="w-full mb-4 mt-4 text-center text-5xl font-semibold tracking-wider">
              Trusted by the best
            </AnimatedHeading>
            <p className="text-center text-white ">
              From small businesses to large corporations,
              <br /> we have helped many brands elevate their business.
            </p>
          </div>

          <Marquee
            direction="left"
            speed={50}
            loop={0}
            pauseOnClick={true}
            // gradient={true}
            // gradientColor="$fff"
            // gradientWidth={100}
            autoFill={true}
          >
            <div>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none anima mask-section">
                <li>
                  <Image
                    src="https://blue-official-newt-770.mypinata.cloud/ipfs/QmTcYu6JBKtxJeZMgE2eEc7Ts9cwC1DcpPfLLwtRhZgM2K/carolo.png"
                    alt="logo"
                    height={120}
                    width={120}
                  />
                </li>
                <li>
                  <Image src="https://blue-official-newt-770.mypinata.cloud/ipfs/QmTcYu6JBKtxJeZMgE2eEc7Ts9cwC1DcpPfLLwtRhZgM2K/masum.png" alt="logo" height={120} width={120} />
                </li>
                <li>
                  <Image src="https://blue-official-newt-770.mypinata.cloud/ipfs/QmTcYu6JBKtxJeZMgE2eEc7Ts9cwC1DcpPfLLwtRhZgM2K/nazny.png" alt="logo" height={120} width={120} />
                </li>
              </ul>
            </div>
          </Marquee>
          <Marquee
            direction="right"
            speed={50}
            loop={0}
            pauseOnClick={true}
            // gradient={true}
            // gradientColor="$fff"
            // gradientWidth={200}
            autoFill={true}
          >
            <div>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none anima mask-section">
                <li>
                  <Image src="https://blue-official-newt-770.mypinata.cloud/ipfs/QmTcYu6JBKtxJeZMgE2eEc7Ts9cwC1DcpPfLLwtRhZgM2K/nazny.png" alt="logo" height={120} width={120} />
                </li>
                <li>
                  <Image
                    src="https://blue-official-newt-770.mypinata.cloud/ipfs/QmTcYu6JBKtxJeZMgE2eEc7Ts9cwC1DcpPfLLwtRhZgM2K/carolo.png"
                    alt="logo"
                    height={120}
                    width={120}
                  />
                </li>
                <li>
                  <Image src="https://blue-official-newt-770.mypinata.cloud/ipfs/QmTcYu6JBKtxJeZMgE2eEc7Ts9cwC1DcpPfLLwtRhZgM2K/masum.png" alt="logo" height={120} width={120} />
                </li>
              </ul>
            </div>
          </Marquee>
        </div>
      </div>
  )
}

export default ChooseUs