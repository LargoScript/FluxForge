import React, { useRef, useEffect } from 'react';
import { BackgroundProps, WaveConfig } from '../../types';
import { WaveSystem } from '../../lib/effects/WaveSystem';
import { useBackgroundConfig } from '../../hooks/useBackgroundConfig';

const Waves: React.FC<BackgroundProps<WaveConfig>> = ({ children, className = '', config: propsConfig, id }) => {
  const config = useBackgroundConfig(id, 'Sine Waves', propsConfig);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<WaveSystem | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    systemRef.current = new WaveSystem(canvas, config);

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

  return (
    <div ref={containerRef} className={`relative w-full h-full min-h-screen ${className}`} style={{backgroundColor: config?.colorStart || '#1e1b4b'}}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Waves;