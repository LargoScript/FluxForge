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
}

const LavaLamp: React.FC<BackgroundProps<LavaLampConfig>> = ({ children, className = '', config: propsConfig, id }) => {
  const config = useBackgroundConfig(id, 'Lava Lamp', propsConfig);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We use a ref for blobs to maintain state across renders without triggering re-renders
  const blobsRef = useRef<BlobData[]>([]);
  // We use a mutable ref array to store DOM nodes.
  const domRefs = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number>(0);
  
  const bg = config?.backgroundColor || '#320032';
  const colors = config?.colors || ['#ff0000'];
  const speedMultiplier = config?.speed ?? 1;
  const count = config?.blobCount ?? 7; 

  const isHex = (color?: string) => color?.startsWith('#') || color?.startsWith('rgb') || color === 'transparent';

  // 1. Data Initialization & Re-initialization
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth: width, clientHeight: height } = containerRef.current;

    // Initialize if empty or regenerate if count changes significantly
    if (blobsRef.current.length !== count) {
        const newBlobs: BlobData[] = [];
        // Preserve existing blobs if possible to avoid total reset
        const existing = blobsRef.current;
        
        for (let i = 0; i < count; i++) {
            if (i < existing.length) {
                newBlobs.push(existing[i]);
            } else {
                const size = Math.min(width, height) * (0.15 + Math.random() * 0.25); 
                newBlobs.push({
                    id: i,
                    x: Math.random() * (width - size),
                    y: Math.random() * (height - size),
                    vx: (Math.random() - 0.5) * 2, 
                    vy: (Math.random() - 0.5) * 2,
                    size: size
                });
            }
        }
        blobsRef.current = newBlobs;
        // Resize domRefs array to match
        domRefs.current = domRefs.current.slice(0, count);
    }
  }, [count]); 

  // 2. Animation Loop
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;
      const { clientWidth: width, clientHeight: height } = containerRef.current;

      blobsRef.current.forEach((blob, i) => {
        const el = domRefs.current[i];
        if (!el) return;

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

        el.style.transform = `translate(${blob.x}px, ${blob.y}px)`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speedMultiplier, count]); 

  return (
    <div 
        ref={containerRef}
        className={`relative w-full h-full min-h-screen overflow-hidden ${!isHex(bg) ? bg : ''} ${className}`}
        style={{ 
            backgroundColor: isHex(bg) ? bg : undefined,
            filter: 'contrast(150%) brightness(100%)'
        }}
    >
      <div className="absolute inset-0 w-full h-full filter blur-[2.5vw]">
          {Array.from({ length: count }).map((_, i) => {
              const color = colors[i % colors.length];
              const blobData = blobsRef.current[i]; 
              const size = blobData?.size || 100; 

              return (
                <div 
                    key={i}
                    ref={(el) => { domRefs.current[i] = el; }}
                    className="absolute rounded-full aspect-square will-change-transform"
                    style={{ 
                        width: size, 
                        height: size,
                        backgroundColor: color,
                        transform: blobData ? `translate(${blobData.x}px, ${blobData.y}px)` : undefined
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