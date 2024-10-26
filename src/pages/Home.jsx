import { useState, useEffect, useRef } from 'react';
import { infrastructureImages } from '../../src/components/data/ImageData'; // Adjust the path if necessary

const BubbleText = ({ text, color }) => {
  return (
    <h2 className={`text-center text-6xl font-bold ${color} bg-clip-text text-transparent`}>
      {text.split("").map((child, idx) => (
        <span
          key={idx}
          className="inline-block hover:scale-150 transition-all duration-300 hover:-translate-y-2"
          style={{ color: '#866A04' }} // Change the text color here if needed
        >
          {child}
        </span>
      ))}
    </h2>
  );
};


const ImageTrail = ({ children }) => {
  const [images, setImages] = useState([]);
  const containerRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);

  const createImage = (x, y) => {
    const img = infrastructureImages[imageIndex.current % infrastructureImages.length];
    const rotation = Math.random() * 30 - 15;

    const newImage = {
      id: Date.now(),
      src: img,
      style: {
        left: x,
        top: y,
        rotation,
        opacity: 1
      }
    };

    imageIndex.current += 1;
    return newImage;
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = Math.hypot(x - lastMousePos.current.x, y - lastMousePos.current.y);

    if (distance > 50) {
      setImages(prev => {
        const newImages = [...prev, createImage(x, y)];
        if (newImages.length > 10) {
          return newImages.slice(-10);
        }
        return newImages;
      });

      lastMousePos.current = { x, y };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setImages(prev => prev.filter(img => Date.now() - img.id < 2000));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt="Infrastructure"
          className="absolute w-48 h-32 object-cover rounded-lg shadow-lg pointer-events-none transition-all duration-500"
          style={{
            left: image.style.left - 96,
            top: image.style.top - 64,
            transform: `rotate(${image.style.rotation}deg)`,
            opacity: image.style.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default function InfrastructureHero() {
  return (
    <ImageTrail>
      <div className="relative flex flex-col items-center justify-center px-12 pb-48 pt-24 md:pt-52">
        <div className="mb-4 rounded-full bg-zinc-600">
          <a href="#" target="_blank" rel="nofollow" className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2">
            <span className="rounded-full bg-pure-greys-600 px-2 py-0.5 font-medium text-white">WELCOME!</span>
            <span className="ml-1.5 mr-1 inline-block">We're excited to have you here!</span>
          </a>
        </div>
        <BubbleText text="S RAJ INFRA PROJECTS PRIVATE LIMITED" color="text-[#866A04]" />
        <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-xl md:leading-relaxed">
          Your trusted partner in innovative infrastructure solutions.
        </p>
        <button className="rounded-lg bg-indigo-600 p-3 uppercase text-white transition-colors hover:bg-indigo-700">
          <span className="font-bold">Get started - </span> no CC required
        </button>
        <div className="absolute bottom-0 left-1/2 h-36 w-[calc(100vw_-_56px)] max-w-[1100px] -translate-x-1/2 overflow-hidden rounded-t-xl bg-zinc-900 p-0.5">
          {/* <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-gradient-to-b from-white/0 to-white" /> */}
        </div>
      </div>
    </ImageTrail>
  );
}
