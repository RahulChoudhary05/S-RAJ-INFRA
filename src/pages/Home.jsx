import React from 'react';
import Layout from '../components/layout/layout';
import { Hero } from './HeroSection';
import { images } from "../components/data/HeroBg";
import ImageSlider from '../components/HomeGallery/gallery';
import { Link } from 'react-router-dom';
import { HomeAbout } from '../components/HomeAbout/ui/animatedAbout';
import slides from '../components/data/HomeGallery';
// import { AnimatedPinDemo } from '../components/Bibliography/ui/Cardinfo';
import Home from '../components/Team/how';

const FuzzyOverlayExample = () => {
  return (
    <Layout>
      <Hero images={images} className="h-screen w-full">
        <div className="z-50 relative grid h-screen place-content-center space-y-6 p-8">
          <h1 className="text-5xl md:text-6xl text-center text-neutral-50 font-bold">
            S RAJ INFRA PROJECTS PRIVATE LIMITED
          </h1>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 mx-auto text-center rounded-full relative mt-4 text-neutral-400 font-bold hover:bg-neutral-800 hover:text-white">
          <span><Link to="career">Apply Now →</Link></span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
        </div>
      </Hero>
      <HomeAbout/>
      {/* <ImageSlider/> */}
      <ImageSlider slides={slides} />
      {/* <AnimatedPinDemo/> */}
      <Home/>
    </Layout>
  );
};

export default FuzzyOverlayExample;
