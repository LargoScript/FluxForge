// Defines the structure of the settings panel for each effect type

export type ControlType = 'color' | 'number' | 'boolean' | 'select' | 'colorArray' | 'json' | 'text';

export interface ConfigField {
  key: string;
  label: string;
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  options?: string[]; // for select
}

export const effectSchemas: Record<string, ConfigField[]> = {
  'Hero Configuration': [
    { key: 'badge', label: 'Badge Text', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'mediaType', label: 'Media Type', type: 'select', options: ['video', 'image'] },
    { key: 'mediaSrc', label: 'Media Source', type: 'text' },
    { key: 'poster', label: 'Video Poster', type: 'text' },
    { key: 'buttonText', label: 'Primary Button', type: 'text' },
  ],
  'Particle Network': [
    { key: 'backgroundColor', label: 'Background Color', type: 'color' },
    { key: 'particleCount', label: 'Particle Count', type: 'number', min: 10, max: 300, step: 10 },
    { key: 'particleColor', label: 'Dot Color', type: 'color' },
    { key: 'lineColor', label: 'Line Color', type: 'color' },
    { key: 'connectionDistance', label: 'Link Distance', type: 'number', min: 50, max: 400 },
    { key: 'mouseDistance', label: 'Mouse Radius', type: 'number', min: 50, max: 500 },
    { key: 'baseSpeed', label: 'Base Speed', type: 'number', min: 0, max: 5, step: 0.1 },
    { key: 'interactionStrength', label: 'Push Strength', type: 'number', min: 0, max: 5, step: 0.1 },
    { key: 'resistance', label: 'Friction (1=None)', type: 'number', min: 0.5, max: 0.99, step: 0.01 },
    { key: 'enableMouseInteraction', label: 'Mouse Interaction', type: 'boolean' },
    { key: 'wrapAround', label: 'Wrap Edges', type: 'boolean' },
  ],
  'Gradient Mesh': [
    { key: 'backgroundColor', label: 'Base Color', type: 'color' },
    { key: 'animationSpeed', label: 'Global Speed (s)', type: 'number', min: 1, max: 20 },
    // Complex item array is best handled via the JSON editor in the UI, 
    // but we can add a helper to regenerate random ones if needed, or just rely on JSON.
  ],
  'Retro Grid': [
    { key: 'backgroundColor', label: 'Sky Color', type: 'color' },
    { key: 'gridColor', label: 'Grid Color', type: 'color' },
    { key: 'animationSpeed', label: 'Grid Speed (s)', type: 'number', min: 0.1, max: 5, step: 0.1 },
  ],
  'Sine Waves': [
    { key: 'colorStart', label: 'Gradient Top', type: 'color' },
    { key: 'colorEnd', label: 'Gradient Bottom', type: 'color' },
    { key: 'waveColor', label: 'Wave Color', type: 'color' },
    { key: 'speed', label: 'Flow Speed', type: 'number', min: 0.1, max: 10, step: 0.1 },
    { key: 'amplitude', label: 'Height', type: 'number', min: 10, max: 200 },
  ],
  'Floating Shapes': [
    { key: 'backgroundColor', label: 'Background', type: 'color' },
    { key: 'shapeCount', label: 'Count', type: 'number', min: 1, max: 20 },
    { key: 'colors', label: 'Shape Colors', type: 'colorArray' },
  ],
  'Lava Lamp': [
    { key: 'backgroundColor', label: 'Background', type: 'color' },
    { key: 'blobCount', label: 'Blob Count', type: 'number', min: 1, max: 50 },
    { key: 'speed', label: 'Flow Speed', type: 'number', min: 0.1, max: 5, step: 0.1 },
    { key: 'colors', label: 'Lava Colors', type: 'colorArray' },
  ]
};

// Default configs for when adding a new layer
export const defaultConfigs: Record<string, any> = {
  'Hero Configuration': {
      badge: "Web Development for Small Business",
      title: "Ми створюємо сайти, які приносять прибуток",
      description: "FluxForge допомагає локальному бізнесу вийти в онлайн. Сучасний дизайн, SEO-оптимізація та зручне управління.",
      mediaType: 'video',
      mediaSrc: "https://cdn.coverr.co/videos/coverr-working-in-a-luxury-office-4623/1080p.mp4",
      poster: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
      buttonText: "Замовити консультацію"
  },
  'Particle Network': {
    particleCount: 80,
    connectionDistance: 248, 
    mouseDistance: 125,      
    particleColor: '#64c8ff',
    lineColor: 'rgba(100, 200, 255, 0.2)', 
    baseSpeed: 0.8,          
    interactionStrength: 0.3, 
    resistance: 0.76,        
    enableMouseInteraction: true,
    wrapAround: false,       
    backgroundColor: 'transparent',
  },
  'Gradient Mesh': {
    backgroundColor: '#0f172a',
    animationSpeed: 7,
    items: [
      { color: '#a855f7', top: '0%', left: '-5%', width: '20rem', height: '20rem', animationDelay: '0s', animationDuration: '7s', opacity: 0.7 },
      { color: '#eab308', top: '0%', left: '80%', width: '20rem', height: '20rem', animationDelay: '2s', animationDuration: '7s', opacity: 0.7 },
      { color: '#ec4899', top: '80%', left: '20%', width: '20rem', height: '20rem', animationDelay: '4s', animationDuration: '7s', opacity: 0.7 },
      { color: '#3b82f6', top: '60%', left: '60%', width: '24rem', height: '24rem', animationDelay: '5s', animationDuration: '10s', opacity: 0.6 }
    ]
  },
  'Retro Grid': {
    gridColor: '#444444',
    backgroundColor: '#0a0a0a',
    animationSpeed: 1,
  },
  'Sine Waves': {
    colorStart: '#1e1b4b',
    colorEnd: '#312e81',
    waveColor: 'rgba(129, 140, 248, 0.3)',
    speed: 1,
    amplitude: 50,
  },
  'Floating Shapes': {
    backgroundColor: '#f8fafc',
    shapeCount: 5,
    colors: ['#34d399', '#14b8a6', '#67e8f9', '#059669', '#5eead4'],
  },
  'Lava Lamp': {
    backgroundColor: '#320032',
    speed: 1.0,
    blobCount: 7,
    colors: [
        'rgba(153, 255, 204, 0.4)',
        'rgba(255, 221, 153, 0.4)',
        'rgba(153, 238, 255, 0.4)',
        'rgba(240, 168, 192, 0.4)',
        'rgba(255, 153, 179, 0.4)',
        'rgba(153, 247, 255, 0.4)',
        'rgba(255, 196, 153, 0.4)'
    ]
  }
};