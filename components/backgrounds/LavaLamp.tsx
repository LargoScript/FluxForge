import React, { useRef, useEffect } from 'react';
import { BackgroundProps, LavaLampConfig } from '../../types';
import { useBackgroundConfig } from '../../hooks/useBackgroundConfig';

interface BlobData {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  element: HTMLDivElement | null;
}

const LavaLamp: React.FC<BackgroundProps<LavaLampConfig>> = ({ children, className = '', config: propsConfig, id }) => {
  const config = useBackgroundConfig(id, 'Lava Lamp', propsConfig);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We use a ref for blobs to maintain state across renders without triggering re-renders
  const blobsRef = useRef<BlobData[]>([]);
  const requestRef = useRef<number>(0);
  
  const bg = config?.backgroundColor || '#320032';
  const colors = config?.colors || ['#ff0000'];
  const speedMultiplier = config?.speed ?? 1;
  const count = config?.blobCount ?? 7; 

  const isHex = (color?: string) => color?.startsWith('#') || color?.startsWith('rgb') || color === 'transparent';

  // 1. Data Initialization (Runs only when count or container size changes significantly)
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth: width, clientHeight: height } = containerRef.current;

    // Only regenerate if count mismatches to preserve positions when just changing speed
    if (blobsRef.current.length !== count) {
        const newBlobs: BlobData[] = [];
        for (let i = 0; i < count; i++) {
            const size = Math.min(width, height) * (0.15 + Math.random() * 0.25); 
            newBlobs.push({
                id: i,
                x: Math.random() * (width - size),
                y: Math.random() * (height - size),
                vx: (Math.random() - 0.5) * 2, 
                vy: (Math.random() - 0.5) * 2,
                size: size,
                element: null // Will be assigned via ref callback
            });
        }
        blobsRef.current = newBlobs;
    }
  }, [count]); 

  // 2. Animation Loop
  // Removed 'count' from dependency to prevent loop restart race conditions.
  // The loop simply reads whatever is in blobsRef.current.
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      const { clientWidth: width, clientHeight: height } = containerRef.current;

      blobsRef.current.forEach(blob => {
        // If element isn't mounted yet (e.g. right after count change), skip this frame
        if (!blob.element) return;

        blob.x += blob.vx * speedMultiplier;
        blob.y += blob.vy * speedMultiplier;

        // Bounce Logic
        if (blob.x <= 0) {
            blob.x = 0;
            blob.vx *= -1;
        } else if (blob.x + blob.size >= width) {
            blob.x = width - blob.size;
            blob.vx *= -1;
        }

        if (blob.y <= 0) {
            blob.y = 0;
            blob.vy *= -1;
        } else if (blob.y + blob.size >= height) {
            blob.y = height - blob.size;
            blob.vy *= -1;
        }

        blob.element.style.transform = `translate(${blob.x}px, ${blob.y}px)`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speedMultiplier]); // Only restart if speed changes (to capture new speed value closure)

  return (
    <div 
        ref={containerRef}
        className={`relative w-full h-full min-h-screen overflow-hidden ${!isHex(bg) ? bg : ''} ${className}`}
        style={{ 
            backgroundColor: isHex(bg) ? bg : undefined,
            filter: 'contrast(200%) saturate(200%) brightness(0.7)'
        }}
    >
      <div className="absolute inset-0 w-full h-full filter blur-[2.5vw]">
          {Array.from({ length: count }).map((_, i) => {
              const color = colors[i % colors.length];
              // Safe access in case render happens before useEffect updates ref
              const blobData = blobsRef.current[i]; 
              const size = blobData?.size || 100; 

              return (
                <div 
                    key={i}
                    ref={(el) => {
                        // Assign DOM element to our data model
                        if (blobsRef.current[i]) {
                            blobsRef.current[i].element = el;
                            // Set initial position immediately to prevent jump
                            if (el && blobsRef.current[i]) {
                                el.style.transform = `translate(${blobsRef.current[i].x}px, ${blobsRef.current[i].y}px)`;
                            }
                        }
                    }}
                    className="absolute rounded-full aspect-square will-change-transform"
                    style={{ 
                        width: size, 
                        height: size,
                        backgroundColor: color,
                    }}
                ></div>
              );
          })}
      </div>

      <div className="relative z-10 w-full h-full pointer-events-auto filter-none">
        {children}
      </div>
    </div>
  );
};

export default LavaLamp;