import React, { useRef, useEffect } from 'react';
import { Translations } from '../types';
import { Database, Code2, Globe, HeartHandshake } from 'lucide-react';
import { useScrollRoot } from './ScrollRootContext';

interface AboutProps {
  t: Translations['about'];
}

export const About: React.FC<AboutProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRootRef = useScrollRoot();

  useEffect(() => {
    let animationFrame: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const windowHeight = window.innerHeight;
      
      // --- Image Parallax & 3D Effect ---
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
        const percentFromCenter = centerOffset / windowHeight; // -0.5 to 0.5 roughly when visible

        // 3D Rotation based on scroll
        const rotateX = percentFromCenter * 20; // Tilt up/down
        const rotateY = percentFromCenter * -15; // slight turn
        const scale = 1 - Math.abs(percentFromCenter) * 0.15; // Scale down at edges, full size at center
        const translateY = percentFromCenter * -80; // Parallax movement against scroll

        imageRef.current.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
          translateY(${translateY}px) 
          scale(${Math.max(0.85, scale)})
        `;
        
        // Opacity fade at edges
        const opacity = 1 - Math.abs(percentFromCenter * 1.5);
        imageRef.current.style.opacity = Math.max(0, opacity).toString();
      }

      // --- Text Bullets Scrub Animation ---
      textRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        
        // Trigger point: When the element is in the "active zone" (middle 60% of screen)
        // We calculate a progress value from 0 to 1
        // 0 = element is at bottom of screen (just entering)
        // 1 = element is at 30% from top (fully visible/read)
        
        const elementTop = rect.top;
        const startPoint = windowHeight * 0.9; // Starts animating when it hits bottom 10%
        const endPoint = windowHeight * 0.4; // Finishes animating when it hits 40% from top
        
        let progress = (startPoint - elementTop) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));

        // If scrolling back down (element going down), progress goes 1 -> 0
        // This achieves the "fade out and disappear" requirement
        
        // Apply styles
        el.style.opacity = progress.toString();
        el.style.transform = `translateX(${(1 - progress) * 50}px)`; // Slide in from right (50px)

        // Bullet Scale "Pop"
        const bullet = el.querySelector('.bullet-point') as HTMLElement;
        if (bullet) {
             // bouncy scale effect near 1? No, linear scrub is safer for scroll-bound
             bullet.style.transform = `scale(${progress})`;
             bullet.style.boxShadow = `0 0 ${progress * 20}px rgba(59, 130, 246, 0.6)`;
        }

        // Line Height "Grow"
        const line = el.querySelector('.bullet-line') as HTMLElement;
        if (line) {
             // Delay line growth slightly compared to bullet
             const lineProgress = Math.max(0, (progress - 0.2) * 1.25);
             line.style.height = `${lineProgress * 100}%`;
             line.style.opacity = lineProgress.toString();
        }
      });
      
      animationFrame = requestAnimationFrame(handleScroll);
    };

    // Initial call
    handleScroll();
    
    const scrollTarget = scrollRootRef?.current ?? window;

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [scrollRootRef]);

  // Updated colors to be consistent (Blue)
  const bullets = [
    { text: t.p1, color: 'bg-blue-600', icon: <Database className="w-4 h-4 text-white" /> },
    { text: t.p2, color: 'bg-blue-600', icon: <Code2 className="w-4 h-4 text-white" /> },
    { text: t.p3, color: 'bg-blue-600', icon: <HeartHandshake className="w-4 h-4 text-white" /> },
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-16 lg:py-24 bg-transparent text-white relative z-10"
    >
      {/* Decorative Background Elements Local to this section */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* LEFT ALIGNED TITLE STYLE */}
        <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-left uppercase whitespace-nowrap">
                <span className="text-blue-600">/</span> {t.title}
            </h2>
            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent flex-grow opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* IMAGE COLUMN */}
          <div className="order-2 lg:order-1 relative perspective-container">
             <div 
                ref={imageRef} 
                className="relative bg-gray-900/80 backdrop-blur rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,123,255,0.15)] transition-transform duration-75 ease-linear will-change-transform"
                style={{ transformStyle: 'preserve-3d', opacity: 0 }}
             >
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                
                {/* Tech Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.2)_50%,transparent_100%)] bg-[length:100%_200%] animate-scan z-20 pointer-events-none opacity-50"></div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 z-30"></div>
                
                <img 
                    src="https://picsum.photos/800/600?random=tech" 
                    alt="In house solution" 
                    className="w-full h-auto object-cover grayscale opacity-80"
                />
                
                {/* Floating Info Cards (3D Element) */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4 z-30" style={{ transform: 'translateZ(40px)' }}>
                    <div className="bg-black/80 backdrop-blur p-3 rounded border border-white/10 text-center shadow-lg">
                        <Database className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                        <div className="text-[10px] text-gray-300 font-mono tracking-wider">BACKEND</div>
                    </div>
                    <div className="bg-black/80 backdrop-blur p-3 rounded border border-white/10 text-center shadow-lg">
                        <Code2 className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                        <div className="text-[10px] text-gray-300 font-mono tracking-wider">NATIVE</div>
                    </div>
                     <div className="bg-black/80 backdrop-blur p-3 rounded border border-white/10 text-center shadow-lg">
                        <Globe className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                        <div className="text-[10px] text-gray-300 font-mono tracking-wider">WEB</div>
                    </div>
                </div>
             </div>
          </div>

          {/* TEXT COLUMN */}
          <div className="order-1 lg:order-2">
            <div className="space-y-16">
                {bullets.map((bullet, idx) => (
                    <div 
                        key={idx} 
                        ref={el => { textRefs.current[idx] = el }}
                        className="relative pl-12 will-change-[opacity,transform]"
                        style={{ opacity: 0 }} // Start hidden
                    >
                        {/* Bullet Circle & Icon */}
                        <div className={`bullet-point absolute left-0 top-1 w-10 h-10 ${bullet.color} rounded-full flex items-center justify-center shadow-lg z-20 origin-center`}>
                            {bullet.icon}
                        </div>
                        
                        {/* Connecting Line */}
                        {idx !== bullets.length - 1 && (
                            <div className="bullet-line absolute left-5 top-10 w-0.5 bg-gradient-to-b from-blue-500 to-blue-900/10 -ml-px h-0 origin-top z-10"></div>
                        )}

                        <p className="text-blue-100 text-lg leading-relaxed font-light">
                            <strong className="text-white block mb-2 font-bold tracking-wide uppercase text-sm text-blue-400">
                                {idx === 0 ? 'Proprietary Tech' : idx === 1 ? 'B2B Solutions' : 'Partnership'}
                            </strong>
                            {idx === 0 ? (
                                <span><strong className="text-white">qla.dev</strong> {bullet.text.substring(8)}</span>
                            ) : (
                                bullet.text
                            )}
                        </p>
                    </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
