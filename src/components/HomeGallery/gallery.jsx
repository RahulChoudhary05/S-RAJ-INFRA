import React, { useState, useEffect } from 'react';
import about1 from '../../assets/Bridge.jpeg';
import about2 from '../../assets/Machine.jpeg';
import img3 from '../../assets/Bridge.jpeg';
import img4 from '../../assets/Machine.jpeg';
import img5 from '../../assets/Bridge.jpeg';

const images = [
    { id: 1, src: about1, name: 'Image 1', description: 'Description for Image 1' },
    { id: 2, src: about2, name: 'Image 2', description: 'Description for Image 2' },
    { id: 3, src: img3, name: 'Image 3', description: 'Description for Image 3' },
    { id: 4, src: img4, name: 'Image 4', description: 'Description for Image 4' },
    { id: 5, src: img5, name: 'Image 5', description: 'Description for Image 5' },
];

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); 

        return () => clearInterval(interval);
    }, [currentIndex]); 

    return (
        <div className="relative w-screen h-screen bg-richblack-25 overflow-hidden shadow-xl">
            <div className="absolute w-[90%] h-full flex items-center overflow-hidden">
                {images.map((image, index) => {
                    let positionClass = '';
                    if (index === currentIndex) {
                        positionClass = 'transform scale-100 translate-x-[-95px] z-0'; 
                    } else if (index === (currentIndex + 1) % images.length) {
                        positionClass = 'transform scale-50 translate-x-[250px] translate-y-[160px] z-10'; 
                    } else {
                        positionClass = 'opacity-0'; 
                    }

                    return (
                        <div
                            key={image.id}
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${positionClass}`}
                        >
                            <img
                                src={image.src}
                                alt={image.name}
                                className="w-[750px] h-[400px] object-cover rounded-lg shadow-lg"
                            />
                            {index === currentIndex && (
                                <div className="absolute top-[18px] left-[198px] ">
                                    <h2 className="text-5xl font-bodoni text-richblack-900 font-bold">{image.name}</h2>
                                    <p className="mt-2 font-edu-sa text-richblack-800">{image.description}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="absolute bottom-8 left-[90%] transform -translate-x-1/2 flex space-x-4">
                <button
                    onClick={() => {
                        prevSlide();
                        clearInterval();
                    }}
                    className="bg-white text-gray-900 px-4 py-2 font-bodoni font-bold rounded-md shadow hover:bg-richblue-400 hover:text-blue-5 transition"
                >
                    Prev
                </button>
                <button
                    onClick={() => {
                        nextSlide();
                        clearInterval();
                    }}
                    className="bg-white text-gray-900 font-bodoni font-bold px-4 py-2 rounded-md shadow hover:bg-richblue-400 hover:text-blue-5 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
