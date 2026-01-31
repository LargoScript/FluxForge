import { ReactNode } from 'react';

export interface BackgroundProps<T = any> {
  id?: string; // Unique identifier for the registry
  children?: ReactNode;
  className?: string;
  config?: T;
}

// --- Configuration Interfaces ---

export interface ParticleConfig {
  particleCount?: number;
  connectionDistance?: number;
  mouseDistance?: number;
  particleColor?: string;
  lineColor?: string;
  baseSpeed?: number;
  interactionStrength?: number;
  resistance?: number;
  enableMouseInteraction?: boolean;
  wrapAround?: boolean;
  backgroundColor?: string;
}

export interface WaveConfig {
  colorStart?: string;
  colorEnd?: string;
  waveColor?: string;
  speed?: number;
  amplitude?: number;
}

export interface GridConfig {
  gridColor?: string;
  backgroundColor?: string;
  animationSpeed?: number;
}

export interface GradientMeshItem {
  color: string;
  top: string;  // e.g., "10%" or "-50px"
  left: string; // e.g., "50%"
  width: string; // e.g., "24rem"
  height: string;
  animationDelay: string;
  animationDuration: string;
  opacity: number;
}

export interface GradientMeshConfig {
  backgroundColor?: string;
  animationSpeed?: string | number; // Global multiplier
  items?: GradientMeshItem[]; 
  // Legacy support for older saved configs (optional)
  blobColors?: string[]; 
}

export interface ShapeConfig {
  backgroundColor?: string;
  shapeCount?: number;
  colors?: string[];
}

export interface LavaLampConfig {
  backgroundColor?: string;
  colors?: string[];
  speed?: number;
  blobCount?: number;
}