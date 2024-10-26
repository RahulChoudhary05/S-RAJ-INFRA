import { useState, useEffect, useRef } from "react";
import { Building2, Construction, Factory, Hammer, Ruler } from "lucide-react";
import HighlightText from "../components/common/HighlightText";

// Infrastructure Icons Data
const infrastructureIcons = [
  { icon: Building2, delay: 0 },
  { icon: Construction, delay: 200 },
  { icon: Factory, delay: 400 },
  { icon: Hammer, delay: 600 },
  { icon: Ruler, delay: 800 }
];

// Floating Icon Component
const FloatingIcon = ({ Icon, x, y, delay }) => (
  <div 
    className="absolute animate-float"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`,
      animation: `float 3s ease-in-out infinite`,
      animationDelay: `${delay}ms`
    }}
  >
    <Icon className="w-8 h-8 text-blue-500/30" />
  </div>
);

// Grid Background Component
const GridBackground = () => {
  const [activeCell, setActiveCell] = useState(null);
  const [ripples, setRipples] = useState([]);
  const cells = Array(100).fill(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCell = Math.floor(Math.random() * 100);
      setActiveCell(randomCell);
      
      setRipples(prev => [...prev, {
        id: Date.now(),
        cell: randomCell,
        timestamp: Date.now()
      }].slice(-5));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getCellClassName = (index) => {
    const isActive = activeCell === index;
    const isRipple = ripples.some(r => r.cell === index);
    const baseClasses = "border border-yellow-100/10 transition-all duration-500 relative overflow-hidden";
    
    if (isActive) {
      return `${baseClasses} bg-gray-400/20 shadow-lg shadow-gray-500/50`;
    }
    
    if (isRipple) {
      return `${baseClasses} animate-pulse-light`;
    }
    
    return `${baseClasses} hover:bg-gray-50/30`;
  };

  const getCellStyles = (index) => {
    const ripple = ripples.find(r => r.cell === index);
    if (!ripple) return {};

    const timeSinceRipple = Date.now() - ripple.timestamp;
    const opacity = Math.max(0, 1 - timeSinceRipple / 2000);

    return {
      background: `radial-gradient(circle at center, rgba(59, 130, 246, ${opacity * 0.2}) 0%, transparent 70%)`
    };
  };

  return (
    <div className="absolute inset-0">
      {/* Ambient Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pure-greys-50/5 to-transparent" />
      
      {/* Dynamic Grid */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {cells.map((_, i) => (
          <div
            key={i}
            className={getCellClassName(i)}
            style={getCellStyles(i)}
          >
            {/* Light Trail Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/10 to-transparent -translate-x-full animate-light-trail" />
            
            {/* Corner Dots */}
            <div className="absolute w-1 h-1 bg-pure-greys-200/30 rounded-full top-0 left-0" />
            <div className="absolute w-1 h-1 bg-pure-greys-200/30 rounded-full top-0 right-0" />
            <div className="absolute w-1 h-1 bg-pure-greys-200/30 rounded-full bottom-0 left-0" />
            <div className="absolute w-1 h-1 bg-pure-greys-200/30 rounded-full bottom-0 right-0" />
          </div>
        ))}
      </div>

      {/* Overlay Grid Lines */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '10% 10%'
        }} 
      />
    </div>
  );
};

// Main Infrastructure Hero Section
export default function InfrastructureHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      <GridBackground />

      {/* Floating Icons */}
      {infrastructureIcons.map((item, index) => (
        <FloatingIcon
          key={index}
          Icon={item.icon}
          x={(mousePosition.x + index * 15) % 90}
          y={(mousePosition.y + index * 10) % 80}
          delay={item.delay}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 text-center mb-6">
            <span className="bg-clip-text text-transparent font-body">
             <HighlightText text={"S RAJ INFRA PROJECTS PRIVATE LIMITED"}/>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Welcome
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 bg-white hover:scale-105 transition-all duration-300">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}