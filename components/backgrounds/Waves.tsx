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
    systemRef.current.start();

    // Use ResizeObserver to track container size changes.
    // Note: We send updates immediately. The WaveSystem handles "deferred resizing"
    // internally within the animation loop to prevent flickering.
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
         if (systemRef.current) {
            const { width, height } = entry.contentRect;
            systemRef.current.resize(width, height);
         }
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
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