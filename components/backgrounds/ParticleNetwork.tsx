import React, { useRef, useEffect } from 'react';
import { BackgroundProps, ParticleConfig } from '../../types';
import { ParticleSystem } from '../../lib/effects/ParticleSystem';
import { useBackgroundConfig } from '../../hooks/useBackgroundConfig';

const ParticleNetwork: React.FC<BackgroundProps<ParticleConfig>> = ({ children, className = '', config: propsConfig, id }) => {
  const config = useBackgroundConfig(id, 'Particle Network', propsConfig);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    systemRef.current = new ParticleSystem(canvas, config);
    
    const resize = () => {
      systemRef.current?.resize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', resize);
    resize();
    systemRef.current.start();

    return () => {
      window.removeEventListener('resize', resize);
      systemRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (systemRef.current && config) {
      systemRef.current.updateConfig(config);
    }
  }, [config]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && systemRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        systemRef.current.updateMouse(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    }
  };

  const bgColor = config?.backgroundColor;
  const defaultBgClass = bgColor ? '' : 'bg-slate-950';

  return (
    <div 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className={`relative w-full h-full min-h-screen overflow-hidden ${defaultBgClass} ${className}`}
        style={{ backgroundColor: bgColor }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ParticleNetwork;