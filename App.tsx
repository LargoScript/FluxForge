import React from 'react';
import { RegistryProvider } from './lib/context/RegistryContext';
import DevTools from './components/DevTools';

// Backgrounds
import GradientMesh from './components/backgrounds/GradientMesh';
import RetroGrid from './components/backgrounds/RetroGrid';
import LavaLamp from './components/backgrounds/LavaLamp';
import ParticleNetwork from './components/backgrounds/ParticleNetwork';
import FloatingShapes from './components/backgrounds/FloatingShapes';

// Sections
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeatureGrid } from './components/sections/FeatureGrid';
import { CarouselSection } from './components/sections/CarouselSection';
import { Footer } from './components/sections/Footer';

const App: React.FC = () => {
  return (
    <RegistryProvider>
        <div className="bg-black min-h-screen text-white selection:bg-amber-500 selection:text-black">
            <Navbar />
            
            {/* 
               SECTION 1: HERO 
               Using a Video Background as primary, with a subtle Gradient Mesh overlay
            */}
            <HeroSection 
                mediaType="video"
                mediaSrc="https://cdn.coverr.co/videos/coverr-working-in-a-luxury-office-4623/1080p.mp4"
                background={
                    <GradientMesh 
                        id="hero-mesh" 
                        config={{ 
                            backgroundColor: 'transparent',
                            animationSpeed: 15,
                            items: [
                                { color: '#fbbf24', top: '20%', left: '80%', width: '30vw', height: '30vw', opacity: 0.2, animationDelay: '0s', animationDuration: '15s' },
                                { color: '#d97706', top: '70%', left: '10%', width: '25vw', height: '25vw', opacity: 0.15, animationDelay: '4s', animationDuration: '12s' }
                            ]
                        }} 
                    />
                } 
            />

            {/* 
               SECTION 2: FEATURES (Services)
               Using Retro Grid
            */}
            <FeatureGrid 
                background={
                    <RetroGrid 
                        id="features-grid" 
                        config={{ 
                            gridColor: '#451a03', 
                            backgroundColor: '#000000',
                            animationSpeed: 5 
                        }} 
                    />
                } 
            />

            {/* 
               SECTION 3: CAROUSEL (Showcase)
               Using Floating Shapes
            */}
            <CarouselSection
                background={
                    <FloatingShapes
                        id="showcase-shapes"
                        config={{
                            backgroundColor: '#0f172a',
                            shapeCount: 6,
                            colors: ['#38bdf8', '#818cf8', '#c084fc', '#2dd4bf']
                        }}
                    />
                }
            />

            {/* 
               SECTION 4: FOOTER
               Using Lava Lamp
            */}
            <Footer 
                background={
                    <LavaLamp 
                        id="footer-lava" 
                        config={{ 
                            backgroundColor: '#111', 
                            colors: ['#78350f', '#92400e', '#b45309'], 
                            speed: 0.3,
                            blobCount: 6
                        }} 
                    />
                } 
            />

            <DevTools />
        </div>
    </RegistryProvider>
  );
};

export default App;